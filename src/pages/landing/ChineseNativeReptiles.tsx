import LandingPage, { type LandingProps } from "./LandingPage";

const p: LandingProps = {
  slug: "chinese-native-reptiles",
  title: "Chinese Native Reptiles for Sale — Captive Bred Wholesale | PASHIJIA",
  description:
    "Captive-bred Chinese native reptiles for wholesale export: rat snakes, beauty snakes, Asian vine snakes, Chinese box turtles and more — legal CITES documentation included.",
  h1: "Chinese Native Reptiles: Captive-Bred, Wholesale, Legal",
  intro:
    "China's native reptile fauna is one of the richest in Asia — and one of the least available through legal channels. PASHIJIA maintains captive-bred lines of the most sought-after Chinese species and exports them worldwide with full documentation. This page is your sourcing guide.",
  sections: [
    {
      h2: "Popular Chinese native species we supply",
      body: [
        "Beauty rat snake (Elaphe taeniura) — a large, hardy colubrid in high demand; multiple regional forms available including Vietnamese blue-phase animals.",
        "King rat snake (Elaphe carinata) — the classic 'king of rat snakes', famous for its size and temperament; our breeding line produces consistent adults year-round.",
        "Indo-Chinese rat snake (Ptyas mucosus) — available in numerous morphs including albino, white-edge, pied and scaleless lines.",
        "Asian vine snakes, mock vipers, bamboo snakes and many more — browse our full species catalog for current stock.",
      ],
    },
    {
      h2: "Why captive-bred matters",
      body: [
        "Every animal we export is captive bred and acclimated before shipping. Captive-bred Chinese natives are hardier, parasite-free, and adapt far better to new environments than wild-caught animals ever will. For your customers, that means fewer losses and better reviews.",
        "Captive breeding is also the legal pathway: Chinese nationally protected species can only be exported as captive-bred individuals with official permits — which is exactly what we provide.",
      ],
    },
    {
      h2: "Wholesale pricing and availability",
      body: [
        "Prices follow the quantity tiers shown in our catalog, with the best rates at 100+ pcs. Mixed-species orders are welcome — combine Chinese natives with our pet snake, gecko, turtle and frog lines in a single shipment to optimize freight.",
        "Stock rotates with breeding seasons. If a species you need is not listed, ask — our breeding network covers 200+ species and we can often source or breed to order.",
      ],
    },
  ],
  faqs: [
    {
      q: "Are Chinese native reptiles legal to import?",
      a: "Yes, when exported with the proper permits. We handle all Chinese-side documentation including CITES export permits for listed species. You will need the corresponding import permit in your country.",
    },
    {
      q: "What sizes/ages are available?",
      a: "Most species are available as babies, subadults and adults depending on the breeding season. Size availability per species is shown in our catalog.",
    },
    {
      q: "Can you breed a specific morph or locality to order?",
      a: "For established lines, yes — tell us your target quantity and timeline and we will quote a production plan.",
    },
    {
      q: "How are the animals packed for export?",
      a: "To IATA Live Animals Regulations standard: ventilated inner containers, insulated cartons, and heat or cold packs matched to the route and season.",
    },
  ],
};

export default function ChineseNativeReptiles() {
  return <LandingPage p={p} />;
}
