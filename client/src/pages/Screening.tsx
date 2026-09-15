import {
  Activity, AlertCircle, AlertTriangle, ArrowRight, Building2, Check, ChevronRight,
  ClipboardCheck, Clock3, Ear, Eye, FileText, Info, LockKeyhole, Plus, RotateCcw, Ruler,
  ShieldCheck, Smile, Stethoscope, Thermometer, Users, UserX, Weight, Wind, X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { cn, PageHeader, Stat } from "./shared";

type CampaignStatus = "Active" | "Scheduled" | "Completed" | "Draft";
interface Campaign {
  id: string; name: string; type: string; start: string; end: string;
  target: number; completed: number; followUps: number; owner: string; status: CampaignStatus;
}

const initialCampaigns: Campaign[] = [
  { id: "c1", name: "Term 3 Medical Screening", type: "Term Medical Screening", start: "01 Sep 2026", end: "30 Sep 2026", target: 1248, completed: 847, followUps: 38, owner: "Nurse Grace Wanjiku", status: "Active" },
  { id: "c2", name: "Rugby & Athletics Clearance", type: "Sports Clearance", start: "18 Sep 2026", end: "25 Sep 2026", target: 212, completed: 96, followUps: 5, owner: "Dr. Amos Kamau", status: "Active" },
  { id: "c3", name: "Annual Health Assessment 2026", type: "Annual Health Assessment", start: "12 Jan 2026", end: "28 Feb 2026", target: 1248, completed: 1248, followUps: 64, owner: "Dr. Njeri Wanjiku", status: "Completed" },
  { id: "c4", name: "Form 1 Vision & Hearing Baseline", type: "Vision Screening", start: "03 Feb 2026", end: "14 Feb 2026", target: 312, completed: 312, followUps: 19, owner: "Nurse A. Mutua", status: "Completed" },
  { id: "c5", name: "Term 3 Dental Screening", type: "Dental Screening", start: "05 Oct 2026", end: "16 Oct 2026", target: 1248, completed: 0, followUps: 0, owner: "Health Administrator", status: "Scheduled" },
  { id: "c6", name: "Boarding Nutrition Assessment", type: "Nutrition Assessment", start: "—", end: "—", target: 0, completed: 0, followUps: 0, owner: "Health Administrator", status: "Draft" },
];

const campaignTypes = ["Term Medical Screening", "Annual Health Assessment", "Sports Clearance", "Dental Screening", "Vision Screening", "Hearing Screening", "Nutrition Assessment", "Vaccination / Preventive Programme", "Custom Campaign"];
const houses = ["Kifaru House", "Simba House", "Tembo House", "Chui House", "Acacia House"];
const forms = ["Form 1", "Form 2", "Form 3", "Form 4"];
const staffPool = ["Nurse Grace Wanjiku", "Nurse A. Mutua", "Dr. Njeri Wanjiku", "Dr. Amos Kamau", "Health Administrator"];
const measurementOptions = ["Height", "Weight", "BMI", "Temperature", "Blood Pressure", "Pulse", "SpO2", "Vision", "Hearing", "Dental"];

type Priority = "Low" | "Medium" | "High" | "Urgent";
type FollowUpStatus = "Pending" | "In Progress" | "Referred" | "Completed";
interface FollowUp {
  id: string; student: string; admission: string; house: string; form: string;
  finding: string; priority: Priority; assignedTo: string; dueDate: string; status: FollowUpStatus;
}

const initialFollowUps: FollowUp[] = [
  { id: "f1", student: "Aisha Hassan", admission: "GFA-0512", house: "Chui House", form: "Form 2", finding: "Vision concern — reduced acuity, left eye", priority: "Medium", assignedTo: "Nurse Grace Wanjiku", dueDate: "20 Sep", status: "Pending" },
  { id: "f2", student: "Khalid Hassan", admission: "GFA-0441", house: "Kifaru House", form: "Form 1", finding: "Blood pressure — above expected range for age", priority: "Urgent", assignedTo: "Dr. Njeri Wanjiku", dueDate: "18 Sep", status: "In Progress" },
  { id: "f3", student: "Linet Wambui", admission: "GFA-0155", house: "Simba House", form: "Form 4", finding: "Hearing — reduced response, right ear", priority: "High", assignedTo: "Dr. Njeri Wanjiku", dueDate: "19 Sep", status: "Referred" },
  { id: "f4", student: "Dylan Kibet", admission: "GFA-0398", house: "Simba House", form: "Form 3", finding: "Elevated BMI — nutrition review recommended", priority: "Medium", assignedTo: "Nurse A. Mutua", dueDate: "22 Sep", status: "In Progress" },
  { id: "f5", student: "Moses Kiptoo", admission: "GFA-0276", house: "Tembo House", form: "Form 2", finding: "Dental — suspected cavity, upper molar", priority: "Low", assignedTo: "Nurse Grace Wanjiku", dueDate: "24 Sep", status: "Pending" },
  { id: "f6", student: "Sifa Achieng", admission: "GFA-0298", house: "Chui House", form: "Form 3", finding: "General health — persistent fatigue reported", priority: "Low", assignedTo: "Nurse Grace Wanjiku", dueDate: "26 Sep", status: "Completed" },
];

type MissedState = "Not Yet Screened" | "Absent" | "Unavailable" | "Declined" | "Reschedule";
const missedEntries: { student: string; house: string; form: string; state: MissedState }[] = [
  { student: "Brian Otieno", house: "Simba House", form: "Form 3", state: "Absent" },
  { student: "Wambui Kamau", house: "Tembo House", form: "Form 4", state: "Unavailable" },
  { student: "Jabali Mwangi", house: "Kifaru House", form: "Form 1", state: "Not Yet Screened" },
  { student: "Amara Njeri", house: "Kifaru House", form: "Form 2", state: "Reschedule" },
  { student: "Brian Kamau", house: "Acacia House", form: "Form 2", state: "Declined" },
];

type Outcome = "Normal" | "Follow-up Required" | "Urgent Review" | "Referral Required";
interface ScreeningEntry {
  date: string; campaign: string; height: number; weight: number; bmi: number; temperature: number; bp: string; pulse: number; spo2: number;
  vision: string; hearing: string; dental: string; generalHealth: string; outcome: Outcome;
}
const screeningHistory: Record<string, ScreeningEntry[]> = {
  "Amara Njeri": [
    { date: "15 Sep 2026", campaign: "Term 3 Medical Screening", height: 158, weight: 53.4, bmi: 21.4, temperature: 36.7, bp: "110/72", pulse: 78, spo2: 98, vision: "Normal", hearing: "Normal", dental: "Follow-up Required", generalHealth: "Normal", outcome: "Follow-up Required" },
    { date: "14 Feb 2026", campaign: "Annual Health Assessment 2026", height: 156, weight: 51.0, bmi: 21.0, temperature: 36.6, bp: "108/70", pulse: 80, spo2: 98, vision: "Normal", hearing: "Normal", dental: "Normal", generalHealth: "Normal", outcome: "Normal" },
  ],
  "Maria Wanjiku": [
    { date: "12 Sep 2026", campaign: "Rugby & Athletics Clearance", height: 165, weight: 57.2, bmi: 21.0, temperature: 36.8, bp: "112/74", pulse: 82, spo2: 97, vision: "Normal", hearing: "Normal", dental: "Normal", generalHealth: "Normal", outcome: "Normal" },
  ],
};

const findingsBreakdown: [string, string, number][] = [
  ["Dental", "Cavity or gum concern flagged for review", 84],
  ["Vision", "Reduced acuity flagged for review", 62],
  ["Growth", "BMI outside the expected range for age", 47],
  ["Hearing", "Reduced response flagged for review", 21],
  ["Blood pressure", "Above the expected range for age", 9],
];
const houseAggregate = [
  ["Kifaru House", 312, 289, 18, 92],
  ["Simba House", 298, 270, 22, 91],
  ["Tembo House", 276, 241, 14, 87],
  ["Chui House", 204, 180, 11, 88],
  ["Acacia House", 158, 142, 9, 90],
] as const;
const formAggregate = [
  ["Form 1", 312, 301, 96],
  ["Form 2", 298, 264, 89],
  ["Form 3", 326, 280, 86],
  ["Form 4", 312, 191, 61],
] as const;
const bmiTrend = [21.1, 21.2, 21.0, 21.3, 21.3, 21.4, 21.5, 21.4, 21.6, 21.5, 21.7, 21.6];
const reportTypes: [any, string, string][] = [
  [ClipboardCheck, "Campaign Completion Report", "Completion, pending and absent counts for any screening campaign."],
  [Activity, "Screening Findings Report", "Aggregate findings requiring review, grouped by screening type."],
  [ArrowRight, "Follow-up Report", "Every open and resolved follow-up, with priority and owner."],
  [Building2, "Dormitory Screening Summary", "Completion and findings broken down by house and dormitory."],
  [Users, "Form Screening Summary", "Completion and findings broken down by form."],
  [FileText, "Term Health Screening Summary", "A full picture of preventive screening across the term."],
];
const sessionPool = ["Maria Wanjiku", "Brian Kamau", "Dylan Kibet", "Sifa Achieng", "Moses Kiptoo"];
const facilities = ["Aga Khan University Hospital", "Nairobi West Hospital", "Coptic Hope Medical Centre", "Kenyatta National Hospital"];

const roleViews = ["Nurse", "Doctor", "Health Administrator", "School Administrator", "Teacher / Matron"] as const;
type RoleView = typeof roleViews[number];

function tone(o: Outcome | Priority | FollowUpStatus | CampaignStatus | MissedState) {
  if (o === "Normal" || o === "Completed" || o === "Active" || o === "Low") return "teal";
  if (o === "Follow-up Required" || o === "Pending" || o === "Scheduled" || o === "Medium" || o === "In Progress" || o === "Reschedule") return "amber";
  if (o === "Urgent Review" || o === "Urgent" || o === "High" || o === "Absent" || o === "Declined") return "red";
  if (o === "Referral Required" || o === "Referred" || o === "Draft" || o === "Not Yet Screened" || o === "Unavailable") return "blue";
  return "blue";
}

export function ScreeningPage() {
  const [tab, setTab] = useState<"campaigns" | "follow-ups" | "trends" | "reports">("campaigns");
  const [viewRole, setViewRole] = useState<RoleView>("Nurse");
  const [campaignList, setCampaignList] = useState<Campaign[]>(initialCampaigns);
  const [followUpList, setFollowUpList] = useState<FollowUp[]>(initialFollowUps);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedFollowUp, setSelectedFollowUp] = useState<FollowUp | null>(null);
  const [referralFor, setReferralFor] = useState<FollowUp | null>(null);
  const [session, setSession] = useState<{ campaign: Campaign; queue: string[]; index: number; done: number } | null>(null);
  const [toast, setToast] = useState("");

  const canCreateCampaign = viewRole === "Health Administrator";
  const canRunSession = viewRole === "Nurse" || viewRole === "Doctor";
  const canSeeFindings = viewRole !== "Teacher / Matron";
  const canAct = viewRole === "Nurse" || viewRole === "Doctor";

  const activeCampaignList = campaignList.filter(c => c.status === "Active");
  const totalTarget = activeCampaignList.reduce((s, c) => s + c.target, 0);
  const totalCompleted = activeCampaignList.reduce((s, c) => s + c.completed, 0);
  const activeCampaigns = activeCampaignList.length;
  const openFollowUps = followUpList.filter(f => f.status !== "Completed").length;
  const criticalFindings = followUpList.filter(f => f.priority === "Urgent").length;
  const completionRate = totalTarget ? Math.round((totalCompleted / totalTarget) * 100) : 0;
  const featured = campaignList.find(c => c.status === "Active") || campaignList[0];
  const featuredBreakdown = featured.id === "c1"
    ? { completed: 847, pending: 312, absent: 52, refused: 9, followUp: 38, repeat: 28 }
    : { completed: featured.completed, pending: Math.max(featured.target - featured.completed - featured.followUps, 0), absent: 0, refused: 0, followUp: featured.followUps, repeat: 0 };

  const updateFollowUp = (id: string, patch: Partial<FollowUp>) => setFollowUpList(list => list.map(f => f.id === id ? { ...f, ...patch } : f));

  return (
    <>
      <PageHeader eyebrow="School health" title="Health Screening" description="Monitor preventive health across the school population." action={canCreateCampaign ? "New campaign" : undefined} onAction={() => setCreateOpen(true)} />

      <div className="role-switch">
        {roleViews.map(r => <button key={r} className={cn("role-pill", viewRole === r && "active")} onClick={() => setViewRole(r)}>{r}</button>)}
      </div>
      <p className="role-switch-note">Viewing Screening as this role · demonstrates how access to findings and actions changes across the health team.</p>

      <div className="alert-banner">
        <ShieldCheck size={18} />
        <div><strong>Findings requiring review, not diagnoses</strong><span>Screening flags patterns for a clinician to interpret. Sensitive findings follow the same access rules as clinical records.</span></div>
      </div>

      <div className="incident-stat-grid">
        <Stat icon={ClipboardCheck} label="Active campaigns" value={String(activeCampaigns).padStart(2, "0")} note="across the school" tone="teal" />
        <Stat icon={Clock3} label="Students due" value={String(totalTarget - totalCompleted)} note="this term" tone="amber" />
        <Stat icon={Check} label="Students completed" value={String(totalCompleted)} note={`${completionRate}% of target`} tone="teal" />
        <Stat icon={AlertTriangle} label="Follow-ups required" value={String(openFollowUps)} note="open across campaigns" tone="blue" />
        <Stat icon={AlertCircle} label="Critical findings" value={String(criticalFindings)} note="need urgent review" tone="red" />
        <Stat icon={Activity} label="Completion rate" value={`${completionRate}%`} note="all active campaigns" tone="purple" />
      </div>

      <div className="panel p-5 mb-4">
        <div className="flex items-center justify-between">
          <div><div className="eyebrow">Featured campaign</div><h3 className="mt-2 text-[16px] font-extrabold tracking-[-.04em] text-[#2d5661]">{featured.name}</h3></div>
          <span className={cn("tag", `tag-${tone(featured.status)}`)}>{featured.status}</span>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <strong className="text-[20px] font-extrabold text-[#164452]">{featured.completed.toLocaleString()} / {featured.target.toLocaleString()}</strong>
          <span className="text-[10px] text-[#8aa09e]">students completed</span>
        </div>
        <div className="segment-bar mt-3">
          <span style={{ width: `${featuredBreakdown.completed / featured.target * 100}%`, background: "#4fa69b" }} />
          <span style={{ width: `${featuredBreakdown.followUp / featured.target * 100}%`, background: "#e7a34e" }} />
          <span style={{ width: `${featuredBreakdown.repeat / featured.target * 100}%`, background: "#7d66a7" }} />
          <span style={{ width: `${featuredBreakdown.pending / featured.target * 100}%`, background: "#dfe7e5" }} />
          <span style={{ width: `${featuredBreakdown.absent / featured.target * 100}%`, background: "#d97a72" }} />
          <span style={{ width: `${featuredBreakdown.refused / featured.target * 100}%`, background: "#b64747" }} />
        </div>
        <div className="segment-legend">
          <span className="segment-legend-item"><i style={{ background: "#4fa69b" }} />Completed · {featuredBreakdown.completed}</span>
          <span className="segment-legend-item"><i style={{ background: "#e7a34e" }} />Requires follow-up · {featuredBreakdown.followUp}</span>
          <span className="segment-legend-item"><i style={{ background: "#7d66a7" }} />Needs repeat test · {featuredBreakdown.repeat}</span>
          <span className="segment-legend-item"><i style={{ background: "#dfe7e5" }} />Pending · {featuredBreakdown.pending}</span>
          <span className="segment-legend-item"><i style={{ background: "#d97a72" }} />Absent · {featuredBreakdown.absent}</span>
          <span className="segment-legend-item"><i style={{ background: "#b64747" }} />Refused · {featuredBreakdown.refused}</span>
        </div>
        {canRunSession && featured.status === "Active" && <button className="btn btn-primary btn-small mt-4" onClick={() => setSession({ campaign: featured, queue: sessionPool, index: 0, done: 0 })}>Start screening session <ArrowRight size={13} /></button>}
      </div>

      <div className="panel mb-4">
        <div className="panel-head">
          <div className="flex gap-1">
            <button className={cn("btn btn-small", tab === "campaigns" ? "btn-primary" : "btn-quiet")} onClick={() => setTab("campaigns")}>Campaigns</button>
            <button className={cn("btn btn-small", tab === "follow-ups" ? "btn-primary" : "btn-quiet")} onClick={() => setTab("follow-ups")}>Follow-ups <span className="ml-1 rounded-full bg-[#fff0d7] px-1.5 py-0.5 text-[9px] text-[#a16b1d]">{openFollowUps}</span></button>
            <button className={cn("btn btn-small", tab === "trends" ? "btn-primary" : "btn-quiet")} onClick={() => setTab("trends")}>Trends</button>
            <button className={cn("btn btn-small", tab === "reports" ? "btn-primary" : "btn-quiet")} onClick={() => setTab("reports")}>Reports</button>
          </div>
        </div>
        <div className="p-4">
          {tab === "campaigns" && <CampaignsTab campaigns={campaignList} onOpen={setSelectedCampaign} />}
          {tab === "follow-ups" && <FollowUpsTab followUps={followUpList} canSeeFindings={canSeeFindings} canAct={canAct} onOpen={setSelectedFollowUp} onAction={setToast} />}
          {tab === "trends" && <TrendsTab />}
          {tab === "reports" && <ReportsTab onGenerate={(name) => setToast(`${name} prepared for download`)} />}
        </div>
      </div>

      {toast && <div className="notice flex items-center justify-between"><span><Check size={14} className="mr-2 inline text-[#3c9488]" />{toast}</span><button onClick={() => setToast("")}><X size={14} /></button></div>}

      {selectedCampaign && <CampaignDrawer campaign={selectedCampaign} canRunSession={canRunSession} close={() => setSelectedCampaign(null)} onAction={setToast} onStartSession={(c) => { setSelectedCampaign(null); setSession({ campaign: c, queue: sessionPool, index: 0, done: 0 }); }} />}

      {createOpen && <CreateCampaignDrawer close={() => setCreateOpen(false)} onCreate={(c) => { setCampaignList(list => [c, ...list]); setCreateOpen(false); setToast(`${c.name} created and scheduled`); }} />}

      {selectedFollowUp && <FollowUpDrawer followUp={selectedFollowUp} canAct={canAct} close={() => setSelectedFollowUp(null)} onUpdate={(patch) => { updateFollowUp(selectedFollowUp.id, patch); setSelectedFollowUp(null); }} onRefer={() => { setReferralFor(selectedFollowUp); setSelectedFollowUp(null); }} />}

      {referralFor && <ReferralDrawer followUp={referralFor} close={() => setReferralFor(null)} onSend={() => { updateFollowUp(referralFor.id, { status: "Referred" }); setReferralFor(null); setToast(`Referral created for ${referralFor.student} and routed for authorisation`); }} />}

      {session && <ScreeningSessionOverlay campaign={session.campaign} queue={session.queue} index={session.index} done={session.done}
        onAdvance={(recorded) => {
          const nextIndex = session.index + 1;
          if (nextIndex >= session.queue.length) { setSession(null); setToast(`Screening session completed · ${session.done + (recorded ? 1 : 0)} students recorded`); }
          else setSession({ ...session, index: nextIndex, done: session.done + (recorded ? 1 : 0) });
        }}
        onExit={() => { setSession(null); }} />}
    </>
  );
}

