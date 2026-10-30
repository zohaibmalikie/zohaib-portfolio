"use client";

import { Mail, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";

const services = [
  { value: "health-check", label: "AI / Automation Health Check" },
  { value: "build-or-repair", label: "Workflow Implementation or Repair" },
  { value: "maintenance", label: "Ongoing Automation Maintenance" },
  { value: "website", label: "Next.js / React Website or CMS" },
  { value: "seo", label: "Technical SEO or Website Performance" },
  { value: "other", label: "Something else" }
];

export function EnquiryForm({ defaultService = "", email }: { defaultService?: string; email?: string }) {
  const initialService = services.some((service) => service.value === defaultService) ? defaultService : "";
  const [draft, setDraft] = useState<{ message: string; service: string; subject: string } | null>(null);
  const [copyStatus, setCopyStatus] = useState("");
  const draftHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (draft) draftHeading.current?.focus();
  }, [draft]);

  function prepareBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const selectedService = services.find((service) => service.value === data.get("service"));
    if (!selectedService) return;

    const name = String(data.get("name") || "").trim();
    const description = String(data.get("description") || "").trim();
    const budget = String(data.get("budget") || "").trim();
    const message = [
      `Hello Zohaib, I'm ${name}.`,
      `I'm interested in: ${selectedService.label}.`,
      "",
      description,
      ...(budget ? ["", `Approximate budget: ${budget}`] : [])
    ].join("\n");
    setDraft({ message, service: selectedService.value, subject: `Project enquiry: ${selectedService.label}` });
    setCopyStatus("");
  }

  function recordIntent(channel: "email" | "whatsapp") {
    if (!draft) return;
    // This is enquiry intent only. It does not confirm a message was sent or a lead received.
    // Event details contain no name, description or budget; no analytics provider is configured.
    window.dispatchEvent(new CustomEvent("portfolio:enquiry-intent", {
      detail: { service: draft.service, channel }
    }));
  }

  async function copyBrief() {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(draft.message);
      setCopyStatus("Brief copied. Paste it into your preferred email or messaging app.");
    } catch {
      setCopyStatus("Copy is unavailable. Select and copy the brief below instead.");
    }
  }

  return (
    <form className="enquiry-form" onSubmit={prepareBrief} onChange={() => { setDraft(null); setCopyStatus(""); }} aria-describedby="enquiry-next-step">
      <div className="enquiry-form-row">
        <div className="enquiry-field">
          <label htmlFor="enquiry-name">Your name <span>(required)</span></label>
          <input id="enquiry-name" name="name" autoComplete="name" required minLength={2} maxLength={80} />
        </div>
        <div className="enquiry-field">
          <label htmlFor="enquiry-service">What do you need? <span>(required)</span></label>
          <select id="enquiry-service" name="service" required defaultValue={initialService}>
            <option value="" disabled>Select a service</option>
            {services.map((service) => (
              <option key={service.value} value={service.value}>{service.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="enquiry-field">
        <label htmlFor="enquiry-description">What would you like to improve? <span>(required)</span></label>
        <p id="enquiry-description-help" className="enquiry-field-help">
          Mention the tools you use, what is going wrong, and the outcome you want.
          Please leave out passwords, API keys and private customer data.
        </p>
        <textarea id="enquiry-description" name="description" rows={5} required minLength={20} maxLength={1500} aria-describedby="enquiry-description-help" />
      </div>
      <div className="enquiry-field">
        <label htmlFor="enquiry-budget">Approximate budget <span>(optional)</span></label>
        <input id="enquiry-budget" name="budget" maxLength={100} placeholder="For example, $300 USD or not sure yet" />
      </div>
      <div className="enquiry-form-footer">
        <button className="button button-primary" type="submit">
          Prepare my project brief
        </button>
        <p id="enquiry-next-step">Then choose {email ? "email or " : ""}WhatsApp. Nothing is sent from this form.</p>
      </div>
      {draft ? <section className="enquiry-draft" aria-labelledby="enquiry-draft-title">
        <h3 id="enquiry-draft-title" ref={draftHeading} tabIndex={-1}>Your brief is ready to send</h3>
        <p>Choose an app, review the message and send it there. {email ? `If no email app opens, copy the brief and email ${email}.` : "You can also copy the brief below."}</p>
        <div className="button-row">
          {email ? <a className="button button-primary" href={`mailto:${email}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.message)}`} onClick={() => recordIntent("email")}><Mail size={17} aria-hidden="true" /> Open email draft</a> : null}
          <a className="button button-secondary" href={`https://api.whatsapp.com/send?phone=923090844077&text=${encodeURIComponent(draft.message)}`} target="_blank" rel="noopener noreferrer" onClick={() => recordIntent("whatsapp")}><MessageCircle size={17} aria-hidden="true" /> Open WhatsApp draft</a>
          <button className="button button-secondary" type="button" onClick={copyBrief}>Copy brief</button>
        </div>
        <p role="status">{copyStatus}</p>
        <details><summary>Review or manually copy your brief</summary><pre className="enquiry-brief">{draft.message}</pre></details>
      </section> : null}
    </form>
  );
}
