import { execFileSync, spawn } from "node:child_process";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import process from "node:process";

const checkout = process.cwd();
const runtimeFile = resolve(checkout, ".runtime", "wfm-preview.json");
const command = process.argv[2];

if (command === "start") await start();
else if (command === "stop") await stop();
else throw new Error("Usage: preview-control.mjs <start|stop> [--mode dev|preview]");

async function start() {
  const modeIndex = process.argv.indexOf("--mode");
  const mode = modeIndex >= 0 ? process.argv[modeIndex + 1] : "preview";
  if (mode !== "dev" && mode !== "preview") throw new Error(`Unsupported mode: ${mode}`);
  const port = mode === "dev" ? 63051 : 4173;
  const viteArgs = mode === "dev"
    ? ["exec", "vite", "--", "--host", "127.0.0.1", "--port", String(port), "--strictPort"]
    : ["exec", "vite", "--", "preview", "--host", "127.0.0.1", "--port", String(port), "--strictPort"];
  const child = spawn("npm", viteArgs, { cwd: checkout, stdio: "inherit", env: process.env });
  if (!child.pid) throw new Error("Vite failed to start.");
  await mkdir(dirname(runtimeFile), { recursive: true });
  await writeFile(runtimeFile, JSON.stringify({ pid: child.pid, cwd: checkout, mode, url: `http://127.0.0.1:${port}/`, startedAt: new Date().toISOString() }, null, 2));

  let stopping = false;
  const forward = (signal) => {
    if (stopping) return;
    stopping = true;
    try { child.kill(signal); } catch { /* process already exited */ }
  };
  process.on("SIGINT", () => forward("SIGINT"));
  process.on("SIGTERM", () => forward("SIGTERM"));
  const exitCode = await new Promise((resolveExit) => child.once("exit", (code) => resolveExit(code ?? 0)));
  await removeRuntimeIfOwned(child.pid);
  process.exitCode = exitCode;
}

async function stop() {
  let record;
  try { record = JSON.parse(await readFile(runtimeFile, "utf8")); }
  catch { console.log("No checkout-owned preview is recorded."); return; }
  if (record.cwd !== checkout || !Number.isInteger(record.pid)) throw new Error("Runtime record does not belong to this checkout.");
  let processCwd = "";
  try {
    processCwd = execFileSync("lsof", ["-a", "-p", String(record.pid), "-d", "cwd", "-Fn"], { encoding: "utf8" })
      .split("\n").find((line) => line.startsWith("n"))?.slice(1) ?? "";
  } catch {
    await rm(runtimeFile, { force: true });
    console.log("Recorded preview is no longer running.");
    return;
  }
  if (resolve(processCwd) !== resolve(checkout)) throw new Error(`Refusing to stop PID ${record.pid}: cwd ownership check failed.`);
  process.kill(record.pid, "SIGTERM");
  await rm(runtimeFile, { force: true });
  console.log(`Stopped ${record.mode} preview at ${record.url}`);
}

async function removeRuntimeIfOwned(pid) {
  try {
    const record = JSON.parse(await readFile(runtimeFile, "utf8"));
    if (record.pid === pid && record.cwd === checkout) await rm(runtimeFile, { force: true });
  } catch { /* nothing to clean */ }
}
