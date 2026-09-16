import LandingPage, { type LandingProps } from "./LandingPage";

const p: LandingProps = {
  slug: "cites-reptile-export",
  title: "CITES Reptile Export Explained — Permits, Timeline & Costs | PASHIJIA",
  description:
    "How CITES reptile export from China works: which species need permits, how long it takes, what documents you receive, and what buyers must prepare. A practical guide from a licensed exporter.",
  h1: "CITES Reptile Export: A Practical Guide for Importers",
  intro:
    "CITES (the Convention on International Trade in Endangered Species) regulates cross-border trade in listed reptile species. For buyers, the paperwork often feels like the hardest part of importing — this guide explains exactly what is required, what your exporter should handle, and what you must prepare on your side.",
  sections: [
    {
      h2: "Which reptiles need CITES permits?",
      body: [
        "CITES lists species in three appendices. Appendix I species (the most protected) require both import and export permits and are only traded under strict conditions. Appendix II species — the majority of commercially traded reptiles — require an export permit from the country of origin. Appendix III species require export documentation confirming legal origin.",
        "Many popular species are Appendix II: most pythons and boas, many monitor lizards, all tortoises, and numerous turtles. Non-listed species can be exported without CITES permits but still require health certification and customs declaration.",
      ],
    },
    {
      h2: "What your exporter should provide",
      body: [
        "A legitimate exporter handles the entire origin-side documentation chain: captive-breeding and utilization licenses, the CITES export permit itself, the animal health / quarantine certificate, customs declaration, and the air waybill with live-animal handling labels.",
        "At PASHIJIA, every CITES-listed specimen ships with its original permit, and you receive scanned copies in advance so your import clearance can be prepared before the flight departs. If a supplier cannot show you a permit before shipping, do not proceed.",
      ],
    },
    {
      h2: "What you need as the buyer",
      body: [
        "For Appendix II/III species: an import permit where your country requires one (US buyers file the USFWS 3-177 declaration; EU buyers use TRACES). You will also need a designated receiving airport and, ideally, an import broker familiar with live animals.",
        "For venomous species, expect a buyer qualification review: destination legality, receiving airport, and proof of local keeping permits or institutional licenses. This protects both parties and the animals.",
      ],
    },
    {
      h2: "Timeline and cost",
      body: [
        "CITES export permit processing in China typically adds 2–4 weeks to the delivery timeline. Permit costs are included in our quotations — there are no surprise paperwork fees. Non-listed species ship on the standard 1–2 week schedule.",
        "Plan your seasonal ordering around this window: orders for the spring season are best placed in early winter.",
      ],
    },
  ],
  faqs: [
    {
      q: "Can I import CITES Appendix I species?",
      a: "Yes, in limited circumstances — primarily for zoos, research institutions and licensed breeding programs. Both import and export permits are required. Contact us with your institutional details to assess feasibility.",
    },
    {
      q: "How do I verify an exporter's permits are real?",
      a: "Ask for a scanned copy of the CITES export permit before shipping and verify it with your national CITES Management Authority. We provide permit copies proactively for every listed shipment.",
    },
    {
      q: "What happens if my shipment is held at customs?",
      a: "With complete documentation this is rare. If it happens, your broker contacts the local CITES authority with the permit copies we provided. We support you through the process until release.",
    },
    {
      q: "Do captive-bred animals have different CITES rules?",
      a: "Yes — captive-bred Appendix I specimens are treated as Appendix II for commercial trade, which makes legal trade possible. All our animals are captive bred, and the permit reflects the captive-bred source code.",
    },
  ],
};

export default function CitesReptileExport() {
  return <LandingPage p={p} />;
}
