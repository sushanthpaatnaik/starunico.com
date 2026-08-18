/**
 * All site copy lives here.
 *
 * Tone rules from the brand brief, which edits must preserve:
 * - We invest our OWN capital. Never "fund", "LP", "AUM", "fund management".
 * - Say "proprietary capital" / "principal capital" / "patient capital".
 * - "Family capital" appears once as a descriptor; do not lean on it, and never
 *   say "family office" — it reads as wealth management.
 * - Institutional, understated, selective. No hype, no "changing the world",
 *   and never imply that a unicorn outcome is guaranteed.
 * - Never position against VC firms. Show the structure, not a comparison.
 */

export const site = {
  name: 'Starunico Capital',
  shortName: 'Starunico',
  descriptor: 'A proprietary deep-tech investment firm backed by family capital.',
  // The one thing a visitor should understand in the first few seconds.
  positioning:
    'Starunico Capital invests its own capital into a highly selective portfolio of early-stage deep-tech companies and partners with them for long-term value creation.',
  description:
    'A proprietary investment firm backing exceptional early-stage deep-tech companies with its own capital, and partnering with founders for the long term.',
  // TODO: confirm before launch — the brand brief lists starunicocapital.com.
  email: 'contact@starunicocapital.com',
}

export const navigation = [
  { name: 'Philosophy', to: '/philosophy' },
  { name: 'Proprietary Capital', to: '/capital' },
  { name: 'Sectors', to: '/sectors' },
  { name: 'Partnering', to: '/partnering' },
  { name: 'Contact', to: '/contact' },
]

/** Startup → Unicorn, as an investment framework rather than a promise. */
export const journey = [
  { step: 'Discover', note: 'Technology the broader market has not yet priced.' },
  { step: 'Validate', note: 'Science, defensibility and the team behind them.' },
  { step: 'Invest', note: 'Our own capital, with conviction and concentration.' },
  { step: 'Nurture', note: 'Commercial strategy, IP position, governance.' },
  { step: 'Commercialize', note: 'Technology-market fit and first industrial customers.' },
  { step: 'Institutionalize', note: 'Readiness for institutional diligence and capital.' },
  { step: 'Scale', note: 'Successive rounds, partnerships and global reach.' },
  { step: 'Compound', note: 'Ownership held for the long term.' },
]

export const stages = ['Seed', 'Pre-Series A', 'Series A', 'Series B', 'Growth']

/** Technology × Defensibility × Market × Team × Timing. Any one at zero is a pass. */
export const criteria = [
  {
    title: 'Technology',
    description:
      'Breakthrough science or proprietary engineering. Fundamental differentiation, not an incremental business model.',
    icon: 'atom',
  },
  {
    title: 'Defensibility',
    description:
      'Intellectual property, proprietary know-how, engineering complexity or data advantages that are difficult to replicate.',
    icon: 'shield',
  },
  {
    title: 'Market',
    description:
      'Large industrial or global markets where the technology can address a problem of genuine consequence.',
    icon: 'globe',
  },
  {
    title: 'Team',
    description:
      'Technically capable, commercially ambitious founders with the resilience to build a category-defining company.',
    icon: 'people',
  },
  {
    title: 'Timing',
    description:
      'A point in the technology’s maturity where early conviction is possible and capital is genuinely useful.',
    icon: 'clock',
  },
]

/** Stated plainly, because selectivity is the point. */
export const avoid = [
  'Conventional direct-to-consumer brands',
  'Ordinary e-commerce businesses',
  'Copycat or derivative business models',
  'Companies whose main differentiation is marketing',
  'Growth without underlying technical depth',
]

/** What investing our own capital makes possible. Framed structurally, never comparatively. */
export const capitalAdvantages = [
  {
    title: 'No deployment clock',
    description:
      'We invest when a technology and a team are ready, not when a cycle requires capital to be placed.',
  },
  {
    title: 'Longer horizons',
    description:
      'Deep tech matures on its own timeline. Our capital is patient enough to hold through it.',
  },
  {
    title: 'Concentration by choice',
    description:
      'A small number of high-conviction positions, rather than breadth for its own sake.',
  },
  {
    title: 'Alignment with founders',
    description:
      'We are owners alongside them, judged by enterprise value rather than interim markups.',
  },
  {
    title: 'Flexible follow-on',
    description:
      'We can support successive rounds on the merits of the company, without structural constraint.',
  },
  {
    title: 'Early by design',
    description:
      'We can take a position before the broader market has recognised what the technology is.',
  },
]

/** Where we work alongside founders. Investor and owner-partner, not a consultancy. */
export const partnering = [
  'Commercial strategy and business-model refinement',
  'Technology-market fit',
  'Intellectual-property strategy',
  'Strategic partnerships and corporate introductions',
  'Institutional positioning and investor materials',
  'Governance and institutional readiness',
  'Fundraising strategy and diligence preparation',
  'Growth planning across successive rounds',
]

/** Six groups rather than a long undifferentiated list. */
export const sectors = [
  {
    name: 'Advanced Materials & Manufacturing',
    description:
      'New materials, advanced production processes, industrial technology and resource efficiency.',
    areas: ['Advanced materials', 'Advanced manufacturing', 'Industrial technology', 'Circular economy'],
  },
  {
    name: 'Energy & Climate',
    description:
      'Generation, storage and the industrial technologies that make decarbonisation practical.',
    areas: ['Clean energy', 'Energy storage', 'Climate technology'],
  },
  {
    name: 'Semiconductors & Computing',
    description:
      'The physical and computational substrate underneath modern industry and artificial intelligence.',
    areas: ['Semiconductors', 'Electronics', 'AI infrastructure', 'Frontier and quantum computing'],
  },
  {
    name: 'Robotics & Automation',
    description: 'Machines and autonomy applied to industrial work and the movement of people and goods.',
    areas: ['Robotics', 'Industrial automation', 'Mobility'],
  },
  {
    name: 'Aerospace & Strategic Technologies',
    description: 'Flight, orbit and the technologies nations treat as strategically significant.',
    areas: ['Aerospace', 'Space technology', 'Strategic technologies'],
  },
  {
    name: 'Life Sciences & Biotechnology',
    description: 'Biological engineering and platform science with industrial or clinical application.',
    areas: ['Biotechnology', 'Life sciences'],
  },
]
