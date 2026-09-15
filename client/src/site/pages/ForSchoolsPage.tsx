import { Activity, BarChart3, Building2, CheckCircle2, ClipboardCheck, FileHeart, LockKeyhole, MessageCircle, Pill, Send, ShieldCheck, Siren, Stethoscope, WifiOff } from "lucide-react";
import { PageHero, SiteLayout } from "../shell";
import { Btn, Bullets, Callout, Eyebrow, Finale, Metrics, Section, SectionHead, Steps, TextLink } from "../ui";
import { AccessMock, ReadinessMock, SchoolDashboardMock } from "../mockups";
import { Photo, photos } from "../photos";

const capabilities = [
  { icon: FileHeart, label: "Health records" },
  { icon: Stethoscope, label: "Sick bay" },
  { icon: Pill, label: "Medication" },
  { icon: Send, label: "Referrals" },
  { icon: Siren, label: "Incidents" },
  { icon: ClipboardCheck, label: "Screening" },
  { icon: Activity, label: "Telehealth" },
  { icon: ShieldCheck, label: "Medical cover" },
  { icon: MessageCircle, label: "Parent communication" },
  { icon: BarChart3, label: "Reports" },
  { icon: Building2, label: "Health intelligence" },
  { icon: LockKeyhole, label: "Roles, permissions & audit" },
];

const implementation = [
  { num: "Week 1", title: "School onboarding", copy: "Workspace set up, school structure configured — houses, forms, dormitories, terms — and roles agreed with your leadership." },
  { num: "Week 2", title: "Health department setup", copy: "Sick bay, medication cabinets, screening templates, referral facilities and notification rules configured with your health team." },
  { num: "Week 3", title: "Student records and parent invitations", copy: "Student records imported, medical profiles opened for parent completion, and Mlezi Care invitations sent." },
  { num: "Week 4", title: "Go live", copy: "The health department runs on Mlezi, with support alongside your team through the first weeks of the term." },
];

