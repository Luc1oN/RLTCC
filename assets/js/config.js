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
     1. DRAFT BAR
     --------------------------------------------------------------------------
     draftNotice: shows a slim bar at the top of the page saying the content
     is a draft. Leave it false while the page content is final; set it to
     true (and write a reason into draftNoticeText) if the content needs
     flagging as unfinished again — a repricing mid-edit, a rule change.

     Search visibility is a separate control: see the <meta name="robots">
     tag in index.html and robots.txt at the repo root.
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
    email: "rltccpartnerships@gmail.com",  // club address — shown on the contact card and in the footer
    phone: "085 868 0350",
    address: "Rushbrooke, Cobh, Co. Cork",
    clubSite: "https://www.rushbrooketennis.com",
  },

  /* Where the enquiry form sends. Enquiries POST here and land straight in the
     inbox tied to this Formspree form — the prospect never leaves the page.
     Leave "" instead and the form falls back to opening the prospect's own
     email app with everything pre-filled (works with no account, but needs
     them to press send themselves). */
  formEndpoint: "https://formspree.io/f/mbgjwagd",


  /* --------------------------------------------------------------------------
     3. AVAILABILITY — update after every sale
     --------------------------------------------------------------------------
     "sold" is how many are gone. The site works out the rest.
     Sell a Club Partner slot?  Change sold: 0 to sold: 1. That's the whole job.
  ------------------------------------------------------------------------- */

  /* --------------------------------------------------------------------------
     4. ANNUAL PARTNERSHIPS
     --------------------------------------------------------------------------
     One entry per annual tier. `founding` is the 2027 founding rate and
     `standard` the rate after it; `total` is the number of places and `sold`
     is how many are gone. `footnote` (optional) is one line of text, or a
     list of lines, shown under the benefits list.
     No VAT applies — prices below are the full amount, nothing added at
     invoicing.
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
        "Centre Court (Court 3) named for your business for the season",
        "Primary position on the sponsor board, the partners page and club communications",
        "Named in association with all three Open tournaments — your logo on every draw sheet and order of play, named in tournament announcements and results posts, sponsor board present throughout, and an invitation to the Finals Day presentation",
        "First refusal on the Senior Open Title at €2,500, exercisable to 31 December 2026",
        "A hosted corporate day at the club — the courts and clubhouse for your team",
        "An invitation to the Partners’ Evening",
        "Category exclusivity in your trading category",
        "A named contact and an annual partnership review",
      ],
      footnote: "The tournament title is a separate partnership. Where a title partner is in place, the event carries their name and Premier Partners appear in association with it.",
    },
    {
      id: "club",
      name: "Club Partner",
      total: 5,
      sold: 0,
      founding: 2000,
      standard: 2500,
      blurb: "One court, named for your business, for the season.",
      benefits: [
        "One court named for your business for the season — any court but Centre Court (Court 3)",
        "Category exclusivity — we only do one of you",
        "Place on the Friends of Rushbrooke wall",
        "Named on the club website partners page",
        "Four dedicated social posts across the season",
        "Recognition in tournament programmes and at prize-givings",
        "An invitation to the Partners’ Evening",
      ],
    },
    {
      id: "junior",
      name: "Junior Programme Partner",
      total: 1,
      sold: 0,
      founding: 2500,
      standard: 3000,
      blurb: "Our junior programme is the biggest thing we do and the easiest thing to be proud of supporting.",
      benefits: [
        "Naming of the junior coaching programme and the summer camps",
        "Recognition at all junior events and prize-givings",
        "Two places at the Partners’ Evening",
        "Sponsor board and partners page",
        "First refusal on the Junior Open Title at €1,500, to 31 December 2026",
      ],
      footnote: [
        "Alcohol branding has no place anywhere in our junior programme.",
        "Taking the Junior Open Title as well? Both together for €3,500.",
      ],
    },
    {
      id: "friends",
      name: "Friends of Rushbrooke",
      total: 8,
      sold: 0,
      founding: 500,
      standard: 600,
      blurb: "For local businesses who want to be part of the club without a large commitment.",
      benefits: [
        "Your plaque on the Friends of Rushbrooke wall at the main entrance",
        "Listing on the club website partners page",
        "Named in our end-of-season report and at the AGM",
        "An invitation to the Partners’ Evening",
      ],
    },
  ],


  /* --------------------------------------------------------------------------
     5. TOURNAMENT PARTNERSHIPS
     --------------------------------------------------------------------------
     One entry per tournament opportunity. `price` is the full amount;
     `unit` and `footnote` (both optional) are short lines of text shown on
     the card.
  ------------------------------------------------------------------------- */
  tournamentTiers: [
    {
      id: "senior-open-title",
      name: "Senior Open Title",
      total: 1,
      sold: 0,
      price: 2500,
      footnote: "Our Premier Club Partner holds first refusal on this until 31 December 2026.",
      blurb: "All singles grades at the Senior Open named for your business — carried on every draw, the order of play and all club communications for the tournament. Presentation on Finals Day. First refusal for 2028.",
    },
    {
      id: "junior-open-title",
      name: "Junior Open Title",
      total: 1,
      sold: 0,
      price: 1500,
      footnote: "Our Junior Programme Partner holds first refusal on this until 31 December 2026.",
      blurb: "All singles grades at the Junior Open — a national T1250 event — named for your business, carried on every draw and the order of play. We are proud to run an inclusive tournament that welcomes juniors; alcohol branding has no place here.",
    },
    {
      id: "easter-open-title",
      name: "Easter Open Title",
      total: 1,
      sold: 0,
      price: 1200,
      footnote: "Already hold the Senior Open Title? Add this one for €700 more, not the full price.",
      blurb: "All singles grades at the Easter Open named for your business, carried on the draw and the order of play.",
    },
    {
      id: "grade-partner",
      name: "Grade Partner",
      total: 6,
      sold: 0,
      price: 400,
      unit: "per grade",
      footnote: "Not category exclusive.",
      blurb: "A grade named for your business — “[Company] Grade 3/4 Men’s Singles” — carried on the draw and the order of play, and named at that grade’s final and at prize-giving.",
    },
    {
      id: "tournament-court-board",
      name: "Tournament court board",
      total: 3,
      sold: 0,
      price: 400,
      unit: "tournament week only",
      footnote: "Not category exclusive.",
      blurb: "Any court not held under an annual partnership, for the tournament week only. Your net board goes up for the week, produced by the club to the standard template from artwork you supply.",
    },
  ],


  /* --------------------------------------------------------------------------
     6. WHERE THE MONEY GOES — the ring-fencing split
     -------------------------------------------------------------------------- */
  moneySplit: [
    { label: "Junior development",               pct: 40 },
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
