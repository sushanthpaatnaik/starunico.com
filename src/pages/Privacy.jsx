import PageHeader from '../components/PageHeader.jsx'
import Section from '../components/Section.jsx'
import { Bullets, Clause, Pending, Prose, ReviewNotice } from '../components/Prose.jsx'
import { legal, showLegalNotice, site } from '../data/site.js'

export default function Privacy() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy"
        title="Privacy Policy"
        description={`Last updated ${legal.lastUpdated}.`}
      />

      <Section align="left">
        <Prose>
          {showLegalNotice && <ReviewNotice />}

          <p className="text-lg text-pretty text-neutral-700">
            This policy explains what {legal.entity} does with personal information when you
            visit this website or contact us through it. We collect as little as we can, and
            we do not sell it or use it for advertising.
          </p>

          <Clause n={1} title="Who we are">
            <p>
              {legal.entity}
              {legal.registeredAddress ? (
                <>, of {legal.registeredAddress},</>
              ) : (
                <>
                  {' '}
                  <Pending>registered address to be confirmed</Pending>
                </>
              )}{' '}
              is the controller of the personal information described here. You can reach us
              at{' '}
              <a href={`mailto:${site.email}`} className="text-brand-700 hover:underline">
                {site.email}
              </a>
              .
            </p>
          </Clause>

          <Clause n={2} title="Information you give us">
            <p>
              The submission form asks for your name, your role, your email address, the
              company name, its website and location, the domain it sits in, your stage and
              the capital you are seeking, a link to a deck or data room if you have one,
              and your answers on what you have built, what is technically difficult about
              it, what makes it hard to replicate, and what evidence exists today.
            </p>
            <p>
              We receive exactly those fields and nothing else — the server stores only the
              ones it recognises. Everything you write in the longer answers, including
              detail about a company or a technology, reaches us as you wrote it. Please read
              clause 4 of our{' '}
              <a href="/terms" className="text-brand-700 hover:underline">
                terms
              </a>{' '}
              before sending anything you would not want read without an agreement in place.
            </p>
            <p>
              The form also contains a hidden field that people never see and never fill in.
              If it arrives completed, we treat the submission as automated and discard it.
            </p>
          </Clause>

          <Clause n={3} title="Information collected automatically">
            <p>
              When you submit the contact form, our server records the country your request
              came from, as reported by our hosting provider, together with the time of the
              submission. We do not store your IP address alongside your message.
            </p>
            <p>
              Like any website, requests to this site pass through our hosting provider's
              logs, which are kept briefly for security, abuse prevention and diagnosing
              faults.
            </p>
          </Clause>

          <Clause n={4} title="No tracking or advertising">
            <p>
              This site runs no analytics, no advertising trackers and no third-party
              embeds. We do not build profiles of visitors and we set no cookies.
            </p>
          </Clause>

          <Clause n={5} title="How we use what we collect">
            <Bullets
              items={[
                'To read and respond to your message.',
                'To evaluate an opportunity where you have written to us about a company or technology.',
                'To keep the site secure and working, and to prevent automated abuse.',
              ]}
            />
            <p>
              We do not sell personal information, and we do not share it for anyone else's
              marketing.
            </p>
          </Clause>

          <Clause n={6} title="Our legal basis">
            <p>
              Where data-protection law requires a basis for processing, we rely on your
              consent when you choose to send us a message, and on our legitimate interests
              in assessing investment opportunities, corresponding with the people who
              contact us, and keeping this site secure.
            </p>
          </Clause>

          <Clause n={7} title="Who else sees it">
            <p>
              Our website and its contact endpoint are hosted on Cloudflare, which processes
              requests on our behalf as an infrastructure provider. Submissions may also be
              passed to the email or messaging system we use internally to read them. These
              providers act on our instructions and are not permitted to use your
              information for their own purposes.
            </p>
            <p>
              We may disclose information where the law requires it, or to establish or
              defend legal claims.
            </p>
          </Clause>

          <Clause n={8} title="How long we keep it">
            <p>
              Correspondence is kept for as long as it remains relevant to an ongoing or
              potential relationship, and then deleted. Where a message relates to an
              investment we make, records may be retained for as long as we hold the
              investment and for the period afterwards that law or regulation requires.
            </p>
          </Clause>

          <Clause n={9} title="Where it is processed">
            <p>
              Our hosting provider operates a global network, so requests may be handled in
              a country other than your own. Where personal information is transferred
              across borders, we rely on the safeguards our providers put in place for those
              transfers.
            </p>
          </Clause>

          <Clause n={10} title="Your rights">
            <p>
              Depending on where you live, you may have the right to ask for a copy of the
              personal information we hold about you, to have it corrected or deleted, to
              object to or restrict how we use it, or to receive it in a portable form.
              Where we rely on consent, you can withdraw it at any time.
            </p>
            <p>
              Write to{' '}
              <a href={`mailto:${site.email}`} className="text-brand-700 hover:underline">
                {site.email}
              </a>{' '}
              and we will respond within the period the applicable law allows. You may also
              complain to your data-protection regulator
              {legal.supervisoryAuthority ? ` (${legal.supervisoryAuthority})` : ''}
              {!legal.supervisoryAuthority && (
                <>
                  {' '}
                  <Pending>relevant authority to be confirmed</Pending>
                </>
              )}
              .
            </p>
          </Clause>

          <Clause n={11} title="Children">
            <p>
              This site is aimed at founders, investors and advisers. It is not directed at
              children, and we do not knowingly collect information from them.
            </p>
          </Clause>

          <Clause n={12} title="Security">
            <p>
              Traffic to this site is encrypted in transit. No website can promise perfect
              security, so please do not send anything highly sensitive through the contact
              form — tell us it exists and we will arrange a suitable channel.
            </p>
          </Clause>

          <Clause n={13} title="Changes">
            <p>
              If this policy changes we will update the date at the top of the page.
              Material changes will be described here rather than made quietly.
            </p>
          </Clause>
        </Prose>
      </Section>
    </>
  )
}
