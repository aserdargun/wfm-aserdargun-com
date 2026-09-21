import { ArrowUpRight } from "lucide-react";
import { portfolioCopy, portfolioHome } from "../data/locales/portfolio";
import type { Locale } from "../data/types";

export function PortfolioContext({ locale }: { locale: Locale }) {
  const copy = portfolioCopy[locale];
  return <section className="portfolio-context" aria-labelledby="portfolio-heading">
    <h2 id="portfolio-heading">{copy.title}</h2>
    <p>{copy.summary}</p>
    <p className="portfolio-context__scope">{copy.boundary}</p>
    <div className="portfolio-context__links">
      <a className="text-link" href={portfolioHome(locale)}>{copy.rootLabel}<ArrowUpRight size={16} aria-hidden="true" /></a>
      <a className="text-link" href="https://itl.aserdargun.com/">{copy.twinLabel}<ArrowUpRight size={16} aria-hidden="true" /></a>
    </div>
  </section>;
}
