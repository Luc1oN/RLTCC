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

     Changed 2026-09-10 (two batches merged, then Shane's flag answers folded in):
       - Premier: benefit list rewritten to Shane's exact copy. The old list
         implied tournament title naming; Premier gets ASSOCIATION, not title,
         now spelled out, with a card footnote making the split explicit.
         Finals Day hospitality and associate memberships dropped; a hosted
         corporate day added.
       - Junior: founding €2,000 → €2,500 (standard €2,500 → €3,000). Junior
         training tops, the bursary and the written annual report all dropped
         (the club runs no bursary). First refusal on the Junior Open Title
         added.
       - Club Partner: courts opened from "Courts 2–6" to "any court but
         Centre Court (Court 3)". Finals Day hospitality and associate
         membership dropped.
       - Friends of Rushbrooke: the "€40 a month" note dropped.
       - Partners' Evening: now on every annual tier (Shane: "include a
         partners night on all packages"). Junior keeps its "Two places"
         wording from Sept 9; the other three read "An invitation to" — see
         FLAG 2.
       - Centre Court is Court 3 (Shane). First-refusal deadlines are
         31 December 2026 (Shane).
       - Money split: "Junior development and bursaries" → "Junior
         development" (Shane — no bursary).
       - Category exclusivity stays as a per-tier benefit; it was only
         removed from the intro paragraph, on purpose (Shane).
       - tournamentTiers: first-refusal footnotes on Senior + Junior Open
         Title, "Not category exclusive" on Grade Partner + Tournament court
         board, court board blurb loosened (Club Partner can now take 7–9;
         Shane confirmed the ring-fence goes and inventory stays at 3).

     STILL OPEN:
       1. "sponsor board" vs "the Friends of Rushbrooke wall". Premier and
          Junior's copy says "sponsor board"; Club Partner, Friends and the
          wall touchpoint in index.html say "the Friends of Rushbrooke wall".
          No other asset on the site is a "sponsor board". Left as Shane
          wrote it — unify the wording when he decides which term wins.
       2. Partners' Evening wording isn't uniform — Junior says "Two places
          at", the other three say "An invitation to". Cosmetic; align if
          Shane wants a single form.
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
        "Sponsor board and partners page",  // ← "sponsor board" = the wall; see STILL OPEN 1. Keeps Junior's plaque in the 15-count (main.js WALL_TIER_IDS).
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

     Changed 2026-09-10: Senior and Junior Open Title each carry a footnote
     naming which annual tier holds first refusal (to 31 December 2026;
     mirrors that tier's own benefits line above). Grade Partner and
     Tournament court board both say "Not category exclusive" — unlike every
     annual tier. The court board's blurb was loosened: it used to say
     "Courts 7–9 only" and reserve them from annual Club Partners, but Club
     Partner now spans "any court but Centre Court", so that ring-fence is
     gone (Shane confirmed). Inventory left at 3.
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
