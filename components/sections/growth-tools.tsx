import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ServiceFinder } from "@/components/service-finder";
import { Container } from "@/components/ui/container";
import "@/components/growth-tools.css";

export function GrowthTools() {
  return (
    <section className="section growth-section" aria-labelledby="growth-heading"><Container><div className="growth-intro"><div><p className="eyebrow">Make the next step clearer</p><h2 id="growth-heading">Less guesswork.<br /><span className="text-accent">A useful place to start.</span></h2></div><p>You don’t need a finished technical brief. Start with the problem you want to solve, then explore a sensible next step.</p></div><ServiceFinder /><Link href="/tools#calculator" className="calculator-teaser"><div><span className="tool-index">BEFORE YOU AUTOMATE</span><h3>Is the manual work worth automating?</h3><p>Explore time capacity, running costs, and payback using your own numbers.</p></div><span className="teaser-action">Try the calculator <ArrowUpRight size={20} aria-hidden="true" /></span></Link></Container></section>
  );
}
