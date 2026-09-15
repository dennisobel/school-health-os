import { Package } from "lucide-react";
import { generalFaq } from "../content";
import { PageHero, SiteLayout } from "../shell";
import { Btn, Bullets, Callout, Eyebrow, Faq, Finale, Section, SectionHead } from "../ui";
import { HealthStationMock } from "../mockups";
import { Photo, photos } from "../photos";

const comparison = [
  ["Staff platform and health records", "Included", "—"],
  ["Sick bay, medication and incidents", "Included", "—"],
  ["Screening, referrals and reports", "Included", "—"],
  ["Health intelligence for leadership", "Included", "—"],
  ["Parent communication infrastructure", "Included", "—"],
  ["Health timeline for your own child", "—", "Included"],
  ["Medication administration visibility", "—", "Included"],
  ["Referral updates and documents", "—", "Included"],
  ["Medical-cover information", "—", "Included"],
  ["Telehealth access where appropriate", "Subject to availability", "Subject to availability"],
];

export default function PricingPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Pricing"
        title="Priced so that a school can say yes."
        lede="Two straightforward subscriptions and one optional hardware package. No per-student licensing games, and no requirement to restructure anybody's fees."
      />

      <Section>
        <div className="s-price-grid">
          <div className="s-price">
            <span className="s-tag">Schools</span>
            <h3 style={{ marginTop: 18 }}>School Platform</h3>
            <div className="s-price-amt">Request a demo<small>for pricing</small></div>
            <p className="s-small" style={{ marginTop: 8 }}>For school health departments.</p>
            <Bullets items={[
              "Staff platform for the whole health department",
              "Health records, sick bay and medication",
              "Incidents, screening, referrals and reports",
              "Health intelligence for school leadership",
              "Parent communication infrastructure",
              "Roles, permissions and audit",
            ]} />
            <Btn href="/demo" tone="primary">Talk to Mlezi</Btn>
          </div>

          <div className="s-price is-feature">
            <span className="s-tag" style={{ background: "rgba(127,209,166,.16)", color: "#7fd1a6" }}>Parents</span>
            <h3 style={{ marginTop: 18 }}>Mlezi Care</h3>
            <div className="s-price-amt">KES 250<small>per term</small></div>
            <p className="s-small" style={{ marginTop: 8 }}>Or KES 650 per year. One subscription for your whole family — not per child.</p>
            <Bullets dark items={[
              "Meaningful health alerts",
              "Health timeline and medication visibility",
              "Referral updates and medical documents",
              "Medical-cover information",
              "Telehealth access where appropriate",
              "A channel to the school health team",
            ]} />
            <Btn href="/activate" tone="cream">Join Mlezi Care</Btn>
          </div>
        </div>

        <p className="s-small" style={{ marginTop: 24 }}>
          School pricing is arranged individually — request a demo for a quote. Parents subscribe to Mlezi Care directly —
          schools are not required to add it to their invoices.
        </p>
      </Section>

      <Section size="sm">
        <div className="s-split s-split-narrow s-split-top">
          <div>
            <Eyebrow>What you're really paying for</Eyebrow>
            <h2 className="s-h3" style={{ marginTop: 14 }}>Mlezi Care is a care relationship, not a software licence.</h2>
            <p className="s-body" style={{ marginTop: 12 }}>
              KES 250 covers a term of visibility into your child's health while they're away — not a feature unlock.
            </p>
          </div>
          <Photo photo={photos.parentsCare} />
        </div>
      </Section>

      <Section tone="cream" size="sm">
        <SectionHead eyebrow="What sits where" title="Two subscriptions, two audiences." />
        <div className="s-matrix-scroll" style={{ marginTop: 30, background: "#fff" }}>
          <table className="s-matrix">
            <thead>
              <tr>
                <th style={{ minWidth: 260 }}>Capability</th>
                <th style={{ minWidth: 150 }}>School Platform</th>
                <th style={{ minWidth: 150 }}>Mlezi Care</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map(([capability, school, parent]) => (
                <tr key={capability}>
                  <td><b>{capability}</b></td>
                  <td>{school}</td>
                  <td>{parent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section>
        <div className="s-head-split">
          <SectionHead
            eyebrow="Hardware"
            title="Mlezi Health Station"
            lede="Essential assessment equipment, a connected workflow and Mlezi software in one deployment package — kept separate from the software subscriptions."
          />
          <div style={{ paddingBottom: 6 }}>
            <p style={{ fontSize: 20, fontWeight: 650, letterSpacing: "-0.03em", color: "var(--ink)" }}>One-time setup package</p>
            <div style={{ marginTop: 16 }}><Btn href="/demo">Request a School Package</Btn></div>
          </div>
        </div>
        <HealthStationMock />
        <div style={{ marginTop: 24 }}>
          <Callout>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
              <Package size={15} /> Contents and cost are agreed per school during onboarding. The list above is illustrative.
            </span>
          </Callout>
        </div>
      </Section>

      <Section tone="grey">
        <SectionHead eyebrow="Questions" title="Pricing, plainly answered." />
        <div style={{ marginTop: 30 }}>
          <Faq items={generalFaq.slice(4, 8)} />
        </div>
      </Section>

      <Finale
        title={<>Start with a conversation, not a contract.</>}
        copy="A Mlezi specialist will look at your school's health setup and tell you honestly whether Mlezi fits."
        primary={{ label: "Book a Demo", href: "/demo" }}
        secondary={{ label: "Join Mlezi Care", href: "/activate" }}
      />
    </SiteLayout>
  );
}
