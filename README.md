# rushbrooke-partners

The Season 2027 partnership site for Rushbrooke Lawn Tennis & Croquet Club.

One page. Plain HTML, CSS and JavaScript — no build step, no framework, nothing to
install. Every change can be made from GitHub's website, including on a phone.

---

## The one file you'll actually edit

**`assets/js/config.js`**

Prices, availability, benefits, contact details and the draft banner all live in that
one file, with plain-English comments beside each. To change something:

1. Open the repo on github.com and click `assets` → `js` → `config.js`
2. Click the pencil icon (top right)
3. Change the value — keep the quote marks and the comma at the end of the line
4. Scroll down, click **Commit changes**

The site updates itself a minute or two later.

**After a sale**, find the tier in `annualTiers` and change `sold: 0` to `sold: 1`.
The card's "5 of 5 remaining", the row of dots and the enquiry dropdown all follow
automatically.

---

## Before this goes live

Four things, in the order they'll probably clear:

1. **VAT.** Every price on the site is labelled "exclusive of VAT". Until the
   accountant confirms the treatment in writing, leave `draftNotice: true` in
   `config.js` and don't share the link publicly.
2. **Tournament pricing.** The three tournament prices in `config.js` are the ones
   from the prospectus draft. The Commercial Programme Architecture note (§2) says
   the figures that went to Committee are different. There's a long comment above
   that section spelling out both. Pick one and edit the numbers.
3. **Your phone number.** `contact.phone` is `null`, so no phone line shows. Set it
   when you've decided which number to publish.
4. **Remove the noindex tag.** In `index.html`, near the top, delete the line
   `<meta name="robots" content="noindex, nofollow">`. Until that's gone, Google
   will not list the site. Then set `draftNotice: false`.

---

## Putting it on the internet

1. Create a new repo on GitHub called `rushbrooke-partners` and upload these files
   (or push this folder to it).
2. Repo → **Settings** → **Pages** → Source: **Deploy from a branch**, Branch:
   `main`, folder: `/ (root)`. Save.
3. A few minutes later it's live at `https://<your-username>.github.io/rushbrooke-partners/`.

### Custom subdomain

`CNAME` in this repo is already set to `partners.rushbrooketennis.com`.

Wherever `rushbrooketennis.com` is managed, add one DNS record:

| Type  | Name       | Value                    |
|-------|------------|--------------------------|
| CNAME | `partners` | `<your-username>.github.io.` |

Then in Settings → Pages, put `partners.rushbrooketennis.com` in **Custom domain**
and tick **Enforce HTTPS** once the certificate has issued (can take an hour).

Leave the main WordPress site alone — just add a link to
`partners.rushbrooketennis.com` from its menu.

---

## The enquiry form

Out of the box, pressing **Send enquiry** opens the prospect's own email app with the
whole enquiry already written out, addressed to you. That works on GitHub Pages with
no account and nothing to set up.

If you'd rather enquiries arrived in your inbox without the prospect having to press
send twice: create a free form at [formspree.io](https://formspree.io), copy its
address, and paste it into `formEndpoint` in `config.js`. Nothing else changes.

---

## Swapping in real photographs

Four slots on the page are marked "Photograph to come" — the gable wall, the
noticeboards, the hallway and the named-facility plaque. In `index.html` each one is a
short block that looks like this:

```html
<div class="tp__ph" aria-hidden="true"><span>Photograph to come</span></div>
```

Replace the whole line with:

```html
<img class="tp__img" src="assets/img/wall.jpg" width="800" height="600"
     alt="The Friends of Rushbrooke wall on the clubhouse gable">
```

…having first uploaded `wall.jpg` into `assets/img/`. Keep photos under about 300 KB —
anything bigger and the page gets slow on mobile data. There's a comment above each
placeholder saying which photograph belongs there.

**No third-party logos, invented company names, testimonials or partner logos go on
this site.** The nine slots in the footer stay empty and say "Your business here"
until real partners have signed.

---

## What's in here

```
index.html                     the whole page
assets/css/styles.css          all the styling
assets/js/config.js            ← the file you edit
assets/js/main.js              the behaviour; no need to touch it
assets/img/hero-courts.jpg     real photo of the courts and clubhouse
assets/img/court-net-board.jpg the same view, with the net board left blank
assets/img/crest-*.png         the crest, exported from the 2017 Illustrator source
CNAME                          the custom subdomain
.nojekyll                      tells GitHub Pages not to process the files
```

### The net-board preview

The court photograph has had its lettering digitally removed, so the board underneath
is a blank green field. When someone types their business name, the page lays it out
in SVG and draws it onto that board: single colour, reversed out, centred within the
board's safe area, exactly as the production spec describes. Nothing is uploaded or
stored — it's drawn in the browser and gone when the page closes.

If you replace the photograph, the board's position is four numbers in `config.js`
under `netBoard.rect` (measured as percentages across and down the photo).

### Fonts

Headings use whatever heritage serif the reader's device already has — Iowan Old Style
on Apple devices, Georgia elsewhere. That's deliberate: no font downloads means the
page renders instantly on a phone on mobile data. To use a specific typeface instead,
add a `<link>` to it in `index.html` and change `--serif` at the top of `styles.css`.

---

## Possible later, not needed now

A genuinely live availability counter — shared across devices, updated the moment a
deal closes — would take a small Supabase table and about twenty lines of JavaScript,
using the same read-merge-write pattern as the other projects on this account. It's a
fast follow, not a v1 requirement: hand-editing `sold:` after each sale is honest,
instant, and can't break.
