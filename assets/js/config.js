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
     1. BEFORE YOU PUBLISH
     --------------------------------------------------------------------------
     draftNotice: shows a slim bar at the top of the page saying the site is a
     draft. Change true to false when the site is cleared to go live.

     Reminder of what has to clear first (Gates to Final, prospectus p.11):
       - VAT position confirmed in writing by the accountant
       - every third-party logo removed from any imagery  (already done here —
         no third-party logo or name appears anywhere on this site)
       - Committee adopts the Branding Standards
       - tournament rates reconciled (see section 5 below)
     Also remove the <meta name="robots" content="noindex..."> line in
     index.html when you go live, or search engines will keep ignoring the site.
  ------------------------------------------------------------------------- */
  draftNotice: true,
  draftNoticeText: "Draft — not for issue. Pricing subject to confirmation of VAT treatment.",


  /* --------------------------------------------------------------------------
     2. WHO PROSPECTS CONTACT
     --------------------------------------------------------------------------
     phone: leave as null until you decide which number to publish. While it is
     null the phone line simply does not appear — nothing looks broken.
     Set it like this when you're ready:   phone: "+353 87 000 0000",
  ------------------------------------------------------------------------- */
  contact: {
    name:  "Shane Connolly",
    role:  "PRO & Commercial Partnerships",
    email: "shanedenis.connolly@gmail.com",  // ← swap for a club address if you set one up
    phone: null,                              // ← e.g. "+353 87 000 0000"
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
     All prices are EXCLUSIVE of VAT. That is stated on the page automatically.
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
     ⚠ THE PRICES IN THIS SECTION ARE NOT SETTLED. Decide before you publish.

     The figures below are the ones in the Partnership Prospectus draft, which
     took them from the designed tournament one-pager:
         Tournament Partner €2,000 · Event Partner €500 · Court naming €200

     The Commercial Programme Architecture note (Sept 2026, §2) says the version
     that actually went to Committee — Strategy v2 §5.2 — is different:
         Title €2,500 · Supporting partner €350 · Court naming €200
     and splits the title into three: Senior Open €2,500, Junior Open €1,500,
     Easter Open €1,200 (Senior + Easter bundled at €3,200).

     Pick one, then edit the numbers below and the prospectus to match. Nothing
     else on the site needs to change.
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
