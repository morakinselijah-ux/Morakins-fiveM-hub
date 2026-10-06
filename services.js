// Editable content: services and buyer reviews. Not generated, safe to edit by hand.
const SERVICES = [
  {
    id: "optimization",
    title: "Server Optimization & Fixes",
    tagline: "Help with problems on your FiveM server and with how it runs.",
    description: "Is something broken or running poorly on your FiveM server? Tell us what is happening in a ticket and we will look into it and tell you what we can do.",
    accent: "82,220,150",
    covers: [
      { t: "Server issues", d: "Problems you notice on your server, such as errors, bugs or things not working." },
      { t: "Performance", d: "Help with how well your server and its resources run." },
      { t: "Resource setup", d: "Help getting resources installed and working together." }
    ],
    steps: [
      { t: "Open a ticket", d: "Join our Discord and create a ticket in the Ticket channel." },
      { t: "Describe the problem", d: "Tell us what is happening on your server and what you want fixed." },
      { t: "We reply", d: "We tell you what we can do. Details and price are agreed in your ticket." }
    ],
    related: []
  },
  {
    id: "lspdr",
    title: "LSPDR FiveM PD",
    tagline: "A police department service for FiveM roleplay servers.",
    description: "LSPDR FiveM PD is our police department service for FiveM servers. Ask in a ticket what is included and how it fits your server.",
    accent: "80,140,255",
    covers: [
      { t: "Police department", d: "A police department setup for your roleplay server." },
      { t: "Vehicles and liveries", d: "Police-style vehicles and liveries, like the examples below." },
      { t: "Built for roleplay", d: "Made around police roleplay on FiveM servers." }
    ],
    steps: [
      { t: "Open a ticket", d: "Join our Discord and create a ticket in the Ticket channel." },
      { t: "Tell us your needs", d: "Explain what your server needs for its police department." },
      { t: "We reply", d: "We tell you what we can provide. Details and price are agreed in your ticket." }
    ],
    related: ["liv-sheriff-van", "liv-traffic-suv"]
  }
];

// Add REAL buyer reviews here. Never add invented ones.
// Example: { name: "Buyer name", rating: 5, text: "What they said.", service: "Vehicles" }
const REVIEWS = [];

// Generic illustrations (original artwork, not project screenshots)
const ART = {
  optimization: () => `<svg class="artsvg" viewBox="0 0 480 300" role="img" aria-label="Illustration of a server performance dashboard">
<rect x="8" y="8" width="464" height="284" rx="22" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.1)"/>
<g transform="translate(150 188)"><path d="M-110 0A110 110 0 0 1 110 0" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="14" stroke-linecap="round"/>
<path d="M-110 0A110 110 0 0 1 62 -91" fill="none" stroke="var(--gold)" stroke-width="14" stroke-linecap="round"/>
<g class="needle"><path d="M-6 0L0 -90L6 0Z" fill="#fff"/><circle r="12" fill="var(--gold)"/><circle r="4" fill="#0a0b0d"/></g></g>
<rect x="46" y="226" width="150" height="8" rx="4" fill="rgba(var(--ac),.5)"/><rect x="46" y="244" width="104" height="8" rx="4" fill="rgba(255,255,255,.14)"/><rect x="46" y="262" width="128" height="8" rx="4" fill="rgba(255,255,255,.14)"/>
<g fill="var(--gold)"><rect class="bar" style="--i:0" x="278" y="190" width="22" height="60" rx="5"/><rect class="bar" style="--i:1" x="310" y="160" width="22" height="90" rx="5"/><rect class="bar" style="--i:2" x="342" y="175" width="22" height="75" rx="5"/><rect class="bar" style="--i:3" x="374" y="130" width="22" height="120" rx="5"/><rect class="bar" style="--i:4" x="406" y="100" width="22" height="150" rx="5"/></g>
<g class="gear"><circle cx="372" cy="62" r="26" fill="none" stroke="var(--gold)" stroke-width="10" stroke-dasharray="9 7"/><circle cx="372" cy="62" r="16" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="4"/></g>
</svg>`,
  lspdr: () => `<svg class="artsvg" viewBox="0 0 480 300" role="img" aria-label="Illustration of a police badge with flashing lights">
<rect x="8" y="8" width="464" height="284" rx="22" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.1)"/>
<path class="beam b1" d="M240 56L36 20V210Z" fill="rgba(239,68,68,.22)"/><path class="beam b2" d="M240 56L444 20V210Z" fill="rgba(59,130,246,.25)"/>
<g transform="translate(240 172)"><path d="M0 -88L68 -62V10C68 52 36 80 0 96C-36 80 -68 52 -68 10V-62Z" fill="#0f1319" stroke="var(--gold)" stroke-width="5"/>
<path d="M0 -70L52 -50V8C52 40 28 62 0 75C-28 62 -52 40 -52 8V-50Z" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="2"/>
<polygon points="0,-41 10,-14 38,-14 16,3 24,30 0,14 -24,30 -16,3 -38,-14 -10,-14" fill="var(--gold)"/>
<rect class="lamp l1" x="-62" y="-128" width="58" height="18" rx="9" fill="#ef4444"/><rect class="lamp l2" x="4" y="-128" width="58" height="18" rx="9" fill="#3b82f6"/></g>
<line class="road" x1="30" y1="272" x2="450" y2="272" stroke="rgba(255,255,255,.35)" stroke-width="4" stroke-dasharray="26 18"/>
</svg>`
};
