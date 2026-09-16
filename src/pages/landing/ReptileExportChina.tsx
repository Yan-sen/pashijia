import LandingPage, { type LandingProps } from "./LandingPage";

const p: LandingProps = {
  slug: "reptile-export-china",
  title: "Reptile Export from China — Licensed CITES Exporter | PASHIJIA",
  description:
    "PASHIJIA is a licensed reptile exporter in China: captive-bred snakes, lizards, geckos, turtles and frogs with full CITES export permits, IATA-standard packing and air freight to 20+ countries.",
  h1: "Reptile Export from China, Done Legally and Reliably",
  intro:
    "Henan Pashijia Snake Industry Co., Ltd. (PASHIJIA) is a professional reptile breeder and licensed exporter based in China. We supply captive-bred Chinese and international reptile species to importers, wholesalers, zoos and research institutions in more than 20 countries — with the complete documentation chain handled in-house.",
  sections: [
    {
      h2: "Why source reptiles from China?",
      body: [
        "China is home to some of the most sought-after species in the pet trade: Chinese rat snakes (Elaphe carinata, Ptyas mucosus), Asian vine snakes, Chinese box turtles, horned frogs and many more. Captive-bred lines in China offer consistent quality at wholesale prices that retail markets in the US and EU cannot match.",
        "The challenge has never been the animals — it is legality and logistics. That is exactly the part we handle.",
      ],
    },
    {
      h2: "What a licensed Chinese exporter handles for you",
      body: [
        "CITES export permits: we hold CITES export qualifications and legally export Appendix I, II and III species, including captive-bred individuals of Chinese nationally protected species. Every listed specimen ships with its original permit; copies are provided in advance for your import clearance.",
        "Quarantine and health certification: every shipment includes an official animal health / quarantine certificate issued in China, plus commercial invoice and packing list.",
        "IATA-standard live animal packing: ventilated inner containers, insulated outer cartons, heat or cold packs matched to season and route. Venomous species are packed to the IATA LAR venomous standard with double containment.",
      ],
    },
    {
      h2: "Who we work with",
      body: [
        "Our typical buyers are reptile wholesalers, pet shop chains, breeders, zoos and research institutions. Wholesale pricing starts at low minimum quantities, and mixed-species shipments are welcome — combine snakes, lizards, geckos, turtles and frogs in one consignment to save on freight and permit costs.",
      ],
    },
    {
      h2: "Typical export timeline",
      body: [
        "Inquiry confirmed and proforma invoice issued: 1–2 days. CITES permit processing where applicable: 2–4 weeks. Quarantine and flight booking: 3–7 days. Departure with tracking number shared, collection at your nearest destination airport. We confirm the flight date with you before any animal is packed.",
      ],
    },
  ],
  faqs: [
    {
      q: "Is it legal to import reptiles from China?",
      a: "Yes, when the exporter holds the proper licenses. We handle the Chinese CITES export permit, quarantine certification and customs declaration. You need a valid import permit where your country requires one (e.g. USFWS 3-177 declaration for the US, TRACES for the EU).",
    },
    {
      q: "What is the minimum order quantity?",
      a: "MOQ varies by species — for many common species it starts at 10–100 pcs. Mixed-species orders are welcome and share one shipment.",
    },
    {
      q: "Do you guarantee live arrival?",
      a: "Yes. When the shipment is collected at the airport within the agreed window and our unboxing instructions are followed, we guarantee live arrival with replacement or credit for any DOA reported with unedited video within 2 hours of collection.",
    },
    {
      q: "Which countries have you exported to?",
      a: "More than 20 countries and regions, including the United States, Germany, Japan, Southeast Asia and the Middle East. Ask us about permit feasibility for your specific country.",
    },
  ],
};

export default function ReptileExportChina() {
  return <LandingPage p={p} />;
}
