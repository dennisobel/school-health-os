import { ArrowDown, Eye, GraduationCap, Handshake, Info, Package } from "lucide-react";
import { PageHero, SiteLayout } from "../shell";
import { Btn, Callout, Eyebrow, Finale, Metrics, Section, SectionHead } from "../ui";
import { Photo, photos } from "../photos";

const programs = [
  { icon: GraduationCap, title: "Keep Them in School", copy: "Support necessary medical care that could otherwise keep a child away from school — the treatment, the follow-up or the referral a family cannot meet." },
  { icon: Package, title: "Equip Them to Care", copy: "Provide health equipment to under-resourced schools, so a sick bay has the basic means to assess a child properly." },
  { icon: Eye, title: "Get Them Seen", copy: "Support access to clinical consultations for students whose schools and families cannot arrange them." },
  { icon: Handshake, title: "Help Them Thrive", copy: "Support preventive care, mental health, vision, hearing and other interventions that change a child's school life when caught early." },
];

const mechanism = [
  { label: "Parent subscribes", note: "Mlezi Care" },
  { label: "School joins Mlezi", note: "School platform" },
  { label: "Mlezi grows", note: "Revenue base widens" },
  { label: "A defined portion supports the fund", note: "Set aside, not promised ad hoc" },
  { label: "Another child gets care", note: "Through a programme" },
];

export default function ImpactPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Impact"
        title="Every child deserves someone looking out for them."
        lede="Mlezi is a business. It is also an argument about who gets cared for. The Mlezi Fund is how we intend to make that argument concrete."
        actions={<Btn href="/about" tone="cream" size="lg">Read why we built Mlezi</Btn>}
      />

      <Section>
        <div className="s-split s-split-wide s-split-top">
          <Photo photo={photos.impactCheckup} />
          <div>
            <Eyebrow>The Mlezi Fund</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 18px" }}>A defined portion of Mlezi Care supports the Mlezi Fund.</h2>
            <p className="s-lede">
              Not a marketing programme bolted onto a product. A defined share of what Mlezi Care earns, directed at the
              gap we see most often: a child at school who needs care their family cannot currently reach.
            </p>
            <div style={{ marginTop: 26 }}>
              <Callout>
                Mlezi is early. The figures on this page are <b>illustrative placeholders for a prototype</b>, not audited
                results. We will publish real numbers, and how they were counted, once there are real numbers to publish.
              </Callout>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="forest" className="s-dark" size="sm">
        <Metrics
          items={[
            { value: "182", label: "Children supported" },
            { value: "37", label: "Schools equipped" },
            { value: "640", label: "Consultations funded" },
            { value: "4", label: "Programmes" },
          ]}
          note="Illustrative prototype figures. Not audited results."
        />
      </Section>

      <Section tone="cream">
        <SectionHead
          eyebrow="Programmes"
          title="Four ways the fund is intended to work."
          lede="Each programme answers a specific reason a child at boarding school goes without care."
        />
        <div className="s-grid-2" style={{ marginTop: 40 }}>
          {programs.map((program) => (
            <div className="s-card" key={program.title} style={{ background: "#fff" }}>
              <div className="s-icon"><program.icon size={18} /></div>
              <h3>{program.title}</h3>
              <p>{program.copy}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="s-split s-split-top">
          <div>
            <Eyebrow>How it works</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 18px" }}>The mechanism, stated plainly.</h2>
            <p className="s-lede">
              As more schools and parents use Mlezi, a defined portion of proceeds supports the fund, and the fund supports
              care for children who need it.
            </p>
            <div style={{ marginTop: 26 }}>
              <Callout>
                We do not claim that a specific parent's subscription paid for a specific child's treatment. That kind of
                claim requires accounting that supports it. When ours does, we will say so — and show the working.
              </Callout>
            </div>
          </div>
          <div>
            {mechanism.map((step, index) => (
              <div key={step.label}>
                <div className="s-card-flat" style={{ padding: "16px 18px" }}>
                  <b style={{ fontSize: 14.5, fontWeight: 650, color: "var(--ink)", letterSpacing: "-0.02em" }}>{step.label}</b>
                  <p style={{ marginTop: 4, fontSize: 12.5, color: "var(--ink-mute)" }}>{step.note}</p>
                </div>
                {index < mechanism.length - 1 && (
                  <div style={{ display: "grid", placeItems: "center", padding: "8px 0", color: "#b3c8bd" }}><ArrowDown size={17} /></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="grey">
        <SectionHead
          center
          eyebrow="What we will publish"
          title="Impact reporting we would be comfortable being audited on."
          lede="These are the commitments we are holding ourselves to as the fund starts operating."
          className="s-head-center"
        />
        <div className="s-grid-3" style={{ marginTop: 40 }}>
          {[
            { title: "What was spent", copy: "The amount directed to the fund in each period, and the basis on which it was calculated." },
            { title: "What it bought", copy: "Programme by programme: consultations, equipment, treatment costs and preventive interventions." },
            { title: "What we cannot claim", copy: "Where the accounting does not support a direct link, we will say so rather than imply one." },
          ].map((item) => (
            <div className="s-card" key={item.title} style={{ background: "#fff" }}>
              <Info size={17} style={{ color: "var(--sage)" }} />
              <h3 style={{ marginTop: 14 }}>{item.title}</h3>
              <p>{item.copy}</p>
            </div>
          ))}
        </div>
      </Section>

      <Finale
        title={<>The more schools that join, the more children the fund can reach.</>}
        copy="Mlezi connects schools, parents and healthcare professionals around the health of every student — and directs a portion of what it earns at the children who need help most."
      />
    </SiteLayout>
  );
}
