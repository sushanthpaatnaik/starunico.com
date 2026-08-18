# Starunico Capital — positioning and voice

The decisions the website copy is built on. `src/data/site.js` is the implementation;
this file is the reasoning. Read both before changing wording.

## Positioning

**What it is.** A proprietary investment firm that invests its own capital into a highly
selective portfolio of early-stage deep-tech companies, and partners with them for
long-term value creation.

**What it is not.** Not a venture fund. It does not raise from external investors and
deploy on their behalf. Not a wealth manager, accelerator, incubator or consultancy.

**Public descriptor.** *A proprietary deep-tech investment firm backed by family capital.*

**One-sentence positioning.** *Starunico Capital invests its own capital into a highly
selective portfolio of early-stage deep-tech companies and partners with them for
long-term value creation.*

**Core differentiation.** The capital structure. Investing principal capital removes the
deployment clock, which in turn permits early entry, concentration, long holds and
flexible follow-on. Structure shapes strategy — that is the argument, and it is made
structurally, never as a comparison against other investors.

## Messaging pillars

1. **We invest our own capital.** The single fact everything else follows from.
2. **Deep technology only.** Breakthrough science, proprietary engineering, defensible IP.
3. **Early conviction.** We enter before the broader market has priced the technology.
4. **Long-term ownership.** Judged by enterprise value compounding, not interim markups.
5. **Owner-partner, not passive cheque.** Hands-on where it makes the company investable.

**Founder-facing proposition.** A first investor who can move before the company looks
institutionally fundable, and who has no structural reason to hurry it afterwards.

## Taglines

Ranked, best first:

1. From Startup to Unicorn *(in use — it is the name's meaning)*
2. Our own capital, and therefore our own time horizon *(in use — Proprietary Capital page)*
3. Early conviction in technology that is hard to replicate *(in use — Philosophy page)*
4. Capital that can wait
5. We invest before the market agrees

Also considered: Principal capital for breakthrough technology · Patient by structure ·
Owners, from the first round · Conviction over cadence · The first institutional partner ·
Built for technologies that take time · Deep technology, long horizons · A different kind
of first investor · Technology first, always · Capital without a fund clock · Selective by
design.

*Rejected:* anything implying a unicorn outcome is assured, and anything positioned
against other investors.

## Investment framework

**Technology × Defensibility × Market × Team × Timing.**

Multiplicative on purpose: any one of the five at zero is a pass, however strong the
others. This is the spine of the Philosophy page.

## Journey

**Discover → Validate → Invest → Nurture → Commercialize → Institutionalize → Scale →
Compound.**

Describes the path travelled with a company, never a guaranteed outcome.

## Sectors

Six groups rather than a list of seventeen, so the page reads as a considered remit
instead of a keyword dump. Framed as areas that "can include", leaving room to act on a
technology outside them.

## Language

**Use:** proprietary capital · principal capital · patient capital · long-term capital ·
proprietary investment firm · principal investment firm · deep-tech investment firm ·
owner-investor · long-term investment partner · enterprise value · institutional
readiness · conviction · selective.

**Avoid, and why:**

| Avoid | Because it reads as | Use instead |
| --- | --- | --- |
| Venture capital fund, VC fund, our fund | a conventional fund | proprietary investment firm |
| LP, limited partners, fund management | raising external money | our own capital |
| Assets under management, AUM | a money manager | principal capital |
| Family office | wealth management | backed by family capital *(sparingly)* |
| Portfolio company support services | a consultancy | how we partner |
| Accelerator, programme, cohort, demo day | an incubator | early-stage investment |
| Empowering entrepreneurs, changing the world | generic VC | specific, concrete claims |
| Guaranteed, will become a unicorn | overpromising | seek to, aim to, can |
| Disrupt, unlock, supercharge, 10x, moonshot | startup hype | plain description |

**Tone.** Institutional, intelligent, selective, understated, serious, future-facing.
Short headlines, precise supporting copy, generous whitespace. Never loud.

## Calls to action

Primary: **Present your technology** · **Introduce your company**
Secondary: **Explore our investment philosophy** · **Why proprietary capital matters**

Avoid bare "Learn more".

## Navigation

Philosophy · Proprietary Capital · Sectors · Partnering · Contact

Five items. Proprietary Capital is given its own page because the capital structure is
the differentiation, not a footnote.

## Colour

**White + green + black.** Green is the only hue on the site; everything else is a true
neutral ramp with no blue tint (`neutral-*`, not `slate-*`). Keep it that way — a second
accent colour would undo the discipline the palette is doing.

| Use | Light | Dark |
| --- | --- | --- |
| Page | white | `neutral-950` (#0b0b0b) |
| Body text | `neutral-600` / `neutral-700` | `neutral-400` |
| Headings | `neutral-900` | `neutral-100` |
| Green text, small | `brand-700` (6.7:1) | `brand-400` / `brand-500` (5.0:1) |
| Primary button | `brand-700` bg, white text | `brand-500` bg, `neutral-950` text |

The green flips direction between themes: `brand-700` is legible on white but only 2.3:1
on black, and `brand-500` is the reverse. Every green needs both a light and a dark value.
All visible text measures at or above WCAG AA in both themes; the lowest is 6.4:1.

## Open items

- **Logo.** `public/logo.svg` is a placeholder mark in the brand green, awaiting the real
  artwork. Replacing that one file updates the header, footer and favicon.
- **Policy pages.** Privacy and Terms are `#` links in the footer.
- **Worker name.** `starunico-com` in `wrangler.jsonc` is a Cloudflare resource id, not
  the public domain. It must keep matching the Worker in the dashboard; renaming it in
  config alone would deploy to a different Worker with no custom domain attached.
- **Portfolio and team.** Deliberately absent — no invented companies, names or figures.
