export const site = {
  name: 'Starunico',
  tagline: 'Ship your next idea in days, not months.',
  description:
    'A production-ready starter for marketing sites — accessible components, dark mode, and a design system you can make your own.',
  email: 'hello@starunico.com',
  social: [
    { name: 'GitHub', href: 'https://github.com' },
    { name: 'X', href: 'https://x.com' },
    { name: 'LinkedIn', href: 'https://linkedin.com' },
  ],
}

export const navigation = [
  { name: 'Home', to: '/' },
  { name: 'Features', to: '/features' },
  { name: 'Pricing', to: '/pricing' },
  { name: 'About', to: '/about' },
  { name: 'Contact', to: '/contact' },
]

export const features = [
  {
    title: 'Lightning fast',
    description:
      'Vite gives you instant dev-server startup and near-instant hot module replacement, however large the project grows.',
    icon: 'bolt',
  },
  {
    title: 'Utility-first styling',
    description:
      'Tailwind CSS v4 with a theme layer you control — change a handful of tokens and the whole site follows.',
    icon: 'palette',
  },
  {
    title: 'Dark mode built in',
    description:
      'Respects the system preference, remembers an explicit choice, and never flashes the wrong theme on load.',
    icon: 'moon',
  },
  {
    title: 'Accessible by default',
    description:
      'Semantic landmarks, visible focus rings, labelled controls, and reduced-motion support come out of the box.',
    icon: 'accessibility',
  },
  {
    title: 'Responsive layouts',
    description:
      'Every section is designed mobile-first and tested from 320px phones up to ultrawide displays.',
    icon: 'devices',
  },
  {
    title: 'Ready to deploy',
    description:
      'A single build command produces a static bundle you can host on Vercel, Netlify, GitHub Pages, or S3.',
    icon: 'rocket',
  },
]

export const stats = [
  { value: '< 1s', label: 'Cold dev-server start' },
  { value: '100', label: 'Lighthouse accessibility' },
  { value: '6', label: 'Prebuilt page templates' },
  { value: 'MIT', label: 'Open-source licence' },
]

export const testimonials = [
  {
    quote:
      'We replaced a three-week design sprint with an afternoon of edits. The component structure was obvious enough that our whole team could contribute.',
    name: 'Amara Osei',
    role: 'Head of Product, Northwind',
  },
  {
    quote:
      'The theme tokens are the best part. One file changed, and the entire site matched our brand — no hunting through class names.',
    name: 'Diego Ferreira',
    role: 'Design Lead, Cobalt Labs',
  },
  {
    quote:
      'It is the rare template that is still pleasant to work in six months later. Nothing clever, nothing in the way.',
    name: 'Priya Raman',
    role: 'Founding Engineer, Tessera',
  },
]

export const pricing = [
  {
    name: 'Starter',
    price: 0,
    cadence: 'forever',
    description: 'Everything you need to launch a personal project.',
    features: [
      '1 project',
      'Community support',
      'Core component library',
      'MIT licence',
    ],
    cta: 'Start for free',
    featured: false,
  },
  {
    name: 'Studio',
    price: 24,
    cadence: 'per month',
    description: 'For teams shipping client work on a schedule.',
    features: [
      'Unlimited projects',
      'Priority email support',
      'Premium section library',
      'Figma design kit',
      'Commercial licence',
    ],
    cta: 'Start free trial',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 89,
    cadence: 'per month',
    description: 'Governance and support for larger organisations.',
    features: [
      'Everything in Studio',
      'SSO and audit logs',
      'Dedicated success manager',
      'Custom component work',
      '99.9% uptime SLA',
    ],
    cta: 'Talk to sales',
    featured: false,
  },
]

export const faqs = [
  {
    question: 'Do I need to know Tailwind to use this template?',
    answer:
      'Not deeply. The theme tokens in src/index.css cover colour, typography and motion, so most rebranding is a few edits there. Utility classes only come into play when you change layout.',
  },
  {
    question: 'Can I use it for client or commercial work?',
    answer:
      'Yes. The template ships under the MIT licence, so you can use, modify and sell work built on it without attribution.',
  },
  {
    question: 'How do I add a new page?',
    answer:
      'Create a component in src/pages, add a <Route> for it in src/App.jsx, and add an entry to the navigation array in src/data/site.js. That is the whole process.',
  },
  {
    question: 'Is TypeScript supported?',
    answer:
      'The template is plain JSX so it stays approachable, but Vite compiles .tsx out of the box — rename a file, add a tsconfig, and it works.',
  },
  {
    question: 'Where do I deploy it?',
    answer:
      'npm run build writes a static bundle to dist/. Any static host will serve it; just make sure client-side routes fall back to index.html.',
  },
]

export const team = [
  { name: 'Amara Osei', role: 'Co-founder & CEO', initials: 'AO' },
  { name: 'Diego Ferreira', role: 'Head of Design', initials: 'DF' },
  { name: 'Priya Raman', role: 'Engineering Lead', initials: 'PR' },
  { name: 'Noah Lindqvist', role: 'Developer Relations', initials: 'NL' },
]