function CampaignsTab({ campaigns, onOpen }: { campaigns: Campaign[]; onOpen: (c: Campaign) => void }) {
  const [status, setStatus] = useState("All");
  const filtered = useMemo(() => status === "All" ? campaigns : campaigns.filter(c => c.status === status), [campaigns, status]);
  return (
    <div>
      <div className="filter-row">
        <select className="select-input" value={status} onChange={e => setStatus(e.target.value)}>
          {["All", "Active", "Scheduled", "Completed", "Draft"].map(s => <option key={s}>{s}</option>)}
        </select>
        <span className="text-[10px] text-[#8aa09e]">{filtered.length} of {campaigns.length} campaigns</span>
      </div>
      <div className="overflow-x-auto">
        <table className="table min-w-[760px]">
          <thead><tr><th>Campaign</th><th>Dates</th><th>Students</th><th>Progress</th><th>Follow-ups</th><th>Owner</th><th>Status</th></tr></thead>
          <tbody>
            {filtered.map(c => {
              const pct = c.target ? Math.round((c.completed / c.target) * 100) : 0;
              return (
                <tr key={c.id}>
                  <td><button className="text-left" onClick={() => onOpen(c)}><strong>{c.name}</strong><span className="queue-meta">{c.type}</span></button></td>
                  <td>{c.start}{c.end !== c.start && c.end !== "—" ? ` → ${c.end}` : ""}</td>
                  <td>{c.target ? c.target.toLocaleString() : "—"}</td>
                  <td><div className="progress-track !h-1.5 !w-[90px]"><i style={{ width: `${pct}%` }} /></div><span className="queue-meta">{c.completed.toLocaleString()} · {pct}%</span></td>
                  <td>{c.followUps || "—"}</td>
                  <td>{c.owner}</td>
                  <td><span className={cn("tag", `tag-${tone(c.status)}`)}>{c.status}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CampaignDrawer({ campaign, canRunSession, close, onAction, onStartSession }: { campaign: Campaign; canRunSession: boolean; close: () => void; onAction: (m: string) => void; onStartSession: (c: Campaign) => void }) {
  const pct = campaign.target ? Math.round((campaign.completed / campaign.target) * 100) : 0;
  return (
    <div className="drawer" onClick={close}>
      <div className="drawer-panel drawer-panel-wide" onClick={e => e.stopPropagation()}>
        <div className="drawer-head">
          <div><div className="eyebrow">{campaign.type}</div><h2>{campaign.name}</h2><p>{campaign.start}{campaign.end !== campaign.start ? ` → ${campaign.end}` : ""} · Owner {campaign.owner}</p></div>
          <button className="icon-button" onClick={close}><X size={15} /></button>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <div className="drawer-section !border-t-0 !pt-0">
              <h4>Progress</h4>
              <strong className="text-[18px] font-extrabold text-[#164452]">{campaign.completed.toLocaleString()} / {campaign.target.toLocaleString()}</strong>
              <div className="progress-track mt-3"><i style={{ width: `${pct}%` }} /></div>
              <div className="detail-row"><span>Follow-ups flagged</span><strong>{campaign.followUps}</strong></div>
              <div className="detail-row"><span>Status</span><strong className={cn(tone(campaign.status) === "red" && "!text-[#b4534e]")}>{campaign.status}</strong></div>
            </div>
            <div className="drawer-section">
              <h4>Required measurements</h4>
              <div className="flex flex-wrap gap-2">{measurementOptions.slice(0, 6).map(m => <span key={m} className="tag tag-blue">{m}</span>)}</div>
            </div>
            <div className="drawer-section">
              <h4>Documents</h4>
              <div className="flex items-center justify-between rounded-md bg-[#f7faf8] px-3 py-2"><div className="flex items-center gap-2"><FileText size={14} className="text-[#3c9488]" /><span className="text-[10px] font-bold text-[#496d72]">Campaign screening form · template</span></div><ChevronRight size={13} className="text-[#91a6a3]" /></div>
              <button className="btn btn-quiet btn-small mt-2 w-full" onClick={() => onAction("Document attached to campaign")}><Plus size={12} /> Attach document</button>
              <p className="mt-2 text-[9px] text-[#8aa09e]">Uses the shared Mlezi Health Documents system.</p>
            </div>
          </div>
          <div>
            <div className="drawer-section !border-t-0 !pt-0">
              <h4>Not yet screened</h4>
              {missedEntries.map(m => (
                <div className="missed-row" key={m.student}>
                  <div><strong>{m.student}</strong><span>{m.form} · {m.house}</span></div>
                  <div className="flex items-center gap-2"><span className={cn("tag", `tag-${tone(m.state)}`)}>{m.state}</span><button className="icon-button !w-7 !h-7" onClick={() => onAction(`${m.student} scheduled again for screening`)}><RotateCcw size={12} /></button></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {canRunSession && campaign.status === "Active" && <button className="btn btn-primary w-full mt-2" onClick={() => onStartSession(campaign)}>Start screening session <ArrowRight size={14} /></button>}
      </div>
    </div>
  );
}

function CreateCampaignDrawer({ close, onCreate }: { close: () => void; onCreate: (c: Campaign) => void }) {
  const [name, setName] = useState("");
  const [type, setType] = useState(campaignTypes[0]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [target, setTarget] = useState<"All Students" | "By Form" | "By House" | "By Dormitory">("All Students");
  const [selectedForms, setSelectedForms] = useState<string[]>([]);
  const [selectedHouses, setSelectedHouses] = useState<string[]>([]);
  const [gender, setGender] = useState("All");
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const [measurements, setMeasurements] = useState<string[]>(["Height", "Weight", "BMI"]);
  const [assignedStaff, setAssignedStaff] = useState<string[]>([]);
  const [followUpRule, setFollowUpRule] = useState("Auto-create follow-up for any Review/Refer finding");
  const toggle = (arr: string[], v: string, set: (a: string[]) => void) => set(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);

  const submit = () => {
    onCreate({ id: `c${Date.now()}`, name: name || `${type} · New`, type, start: start || "TBD", end: end || "TBD", target: target === "All Students" ? 1248 : (selectedForms.length || selectedHouses.length || 1) * 90, completed: 0, followUps: 0, owner: assignedStaff[0] || "Health Administrator", status: "Scheduled" });
  };

  return (
    <div className="drawer" onClick={close}>
      <div className="drawer-panel drawer-panel-wide" onClick={e => e.stopPropagation()}>
        <div className="drawer-head">
          <div><div className="eyebrow">Plan → Screen → Follow up</div><h2>Create screening campaign</h2><p>Define who will be screened, what will be recorded, and who is responsible.</p></div>
          <button className="icon-button" onClick={close}><X size={15} /></button>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <div className="auth-field"><label>Campaign name</label><input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Term 3 Medical Screening" /></div>
            <div className="drawer-section !pt-0"><h4>Type</h4><div className="flex flex-wrap gap-2">{campaignTypes.map(t => <button key={t} type="button" className={cn("btn btn-small", type === t ? "btn-primary" : "btn-quiet")} onClick={() => setType(t)}>{t}</button>)}</div></div>
            <div className="grid grid-cols-2 gap-3"><div className="auth-field"><label>Start date</label><input type="date" value={start} onChange={e => setStart(e.target.value)} /></div><div className="auth-field"><label>End date</label><input type="date" value={end} onChange={e => setEnd(e.target.value)} /></div></div>
            <div className="drawer-section"><h4>Target students</h4><div className="flex flex-wrap gap-2">{(["All Students", "By Form", "By House", "By Dormitory"] as const).map(t => <button key={t} type="button" className={cn("btn btn-small", target === t ? "btn-primary" : "btn-quiet")} onClick={() => setTarget(t)}>{t}</button>)}</div></div>
            {target === "By Form" && <div className="drawer-section"><h4>Forms</h4><div className="flex flex-wrap gap-2">{forms.map(f => <button key={f} type="button" className={cn("btn btn-small", selectedForms.includes(f) ? "btn-primary" : "btn-quiet")} onClick={() => toggle(selectedForms, f, setSelectedForms)}>{f}</button>)}</div></div>}
            {(target === "By House" || target === "By Dormitory") && <div className="drawer-section"><h4>{target === "By House" ? "Houses" : "Dormitories"}</h4><div className="flex flex-wrap gap-2">{houses.map(h => <button key={h} type="button" className={cn("btn btn-small", selectedHouses.includes(h) ? "btn-primary" : "btn-quiet")} onClick={() => toggle(selectedHouses, h, setSelectedHouses)}>{h}</button>)}</div></div>}
            <div className="drawer-section"><h4>Gender</h4><div className="flex gap-2">{["All", "Boys", "Girls"].map(g => <button key={g} type="button" className={cn("btn btn-small", gender === g ? "btn-primary" : "btn-quiet")} onClick={() => setGender(g)}>{g}</button>)}</div></div>
            <div className="grid grid-cols-2 gap-3"><div className="auth-field"><label>Min age</label><input type="number" value={ageMin} onChange={e => setAgeMin(e.target.value)} placeholder="e.g. 12" /></div><div className="auth-field"><label>Max age</label><input type="number" value={ageMax} onChange={e => setAgeMax(e.target.value)} placeholder="e.g. 18" /></div></div>
          </div>
          <div>
            <div className="drawer-section !border-t-0 !pt-0"><h4>Required measurements</h4><div className="grid grid-cols-2 gap-2">{measurementOptions.map(m => <label key={m} className="flex items-center gap-2 text-[11px] text-[#4e6e73]"><input type="checkbox" className="accent-[#2f8d82]" checked={measurements.includes(m)} onChange={() => toggle(measurements, m, setMeasurements)} />{m}</label>)}</div></div>
            <div className="drawer-section"><h4>Assigned staff</h4><div className="flex flex-wrap gap-2">{staffPool.map(s => <button key={s} type="button" className={cn("btn btn-small", assignedStaff.includes(s) ? "btn-primary" : "btn-quiet")} onClick={() => toggle(assignedStaff, s, setAssignedStaff)}>{s}</button>)}</div></div>
            <div className="drawer-section"><h4>Follow-up rules</h4><select className="select-input w-full" value={followUpRule} onChange={e => setFollowUpRule(e.target.value)}><option>Auto-create follow-up for any Review/Refer finding</option><option>Manual follow-up only</option><option>Escalate Urgent findings immediately to Doctor</option></select></div>
          </div>
        </div>
        <button className="btn btn-primary w-full mt-2" onClick={submit}>Create campaign <Check size={14} /></button>
      </div>
    </div>
  );
}

function FollowUpsTab({ followUps, canSeeFindings, canAct, onOpen, onAction }: { followUps: FollowUp[]; canSeeFindings: boolean; canAct: boolean; onOpen: (f: FollowUp) => void; onAction: (m: string) => void }) {
  return (
    <div className="grid gap-4 md:grid-cols-[1.3fr_.7fr]">
      <div className="overflow-x-auto">
        <table className="table min-w-[700px]">
          <thead><tr><th>Student</th><th>Finding</th><th>Priority</th><th>Assigned to</th><th>Due date</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {followUps.map(f => (
              <tr key={f.id}>
                <td><strong>{f.student}</strong><span className="queue-meta">{f.form} · {f.house}</span></td>
                <td>{canSeeFindings ? f.finding : <span className="text-[#98a8a5]">Restricted — clinical finding</span>}</td>
                <td><span className={cn("tag", `tag-${tone(f.priority)}`)}>{f.priority}</span></td>
                <td>{f.assignedTo}</td>
                <td>{f.dueDate}</td>
                <td><span className={cn("tag", `tag-${tone(f.status)}`)}>{f.status}</span></td>
                <td>
                  <div className="flex gap-1">
                    <button className="btn btn-quiet btn-small !px-2" onClick={() => onOpen(f)}>Open</button>
                    <button className="btn btn-quiet btn-small !px-2" disabled={!canAct} title={!canAct ? "Restricted to clinical staff" : undefined} onClick={() => onAction(`${f.student} marked complete`)}>{canAct ? "Complete" : <LockKeyhole size={11} />}</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="panel p-5">
        <div className="eyebrow">Not yet screened</div>
        <h3 className="mt-2 text-[14px] font-extrabold tracking-[-.04em] text-[#2d5661]">Absent, unavailable or declined</h3>
        <div className="mt-3">
          {missedEntries.map(m => (
            <div className="missed-row" key={m.student}>
              <div><strong>{m.student}</strong><span>{m.form} · {m.house}</span></div>
              <div className="flex items-center gap-2"><span className={cn("tag", `tag-${tone(m.state)}`)}>{m.state}</span></div>
            </div>
          ))}
        </div>
        <button className="btn btn-quiet btn-small mt-3 w-full" onClick={() => onAction("Reschedule requests sent for 5 students")}><RotateCcw size={12} /> Schedule again</button>
      </div>
    </div>
  );
}

function FollowUpDrawer({ followUp, canAct, close, onUpdate, onRefer }: { followUp: FollowUp; canAct: boolean; close: () => void; onUpdate: (patch: Partial<FollowUp>) => void; onRefer: () => void }) {
  return (
    <div className="drawer" onClick={close}>
      <div className="drawer-panel" onClick={e => e.stopPropagation()}>
        <div className="drawer-head">
          <div><div className="eyebrow">Screening follow-up</div><h2>{followUp.student}</h2><p>{followUp.form} · {followUp.house} · {followUp.admission}</p></div>
          <button className="icon-button" onClick={close}><X size={15} /></button>
        </div>
        <div className="alert-banner"><Info size={16} /><div><strong>{followUp.finding}</strong><span>Flagged during screening. This is a finding for review, not a diagnosis.</span></div></div>
        <div className="drawer-section">
          <h4>Follow-up details</h4>
          <div className="detail-row"><span>Priority</span><strong>{followUp.priority}</strong></div>
          <div className="detail-row"><span>Assigned to</span><strong>{followUp.assignedTo}</strong></div>
          <div className="detail-row"><span>Due date</span><strong>{followUp.dueDate}</strong></div>
          <div className="detail-row"><span>Status</span><strong>{followUp.status}</strong></div>
        </div>
        <div className="drawer-section">
          <h4>Documents</h4>
          <div className="flex items-center justify-between rounded-md bg-[#f7faf8] px-3 py-2"><div className="flex items-center gap-2"><FileText size={14} className="text-[#3c9488]" /><span className="text-[10px] font-bold text-[#496d72]">Screening form · 15 Sep 2026</span></div><ChevronRight size={13} className="text-[#91a6a3]" /></div>
        </div>
        {canAct ? (
          <>
            <button className="btn btn-primary w-full" onClick={() => onUpdate({ status: "Completed" })}>Mark as complete <Check size={14} /></button>
            <button className="btn btn-quiet mt-2 w-full" onClick={onRefer}>Create referral <ArrowRight size={14} /></button>
          </>
        ) : <div className="notice">Only clinical staff can complete or refer a follow-up.</div>}
      </div>
    </div>
  );
}

function ReferralDrawer({ followUp, close, onSend }: { followUp: FollowUp; close: () => void; onSend: () => void }) {
  const [facility, setFacility] = useState(facilities[0]);
  const [urgency, setUrgency] = useState("Priority");
  return (
    <div className="drawer" onClick={close}>
      <div className="drawer-panel" onClick={e => e.stopPropagation()}>
        <div className="drawer-head">
          <div><div className="eyebrow">Create referral · from screening</div><h2>{followUp.student}</h2><p>{followUp.form} · {followUp.house}</p></div>
          <button className="icon-button" onClick={close}><X size={15} /></button>
        </div>
        <div className="drawer-section !border-t-0 !pt-0">
          <h4>Carried over from screening</h4>
          <div className="detail-row"><span>Finding</span><strong>{followUp.finding}</strong></div>
          <div className="detail-row"><span>Screening date</span><strong>15 Sep 2026</strong></div>
          <div className="detail-row"><span>Relevant measurements</span><strong>Attached</strong></div>
          <div className="detail-row"><span>Documents</span><strong>Screening form · 1 attached</strong></div>
        </div>
        <div className="drawer-section">
          <h4>Destination facility</h4>
          <select className="select-input w-full" value={facility} onChange={e => setFacility(e.target.value)}>{facilities.map(f => <option key={f}>{f}</option>)}</select>
        </div>
        <div className="drawer-section">
          <h4>Urgency</h4>
          <div className="flex gap-2">{["Routine", "Priority", "Urgent"].map(u => <button key={u} type="button" className={cn("btn btn-small", urgency === u ? "btn-primary" : "btn-quiet")} onClick={() => setUrgency(u)}>{u}</button>)}</div>
        </div>
        <div className="notice">This referral will appear in the Referrals queue for authorisation and coverage checks.</div>
        <button className="btn btn-primary w-full" onClick={onSend}>Send referral <ArrowRight size={14} /></button>
      </div>
    </div>
  );
}

function TrendsTab() {
  const [houseFilter, setHouseFilter] = useState("All houses");
  const [formFilter, setFormFilter] = useState("All forms");
  const filteredHouses = houseFilter === "All houses" ? houseAggregate : houseAggregate.filter(h => h[0] === houseFilter);
  const filteredForms = formFilter === "All forms" ? formAggregate : formAggregate.filter(f => f[0] === formFilter);
  const avgBmi = (bmiTrend.reduce((a, b) => a + b, 0) / bmiTrend.length).toFixed(1);

  return (
    <div>
      <div className="filter-row">
        <select className="select-input" value={houseFilter} onChange={e => setHouseFilter(e.target.value)}>{["All houses", ...houses].map(h => <option key={h}>{h}</option>)}</select>
        <select className="select-input" value={formFilter} onChange={e => setFormFilter(e.target.value)}>{["All forms", ...forms].map(f => <option key={f}>{f}</option>)}</select>
      </div>
      <div className="grid gap-4 md:grid-cols-[1.25fr_.75fr]">
        <div>
          <div className="panel p-5">
            <div className="flex items-center justify-between"><div><div className="eyebrow">School average</div><h3 className="mt-2 text-[16px] font-extrabold tracking-[-.04em] text-[#2d5661]">Average BMI by month</h3></div><span className="tag tag-teal">{avgBmi} avg</span></div>
            <div className="mt-6 flex h-36 items-end gap-3 border-b border-l border-[#e4eeeb] px-4 pb-0 pt-3">
              {bmiTrend.map((v, i) => <div key={i} className="flex flex-1 flex-col items-center gap-2"><div className="w-full max-w-[20px] rounded-t bg-[#9dd5ca]" style={{ height: `${((v - 20) / 3) * 100}%` }} /><span className="text-[8px] text-[#8da09e]">{i + 1}</span></div>)}
            </div>
          </div>
          <div className="panel mt-4">
            <div className="panel-head"><h2>Common findings requiring review</h2><span>Term 3</span></div>
            <div className="panel-body">
              {findingsBreakdown.map(([label, desc, pct]) => (
                <div className="referral-item" key={label}>
                  <div className="flex justify-between"><strong>{label}</strong><span className="!m-0 !text-[#2c8179]">{pct} students</span></div>
                  <span>{desc}</span>
                  <div className="progress-track"><i style={{ width: `${pct}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="side-stack">
          <div className="panel p-5">
            <div className="eyebrow">By house</div>
            <h3 className="mt-2 text-[14px] font-extrabold tracking-[-.04em] text-[#2d5661]">Screening completion</h3>
            <div className="mt-3">{filteredHouses.map(([h, students, screened, fu, pct]) => (
              <div className="referral-item" key={h}><div className="flex justify-between"><strong>{h}</strong><span className="!m-0 !text-[#2c8179]">{pct}%</span></div><span>{screened} of {students} screened · {fu} follow-ups</span><div className="progress-track"><i style={{ width: `${pct}%` }} /></div></div>
            ))}</div>
          </div>
          <div className="panel p-5">
            <div className="eyebrow">By form</div>
            <h3 className="mt-2 text-[14px] font-extrabold tracking-[-.04em] text-[#2d5661]">Screening completion</h3>
            <div className="mt-3">{filteredForms.map(([f, students, screened, pct]) => (
              <div className="referral-item" key={f}><div className="flex justify-between"><strong>{f}</strong><span className="!m-0 !text-[#2c8179]">{pct}%</span></div><span>{screened} of {students} screened</span><div className="progress-track"><i style={{ width: `${pct}%` }} /></div></div>
            ))}</div>
          </div>
          <div className="panel p-5">
            <div className="eyebrow">Follow-up completion</div>
            <div className="readiness !p-0 mt-2"><div className="readiness-ring" style={{ background: "conic-gradient(#3b9c8f 0 78%, #e4efeb 78%)" }}><strong>78%</strong></div><div className="readiness-copy"><strong>On track this term</strong><span>Most flagged findings are reviewed within 7 days of screening.</span></div></div>
          </div>
        </div>
      </div>
      <div className="mt-4 panel p-5">
        <div className="flex gap-3"><Info size={17} className="text-[#3c9488]" /><div><strong className="text-[12px] text-[#345862]">Screening shows patterns, not diagnoses</strong><p className="mt-1 text-[11px] leading-[1.55] text-[#839795]">These aggregates highlight findings that a clinician should review. They do not replace a clinical assessment and are never used to diagnose a student automatically.</p></div></div>
      </div>
    </div>
  );
}

function ReportsTab({ onGenerate }: { onGenerate: (name: string) => void }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {reportTypes.map(([Icon, title, desc]) => (
        <div className="panel p-5" key={title}>
          <div className="feature-icon !mb-4"><Icon size={17} /></div>
          <h3 className="text-[13px] font-extrabold text-[#173f4d]">{title}</h3>
          <p className="mt-2 text-[11px] leading-[1.55] text-[#7c9392]">{desc}</p>
          <button className="btn btn-quiet btn-small mt-4" onClick={() => onGenerate(title)}><FileText size={12} /> Generate</button>
        </div>
      ))}
    </div>
  );
}

function ScreeningSessionOverlay({ campaign, queue, index, done, onAdvance, onExit }: { campaign: Campaign; queue: string[]; index: number; done: number; onAdvance: (recorded: boolean) => void; onExit: () => void }) {
  const student = queue[index];
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [temperature, setTemperature] = useState("");
  const [bpSystolic, setBpSystolic] = useState("");
  const [bpDiastolic, setBpDiastolic] = useState("");
  const [pulse, setPulse] = useState("");
  const [spo2, setSpo2] = useState("");
  const [vision, setVision] = useState("Normal");
  const [hearing, setHearing] = useState("Normal");
  const [dental, setDental] = useState("Normal");
  const [general, setGeneral] = useState("Normal");
  const [outcome, setOutcome] = useState<Outcome>("Normal");

  const bmi = useMemo(() => {
    const h = parseFloat(height) / 100, w = parseFloat(weight);
    if (!h || !w) return null;
    return (w / (h * h)).toFixed(1);
  }, [height, weight]);

  const reset = () => { setHeight(""); setWeight(""); setTemperature(""); setBpSystolic(""); setBpDiastolic(""); setPulse(""); setSpo2(""); setVision("Normal"); setHearing("Normal"); setDental("Normal"); setGeneral("Normal"); setOutcome("Normal"); };
  const saveNext = () => { reset(); onAdvance(true); };
  const skip = () => { reset(); onAdvance(false); };

  const findingTone = (v: string) => v === "Normal" ? "teal" : v === "Referred" ? "red" : "amber";
  const outcomeTone: Record<Outcome, string> = { "Normal": "teal", "Follow-up Required": "amber", "Urgent Review": "orange", "Referral Required": "red" };

  return (
    <div className="drawer">
      <div className="drawer-panel drawer-panel-wide">
        <div className="session-shell">
          <form onSubmit={e => { e.preventDefault(); saveNext(); }}>
            <div className="drawer-head">
              <div><div className="eyebrow">{campaign.name} · student {index + 1} of {queue.length}</div><h2>{student}</h2><p>ADM-2023-{(184 + index).toString().padStart(4, "0")}</p></div>
              <button type="button" className="icon-button" onClick={onExit}><X size={15} /></button>
            </div>
            <div className="session-progress"><span className="text-[10px] font-bold text-[#2c8179]">{done} recorded</span><div className="progress-track"><i style={{ width: `${(index / queue.length) * 100}%` }} /></div><span className="text-[10px] text-[#8aa09e]">{queue.length - index} remaining</span></div>

            <div className="drawer-section">
              <h4>Measurements</h4>
              <div className="session-field-grid">
                <div className="session-field"><label><Ruler size={11} className="inline mr-1" />Height (cm)</label><input className="session-input" inputMode="decimal" value={height} onChange={e => setHeight(e.target.value)} placeholder="158" /></div>
                <div className="session-field"><label><Weight size={11} className="inline mr-1" />Weight (kg)</label><input className="session-input" inputMode="decimal" value={weight} onChange={e => setWeight(e.target.value)} placeholder="53.4" /></div>
                <div className="session-field"><label>BMI</label><input className="session-input" readOnly value={bmi ? `${bmi} · ${parseFloat(bmi) < 18.5 ? "Underweight" : parseFloat(bmi) < 25 ? "Normal" : "Above range"}` : "—"} /></div>
                <div className="session-field"><label><Thermometer size={11} className="inline mr-1" />Temperature (°C)</label><input className="session-input" inputMode="decimal" value={temperature} onChange={e => setTemperature(e.target.value)} placeholder="36.7" /></div>
                <div className="session-field"><label>Blood pressure</label><div className="flex gap-2"><input className="session-input" inputMode="numeric" value={bpSystolic} onChange={e => setBpSystolic(e.target.value)} placeholder="110" /><input className="session-input" inputMode="numeric" value={bpDiastolic} onChange={e => setBpDiastolic(e.target.value)} placeholder="72" /></div></div>
                <div className="session-field"><label><Activity size={11} className="inline mr-1" />Pulse (bpm)</label><input className="session-input" inputMode="numeric" value={pulse} onChange={e => setPulse(e.target.value)} placeholder="78" /></div>
                <div className="session-field"><label><Wind size={11} className="inline mr-1" />SpO2 (%)</label><input className="session-input" inputMode="numeric" value={spo2} onChange={e => setSpo2(e.target.value)} placeholder="98" /></div>
              </div>
            </div>

            <div className="drawer-section">
              <h4>Screening</h4>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.06em] text-[#496c73]"><Eye size={12} />Vision</label>
                  <div className="session-toggle-group">{["Normal", "Needs Review", "Referred"].map(v => <button key={v} type="button" className={cn("session-toggle", `tone-${findingTone(v)}`, vision === v && "active")} onClick={() => setVision(v)}>{v}</button>)}</div>
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.06em] text-[#496c73]"><Ear size={12} />Hearing</label>
                  <div className="session-toggle-group">{["Normal", "Needs Review", "Referred"].map(v => <button key={v} type="button" className={cn("session-toggle", `tone-${findingTone(v)}`, hearing === v && "active")} onClick={() => setHearing(v)}>{v}</button>)}</div>
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.06em] text-[#496c73]"><Smile size={12} />Dental</label>
                  <div className="session-toggle-group">{["Normal", "Needs Review", "Referred"].map(v => <button key={v} type="button" className={cn("session-toggle", `tone-${findingTone(v)}`, dental === v && "active")} onClick={() => setDental(v)}>{v}</button>)}</div>
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.06em] text-[#496c73]"><Stethoscope size={12} />General health</label>
                  <div className="session-toggle-group">{["Normal", "Needs Review", "Referred"].map(v => <button key={v} type="button" className={cn("session-toggle", `tone-${findingTone(v)}`, general === v && "active")} onClick={() => setGeneral(v)}>{v}</button>)}</div>
                </div>
              </div>
            </div>

            <div className="drawer-section">
              <h4>Outcome</h4>
              <div className="session-outcome-grid">
                {(["Normal", "Follow-up Required", "Urgent Review", "Referral Required"] as Outcome[]).map(o => (
                  <button key={o} type="button" className={cn("session-outcome", `tone-${outcomeTone[o]}`, outcome === o && "active")} onClick={() => setOutcome(o)}>{o}</button>
                ))}
              </div>
            </div>

            <div className="session-footer">
              <button type="button" className="btn btn-quiet" onClick={skip}><UserX size={13} /> Mark absent</button>
              <button type="submit" className="btn btn-primary flex-1">{index + 1 >= queue.length ? "Save & finish session" : "Save & Next Student"} <ArrowRight size={14} /></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export function StudentScreeningHistory({ name }: { name: string }) {
  const records = screeningHistory[name] || screeningHistory["Amara Njeri"];
  return (
    <div className="drawer-section">
      <h4>Screening</h4>
      <div className="parent-timeline !p-0">
        {records.map(r => (
          <div className="parent-event" key={r.date}>
            <div className="event-line"><i className="event-dot" /></div>
            <div className="event-copy">
              <strong>{r.date} · {r.campaign}</strong>
              <span>BMI {r.bmi} · Vision: {r.vision} · Hearing: {r.hearing} · Dental: {r.dental}</span>
              <span className={cn("tag mt-1 inline-flex", `tag-${tone(r.outcome)}`)}>{r.outcome}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
