import { ClipboardCheck, Clock3, Download, FileLock2, KeyRound, LockKeyhole, ShieldCheck, Siren, UserCheck } from "lucide-react";
import { PageHero, SiteLayout } from "../shell";
import { Btn, Callout, Eyebrow, Finale, Section, SectionHead } from "../ui";
import { AccessMock } from "../mockups";
import { Photo, photos } from "../photos";

const sections = [
  {
    id: "data-protection", icon: FileLock2, title: "Data protection",
    copy: "Student health information is held with the sensitivity it deserves. Mlezi is designed to support schools in meeting their data protection and health-information responsibilities — including keeping a clear picture of what data is held, why it is held, who can reach it and how long it is kept.",
    points: ["Data collected for a stated purpose, not gathered by default", "Separation between clinical detail and operational instruction", "Secure handling of uploaded documents", "Configuration that reflects the school's own policy"],
  },
  {
    id: "access-control", icon: KeyRound, title: "Access control",
    copy: "Access in Mlezi is granted by role, and roles are built on least privilege. A matron needs to know a student cannot do games this week; she does not need the clinical reason. Mlezi makes that distinction structural rather than a matter of trust.",
    points: ["Eleven default roles, configurable per school", "A permission matrix by action type and sensitivity level", "Scope limits — a role can be bounded to a house, form or department", "A guarded confirmation, with a stated reason, before sensitive access"],
  },
  {
    id: "confidentiality", icon: UserCheck, title: "Clinical confidentiality",
    copy: "Some information belongs to the clinical relationship. Mlezi supports schools in holding clinical detail at the level of the health team, while still giving other staff what they need to keep a child safe.",
    points: ["Clinical notes separated from operational health instructions", "Adolescent confidentiality respected according to school policy", "Counselling records handled with additional restriction", "Parent visibility set by information type, not all-or-nothing"],
  },
  {
    id: "auditability", icon: ClipboardCheck, title: "Auditability",
    copy: "An access control that nobody checks is a promise, not a control. Sensitive actions in Mlezi leave a trace that a school can review.",
    points: ["Audit trails on sensitive record access", "Medication administration recorded against the staff member", "Changes to health records attributed and timestamped", "Access Review surfacing unusual or elevated access patterns"],
  },
  {
    id: "emergency", icon: Siren, title: "Emergency access",
    copy: "In an emergency, information must be reachable in seconds. Mlezi does not choose between speed and accountability — break-glass access is available and every use of it is recorded.",
    points: ["Critical allergies, conditions and contacts surfaced immediately", "Break-glass access available to authorised staff", "Every emergency access logged with the person and the moment", "Reviewable afterwards by the school's designated reviewer"],
  },
  {
    id: "exports", icon: Download, title: "Controlled exports",
    copy: "Most health-data incidents are not break-ins. They are a spreadsheet emailed to the wrong person. Exports in Mlezi are a permitted action, not an assumed one.",
    points: ["Export permissions granted by role", "Sensitivity-aware export scopes", "Export actions recorded in the audit trail", "Aggregate reporting that does not carry identifiable clinical detail"],
  },
  {
    id: "retention", icon: Clock3, title: "Data retention",
    copy: "A student's health record has a life beyond their time at school, and a limit. Mlezi supports schools in defining retention that matches their obligations and their policy.",
    points: ["Retention configured to the school's stated policy", "Clear handling of records when a student leaves", "Document lifecycle managed alongside the record", "Deletion and archival treated as deliberate, recorded actions"],
  },
  {
    id: "parent-rights", icon: ShieldCheck, title: "Parent rights",
    copy: "Parents are not spectators to their child's care. Mlezi supports the consent, correction and visibility rights that a parent is entitled to exercise — within clinical confidentiality and applicable law.",
    points: ["Consent workflows for care and for information sharing", "Parents maintain and correct the medical information they provide", "Visibility of health events according to the school's policy", "A route to raise a question with the school health team"],
  },
  {
    id: "responsibilities", icon: LockKeyhole, title: "School responsibilities",
    copy: "Mlezi is a tool operated by a school. The school remains the party responsible for the care it delivers and for the health information it holds. Good software makes those responsibilities easier to meet — it does not assume them.",
    points: ["The school configures roles, policy and notification rules", "The school decides what is shared with parents, and why", "The school remains accountable for on-campus care", "Mlezi supports, records and coordinates that work"],
  },
];

