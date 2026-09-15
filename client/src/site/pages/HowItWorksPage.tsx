import { Pill, Siren, Stethoscope, ClipboardCheck, Send } from "lucide-react";
import { useState } from "react";
import { cn } from "../../pages/shared";
import { PageHero, SiteLayout } from "../shell";
import { Btn, Callout, Eyebrow, Finale, Section, SectionHead, Steps } from "../ui";
import { ParentPhoneMock } from "../mockups";
import { Photo, photos } from "../photos";

const stages = [
  { num: "01", title: "Student needs help", copy: "A student reports feeling unwell, or a teacher, prefect or house staff member notices something. No app, no phone, no account required of the child." },
  { num: "02", title: "School health team assesses", copy: "The nurse triages, examines, records observations and treats — with the student's full health record, allergies and restrictions already in front of them." },
  { num: "03", title: "Mlezi coordinates care", copy: "Medication, a telehealth consultation, a referral or simple monitoring. Whatever is decided is scheduled, assigned and recorded in one place." },
  { num: "04", title: "Parent stays informed", copy: "Meaningful events reach the parent according to the rules the school has configured — with the context a parent actually needs." },
  { num: "05", title: "Follow-up closes the loop", copy: "Nothing is finished until it is finished. Follow-ups are assigned, tracked and closed with an outcome recorded against the student." },
];

type Workflow = { id: string; label: string; icon: any; intro: string; steps: { title: string; copy: string }[]; note?: string };

const workflows: Workflow[] = [
  {
    id: "medication",
    label: "Medication",
    icon: Pill,
    intro: "From the parent's hand to the student's dose, and back again at the end of term.",
    steps: [
      { title: "Handover", copy: "The parent hands medicine to the school at the start of term. Quantity, form, strength and expiry are captured." },
      { title: "Verification", copy: "The nurse checks it against the student's health record and the instructions from the treating clinician." },
      { title: "Storage", copy: "A named, lockable location is assigned. Controlled items are handled separately." },
      { title: "Scheduling", copy: "Doses are scheduled for the term, with the school timetable taken into account." },
      { title: "Administration", copy: "Each dose is recorded by the staff member who gave it, at the time they gave it." },
      { title: "Parent visibility", copy: "The dose appears in the parent's Mlezi Care timeline." },
      { title: "Reconciliation", copy: "At end of term what remains is counted and returned, carried forward or safely disposed of." },
    ],
  },
  {
    id: "telehealth",
    label: "Telehealth",
    icon: Stethoscope,
    intro: "The school nurse stays with the student. Another clinician joins the room.",
    steps: [
      { title: "On-site assessment", copy: "The nurse assesses the student and decides whether remote input would help." },
      { title: "Consent", copy: "Consent is confirmed according to the school's policy and the student's age before anything is shared." },
      { title: "Pre-consultation summary", copy: "Presenting complaint, observations, relevant history and current medication are prepared for the clinician." },
      { title: "Consultation", copy: "The clinician joins. The nurse is present throughout and carries out anything that needs doing on site." },
      { title: "Outcome", copy: "Treatment, follow-up or referral is recorded and becomes part of the student's health record." },
    ],
    note: "Telehealth is used where it is clinically appropriate and a suitable professional is available. It is not a substitute for emergency care.",
  },
  {
    id: "referral",
    label: "Referral",
    icon: Send,
    intro: "When care has to leave campus, the delay should never be administrative.",
    steps: [
      { title: "Decision to refer", copy: "The health team records the clinical reason and the level of urgency." },
      { title: "Facility and cover", copy: "The student's preferred facility and medical-cover information are attached automatically." },
      { title: "Parent authorisation", copy: "The parent is notified and, where required, asked to authorise. The request and response are timestamped." },
      { title: "Handoff", copy: "A summary travels with the student: history, allergies, observations, what has already been given." },
      { title: "Return of information", copy: "What the facility found and advised is recorded back against the student." },
      { title: "Follow-up", copy: "The school health team picks the care back up on return, with a scheduled review." },
    ],
  },
  {
    id: "emergency",
    label: "Emergency",
    icon: Siren,
    intro: "Emergency care takes priority. Mlezi supports everything around it.",
    steps: [
      { title: "Act first", copy: "Staff follow the school's emergency procedures. Nothing in Mlezi stands between a child and urgent care." },
      { title: "Critical information", copy: "Allergies, conditions, current medication and emergency contacts surface in seconds — with break-glass access logged." },
      { title: "Incident record", copy: "The sequence is captured as it unfolds, including who responded and when." },
      { title: "Parent contact", copy: "The parent is contacted directly, and the notification is recorded against the incident." },
      { title: "Referral and transport", copy: "Cover details and a clinical handoff go with the student." },
      { title: "Afterwards", copy: "Follow-up, return to school, restrictions and a closure checklist." },
    ],
    note: "Mlezi does not provide emergency medical services. It supports the communication and coordination around them.",
  },
  {
    id: "screening",
    label: "Screening",
    icon: ClipboardCheck,
    intro: "Care that starts before anyone is unwell.",
    steps: [
      { title: "Campaign setup", copy: "Scope by term, form, house or squad. Choose the measurements and assign the staff." },
      { title: "Screening", copy: "Students are seen in batches. Missed students are tracked by state rather than lost." },
      { title: "Findings", copy: "Anything outside expectation is recorded as a finding with a priority and an owner." },
      { title: "Follow-up", copy: "Findings become scheduled follow-ups, visible to the health team until they are closed." },
      { title: "Referral and resolution", copy: "Where external care is needed a referral is raised; the finding closes with a recorded outcome." },
    ],
  },
];

