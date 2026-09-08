/* ============================================================================
   RUSHBROOKE PARTNERS — SITE CONFIGURATION
   ----------------------------------------------------------------------------
   This is the ONLY file you need to edit for day-to-day changes.
   Everything below can be changed safely from GitHub's web editor on a phone:
   open this file, tap the pencil, change the number, tap "Commit changes".
   The site updates itself a minute or two later.

   Keep the punctuation exactly as it is: every line needs its comma at the end,
   and text must stay inside its "quote marks".
   ========================================================================== */

const CONFIG = {

  /* --------------------------------------------------------------------------
     1. DRAFT BAR — off. The content itself is finished, not the launch.
     --------------------------------------------------------------------------
     draftNotice: shows a slim bar at the top of the page saying the site is a
     draft. Left off on purpose: pricing, VAT and the phone number are all
     settled (2026-09-08), so nothing about the page's content is a draft any
     more — but the site itself isn't public yet. Shane wants it as committee
     and discussion collateral for now, reachable by link only, until he
     decides to publish it. That's handled separately from this bar — see
     the <meta name="robots"> tag and robots.txt at the repo root, both of
     which currently block search engines and well-behaved crawlers. Remove
     both of those (not this bar) when it's cleared to be found publicly.

     Set draftNotice back to true only if the page's own content needs
     flagging as unfinished again — a repricing mid-edit, a rule change.
  ------------------------------------------------------------------------- */
  draftNotice: false,
  draftNoticeText: "",


  /* --------------------------------------------------------------------------
     2. WHO PROSPECTS CONTACT
     --------------------------------------------------------------------------
     phone: set to null instead to hide the phone line entirely — nothing
     looks broken, it just doesn't appear.
  ------------------------------------------------------------------------- */
  contact: {
    name:  "Shane Connolly",
    role:  "Public Relations & Commercial Partnerships",
    email: "shanedenis.connolly@gmail.com",  // ← swap for a club address if you set one up
    phone: "085 868 0350",
    address: "Rushbrooke, Cobh, Co. Cork",
    clubSite: "https://www.rushbrooketennis.com",
  },

  /* Where the enquiry form sends. Enquiries POST here and land straight in the
     inbox tied to this Formspree form — the prospect never leaves the page.
     Leave "" instead and the form falls back to opening the prospect's own
     email app with everything pre-filled (works with no account, but needs
     them to press send themselves). */
  formEndpoint: "https://formspree.io/f/myeynqnp",


  /* --------------------------------------------------------------------------
     3. AVAILABILITY — update after every sale
     --------------------------------------------------------------------------
     "sold" is how many are gone. The site works out the rest.
     Sell a Club Partner slot?  Change sold: 0 to sold: 1. That's the whole job.
  ------------------------------------------------------------------------- */

  /* --------------------------------------------------------------------------
     4. ANNUAL PARTNERSHIPS
     --------------------------------------------------------------------------
     Rates and benefits are taken word-for-word from the Partnership Prospectus
     (draft v0.1, September 2026). Don't add benefits here that aren't in the
     prospectus — the prospectus and this site have to say the same thing.
     No VAT applies (confirmed 2026-09-08) — prices below are the full amount,
     nothing added at invoicing.
  ------------------------------------------------------------------------- */
  annualTiers: [
    {
      id: "premier",
      name: "Premier Club Partner",
      total: 1,
      sold: 0,
      founding: 4000,
      standard: 5000,
      blurb: "The senior position at the club, and only one.",
      benefits: [
        "Centre Court named for your business for the season",
        "Top position on the Friends of Rushbrooke wall",
        "Your banner in the clubhouse hallway",
        "Presenting association with all three Opens — “in association with…”",
        "Presentation of the trophy on Finals Day of the Senior Open",
        "Eight guest places at Finals Day hospitality",
        "Four associate memberships for your staff",
        "Category exclusivity, and first refusal on anything new we bring to market",
        "My direct number, and a review meeting with me at the end of the season",
      ],
    },
    {
      id: "club",
      name: "Club Partner",
      total: 5,
      sold: 0,
      founding: 1500,
      standard: 2000,
      blurb: "One court, named for your business, for the season.",
      benefits: [
        "One court named for your business for the season (Courts 2–6)",
        "Category exclusivity — we only do one of you",
        "Place on the Friends of Rushbrooke wall",
        "Named on the club website partners page",
        "Four dedicated social posts across the season",
        "Recognition in tournament programmes and at prize-givings",
        "Two guest places at Finals Day hospitality",
        "One associate membership",
      ],
    },
    {
      id: "junior",
      name: "Junior Programme Partner",
      total: 1,
      sold: 0,
      founding: 2000,
      standard: 2500,
      blurb: "Our junior programme is the biggest thing we do and the easiest thing to be proud of supporting.",
      benefits: [
        "Your name on the junior coaching programme and summer camps",
        "Presence on junior training tops",
        "Recognition at every junior event and prize-giving",
        "A named bursary — coaching and membership for children whose families would otherwise struggle to cover it",
        "A written annual report setting out participation numbers, bursary places and schools reached, in a form you can use in your own community or CSR reporting",
      ],
    },
    {
      id: "friends",
      name: "Friends of Rushbrooke",
      total: 9,
      sold: 0,
      founding: 450,
      standard: 600,
      blurb: "For local businesses who want to be part of the club without a large commitment.",
      footnote: "€40 a month by direct debit if that suits better than a single payment.",
      benefits: [
        "Your plaque on the Friends of Rushbrooke wall at the main entrance",
        "Listing on the club website partners page",
        "Named in our end-of-season report and at the AGM",
        "Invitation to the Partners’ Evening",
      ],
    },
  ],


  /* --------------------------------------------------------------------------
     5. TOURNAMENT PARTNERSHIPS
     --------------------------------------------------------------------------
     Settled 2026-09-08: Shane confirmed the prospectus draft's figures —
     Tournament Partner €2,000 · Event Partner €500 · Court naming €200 — over
     the different set in the Commercial Programme Architecture note (Sept
     2026, §2: Title €2,500 / Supporting partner €350 / Court naming €200,
     split across three Opens). The designed tournament one-pager referenced in
     that note still needs reprinting to match, if it hasn't been already —
     that's a paper/PDF fix outside this repo, not something this site can do.
  ------------------------------------------------------------------------- */
  tournamentTiers: [
    {
      id: "tournament-partner",
      name: "Tournament Partner",
      total: 1,
      sold: 0,
      price: 2000,
      blurb: "All singles grades included. Named on every draw, the order of play and all club communications for the tournament. Option to present on finals day. First refusal for the following season.",
    },
    {
      id: "event-partner",
      name: "Event Partner",
      total: 6,
      sold: 0,
      price: 500,
      unit: "per grade",
      blurb: "A grade named for your business — “[Company] Grade 3/4 Men’s Singles” — carried on the draw and the order of play, and named at that grade’s final and at prize-giving.",
    },
    {
      id: "court-naming",
      name: "Court naming",
      total: 3,
      sold: 0,
      price: 200,
      unit: "tournament week only",
      blurb: "Available on Courts 7–9 only — courts named under an annual Club Partnership (1–6) are not available for tournament-week naming. Your net board goes up for the week, produced by the club to the standard template from artwork you supply.",
    },
  ],


  /* --------------------------------------------------------------------------
     6. WHERE THE MONEY GOES — the ring-fencing split
     -------------------------------------------------------------------------- */
  moneySplit: [
    { label: "Junior development and bursaries", pct: 40 },
    { label: "Facilities and member experience", pct: 35 },
    { label: "Tournament quality",               pct: 15 },
    { label: "Programme costs",                  pct: 10 },
  ],


  /* --------------------------------------------------------------------------
     7. THE NET BOARD PREVIEW
     --------------------------------------------------------------------------
     boardRect describes where the real board sits in the photograph, measured
     as a percentage of the photo. Only change these if you replace the photo
     (assets/img/court-net-board.jpg) with a different one.

     safeArea is the printable area inside the board, as a fraction of it. The
     production spec is a 900 × 450 mm board with a 700 × 250 mm safe area;
     the values here keep the same proportions against the board as it appears
     in this particular photograph.
  ------------------------------------------------------------------------- */
  netBoard: {
    rect: { left: 8.35, top: 41.36, width: 7.92, height: 12.52, rotate: -1.25 },
    safeArea: { x: 0.09, y: 0.14 },
    maxChars: 30,
    placeholder: "Your business here",
    // Single-colour reversed text, per the net board spec. Nothing else is allowed.
    inks: [
      { id: "cream", label: "Cream", hex: "#F2EAD1" },
      { id: "white", label: "White", hex: "#FFFFFF" },
      { id: "gold",  label: "Gold",  hex: "#FCB533" },
    ],
  },

};