export default function SecurityPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Security & privacy"
        title="Children's health information deserves exceptional care."
        lede="This page describes how Mlezi is designed. It is written in the language of design decisions rather than certification claims — because claims that have not been independently verified are not worth making."
        actions={<Btn href="/demo" tone="cream" size="lg">Talk to us about your policy</Btn>}
      />

      <Section size="sm">
        <Callout>
          Mlezi is designed to support schools in meeting their data protection and health-information responsibilities.
          Beyond ODPC compliance, we do not claim any other certification scheme that has not been independently
          assessed, and we will not describe Mlezi as certified against one until it is.
        </Callout>
      </Section>

      <Section size="sm">
        <div className="s-split s-split-narrow s-split-top">
          <div>
            <Eyebrow>Built with privacy at the centre</Eyebrow>
            <h2 className="s-h3" style={{ marginTop: 14 }}>Mlezi is built by an ODPC-compliant technology company.</h2>
            <p className="s-body" style={{ marginTop: 12 }}>
              Mlezi Health is built by <b style={{ color: "var(--ink)" }}>Cortexgrid Solution Limited</b>, a Kenyan
              technology company. Student health information is sensitive, so Mlezi is designed around controlled
              access, auditability, consent and responsible handling of health data.
            </p>
            <div style={{ marginTop: 18 }}>
              <span className="s-tag teal">ODPC Compliant</span>
            </div>
          </div>
          <Photo photo={photos.clinicianNotes} />
        </div>
      </Section>

      <Section tone="cream">
        <div className="s-split s-split-top">
          <div>
            <Eyebrow>The clearest way to explain it</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 18px" }}>Who can see what.</h2>
            <p className="s-lede">
              Privacy is easier to demonstrate than to describe. This is how a typical Kenyan boarding school configures
              access on day one — and every line of it is adjustable.
            </p>
            <p className="s-body" style={{ marginTop: 18 }}>
              Note what the health prefect can do: report that a student needs help. Nothing else. A student leader has a
              real role in a boarding school's wellbeing, and no business inside a medical record.
            </p>
          </div>
          <div>
            <div className="s-card" style={{ background: "#fff", padding: 16 }}>
              <AccessMock />
            </div>
            <p className="s-small" style={{ marginTop: 14, textAlign: "center" }}>
              <b style={{ color: "var(--ink)" }}>The right information for the right person.</b>
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="In detail" title="Nine areas, stated as design commitments." />
        <div style={{ marginTop: 44, display: "grid", gap: 18 }}>
          {sections.map((section) => (
            <div className="s-card" id={section.id} key={section.id} style={{ scrollMarginTop: 90 }}>
              <div className="s-split s-split-wide s-split-top" style={{ gap: 36 }}>
                <div>
                  <div className="s-icon"><section.icon size={18} /></div>
                  <h3 className="s-h3">{section.title}</h3>
                  <p className="s-body" style={{ marginTop: 12 }}>{section.copy}</p>
                </div>
                <div>
                  <ul style={{ display: "grid", gap: 10 }}>
                    {section.points.map((point) => (
                      <li key={point} style={{ display: "flex", gap: 10, fontSize: 13.5, lineHeight: 1.55, color: "var(--ink-soft)", borderBottom: "1px solid var(--line)", paddingBottom: 10 }}>
                        <ShieldCheck size={15} style={{ color: "var(--sage)", flexShrink: 0, marginTop: 2 }} /> {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="grey" id="terms">
        <div className="s-split s-split-top">
          <div id="privacy-policy" style={{ scrollMarginTop: 90 }}>
            <Eyebrow>Terms and privacy policy</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 18px" }}>The documents that govern the relationship.</h2>
            <p className="s-lede">
              Full terms of service and the Mlezi privacy policy are provided to each school and parent at the point of
              agreement, and are available on request.
            </p>
            <div style={{ marginTop: 26, display: "flex", gap: 11, flexWrap: "wrap" }}>
              <Btn href="/contact" tone="outline" icon={false}>Request the documents</Btn>
            </div>
          </div>
          <div className="s-card" style={{ background: "#fff" }}>
            <h3>Reporting a security concern</h3>
            <p style={{ marginTop: 12 }}>
              If you believe you have found a security issue in Mlezi, or that health information has been exposed, contact
              us directly and we will respond. Please do not post details publicly before we have had a chance to look.
            </p>
            <p style={{ marginTop: 14, fontSize: 14, fontWeight: 650, color: "var(--ink)" }}>security@mlezi.health</p>
          </div>
        </div>
      </Section>

      <Finale
        title={<>Bring your school's data protection policy. We'll show you how Mlezi maps to it.</>}
        copy="A Mlezi specialist can walk your leadership and health team through roles, permissions, audit and consent in detail."
        primary={{ label: "Book a Demo", href: "/demo" }}
        secondary={{ label: "Read the FAQ", href: "/faq" }}
      />
    </SiteLayout>
  );
}
