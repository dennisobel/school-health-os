import {
  Activity, BadgeCheck, Building2, CalendarCheck, Camera, Eye, FileHeart, HeartPulse, LockKeyhole,
  MessageCircle, Mic, Package, Pill, ShieldCheck, Smile, Stethoscope, Tablet, Thermometer, Video, Weight, Wind,
} from "lucide-react";
import { cn } from "../pages/shared";

/**
 * Interface mockups for the marketing site. These are presentation-only
 * renderings of the Mlezi product — no live data, no interaction.
 */

/* ---------------- School platform ---------------- */

export function SchoolDashboardMock() {
  return (
    <div className="mk">
      <div className="mk-bar">
        <span className="mk-dots"><i /><i /><i /></span>
        <span>greenfields.mlezi.health</span>
        <span><LockKeyhole size={10} /> secure workspace</span>
      </div>
      <div className="mk-app">
        <aside className="mk-side">
          <div className="mk-side-brand"><HeartPulse size={13} /> MLEZI HEALTH</div>
          <nav>
            <div className="on">Dashboard</div>
            <div>Students</div>
            <div>Sick Bay <b>7</b></div>
            <div>Medication</div>
            <div>Incidents</div>
            <div>Referrals</div>
            <div>Screening</div>
            <div>Telehealth</div>
            <div>Medical Cover</div>
            <div>Health Intelligence</div>
          </nav>
        </aside>
        <div className="mk-main">
          <div className="mk-title">
            <div>
              <b style={{ fontSize: 15 }}>Good morning, Nurse Wanjiku</b>
              <span style={{ display: "block", marginTop: 4, fontSize: 10, color: "var(--ink-mute)" }}>Tuesday, 15 September · Term 3 · 1,248 students</span>
            </div>
            <span className="s-tag live"><i /> All systems normal</span>
          </div>
          <div className="mk-kpis">
            <div className="mk-kpi"><small>Seen today</small><b>23</b><em>sick bay</em></div>
            <div className="mk-kpi"><small>Doses due</small><b>18</b><em>on track</em></div>
            <div className="mk-kpi"><small>Referrals</small><b>02</b><em>1 in transit</em></div>
            <div className="mk-kpi"><small>Readiness</small><b>96%</b><em>+3 this term</em></div>
          </div>
          <div className="mk-cols">
            <div className="mk-panel">
              <div className="mk-panel-head"><span>Today's sick-bay queue</span><span>View all</span></div>
              <div className="mk-row"><b>Amara Njeri</b><span>Headache · Form 2</span><span className="mk-pill amber">waiting</span></div>
              <div className="mk-row"><b>Brian Otieno</b><span>Ankle injury · Rugby</span><span className="mk-pill">in triage</span></div>
              <div className="mk-row"><b>Wambui Kamau</b><span>Asthma review · Form 4</span><span className="mk-pill">telehealth</span></div>
              <div className="mk-row"><b>Jabali Mwangi</b><span>Fever · Kifaru House</span><span className="mk-pill amber">waiting</span></div>
              <div className="mk-row"><b>Sifa Achieng</b><span>Follow-up · Chui House</span><span className="mk-pill grey">scheduled</span></div>
            </div>
            <div className="mk-panel">
              <div className="mk-panel-head"><span>Health readiness</span><span>Term 3</span></div>
              <div className="mk-ring" style={{ background: "conic-gradient(var(--forest) 0 96%, var(--grey) 96%)" }}><b>96%</b></div>
              <div style={{ textAlign: "center", fontSize: 9.5, color: "var(--ink-mute)", lineHeight: 1.45 }}>
                1,198 of 1,248 students<br />ready for the term
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Parent alerts (SMS / WhatsApp) ---------------- */

const parentMessages = [
  { time: "08:03", body: "Salbutamol inhaler administered for Maria — 08:00, given by Nurse Wanjiku." },
  { time: "14:32", body: "Maria was seen at the health centre today (headache). Treated and back in class." },
  { time: "Yesterday", body: "Reminder: Maria has an asthma follow-up on 18 Sept at the school health centre.", hideCompact: true },
];

export function ParentPhoneMock({ compact }: { compact?: boolean }) {
  return (
    <div className="mk-phone">
      <div className="mk-phone-screen">
        <div className="mk-phone-top">
          <div className="row"><span>Mlezi Health</span><span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><MessageCircle size={10} /> SMS &amp; WhatsApp</span></div>
          <div className="mk-phone-student">
            <span className="mk-avatar">MW</span>
            <div>
              <b>Alerts for Maria Wanjiku</b>
              <span>Sent to +254 7•• ••• ••• · no app or login needed</span>
            </div>
          </div>
        </div>
        <div className="mk-phone-body">
          {parentMessages.filter((message) => !(compact && message.hideCompact)).map((message) => (
            <div className="mk-chat-bubble" key={message.time}>
              <span>{message.body}</span>
              <em>{message.time} · delivered</em>
            </div>
          ))}
          <div className="mk-chat-bubble is-good">
            <b>Nothing needs your attention right now.</b>
            <span>Your child's health team has this. We'll message you if that changes.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Medication chain of custody ---------------- */

const medicationSteps = [
  { when: "Term start", title: "Handed over by parent", copy: "Salbutamol inhaler · 1 unit · expiry 04/2027", state: "done" },
  { when: "Term start", title: "Verified by the nurse", copy: "Checked against the student's health record", state: "done" },
  { when: "Term start", title: "Stored securely", copy: "Cabinet B · shelf 2 · logged to Maria Wanjiku", state: "done" },
  { when: "Daily", title: "Dose scheduled", copy: "08:00 and 20:00 · as advised by the treating clinician", state: "done" },
  { when: "Today 08:00", title: "Administered", copy: "2 puffs · recorded by Nurse G. Wanjiku", state: "done" },
  { when: "Today 08:02", title: "Parent visibility", copy: "Dose visible in the Mlezi Care timeline", state: "done" },
  { when: "Term end", title: "Returned or reconciled", copy: "Counted, returned to the parent or safely disposed", state: "next" },
];

export function MedicationTimelineMock() {
  return (
    <div className="mk">
      <div className="mk-bar">
        <span className="mk-dots"><i /><i /><i /></span>
        <span>Medication record · Maria Wanjiku</span>
        <span><Pill size={10} /> chain of custody</span>
      </div>
      <div className="mk-body">
        <div className="mk-time">
          {medicationSteps.map((step) => (
            <div className={cn("mk-time-row", step.state === "done" && "is-done", step.state === "next" && "is-next")} key={step.title}>
              <span className="mk-time-when">{step.when}</span>
              <span className="mk-time-rail"><i /></span>
              <span className="mk-time-card">
                <b>{step.title}</b>
                <span>{step.copy}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Telehealth ---------------- */

export function TelehealthMock() {
  return (
    <div className="mk">
      <div className="mk-bar">
        <span className="mk-dots"><i /><i /><i /></span>
        <span>Consultation room</span>
        <span className="s-tag live" style={{ fontSize: 9 }}><i /> live</span>
      </div>
      <div className="mk-body">
        <div className="mk-call">
          <div className="mk-call-stage">
            <Stethoscope size={40} />
            <span className="who">Dr. A. Kamau · Clinical Officer</span>
            <span className="mk-call-self"><Smile size={18} /></span>
          </div>
          <div className="mk-call-ctrls">
            <i><Mic size={13} /></i><i><Camera size={13} /></i><i className="end"><Video size={13} /></i>
          </div>
        </div>
        <div className="mk-panel" style={{ marginTop: 12 }}>
          <div className="mk-panel-head"><span>Pre-consultation summary</span><span>Shared by the school nurse</span></div>
          <div className="mk-row"><b>Student</b><span>Wambui Kamau · Form 4</span><span className="mk-pill grey">consented</span></div>
          <div className="mk-row"><b>Presenting</b><span>Asthma review · 3rd episode this term</span><span className="mk-pill amber">review</span></div>
          <div className="mk-row"><b>Observations</b><span>SpO₂ 96% · RR 22 · afebrile</span><span className="mk-pill">recorded</span></div>
          <div className="mk-row"><b>On site</b><span>Nurse G. Wanjiku present throughout</span><span className="mk-pill">present</span></div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Health readiness ---------------- */

const readinessBars = [
  { label: "Medical profiles complete", value: "96%", width: 96, tone: "" },
  { label: "Emergency contacts verified", value: "99%", width: 99, tone: "" },
  { label: "Medication reconciliation", value: "92%", width: 92, tone: "mid" },
];

export function ReadinessMock() {
  return (
    <div className="mk">
      <div className="mk-bar">
        <span className="mk-dots"><i /><i /><i /></span>
        <span>School health readiness</span>
        <span><Activity size={10} /> Term 3</span>
      </div>
      <div className="mk-body">
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 22, alignItems: "center" }}>
          <div>
            <div className="mk-ring" style={{ background: "conic-gradient(var(--forest) 0 96%, var(--grey) 96%)", margin: 0 }}><b>96%</b></div>
            <div style={{ textAlign: "center", marginTop: 10, fontSize: 9.5, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink-mute)" }}>Readiness</div>
          </div>
          <div className="mk-bars">
            {readinessBars.map((bar) => (
              <div className="mk-bar-item" key={bar.label}>
                <b>{bar.label} <span>{bar.value}</span></b>
                <span className="mk-track"><i className={bar.tone} style={{ width: `${bar.width}%` }} /></span>
              </div>
            ))}
          </div>
        </div>
        <div className="mk-row" style={{ marginTop: 16 }}><b>Outstanding referrals</b><span>Awaiting hospital feedback</span><span className="mk-pill amber">7</span></div>
        <div className="mk-row"><b>Pending parent approvals</b><span>Consent and medical information</span><span className="mk-pill clay">6</span></div>
      </div>
    </div>
  );
}

/* ---------------- Incident timeline ---------------- */

const incidentSteps = [
  { when: "09:13", title: "Incident reported", copy: "Rugby training · reported by the games teacher" },
  { when: "09:16", title: "Nurse arrives on site", copy: "Response logged automatically" },
  { when: "09:18", title: "Student assessed", copy: "Ankle injury · no loss of consciousness" },
  { when: "09:47", title: "Parent notified", copy: "Notification sent with next steps" },
  { when: "10:02", title: "Referral initiated", copy: "Nearest preferred facility · cover details attached" },
];

export function IncidentTimelineMock() {
  return (
    <div className="mk">
      <div className="mk-bar">
        <span className="mk-dots"><i /><i /><i /></span>
        <span>Incident · INC-2026-0184</span>
        <span className="mk-pill amber" style={{ fontSize: 9 }}>sports injury</span>
      </div>
      <div className="mk-body">
        <div className="mk-time">
          {incidentSteps.map((step) => (
            <div className="mk-time-row is-done" key={step.when}>
              <span className="mk-time-when">{step.when}</span>
              <span className="mk-time-rail"><i /></span>
              <span className="mk-time-card"><b>{step.title}</b><span>{step.copy}</span></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Screening ---------------- */

const screeningMetrics = [
  { icon: Eye, label: "Vision" },
  { icon: Smile, label: "Dental" },
  { icon: Weight, label: "Growth" },
  { icon: Activity, label: "Blood pressure" },
  { icon: Wind, label: "General health" },
];

export function ScreeningMock() {
  return (
    <div className="mk">
      <div className="mk-bar">
        <span className="mk-dots"><i /><i /><i /></span>
        <span>Term Medical Screening · Term 3</span>
        <span className="s-tag live" style={{ fontSize: 9 }}><i /> active</span>
      </div>
      <div className="mk-body">
        <div className="mk-title">
          <b>847 / 1,248 students screened</b>
          <span>68% complete</span>
        </div>
        <span className="mk-track" style={{ height: 8 }}><i style={{ width: "68%" }} /></span>
        <div className="mk-kit" style={{ gridTemplateColumns: "repeat(5, 1fr)", marginTop: 16 }}>
          {screeningMetrics.map((metric) => (
            <div className="mk-kit-item" key={metric.label} style={{ padding: "14px 8px" }}>
              <metric.icon size={17} />
              <b>{metric.label}</b>
            </div>
          ))}
        </div>
        <div className="mk-row" style={{ marginTop: 14 }}><b>38 findings</b><span>Referred to follow-up</span><span className="mk-pill amber">in progress</span></div>
        <div className="mk-row"><b>19 resolved</b><span>Closed with an outcome recorded</span><span className="mk-pill">resolved</span></div>
      </div>
    </div>
  );
}

/* ---------------- Health intelligence ---------------- */

const dorms = [
  { name: "Dorm A", note: "Normal", level: "" },
  { name: "Dorm B", note: "Normal", level: "" },
  { name: "Dorm C", note: "Elevated", level: "l3" },
  { name: "Dorm D", note: "Slightly up", level: "l1" },
  { name: "Dorm E", note: "Normal", level: "" },
];

export function IntelligenceMock() {
  return (
    <div className="mk">
      <div className="mk-bar">
        <span className="mk-dots"><i /><i /><i /></span>
        <span>Health intelligence · aggregate view</span>
        <span><ShieldCheck size={10} /> no clinical detail</span>
      </div>
      <div className="mk-body">
        <div className="mk-title"><b>Respiratory complaints by dormitory</b><span>Last 14 days</span></div>
        <div className="mk-heat">
          {dorms.map((dorm) => (
            <div className={dorm.level} key={dorm.name}>{dorm.name}<b>{dorm.note}</b></div>
          ))}
        </div>
        <div className="mk-panel" style={{ marginTop: 14 }}>
          <div className="mk-panel-head"><span>Pattern detected</span><span>For the health team to review</span></div>
          <p style={{ fontSize: 11.5, lineHeight: 1.55, color: "var(--ink-mute)", marginTop: 6 }}>
            Dorm C shows more respiratory complaints than the school average over the last 14 days. This is a pattern for the
            health team to look into — not a diagnosis.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Role-based access ---------------- */

const accessRows = [
  { role: "School nurse", icon: Stethoscope, detail: "Full clinical access for the students in their care", limited: false },
  { role: "Matron", icon: Building2, detail: "Operational health information — care instructions, not clinical notes", limited: true },
  { role: "Teacher", icon: FileHeart, detail: "Health-related operational instructions only", limited: true },
  { role: "Parent", icon: HeartPulse, detail: "Their own child, according to the school's sharing policy", limited: false },
  { role: "Health prefect", icon: BadgeCheck, detail: "Report a concern. No access to any medical record", limited: true },
];

export function AccessMock() {
  return (
    <div className="mk-access">
      {accessRows.map((row) => (
        <div className={cn("mk-access-row", row.limited && "is-limited")} key={row.role}>
          <b><row.icon size={14} /> {row.role}</b>
          <span>{row.detail}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Medical cover ---------------- */

export function CoverMock() {
  return (
    <div className="mk">
      <div className="mk-bar">
        <span className="mk-dots"><i /><i /><i /></span>
        <span>Medical cover · Maria Wanjiku</span>
        <span className="mk-pill" style={{ fontSize: 9 }}>active</span>
      </div>
      <div className="mk-body">
        <div className="mk-row" style={{ borderTop: 0 }}><b>Cover on file</b><span>Provided by the parent · verified 02 Sep</span><span className="mk-pill">on file</span></div>
        <div className="mk-row"><b>Preferred facility</b><span>Nakuru Level 5 Hospital · 14 km</span><span className="mk-pill grey">primary</span></div>
        <div className="mk-row"><b>Second option</b><span>Gilgil Sub-County Hospital · 9 km</span><span className="mk-pill grey">backup</span></div>
        <div className="mk-row"><b>Referral authorisation</b><span>Parent approval requested 10:02</span><span className="mk-pill amber">awaiting</span></div>
        <div className="mk-row"><b>Documents</b><span>Cover letter · previous discharge summary</span><span className="mk-pill">2 files</span></div>
      </div>
    </div>
  );
}

/* ---------------- Clinical queue ---------------- */

export function ClinicianQueueMock() {
  return (
    <div className="mk">
      <div className="mk-bar">
        <span className="mk-dots"><i /><i /><i /></span>
        <span>Clinical queue</span>
        <span><CalendarCheck size={10} /> Tue 15 Sept</span>
      </div>
      <div className="mk-body">
        <div className="mk-title"><b>4 consultations waiting</b><span>Across 3 schools</span></div>
        <div className="mk-row"><b>Greenfields Academy</b><span>Asthma review · Form 4</span><span className="mk-pill amber">next</span></div>
        <div className="mk-row"><b>St. Monica's Girls</b><span>Skin complaint · Form 1</span><span className="mk-pill grey">queued</span></div>
        <div className="mk-row"><b>Rift Valley High</b><span>Follow-up after referral</span><span className="mk-pill grey">queued</span></div>
        <div className="mk-row"><b>Greenfields Academy</b><span>Counselling session · scheduled</span><span className="mk-pill">14:30</span></div>
        <div className="mk-panel" style={{ marginTop: 14 }}>
          <div className="mk-panel-head"><span>Every case arrives with context</span></div>
          <p style={{ fontSize: 11.5, lineHeight: 1.55, color: "var(--ink-mute)", marginTop: 6 }}>
            Presenting complaint, observations taken on site, relevant history, consent status and the name of the school
            health professional who will stay with the student.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Health Station ---------------- */

const kitItems = [
  { icon: Activity, label: "Blood pressure monitor", note: "Digital, upper arm" },
  { icon: HeartPulse, label: "Pulse oximeter", note: "SpO₂ and pulse" },
  { icon: Thermometer, label: "Thermometer", note: "Non-contact" },
  { icon: Stethoscope, label: "Stethoscope", note: "Dual head" },
  { icon: Weight, label: "Weighing scale", note: "With height rod" },
  { icon: Package, label: "First-aid supplies", note: "Restockable" },
  { icon: Tablet, label: "Tablet", note: "Mlezi pre-installed" },
  { icon: LockKeyhole, label: "Secure storage", note: "Lockable medication cabinet" },
];

export function HealthStationMock() {
  return (
    <div className="mk-kit">
      {kitItems.map((item) => (
        <div className="mk-kit-item" key={item.label}>
          <item.icon size={20} />
          <b>{item.label}</b>
          <span>{item.note}</span>
        </div>
      ))}
    </div>
  );
}
