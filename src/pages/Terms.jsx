import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import Section from '../components/Section.jsx'
import { Bullets, Clause, Pending, Prose, ReviewNotice } from '../components/Prose.jsx'
import { legal, showLegalNotice, site } from '../data/site.js'

export default function Terms() {
  return (
    <>
      <PageHeader
        eyebrow="Terms"
        title="Terms of Use"
        description={`Last updated ${legal.lastUpdated}.`}
      />

      <Section align="left">
        <Prose>
          {showLegalNotice && <ReviewNotice />}

          <p className="measure text-lg text-pretty text-neutral-700">
            These terms govern your use of this website. By using it, you accept them. If
            you do not, please do not use the site.
          </p>

          <Clause n={1} title="This site is informational">
            <p>
              Everything here describes {legal.entity} and how we think about investing. It
              is general information, published as it stood on the date shown, and we are
              under no obligation to keep it current.
            </p>
          </Clause>

          <Clause n={2} title="Not investment advice, and not an offer">
            <p>
              Nothing on this site is investment, legal, tax or financial advice, and
              nothing on it is a recommendation to buy, sell or hold anything.
            </p>
            <p>
              Nothing on this site is an offer to sell, or a solicitation of an offer to
              buy, any security or interest, in any jurisdiction. Any investment we make is
              agreed through separate documentation, and only with parties eligible to enter
              into it.
            </p>
          </Clause>

          <Clause n={3} title="Statements about the future">
            <p>
              Where we describe what we seek, aim or intend to do, those are statements of
              present intention, not promises. Investing in early-stage deep technology
              carries substantial risk, including the risk of total loss. Nothing here
              suggests any particular outcome for any company, and the name Starunico
              describes a path we travel with founders rather than a result we guarantee.
            </p>
          </Clause>

          <Clause n={4} title="Material you send us">
            <p>
              Please read this before using the contact form.
            </p>
            <p>
              We receive a large volume of unsolicited material, and we look at many
              companies working on related technologies. Because of that, material you send
              us without a written confidentiality agreement in place is received on a
              non-confidential basis, and we accept no obligation of confidence or of
              non-use in respect of it.
            </p>
            <Bullets
              items={[
                'Send us enough to explain what you have built, and no more.',
                'Do not send trade secrets, unfiled invention disclosures, source code, or anything else you cannot afford to have read without protection.',
                'If confidentiality matters, say so and we will put an agreement in place before you send anything further.',
              ]}
            />
            <p>
              Nothing in this clause transfers ownership of your intellectual property to
              us. It remains yours. We simply cannot take on a duty of confidence to
              everyone who writes to us, and we would rather say so plainly than leave it
              ambiguous.
            </p>
            <p>
              You confirm that anything you send is yours to send, and that sending it does
              not breach an obligation you owe to anyone else.
            </p>
          </Clause>

          <Clause n={5} title="Our content">
            <p>
              The text, design, marks and other material on this site belong to{' '}
              {legal.entity} or are used with permission. You may read, quote and link to
              it, with attribution. You may not republish it wholesale, or use our name or
              marks to imply a relationship or endorsement that does not exist.
            </p>
          </Clause>

          <Clause n={6} title="Acceptable use">
            <Bullets
              items={[
                'Do not attempt to breach, probe or disrupt the site or the systems behind it.',
                'Do not submit anything unlawful, misleading or malicious through the contact form.',
                'Do not scrape or automate against the site in a way that degrades it for others.',
              ]}
            />
          </Clause>

          <Clause n={7} title="Links to other sites">
            <p>
              Where we link somewhere else, we do not control that destination and are not
              responsible for its content or its handling of your data.
            </p>
          </Clause>

          <Clause n={8} title="No warranty">
            <p>
              This site is provided as it is. We do not warrant that it will be
              uninterrupted, error-free, or that the information on it is complete or free
              of mistakes.
            </p>
          </Clause>

          <Clause n={9} title="Limitation of liability">
            <p>
              To the fullest extent the law allows, we are not liable for any indirect or
              consequential loss, or for lost profits, revenue, data or opportunity, arising
              from your use of this site or your reliance on anything published here.
            </p>
            <p>
              Nothing in these terms limits liability that cannot lawfully be limited,
              including liability for fraud.
            </p>
          </Clause>

          <Clause n={10} title="Privacy">
            <p>
              Our{' '}
              <Link to="/privacy" className="text-brand-700 hover:underline">
                Privacy Policy
              </Link>{' '}
              explains what we do with personal information, and forms part of these terms.
            </p>
          </Clause>

          <Clause n={11} title="Changes">
            <p>
              We may update these terms. The date at the top of the page shows when they
              last changed, and continued use of the site after a change means you accept
              the revised version.
            </p>
          </Clause>

          <Clause n={12} title="Governing law">
            <p>
              These terms are governed by the laws of{' '}
              {legal.jurisdiction ?? <Pending>governing jurisdiction to be confirmed</Pending>}
              , and the courts of that jurisdiction have exclusive jurisdiction over any
              dispute arising from them.
            </p>
          </Clause>

          <Clause n={13} title="Contact">
            <p>
              Questions about these terms can go to{' '}
              <a href={`mailto:${site.email}`} className="text-brand-700 hover:underline">
                {site.email}
              </a>
              .
            </p>
          </Clause>
        </Prose>
      </Section>
    </>
  )
}
