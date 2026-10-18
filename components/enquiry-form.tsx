"use client";

import { MessageCircle } from "lucide-react";
import type { FormEvent } from "react";

const services = [
  { value: "health-check", label: "AI / Automation Health Check" },
  { value: "build-or-repair", label: "Workflow Implementation or Repair" },
  { value: "maintenance", label: "Ongoing Automation Maintenance" },
  { value: "website-or-seo", label: "Website or SEO" },
  { value: "other", label: "Something else" }
];

export function EnquiryForm() {
  function continueInWhatsApp(event: FormEvent<HTMLFormElement>) {
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
    const whatsappUrl = new URL("https://api.whatsapp.com/send");
    whatsappUrl.searchParams.set("phone", "923090844077");
    whatsappUrl.searchParams.set("text", message);

    // This is enquiry intent only. It does not confirm a message was sent or a lead received.
    // Event details contain no name, description or budget; no analytics provider is configured.
    window.dispatchEvent(new CustomEvent("portfolio:enquiry-intent", {
      detail: { service: selectedService.value, channel: "whatsapp" }
    }));
    window.location.assign(whatsappUrl.toString());
  }

  return (
    <form className="enquiry-form" onSubmit={continueInWhatsApp} aria-describedby="enquiry-next-step">
      <div className="enquiry-form-row">
        <div className="enquiry-field">
          <label htmlFor="enquiry-name">Your name <span>(required)</span></label>
          <input id="enquiry-name" name="name" autoComplete="name" required minLength={2} maxLength={80} />
        </div>
        <div className="enquiry-field">
          <label htmlFor="enquiry-service">What do you need? <span>(required)</span></label>
          <select id="enquiry-service" name="service" required defaultValue="">
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
          <MessageCircle size={17} aria-hidden="true" /> Continue in WhatsApp
        </button>
        <p id="enquiry-next-step">Review and send your message in WhatsApp.</p>
      </div>
    </form>
  );
}
