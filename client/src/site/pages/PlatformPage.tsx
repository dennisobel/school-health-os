import {
  Activity, ClipboardCheck, FileHeart, HeartPulse, LockKeyhole, MessageCircle, Package,
  Pill, Send, ShieldCheck, Siren, Stethoscope, WifiOff,
} from "lucide-react";
import { PageHero, SiteLayout } from "../shell";
import { Btn, Bullets, Callout, Eyebrow, Finale, Section, SectionHead, TextLink } from "../ui";
import {
  AccessMock, CoverMock, HealthStationMock, IncidentTimelineMock, IntelligenceMock,
  MedicationTimelineMock, ScreeningMock, TelehealthMock,
} from "../mockups";
import { Photo, photos } from "../photos";

const modules = [
  { icon: FileHeart, id: "records", title: "Student Health Records", copy: "One longitudinal record per learner — allergies, chronic conditions, medical history, encounters, restrictions and documents that follow the student from admission to graduation." },
  { icon: Stethoscope, id: "sick-bay", title: "Sick Bay", copy: "Triage, encounters, observations, treatment and follow-up in a workflow designed for one nurse and a queue of students, not a hospital department." },
  { icon: Pill, id: "medication", title: "Medication", copy: "Handover, verification, custody, storage, scheduling, administration and end-of-term reconciliation — with parents able to see that a dose happened." },
  { icon: Siren, id: "incidents", title: "Incidents", copy: "Injuries, emergencies, dorm incidents and sports injuries recorded as they unfold, with referral, follow-up, parent communication and closure attached to the same event." },
  { icon: ClipboardCheck, id: "screening", title: "Screening", copy: "Term campaigns for vision, dental, growth, blood pressure and general health, with every finding tracked through follow-up to resolution." },
  { icon: Send, id: "referrals", title: "Referrals", copy: "Authorisation, preferred facilities, cover information, transport context and the return of clinical information once the student has been seen." },
  { icon: Activity, id: "telehealth", title: "Telehealth", copy: "A structured consultation pathway: pre-consultation summary, consent, the consultation itself with the nurse present, and the outcome written back into the record." },
  { icon: ShieldCheck, id: "cover", title: "Medical Cover", copy: "Cover information organised against each student and connected to referrals and emergency workflows. Mlezi is not an insurer." },
  { icon: MessageCircle, id: "parents", title: "Parent Communication", copy: "Notification rules the school configures by seriousness, a health timeline, documents, and a channel to the health team that does not run through the school switchboard." },
  { icon: HeartPulse, id: "intelligence", title: "Health Intelligence", copy: "Aggregate patterns across houses, dormitories, sports and screening — for school leadership, without exposing individual clinical detail." },
  { icon: LockKeyhole, id: "rbac", title: "Roles, Permissions & Audit", copy: "Least-privilege roles, a permission matrix, sensitive-action confirmation, accountable break-glass access and audit trails on the things that matter." },
  { icon: WifiOff, id: "offline", title: "Built for Real Conditions", copy: "Tablet-friendly workflows, an offline-aware operating rhythm, and an interface that works on the connection a rural boarding school actually has." },
];