export default function HowItWorksPage() {
  const [active, setActive] = useState(workflows[0].id);
  const workflow = workflows.find((item) => item.id === active)!;

  return (
    <SiteLayout>
      <PageHero
        eyebrow="How it works"
        title="From sick bay to specialist, one coordinated journey."
        lede="Most school health systems describe features. This is the sequence a real school day actually follows — and where Mlezi sits inside it."
        actions={<>
          <Btn href="/demo" tone="cream" size="lg">Bring Mlezi to Your School</Btn>
          <Btn href="/platform" tone="onforest" size="lg" icon={false}>See the Platform</Btn>
        </>}
      />

      <Section>
        <SectionHead eyebrow="The five stages" title="What happens when a child needs help." className="s-head" />
        <div style={{ marginTop: 40 }}><Steps items={stages} /></div>
      </Section>

      <Section tone="grey" size="sm">
        <div className="s-split s-split-top">
          <Photo photo={photos.aboutThesis} />
          <div>
            <Eyebrow>Nobody works this alone</Eyebrow>
            <h2 className="s-h3" style={{ marginTop: 14 }}>The nurse, the guardian and the clinician — in the same sequence.</h2>
            <p className="s-body" style={{ marginTop: 12 }}>
              Every stage above involves a real person doing a real job: a nurse who assesses, a school that records, a
              parent who is told, and — when it's needed — a clinician who joins in.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="cream">
        <div className="s-head-split">
          <SectionHead eyebrow="Deeper workflows" title="The five journeys a health department repeats every term." lede="Select a workflow to follow it end to end." />
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 26 }}>
          {workflows.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={cn("s-btn", "s-btn-sm", active === item.id ? "s-btn-primary" : "s-btn-outline")}
              style={{ background: active === item.id ? undefined : "#fff" }}
            >
              <item.icon size={14} /> {item.label}
            </button>
          ))}
        </div>

        <div className="s-card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "26px 28px 20px", borderBottom: "1px solid var(--line)" }}>
            <Eyebrow>{workflow.label} workflow</Eyebrow>
            <p className="s-h3" style={{ marginTop: 12, maxWidth: "34ch" }}>{workflow.intro}</p>
          </div>
          <div>
            {workflow.steps.map((step, index) => (
              <div key={step.title} style={{ display: "grid", gridTemplateColumns: "56px 1fr", gap: 16, padding: "18px 28px", borderBottom: index === workflow.steps.length - 1 ? 0 : "1px solid var(--line)" }}>
                <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".1em", color: "var(--sage)", paddingTop: 2 }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <b style={{ display: "block", fontSize: 15, fontWeight: 650, letterSpacing: "-0.022em", color: "var(--ink)" }}>{step.title}</b>
                  <span style={{ display: "block", marginTop: 5, fontSize: 13.5, lineHeight: 1.6, color: "var(--ink-soft)" }}>{step.copy}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
        {workflow.note && <div style={{ marginTop: 20 }}><Callout>{workflow.note}</Callout></div>}
      </Section>

      <Section>
        <div className="s-split s-split-top">
          <div>
            <Eyebrow>Where the parent sits</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 18px" }}>Informed at the right moments, not at every moment.</h2>
            <p className="s-lede">
              A parent who is told about everything stops reading. A parent who is told about nothing starts phoning.
              Schools configure which events reach a parent directly and which simply appear in the timeline.
            </p>
            <div className="s-grid-2" style={{ gap: 12, marginTop: 28 }}>
              <div className="s-card-flat">
                <span className="s-tag grey">Timeline only</span>
                <p style={{ marginTop: 12 }}>A short sick-bay visit for a headache. Recorded, visible, no alert.</p>
              </div>
              <div className="s-card-flat" style={{ borderColor: "var(--line-warm)", background: "var(--cream)" }}>
                <span className="s-tag clay">Notified</span>
                <p style={{ marginTop: 12 }}>An injury, a referral, a medication change, an overnight stay in the sick bay.</p>
              </div>
            </div>
          </div>
          <div style={{ display: "grid", justifyItems: "center" }}>
            <ParentPhoneMock />
          </div>
        </div>
      </Section>

      <Finale
        title={<>See the whole journey with your own school's health department in mind.</>}
        copy="A Mlezi specialist will walk through how your health team works today and where the platform fits."
        primary={{ label: "Book a Demo", href: "/demo" }}
        secondary={{ label: "See What Parents Get", href: "/for-parents" }}
      />
    </SiteLayout>
  );
}
