import LandingPage, { type LandingProps } from "./LandingPage";

const p: LandingProps = {
  slug: "wholesale-reptiles",
  title: "Wholesale Reptiles for Sale — Bulk Pricing, Worldwide Export | PASHIJIA",
  description:
    "Wholesale reptiles direct from a licensed Chinese breeder-exporter: snakes, lizards, geckos, turtles and frogs at bulk prices with CITES permits and air freight to 20+ countries. Request a quote today.",
  h1: "Wholesale Reptiles, Direct from the Breeder",
  intro:
    "PASHIJIA supplies reptile wholesalers, pet shop chains and distributors with captive-bred reptiles at true source prices. No middlemen: you buy directly from the breeding facility, and we handle export permits, packing and air freight to your nearest airport.",
  sections: [
    {
      h2: "Wholesale categories",
      body: [
        "Pet snakes — corn snakes, king snakes, hognose and more, in all mainstream morphs, from entry-tier to premium scaleless lines.",
        "Chinese native snakes — beauty rat snakes, king rat snakes, Indo-Chinese rat snakes and many others, captive bred in-house.",
        "Lizards and geckos — bearded dragons, leopard geckos, fat-tailed geckos and additional species across multiple morphs.",
        "Turtles and frogs — red-eared sliders, box turtles, horned frogs, tree frogs and more. Mixed-species shipments welcome.",
      ],
    },
    {
      h2: "How wholesale pricing works",
      body: [
        "Our catalog shows tiered pricing: the listed price applies at 10–100 pcs, with better rates at 100+ pcs. Mixed-species orders share one shipment and one set of export documents, which keeps your per-animal landed cost low.",
        "Prices are quoted in USD FCA China airport. Send us your species list and quantities for a formal quotation with freight included — we reply within one business day.",
      ],
    },
    {
      h2: "Logistics, permits and guarantees",
      body: [
        "We handle CITES export permits, quarantine certificates, customs declaration and flight booking. Shipments are packed to IATA Live Animals Regulations standards and sent by air freight to the destination airport nearest to you.",
        "Every wholesale order is covered by our Live Arrival Guarantee: collect within the agreed window, follow the unboxing instructions, and any DOA is replaced or credited.",
      ],
    },
    {
      h2: "Start with a trial order",
      body: [
        "New wholesale accounts typically start with a small mixed trial shipment to verify quality and logistics, then scale to monthly restocking orders. Tell us your market and target species — we will suggest a starter mix that sells.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is the minimum wholesale order?",
      a: "For most species the wholesale tier starts at 10–100 pcs. Mixed-species orders count toward the total — you do not need 100 pcs of a single species.",
    },
    {
      q: "How do I get a quotation?",
      a: "Send your species list with quantities via our inquiry form or WhatsApp. We reply within one business day with pricing, freight and a permit-feasibility assessment for your country.",
    },
    {
      q: "Which countries do you ship to?",
      a: "We have exported to more than 20 countries including the US, Germany, Japan and across Southeast Asia. Air freight goes to your nearest suitable airport.",
    },
    {
      q: "Can I visit your facility?",
      a: "Serious wholesale buyers are welcome to arrange a visit or a live video call tour of the breeding facility. Contact us to schedule.",
    },
  ],
};

export default function WholesaleReptiles() {
  return <LandingPage p={p} />;
}