export default function PlatformPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="The platform"
        title="Everything a school health department has to hold together."
        lede="Twelve connected capabilities that turn a filing cabinet, a WhatsApp group and a nurse's memory into one accountable system of care."
        actions={<>
          <Btn href="/demo" tone="cream" size="lg">Bring Mlezi to Your School</Btn>
          <Btn href="/how-it-works" tone="onforest" size="lg" icon={false}>See How It Works</Btn>
        </>}
      />

      <Section size="sm">
        <div className="s-grid-3">
          {modules.map((module) => (
            <a href={`#${module.id}`} className="s-card s-card-hover" key={module.id} style={{ display: "block" }}>
              <div className="s-icon"><module.icon size={18} /></div>
              <h3>{module.title}</h3>
              <p>{module.copy}</p>
            </a>
          ))}
        </div>
      </Section>

      <Section tone="grey" size="sm">
        <div className="s-split s-split-narrow s-split-top">
          <div>
            <Eyebrow>Built around real students</Eyebrow>
            <h2 className="s-h3" style={{ marginTop: 14 }}>Every module exists because a real school day needed it.</h2>
            <p className="s-body" style={{ marginTop: 12 }}>
              Twelve capabilities, one health department. Not built for a demo — built for the classroom, the dormitory
              and the sick bay a real school actually runs.
            </p>
          </div>
          <Photo photo={photos.classroomStudents} ratio="wide" />
        </div>
      </Section>

      {/* Medication */}
      <Section id="medication" tone="cream">
        <div className="s-split s-split-narrow s-split-top">
          <div>
            <Eyebrow>Medication</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 18px" }}>A chain of custody, not a drawer.</h2>
            <p className="s-lede">
              The medicine a parent sends to school is a responsibility the school takes on the moment it arrives. Mlezi
              makes each link in that chain explicit and recorded.
            </p>
            <Bullets items={[
              "Handover captured with quantity, form and expiry",
              "Nurse verification against the student's health record",
              "A named storage location, assigned and auditable",
              "Scheduled doses with the administering staff member recorded",
              "Parent visibility as each dose is given",
              "End-of-term reconciliation: returned, carried forward or safely disposed",
            ]} />
          </div>
          <MedicationTimelineMock />
        </div>
      </Section>

      {/* Telehealth */}
      <Section id="telehealth">
        <div className="s-split s-split-wide s-split-top">
          <TelehealthMock />
          <div>
            <Eyebrow>Telehealth</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 18px" }}>Another clinician, without leaving the sick bay.</h2>
            <p className="s-lede">
              Telehealth in Mlezi is not a consumer video call. It is a clinical pathway with a school nurse at both ends
              of it — preparing the case, staying with the student, and carrying out what is decided.
            </p>
            <Bullets items={[
              "Nurse-initiated, from an assessment already made on site",
              "Consent confirmed before the consultation opens",
              "A pre-consultation summary with observations and relevant history",
              "Connected-device readiness for vitals where equipment allows",
              "Outcome recorded: treatment, follow-up or referral",
            ]} />
            <div style={{ marginTop: 26 }}>
              <Callout>Telehealth does not replace emergency care. In an emergency, staff follow the school's emergency procedures first.</Callout>
            </div>
          </div>
        </div>
      </Section>

      {/* Incidents */}
      <Section id="incidents" tone="grey">
        <div className="s-split s-split-top">
          <div>
            <Eyebrow>Incidents</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 18px" }}>A record that keeps up with the event.</h2>
            <p className="s-lede">
              An incident is not a form filled in at the end of the day. Mlezi captures the sequence as it happens, so the
              account that exists afterwards is the account of what actually occurred.
            </p>
            <Bullets items={[
              "Reported by any staff member, categorised on entry",
              "Response times captured automatically",
              "Assessment, treatment and escalation in one thread",
              "Parent notification recorded against the incident",
              "Referral and follow-up linked, with a closure checklist",
            ]} />
          </div>
          <IncidentTimelineMock />
        </div>
      </Section>

      {/* Screening */}
      <Section id="screening">
        <div className="s-split s-split-wide s-split-top">
          <ScreeningMock />
          <div>
            <Eyebrow>Screening</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 18px" }}>Find what nobody has reported yet.</h2>
            <p className="s-lede">
              Run a term campaign across the whole school, track who has been seen and who has not, and follow every
              finding through to a recorded outcome.
            </p>
            <Bullets items={[
              "Campaigns by term, form, house or sports squad",
              "Vision, dental, growth, blood pressure and general health",
              "Missed-student states: absent, unavailable, declined, reschedule",
              "Findings assigned with priority, owner and due date",
              "Referral where needed, closed with a resolution",
            ]} />
          </div>
        </div>
      </Section>

      {/* Intelligence */}
      <Section id="intelligence" tone="cream">
        <div className="s-split s-split-top">
          <div>
            <Eyebrow>Health intelligence</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 18px" }}>Patterns, for the people who can act on them.</h2>
            <p className="s-lede">
              School leadership needs to know that something is happening in Dorm C. They do not need to know which child
              was seen for what. Mlezi is built around that distinction.
            </p>
            <Bullets items={[
              "Health events and illness trends across the term",
              "Dormitory and house patterns",
              "Injuries by sport and activity",
              "Referral volumes and turnaround",
              "Screening findings by category",
            ]} />
            <div style={{ marginTop: 26 }}>
              <Callout>Mlezi reports a <b>pattern detected</b>. It does not diagnose, and it does not expose an individual student's clinical record to anyone who should not see it.</Callout>
            </div>
          </div>
          <IntelligenceMock />
        </div>
      </Section>

      {/* Referrals + cover */}
      <Section id="referrals">
        <div className="s-split s-split-wide s-split-top">
          <CoverMock />
          <div>
            <Eyebrow>Referrals and medical cover</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 18px" }}>The journey off campus, coordinated.</h2>
            <p className="s-lede">
              When a student needs care the school cannot provide, the delay is almost never clinical. It is paperwork,
              permission and a phone that is not being answered.
            </p>
            <Bullets items={[
              "Preferred facilities recorded per student, with a backup",
              "Cover information attached to the referral, not searched for",
              "Parent authorisation requested and tracked",
              "Handoff summary for the receiving facility",
              "Return of information and follow-up back at school",
            ]} />
            <p className="s-small" style={{ marginTop: 20 }}>
              Mlezi organises medical-cover information. It does not underwrite, adjudicate or process claims.
            </p>
          </div>
        </div>
      </Section>

      {/* Access */}
      <Section id="rbac" tone="forest" className="s-dark">
        <div className="s-split s-split-top">
          <div>
            <Eyebrow dark>Roles, permissions and audit</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 18px" }}>Care is shared. Access is accountable.</h2>
            <p className="s-lede">
              Eleven default roles, a permission matrix by action type and sensitivity, scope visibility, access review and
              a guarded confirmation before anyone reaches sensitive information.
            </p>
            <div style={{ marginTop: 30 }}><Btn href="/security" tone="cream">How we protect health information</Btn></div>
          </div>
          <div style={{ background: "#fff", borderRadius: 14, padding: 14 }}>
            <AccessMock />
          </div>
        </div>
      </Section>

      {/* Health Station */}
      <Section id="health-station" tone="cream-deep">
        <div className="s-head-split">
          <SectionHead
            eyebrow="Mlezi Health Station"
            title="Software is only half the health department."
            lede="Schools can start with a Mlezi Health Station: essential assessment equipment, a connected workflow and Mlezi software in one deployment package."
          />
          <div style={{ paddingBottom: 6 }}>
            <Btn href="/demo">Request a School Package</Btn>
            <p className="s-small" style={{ marginTop: 14 }}>One-time setup package. Configuration varies by school size.</p>
          </div>
        </div>
        <HealthStationMock />
        <div style={{ marginTop: 26 }}>
          <Callout>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
              <Package size={15} /> Equipment lists are illustrative. The final package is agreed with each school during onboarding.
            </span>
          </Callout>
        </div>
      </Section>

      <Section size="sm" tone="grey">
        <div className="s-head-split" style={{ marginBottom: 0 }}>
          <SectionHead eyebrow="Next" title="See it in the shape of a real school day." lede="The platform makes more sense as a sequence than a feature list." />
          <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap", paddingBottom: 8 }}>
            <TextLink href="/how-it-works">How it works</TextLink>
            <TextLink href="/for-schools">For schools</TextLink>
            <TextLink href="/pricing">Pricing</TextLink>
          </div>
        </div>
      </Section>

      <Finale
        title={<>Give your health department a system worthy of the responsibility it carries.</>}
        copy="Mlezi connects schools, parents and healthcare professionals around the health of every student."
      />
    </SiteLayout>
  );
}
