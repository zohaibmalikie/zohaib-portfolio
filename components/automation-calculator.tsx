"use client";

import { useId, useState } from "react";
import { ActionLink } from "@/components/ui/action-link";
import "@/components/growth-tools.css";

const fields = [
  { key: "records", label: "Records or tasks per month", value: 500, max: 1000000, step: 1, hint: "For example, orders, leads, or reports." },
  { key: "minutes", label: "Manual minutes per record", value: 5, max: 1440, step: 0.5, hint: "Include checking and copying time." },
  { key: "hourly", label: "Internal time value (USD/hour)", value: 25, max: 10000, step: 1, hint: "A planning value for your team’s time." },
  { key: "percent", label: "Share of work automated (%)", value: 60, max: 100, step: 1, hint: "Leave room for review and exceptions." },
  { key: "monthly", label: "Tools + maintenance (USD/month)", value: 100, max: 1000000, step: 10, hint: "Include ongoing subscriptions and support." },
  { key: "setup", label: "Implementation estimate (USD)", value: 800, max: 10000000, step: 50, hint: "Your own estimate, not a project quote." }
] as const;
type InputKey = typeof fields[number]["key"];
const initialValues = Object.fromEntries(fields.map((field) => [field.key, String(field.value)])) as Record<InputKey, string>;
const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

export function AutomationCalculator() {
  const id = useId();
  const [values, setValues] = useState(initialValues);
  const invalid = fields.some((field) => values[field.key].trim() === "" || !Number.isFinite(Number(values[field.key])) || Number(values[field.key]) < 0 || Number(values[field.key]) > field.max);
  const number = (key: InputKey) => Math.min(fields.find((field) => field.key === key)!.max, Math.max(0, Number(values[key]) || 0));
  const hours = number("records") * number("minutes") / 60 * number("percent") / 100;
  const gross = hours * number("hourly");
  const net = gross - number("monthly");
  return (
    <div className="automation-calculator" id="calculator">
      <div className="tool-heading"><span className="tool-index">02 / EXPLORE THE NUMBERS</span><h2>What could automation free up?</h2><p>Use your own assumptions to estimate time capacity and its value. Include human review in the share of work you expect to automate.</p></div>
      <div className="calculator-layout"><div className="calculator-fields">{fields.map((field) => <label key={field.key} htmlFor={`${id}-${field.key}`}>{field.label}<input id={`${id}-${field.key}`} type="number" min={0} max={field.max} step={field.step} value={values[field.key]} aria-describedby={`${id}-${field.key}-hint`} aria-invalid={values[field.key].trim() === "" || !Number.isFinite(Number(values[field.key])) || Number(values[field.key]) < 0 || Number(values[field.key]) > field.max} onChange={(event) => setValues((previous) => ({ ...previous, [field.key]: event.target.value }))} /><small id={`${id}-${field.key}-hint`}>{field.hint} Range: 0–{field.max.toLocaleString("en-US")}.</small></label>)}</div>
      <div className="calculator-results" aria-live="polite" aria-atomic="true">{invalid ? <p>Enter a number within each field’s range to see your estimate.</p> : <><span className="eyebrow">Illustrative monthly capacity</span><p className="capacity-number">{hours.toLocaleString("en-US", { maximumFractionDigits: 1 })}<span>hours released</span></p><dl><div><dt>Time capacity value</dt><dd>{money(gross)}</dd></div><div><dt>Ongoing costs</dt><dd>{money(number("monthly"))}</dd></div><div className="net-value"><dt>Estimated net monthly value</dt><dd>{money(net)}</dd></div><div><dt>Simple value-based payback</dt><dd>{net > 0 ? number("setup") === 0 ? "No setup cost entered" : `${(number("setup") / net).toLocaleString("en-US", { maximumFractionDigits: 1 })} months` : "Not reached at these assumptions"}</dd></div></dl></>}
      <p className="calculator-caveat">Planning estimate only. Released hours are capacity, not guaranteed cash savings. Actual value depends on adoption, exceptions, accuracy, and ongoing costs; this is not a quote.</p><ActionLink href="/contact?service=ai-automation-health-check">Review my workflow</ActionLink></div></div>
      <p className="tool-formula">Hours = monthly tasks × minutes per task ÷ 60 × automated share. Net value = hours × hourly time value − monthly costs. Payback = implementation estimate ÷ positive net monthly value.</p>
      <noscript><p>JavaScript is needed to adjust the estimate. You can use the formula above or <a href="/contact">request a workflow review</a>.</p></noscript>
    </div>
  );
}
