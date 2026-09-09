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
     (draft v0.1, September 2026), REVISED 2026-09-09 against a rate-card
     analysis built from real 2026 sales — see below for what changed and why.
     No VAT applies (confirmed 2026-09-08) — prices below are the full amount,
     nothing added at invoicing.

     Changed 2026-09-09:
       - Club Partner founding rate: €1,500 → €2,000. A 2026 members'-event
         sponsor already paid €2,000 for tournament title, top grades and
         centre court, and has signalled Club Partner for 2027 with first
         refusal. Pricing this tier below what he already paid would make his
         second year a downgrade and imply the 2026 price was padded.
       - Friends of Rushbrooke: 9 places → 8, founding rate €450 → €500.
       - Junior Programme Partner now carries a wall benefit it didn't have
         before (flagged below) — the arithmetic only works with it included.

     FLAGGED, not just applied — check this one: adding "place on the wall"
     to Junior Programme Partner is a real benefit change, not a copy fix,
     and it isn't in the original prospectus. It's here because 1 (Premier) +
     5 (Club) + 1 (Junior) + 8 (Friends) = 15, which is the wall's actual
     physical capacity (see assets/img/wall.jpg — a real 5×3 grid) — and
     because the site already claimed "every annual partner... gets one" on
     the wall before this revision, which was only ever true by coincidence
     (1 + 5 + 9 also happens to equal 15, without Junior). Dropping Friends
     to 8 breaks that coincidence, so either Junior genuinely gets a plaque
     now, or the copy claiming "every annual partner gets one" needs to
     change, or Friends should stay at 9. Confirm which before this goes
     back out — reverting is a one-line change either way.
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
      founding: 2000,
      standard: 2500,
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
        "Place on the Friends of Rushbrooke wall",  // ← added 2026-09-09, see the flag above
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
     REVISED 2026-09-09, replacing the flat "Tournament Partner covers every
     event" structure with a separate title per Open. The 2027 Opens (Senior
     ~450 players, Junior a national T1250 event, Easter ~350) are a
     materially bigger asset than the 2026 members' events that priced
     against, and a single blanket "Tournament Partner" tier undersold that
     difference. This is now the third distinct tournament rate card this
     project has held — prospectus draft, then the Commercial Programme
     Architecture note, now this one — so if a designed tournament one-pager
     exists outside this repo, it needs reprinting to match. That's a
     paper/PDF fix, not something this site can do.

     Selling guardrail (not enforced by the site — there's no cart to stack
     grades in — but worth knowing when quoting by phone or email): keep
     what any one tournament sponsor spends below that event's title price.
     No stack of Grade Partner slots should add up to more than the title.
  ------------------------------------------------------------------------- */
  tournamentTiers: [
    {
      id: "senior-open-title",
      name: "Senior Open Title",
      total: 1,
      sold: 0,
      price: 2500,
      blurb: "All singles grades at the Senior Open named for your business — carried on every draw, the order of play and all club communications for the tournament. Presentation on Finals Day. First refusal for 2028.",
    },
    {
      id: "junior-open-title",
      name: "Junior Open Title",
      total: 1,
      sold: 0,
      price: 1500,
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
      blurb: "A grade named for your business — “[Company] Grade 3/4 Men’s Singles” — carried on the draw and the order of play, and named at that grade’s final and at prize-giving.",
    },
    {
      id: "tournament-court-board",
      name: "Tournament court board",
      total: 3,
      sold: 0,
      price: 400,
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
