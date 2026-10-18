import type { Service } from "@/types/sanity";

export const automationOffers: Service[] = [
  {
    _id: "service-ai-automation-health-check",
    slug: "ai-automation-health-check",
    title: "AI / Automation Health Check",
    offerLabel: "Illustrative pilot price",
    priceRange: "$150–$300",
    priceNote: "One workflow. A clear plan for what to fix next.",
    description:
      "Review one existing workflow for failures, duplicate actions, missing alerts, privacy risks and unnecessary AI usage costs.",
    benefits: ["Short, actionable audit", "Prioritized fixes and next steps"],
    relatedTechnologies: ["AI automation", "Workflow audits", "API integrations"]
  },
  {
    _id: "service-workflow-implementation-or-repair",
    slug: "workflow-implementation-or-repair",
    title: "Workflow Implementation or Repair",
    offerLabel: "Illustrative project price",
    priceRange: "$400–$1,200+",
    priceNote: "A focused scope, agreed before implementation.",
    description:
      "Fix broken API integrations or build a narrowly scoped automation with tests and clear acceptance criteria.",
    benefits: ["Implementation or repair of an agreed workflow", "Tests and clear acceptance criteria"],
    relatedTechnologies: ["Workflow automation", "API integrations", "Testing"]
  },
  {
    _id: "service-ongoing-automation-maintenance",
    slug: "ongoing-automation-maintenance",
    title: "Ongoing Automation Maintenance",
    offerLabel: "Illustrative starting retainer",
    priceRange: "$150–$400/month",
    priceNote: "Support hours and response expectations agreed upfront.",
    description:
      "Maintain integrations, review alerts, investigate failures and report system health.",
    benefits: ["Integration maintenance and failure investigation", "System health reporting"],
    relatedTechnologies: ["Automation maintenance", "Monitoring", "API integrations"]
  }
];

export function isAutomationOffer(service: Service) {
  return automationOffers.some((offer) => offer.slug === service.slug);
}

export function getAutomationOffers(services: Service[]): Service[] {
  return automationOffers.map((offer) => {
    const override = services.find((service) => service.slug === offer.slug);
    if (!override) return offer;

    return {
      ...offer,
      ...override,
      description: override.description || offer.description,
      offerLabel: override.offerLabel || offer.offerLabel,
      priceRange: override.priceRange || offer.priceRange,
      priceNote: override.priceNote || offer.priceNote,
      benefits: override.benefits?.length ? override.benefits : offer.benefits
    };
  });
}

export function describeAutomationOffer(service: Service) {
  return [
    service.description,
    service.offerLabel && service.priceRange
      ? `${service.offerLabel}: ${service.priceRange} USD.`
      : undefined,
    service.priceNote,
    service.benefits?.join(". "),
    "Prices are illustrative. Final scope and pricing are confirmed before work begins."
  ].filter(Boolean).join(" ");
}
