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
  url: 'https://starunicocapital.com',
  email: 'contact@starunicocapital.com',
}

/**
 * Where the firm actually is.
 *
 * The address is held in parts rather than as one string. The footer prints
 * the city as the heading, so a flat string repeated it — "New Delhi" appeared
 * twice, and the city broke across lines mid-name. The legal pages need the
 * opposite: one continuous line, in postal order. Parts serve both; a string
 * serves neither well.
 *
 * `street` stays null while an office has a confirmed city but no confirmed
 * street. Everything downstream treats that as unknown and says so, rather
 * than inventing one or quietly dropping the office.
 *
 * One office is flagged `registered` — its address is the entity's address of
 * record, and `legal.registeredAddress` below composes it from these parts
 * rather than repeating it. Two copies of an address drift; one does not.
 */
export const offices = [
  {
    city: 'Dubai',
    region: 'United Arab Emirates',
    role: 'Headquarters',
    registered: true,
    street: null,
    postcode: null,
  },
  {
    city: 'New Delhi',
    region: 'India',
    role: 'Branch',
    registered: false,
    // Non-breaking hyphen in Part‑3: a plain hyphen lets a narrow column wrap
    // the line as "Part-" / "3", which reads as a different address.
    street: '237, Gujranwala Town, Part‑3',
    postcode: '110009',
  },
]

/**
 * An office as one line, in postal order — street, then the city with its
 * postcode, then the country. Used where an address has to read as prose
 * rather than as a block.
 */
export function formatAddress(office) {
  if (!office.street) return null
  const locality = office.postcode ? `${office.city} – ${office.postcode}` : office.city
  return [office.street, locality, office.region].join(', ')
}

const registeredOffice = offices.find((office) => office.registered)

/**
 * Facts the legal pages need. Anything null renders as a visible "to be
 * confirmed" marker rather than a guess — these must come from the company,
 * and the pages carry a review notice until they do.
 */
export const legal = {
  entity: 'Starunico Capital',
  // The registered office as one postal line, country included, because the
  // legal pages name a controller to an international audience. Null while
  // that office has no confirmed street.
  registeredAddress: formatAddress(registeredOffice),
  jurisdiction: null,
  supervisoryAuthority: null,
  lastUpdated: '19 August 2026',
  // Counsel sign-off, tracked separately from whether the facts above exist.
  counselReviewed: true,
}

/**
 * Whether the legal pages still carry unconfirmed details.
 *
 * Derived rather than set by hand. A manual flag and the data it describes drift
 * apart — clearing the flag once left both pages publishing amber "to be
 * confirmed" markers with nothing to explain them. Fill in the three values
 * above and the notice retires itself.
 */
export const legalDetailsPending = [
  legal.registeredAddress,
  legal.jurisdiction,
  legal.supervisoryAuthority,
].some((value) => !value)

/** The notice shows while anything is unconfirmed, or before counsel signs off. */
export const showLegalNotice = legalDetailsPending || !legal.counselReviewed

export const navigation = [
  { name: 'About', to: '/about' },
  { name: 'Thesis', to: '/thesis' },
  { name: 'Capital', to: '/capital' },
  { name: 'Approach', to: '/approach' },
  { name: 'Portfolio', to: '/portfolio' },
]

/**
 * The name reads Startup → Unicorn. This is the same idea stated as stages of
 * company formation, which is honest: it describes where we participate, not an
 * outcome anyone can promise.
 */
export const journey = [
  {
    step: 'Formation',
    label: 'Startup',
    note: 'The science works and the team is right. Little else is settled, and the market has not yet priced it.',
  },
  {
    step: 'Validation',
    label: 'Technical and commercial proof',
    note: 'The technology survives contact with a real industrial problem, and a first customer takes it seriously.',
  },
  {
    step: 'Commercialization',
    label: 'Product and pathway',
    note: 'A manufacturable product, a defensible position, and a route to revenue that does not depend on hope.',
  },
  {
    step: 'Institutionalization',
    label: 'Governance and readiness',
    note: 'Reporting, IP and governance in the shape institutional diligence expects to find them.',
  },
  {
    step: 'Scale',
    label: 'Institutional capital',
    note: 'Successive rounds, industrial partnerships, and the operating discipline to absorb both.',
  },
  {
    step: 'Category leadership',
    label: 'Compounding ownership',
    note: 'The rare outcome the name points at. We hold, rather than look for an exit.',
  },
]

export const stages = ['Seed', 'Pre-Series A', 'Series A', 'Series B', 'Growth']

/** The trajectory device: one line, six marks, breakthrough to scale. */
export const trajectory = [
  'Breakthrough',
  'Validation',
  'Product',
  'Market',
  'Institutional capital',
  'Scale',
]

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

/** For the About page. Origin and ownership mentality, in our own words. */
export const about = {
  name: 'The name reads Startup → Unicorn.',
  origin:
    'Starunico Capital exists because the most consequential technologies are often the hardest to fund. Work that takes years to qualify, that needs a laboratory before it needs a market, and that cannot be assessed from a deck sits awkwardly against capital with a defined life. We built a firm whose structure does not have that problem.',
  ownership:
    'We invest our own capital, so we behave like owners rather than allocators. That means concentration instead of breadth, entry before the market agrees, and a willingness to hold through the years in which enterprise value is actually created. Our judgement is measured by what a company becomes, not by where it is marked in the interim.',
  why: 'Deep technology is where scientific insight turns into industrial capability. It is slow, capital-intensive and unforgiving of superficial analysis — which is precisely why patient, technically literate capital is worth something to the people building it.',
}

/** Founder-facing page. */
export const founders = {
  lede: 'We are comfortable engaging early — often before a company looks fundable to an institutional investor.',
  points: [
    {
      title: 'Early is not too early',
      body: 'If the science works and the team is right, the absence of revenue is not a reason for us to wait.',
    },
    {
      title: 'We read the technology',
      body: 'Bring the engineering. We would rather understand how it works than be walked around it.',
    },
    {
      title: 'Long cycles are expected',
      body: 'Qualification, iteration and industrial sales take the time they take. Our capital is structured for that.',
    },
    {
      title: 'Defensibility matters',
      body: 'Intellectual property, know-how and engineering complexity are what we underwrite.',
    },
    {
      title: 'We stay aligned',
      body: 'We can support successive rounds on the merits of the company, without structural constraint.',
    },
    {
      title: 'We are selective',
      body: 'We make few investments. A pass is not a verdict on your company, only on our fit with it.',
    },
  ],
}

/**
 * Portfolio. Deliberately empty until the firm chooses to disclose holdings —
 * inventing companies on an investment firm's site would be indefensible.
 */
export const portfolio = {
  disclosed: [],
  note: 'We invest privately, and we disclose a holding only with the founders’ agreement. Where a company would rather stay quiet while its technology matures, that is usually the right call, and it is theirs to make.',
}

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