export default function ForSchoolsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="For schools"
        title="A better operating system for student health."
        lede="Your health department already carries the responsibility. Mlezi gives it the structure, visibility and accountability that responsibility deserves — without adding administrative burden to parents or boarding staff."
        actions={<>
          <Btn href="/demo" tone="cream" size="lg">Bring Mlezi to Your School</Btn>
          <Btn href="/pricing" tone="onforest" size="lg" icon={false}>See pricing</Btn>
        </>}
      />

      <Section size="sm">
        <SchoolDashboardMock />
      </Section>

      <Section tone="cream">
        <SectionHead
          eyebrow="What your health team gets"
          title="One place for everything the department is accountable for."
          lede="Not twelve separate tools. One system where a medication record, a sick-bay encounter, a referral and a parent notification are all part of the same student's story."
        />
        <div className="s-grid-4" style={{ marginTop: 40 }}>
          {capabilities.map((capability) => (
            <div key={capability.label} className="s-card-flat" style={{ display: "flex", alignItems: "center", gap: 11, padding: "15px 16px" }}>
              <capability.icon size={16} style={{ color: "var(--sage)", flexShrink: 0 }} />
              <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink)" }}>{capability.label}</span>
            </div>
          ))}
        </div>
        <div className="s-grid-2" style={{ marginTop: 18 }}>
          <div className="s-card-flat" style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <WifiOff size={16} style={{ color: "var(--sage)", flexShrink: 0 }} />
            <span style={{ fontSize: 13.5, color: "var(--ink-soft)" }}><b style={{ color: "var(--ink)" }}>Offline-aware, tablet-friendly.</b> Built for the connection a boarding school actually has.</span>
          </div>
          <div className="s-card-flat" style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <CheckCircle2 size={16} style={{ color: "var(--sage)", flexShrink: 0 }} />
            <span style={{ fontSize: 13.5, color: "var(--ink-soft)" }}><b style={{ color: "var(--ink)" }}>Audit by default.</b> Sensitive access and medication events leave a trace.</span>
          </div>
        </div>
      </Section>

      <Section id="readiness">
        <div className="s-split s-split-top">
          <div>
            <Eyebrow>Health readiness</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 18px" }}>Know how ready your school is to care for its students.</h2>
            <p className="s-lede">
              Health Readiness is a single figure school leadership can ask about in a board meeting, built from the things
              that actually determine whether the health department can respond.
            </p>
            <Bullets items={[
              "Medical profiles complete and current",
              "Emergency contacts verified, not just collected",
              "Medication reconciled against what is physically held",
              "Outstanding referrals awaiting a return of information",
              "Pending parent approvals blocking care",
            ]} />
            <div style={{ marginTop: 26 }}>
              <Callout>Readiness is a management view, not a clinical one. It tells leadership whether the department is prepared — it does not expose any student's health information.</Callout>
            </div>
          </div>
          <ReadinessMock />
        </div>
      </Section>

      <Section tone="forest" className="s-dark">
        <div className="s-split s-split-top">
          <div>
            <Eyebrow dark>Roles and access</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 18px" }}>Everyone in the school sees what their job requires. Nothing more.</h2>
            <p className="s-lede">
              Boarding schools have matrons, house parents, games teachers, prefects and administrators who all have a part
              to play in a child's wellbeing — and none of whom should be reading a medical record.
            </p>
            <div style={{ marginTop: 30 }}><Btn href="/security" tone="cream">Security & Privacy</Btn></div>
          </div>
          <div style={{ background: "#fff", borderRadius: 14, padding: 14 }}>
            <AccessMock />
          </div>
        </div>
      </Section>

      <Section size="sm">
        <div className="s-split s-split-narrow s-split-top">
          <Photo photo={photos.aboutSchool} />
          <div>
            <Eyebrow>Your school, already running</Eyebrow>
            <h2 className="s-h3" style={{ marginTop: 14 }}>Mlezi is built for the school you already have.</h2>
            <p className="s-body" style={{ marginTop: 12 }}>
              Houses, forms, dormitories and the rhythm of a term — Mlezi is configured around your school's existing
              structure, not the other way round.
            </p>
          </div>
        </div>
      </Section>

      {/* Business model */}
      <Section tone="cream" id="pricing">
        <SectionHead
          eyebrow="The commercial model"
          title="Simple for the school. Optional for the parent."
          lede="Mlezi is deliberately priced so that adopting it is a decision your health department can make, not a fee restructure your board has to approve."
        />
        <div className="s-price-grid" style={{ marginTop: 40 }}>
          <div className="s-price">
            <span className="s-tag">School Platform</span>
            <h3 style={{ marginTop: 18 }}>The staff platform</h3>
            <div className="s-price-amt">Request a demo<small>for pricing</small></div>
            <Bullets items={[
              "Staff platform for the whole health department",
              "Health records, sick bay and medication",
              "Incidents, screening, referrals and reports",
              "Health intelligence for school leadership",
              "Parent communication infrastructure",
            ]} />
            <Btn href="/demo" tone="primary">Talk to Mlezi</Btn>
          </div>
          <div className="s-price is-feature">
            <span className="s-tag" style={{ background: "rgba(127,209,166,.16)", color: "#7fd1a6" }}>Mlezi Care</span>
            <h3 style={{ marginTop: 18 }}>The parent subscription</h3>
            <div className="s-price-amt">KES 250<small>per term, or KES 650/year — paid by parents directly</small></div>
            <Bullets dark items={[
              "Meaningful health alerts and a health timeline",
              "Medication visibility and referral updates",
              "Medical documents and cover information",
              "Telehealth access where appropriate",
              "A channel to the school health team",
            ]} />
            <Btn href="/for-parents" tone="cream">See Mlezi Care</Btn>
          </div>
        </div>
        <div style={{ marginTop: 26 }}>
          <Callout>
            <b>No need to restructure the school's fee schedule.</b> Parents may subscribe to Mlezi Care directly. Schools are
            not required to add it to their invoices, and no school is obliged to charge parents anything at all. The school
            acts as the trusted distribution partner — nothing more.
          </Callout>
        </div>
        <p className="s-small" style={{ marginTop: 16 }}>Exact pricing may vary by school size, configuration and services. <TextLink href="/pricing">Full pricing</TextLink></p>
      </Section>

      <Section id="implementation">
        <SectionHead
          eyebrow="Implementation"
          title="Four weeks from first conversation to a health department running on Mlezi."
          lede="An illustrative approach. Real timelines depend on your school's size, records and term calendar — we plan it with you rather than promising it to you."
        />
        <div style={{ marginTop: 40 }}>
          <Steps items={implementation} />
        </div>
      </Section>

      <Section tone="grey" size="sm">
        <Metrics
          items={[
            { value: "1", label: "Health department, fully operational on one system" },
            { value: "4", label: "Weeks, illustrative implementation" },
            { value: "11", label: "Default roles, configurable to your school" },
            { value: "0", label: "Devices required of your students" },
          ]}
        />
      </Section>

      <Finale
        title={<>Let's build a better health department for your school.</>}
        copy="A Mlezi specialist will contact you to understand your school's health setup and show you how the platform works."
        primary={{ label: "Request a Mlezi Demo", href: "/demo" }}
        secondary={{ label: "See pricing", href: "/pricing" }}
      />
    </SiteLayout>
  );
}
