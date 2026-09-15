import {
  Activity, ArrowDown, Bell, Building2, ClipboardCheck, Eye, FileHeart, GraduationCap, Handshake,
  HeartPulse, Home, Package, Pill, Send, ShieldCheck, Siren, Stethoscope, Users,
} from "lucide-react";
import { SiteLayout } from "../shell";
import { Btn, Bullets, Callout, Eyebrow, FeatureCard, Finale, Section, SectionHead, TextLink } from "../ui";
import { Photo, photos } from "../photos";
import {
  AccessMock, CoverMock, HealthStationMock, IncidentTimelineMock, IntelligenceMock, MedicationTimelineMock,
  ParentPhoneMock, ReadinessMock, SchoolDashboardMock, ScreeningMock, TelehealthMock,
} from "../mockups";

const trustBar = [
  [Building2, "Designed for boarding schools"],
  [ShieldCheck, "Secure health records"],
  [Pill, "Medication management"],
  [Stethoscope, "Remote clinical support"],
  [Bell, "Parent visibility"],
] as const;

const capabilities = [
  { icon: FileHeart, title: "Student Health", copy: "A complete longitudinal record: allergies, conditions, medical history, encounters, restrictions and documents — from admission to graduation." },
  { icon: Stethoscope, title: "Sick Bay", copy: "Run the school health department with a calm workflow for triage, encounters, observations, treatment and follow-up." },
  { icon: Pill, title: "Medication", copy: "Handover, custody, storage, scheduling, administration and reconciliation — safely managed while students are boarding." },
  { icon: Activity, title: "Telehealth", copy: "Connect school health teams with remote clinicians when a case is appropriate for consultation.", tone: "teal" as const },
  { icon: Send, title: "Referrals", copy: "Coordinate care beyond the school — authorisation, handoff, transport context and the return of information.", tone: "teal" as const },
  { icon: HeartPulse, title: "Parent Care", copy: "Keep parents informed about meaningful health events, with visibility that respects clinical confidentiality.", tone: "clay" as const },
];

const studentJourney = [
  "Student feels unwell",
  "Teacher, prefect or house staff",
  "School health team",
  "Assessment",
  "Treatment, monitoring, telehealth or referral",
  "Parent informed when appropriate",
  "Follow-up",
];

const categories = [
  { title: "Generic EMR", copy: "Designed for clinics.", tone: "grey" },
  { title: "School ERP", copy: "Designed for administration.", tone: "grey" },
  { title: "Consumer telehealth", copy: "Designed for individuals.", tone: "grey" },
  { title: "Mlezi", copy: "Designed for the school, the child, the parent and the clinical network — together.", tone: "accent" },
];

export default function HomePage() {
  return (
    <SiteLayout>
      {/* ---------------- Hero ---------------- */}
      <section className="s-hero s-dark">
        <div className="s-container s-hero-inner">
          <div className="s-hero-grid">
            <div>
              <Eyebrow dark>The healthcare network for boarding school</Eyebrow>
              <h1 className="s-h1" style={{ marginTop: 20 }}>
                Your child is away from home. They should <em>never</em> be away from care.
              </h1>
              <p className="s-hero-sub">
                Mlezi connects boarding schools, parents and healthcare professionals so children can receive better,
                more coordinated care while they're at school.
              </p>
              <div className="s-hero-actions">
                <Btn href="/demo" tone="cream" size="lg">Bring Mlezi to Your School</Btn>
                <Btn href="/how-it-works" tone="onforest" size="lg" icon={false}>See How It Works</Btn>
              </div>
              <p className="s-hero-note"><GraduationCap size={16} /> <b>Built for Kenyan boarding schools</b></p>
            </div>
            <div>
              <SchoolDashboardMock />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
                <ConnectedCard icon={Home} label="At home" value="Parent notified · 08:02" />
                <ConnectedCard icon={Stethoscope} label="Remote clinician" value="Consultation · 11:15" />
              </div>
            </div>
          </div>

          <div className="s-trustbar">
            <ul>
              {trustBar.map(([Icon, label]) => (
                <li key={label}><Icon size={15} /> {label}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- The problem ---------------- */}
      <Section tone="paper">
        <div className="s-head-split">
          <SectionHead
            eyebrow="The reality"
            title={<>When a child goes to boarding school, healthcare becomes a coordination problem.</>}
            lede="Parents are no longer physically present. The school becomes responsible for day-to-day health. And a single nurse ends up holding all of it together."
          />
          <div>
            <p className="s-body">
              Health records. Medication. Parents. Doctors. Hospitals. Medical cover. Referrals. Follow-ups. Most of it
              still coordinated through paper files, phone calls and memory — while a parent, hundreds of kilometres away,
              is left asking one question.
            </p>
            <p className="s-pullquote" style={{ marginTop: 22 }}>"Is my child okay?"</p>
          </div>
        </div>

        <div className="s-versus">
          <div className="s-versus-col">
            <h3><GraduationCap size={17} /> At school</h3>
            <ul>
              <li><i /> Student</li>
              <li><i /> Nurse</li>
              <li><i /> Sick bay</li>
              <li><i /> Medication</li>
              <li><i /> Referral</li>
            </ul>
          </div>
          <div className="s-versus-mid" />
          <div className="s-versus-col is-warm">
            <h3><Home size={17} /> At home</h3>
            <ul>
              <li><i /> Parent</li>
              <li><i /> Questions</li>
              <li><i /> Uncertainty</li>
              <li><i /> Phone calls</li>
            </ul>
          </div>
        </div>
        <div className="s-versus-bridge">
          <HeartPulse size={17} /> Mlezi connects the two — and everyone else the child's care depends on.
        </div>
      </Section>

      {/* ---------------- The solution / ecosystem ---------------- */}
      <Section tone="cream">
        <SectionHead
          center
          eyebrow="The Mlezi model"
          title="One health system. Everyone who needs to be involved."
          lede="Mlezi gives the school the tools to manage health, gives parents visibility into their child's care, and gives clinicians a structured way to support students remotely."
          className="s-head-center"
        />
        <div style={{ marginTop: 52 }}>
          <div className="s-eco">
            <div className="s-eco-node s-eco-top"><Home size={19} /><b>Parent</b><span>Visibility and participation</span></div>
            <div className="s-eco-node s-eco-left"><Building2 size={19} /><b>School</b><span>Day-to-day health operations</span></div>
            <div className="s-eco-node s-eco-core"><HeartPulse size={24} /><b>Mlezi</b><span>The coordinating layer</span></div>
            <div className="s-eco-node s-eco-right"><Stethoscope size={19} /><b>Clinical network</b><span>Support when it's needed</span></div>
            <div className="s-eco-node s-eco-bottom"><Users size={19} /><b>Student</b><span>The person being cared for</span></div>
          </div>
        </div>
      </Section>

      {/* ---------------- Capabilities ---------------- */}
      <Section id="platform">
        <div className="s-head-split">
          <SectionHead eyebrow="What Mlezi actually does" title="Six capabilities that carry a school health department." />
          <div style={{ paddingBottom: 6 }}>
            <p className="s-body">Not a medical file with a school logo on it. Coordinated care for the whole of student health.</p>
            <div style={{ marginTop: 18 }}><TextLink href="/platform">See the Platform</TextLink></div>
          </div>
        </div>
        <div className="s-grid-3">
          {capabilities.map((capability) => (
            <FeatureCard key={capability.title} icon={capability.icon} title={capability.title} copy={capability.copy} tone={capability.tone} />
          ))}
        </div>
      </Section>

      {/* ---------------- Medication ---------------- */}
      <Section tone="forest" className="s-dark" id="medication">
        <div className="s-split s-split-narrow s-split-top">
          <div>
            <Eyebrow dark>Medication custody</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 18px" }}>
              The medicine a parent sends to school should never disappear into a drawer.
            </h2>
            <p className="s-lede">
              Mlezi creates a clear chain of custody for student medication, from the moment it arrives at school to the
              moment it is administered or returned.
            </p>
            <Bullets
              dark
              items={[
                "Every dose is recorded against the person who gave it",
                "Storage location is known, not remembered",
                "Parents can see that a dose actually happened",
                "End-of-term reconciliation closes the loop",
              ]}
            />
            <div style={{ marginTop: 30 }}><Btn href="/platform#medication" tone="cream">See how medication works</Btn></div>
          </div>
          <MedicationTimelineMock />
        </div>
      </Section>

      {/* ---------------- Telehealth ---------------- */}
      <Section id="telehealth">
        <div className="s-split s-split-wide s-split-top">
          <TelehealthMock />
          <div>
            <Eyebrow>Telehealth</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 18px" }}>
              When the nurse needs another clinician, help is one consultation away.
            </h2>
            <p className="s-lede">
              Mlezi connects school health teams with a network of qualified healthcare professionals who can support
              appropriate cases remotely.
            </p>
            <div className="s-chain" style={{ marginTop: 28 }}>
              <div className="s-chain-node"><i>01</i><b>Student + nurse</b><span>Assessed on site, with observations recorded</span></div>
              <div className="s-chain-node is-accent"><i>02</i><b>Remote clinician</b><span>Joins with the full pre-consultation summary</span></div>
              <div className="s-chain-node"><i>03</i><b>Outcome</b><span>Treatment, follow-up or referral — recorded</span></div>
            </div>
            <div style={{ marginTop: 24 }}>
              <Callout>
                The school nurse remains the on-site point of care. Telehealth extends the school's clinical capability —
                it does not replace emergency care.
              </Callout>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------- Parent experience ---------------- */}
      <Section tone="cream">
        <div className="s-split s-split-top">
          <div>
            <Eyebrow>The parent experience</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 18px" }}>
              You don't have to be at the school to know how your child is doing.
            </h2>
            <p className="s-lede">
              Parents receive important health updates, can maintain medical information, view documents and participate in
              appropriate consultations — without needing to phone the school office to find out whether everything is fine.
            </p>
            <Bullets
              items={[
                "A health timeline your child's care is written into",
                "Medication administration you can actually see",
                "Referral updates as they happen, not afterwards",
                "Documents and medical-cover details in one place",
              ]}
            />
            <div style={{ marginTop: 30 }}><Btn href="/for-parents">See the Parent Experience</Btn></div>
          </div>
          <div style={{ display: "grid", justifyItems: "center" }}>
            <ParentPhoneMock />
          </div>
        </div>
      </Section>

      {/* ---------------- Mlezi Care ---------------- */}
      <Section tone="paper">
        <div className="s-split s-split-wide">
          <Photo photo={photos.homeCare} />
          <div>
            <Eyebrow>Mlezi Care</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 16px" }}>A little more peace of mind while they're away.</h2>
            <p className="s-lede">
              Mlezi Care is not a notification service. It is a care relationship with the health team looking after your
              child — and a record of that care you can hold onto.
            </p>
            <div className="s-grid-2" style={{ marginTop: 28, gap: 12 }}>
              {[
                "Meaningful health alerts",
                "Medication visibility",
                "Referral updates",
                "Health timeline",
                "Medical documents",
                "Medical-cover information",
                "Telehealth access where appropriate",
                "Parent-to-health-team messaging",
              ].map((item) => (
                <div key={item} style={{ display: "flex", gap: 9, alignItems: "center", fontSize: 13.5, color: "var(--ink-soft)" }}>
                  <ShieldCheck size={15} style={{ color: "var(--sage)", flexShrink: 0 }} /> {item}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
              <Btn href="/for-parents">How Mlezi Care Works</Btn>
              <span className="s-small"><b style={{ color: "var(--ink)" }}>KES 250</b> per term, or KES 650/year — for your whole family</span>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------- School experience ---------------- */}
      <Section tone="grey" id="schools">
        <div className="s-head-split">
          <SectionHead
            eyebrow="For schools"
            title="For schools, Mlezi runs the health department in one place."
            lede="Schools use Mlezi to manage the day-to-day work of the health department without adding another administrative burden to parents or boarding staff."
          />
          <div style={{ paddingBottom: 6 }}>
            <Btn href="/for-schools">See How Mlezi Works</Btn>
          </div>
        </div>
        <div className="s-split s-split-wide s-split-top">
          <div>
            <div className="s-card" style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ padding: "22px 24px 8px" }}>
                <span className="s-micro" style={{ letterSpacing: ".12em", textTransform: "uppercase" }}>Today's health</span>
              </div>
              <div style={{ display: "grid" }}>
                {[
                  ["23", "students seen"],
                  ["18", "medication doses due"],
                  ["2", "referrals"],
                  ["5", "follow-ups"],
                  ["96%", "health readiness"],
                ].map(([value, label]) => (
                  <div key={label} style={{ display: "flex", alignItems: "baseline", gap: 14, padding: "14px 24px", borderTop: "1px solid var(--line)" }}>
                    <b style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.04em", color: "var(--forest)", minWidth: 56 }}>{value}</b>
                    <span style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="s-grid-2" style={{ gap: 10 }}>
              {[
                "Health records", "Sick bay", "Medication", "Incidents", "Screening", "Referrals",
                "Reports", "Health intelligence", "Telehealth", "Parent communication",
              ].map((item) => (
                <div key={item} className="s-card-flat" style={{ padding: "13px 15px", fontSize: 13.5, fontWeight: 600, color: "var(--ink)" }}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------- Health readiness ---------------- */}
      <Section>
        <div className="s-split s-split-top">
          <div>
            <Eyebrow>Health readiness</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 18px" }}>Know how ready your school is to care for its students.</h2>
            <p className="s-lede">
              Health Readiness gives school leaders a simple picture of whether the health department is prepared,
              organised and able to respond — before a term begins, not after something goes wrong.
            </p>
            <div style={{ marginTop: 28 }}><TextLink href="/for-schools#readiness">How readiness is calculated</TextLink></div>
          </div>
          <ReadinessMock />
        </div>
      </Section>

      {/* ---------------- Clinical network ---------------- */}
      <Section tone="forest" className="s-dark" id="network">
        <div className="s-head-split">
          <div className="s-head">
            <Eyebrow dark>The clinical network</Eyebrow>
            <h2 className="s-h2" style={{ margin: "14px 0 16px" }}>Behind every school is a network of care.</h2>
            <p className="s-lede">
              Mlezi does not require every school to employ a full clinical team for every possible health need. Schools
              draw on a shared network, based on demand.
            </p>
          </div>
          <div style={{ paddingBottom: 6 }}>
            <Btn href="/clinical-network" tone="cream">See the Clinical Network</Btn>
          </div>
        </div>

        <div className="s-split s-split-wide s-split-top">
          <div>
            <div style={{ display: "grid", gap: 8 }}>
              {["Greenfields Academy", "St. Monica's Girls", "Rift Valley High", "Nakuru Boys' High", "Lakeview Academy"].map((school) => (
                <div key={school} style={{ display: "flex", alignItems: "center", gap: 11, border: "1px solid rgba(255,255,255,.14)", background: "rgba(255,255,255,.04)", borderRadius: 10, padding: "12px 15px", fontSize: 13, fontWeight: 600, color: "#cfe6d8" }}>
                  <Building2 size={15} style={{ color: "#7fd1a6" }} /> {school}
                </div>
              ))}
            </div>
            <div style={{ display: "grid", placeItems: "center", padding: "16px 0", color: "#6f9484" }}><ArrowDown size={20} /></div>
            <div style={{ border: "1px solid #2b6e56", background: "rgba(127,209,166,.1)", borderRadius: 12, padding: "18px 20px", textAlign: "center" }}>
              <b style={{ fontSize: 15, color: "#fff", letterSpacing: "-0.02em" }}>Mlezi Clinical Network</b>
              <p style={{ marginTop: 6, fontSize: 12.5, color: "#9fc6b2" }}>One queue. Structured cases. Qualified professionals.</p>
            </div>
            <div className="s-grid-2" style={{ gap: 8, marginTop: 14 }}>
              {["Clinical Officer", "Doctor", "Specialist", "Counsellor"].map((role) => (
                <div key={role} style={{ border: "1px solid rgba(255,255,255,.14)", borderRadius: 9, padding: "11px 13px", fontSize: 12.5, fontWeight: 600, color: "#cfe6d8", textAlign: "center" }}>{role}</div>
              ))}
            </div>
            <p className="s-small" style={{ marginTop: 14, color: "#7d9a8b" }}>
              Not every role is available in every location today. Network expands as Mlezi grows.
            </p>
          </div>
          <div>
            <h3 className="s-h3">Healthcare professionals should be able to care wherever care is needed.</h3>
            <p className="s-body" style={{ marginTop: 16 }}>
              Mlezi enables qualified healthcare professionals to support students across multiple schools through a
              structured clinical workflow — a consultation queue, a clinical summary prepared by the school nurse, the
              consultation itself, and a follow-up that is written back into the student's record.
            </p>
            <p className="s-body" style={{ marginTop: 14 }}>
              This is a clinical network being built deliberately, not a marketplace of gigs — clinicians join by
              invitation, following verification.
            </p>
            <div style={{ marginTop: 26 }}><TextLink href="/clinical-network" dark>See the Clinical Network</TextLink></div>
          </div>
        </div>
      </Section>

      {/* ---------------- Student experience ---------------- */}
      <Section tone="cream">
        <SectionHead
          center
          eyebrow="The student"
          title="Less paperwork around the child. More care around the child."
          lede="Students are the people being cared for — not users of an app. This is the journey Mlezi is built around."
          className="s-head-center"
        />
        <div className="s-chain" style={{ marginTop: 44 }}>
          {studentJourney.map((stage, index) => (
            <div className={"s-chain-node" + (index === 2 ? " is-accent" : "")} key={stage}>
              <i>{String(index + 1).padStart(2, "0")}</i>
              <b>{stage}</b>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------------- Incidents ---------------- */}
      <Section>
        <div className="s-split s-split-wide s-split-top">
          <IncidentTimelineMock />
          <div>
            <Eyebrow>Incidents</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 18px" }}>When something happens, everyone knows what happens next.</h2>
            <p className="s-lede">
              Injuries, emergencies, dorm incidents and sports injuries are recorded as they unfold — with the referral,
              the follow-up and the parent communication attached to the same event.
            </p>
            <div className="s-grid-2" style={{ gap: 10, marginTop: 26 }}>
              {["Injuries", "Emergencies", "Dorm incidents", "Sports injuries", "Referrals", "Follow-up", "Parent communication", "Closure checklist"].map((item) => (
                <div key={item} style={{ display: "flex", gap: 9, alignItems: "center", fontSize: 13, color: "var(--ink-soft)" }}>
                  <Siren size={14} style={{ color: "var(--clay)", flexShrink: 0 }} /> {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------- Screening ---------------- */}
      <Section tone="grey">
        <div className="s-split s-split-top">
          <div>
            <Eyebrow>Screening</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 18px" }}>Healthcare isn't only about when children get sick.</h2>
            <p className="s-lede">
              Term screening finds what nobody has reported yet — the child who cannot read the board, the growth that has
              stalled, the blood pressure worth a second look.
            </p>
            <div className="s-chain" style={{ marginTop: 28 }}>
              {[
                { label: "Finding", note: "Recorded during screening" },
                { label: "Follow-up", note: "Assigned and tracked" },
                { label: "Referral", note: "Where it's needed" },
                { label: "Resolution", note: "Closed with an outcome" },
              ].map((step, index) => (
                <div className={"s-chain-node" + (index === 3 ? " is-accent" : "")} key={step.label}>
                  <i>{String(index + 1).padStart(2, "0")}</i>
                  <b>{step.label}</b>
                  <span>{step.note}</span>
                </div>
              ))}
            </div>
          </div>
          <ScreeningMock />
        </div>
      </Section>

      {/* ---------------- Health intelligence ---------------- */}
      <Section>
        <div className="s-split s-split-wide s-split-top">
          <IntelligenceMock />
          <div>
            <Eyebrow>Health intelligence</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 18px" }}>See the health of the whole school.</h2>
            <p className="s-lede">
              Health events, illness trends, dorm patterns, injuries, referrals and screening findings — aggregated for
              school leadership without exposing any individual child's clinical detail.
            </p>
            <div style={{ marginTop: 26 }}>
              <Callout>
                Mlezi surfaces a <b>pattern detected</b> — never a diagnosis. What it means, and what to do about it, is a
                decision for the health team.
              </Callout>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------- Medical cover ---------------- */}
      <Section tone="cream">
        <div className="s-split s-split-top">
          <div>
            <Eyebrow>Medical cover</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 18px" }}>When care needs to leave campus, Mlezi helps coordinate the journey.</h2>
            <p className="s-lede">
              Keep medical-cover information organised and connect relevant coverage information to referrals and emergency
              workflows — so nobody is searching for paperwork at the worst possible moment.
            </p>
            <div className="s-chain" style={{ marginTop: 28 }}>
              {[
                { label: "Student" }, { label: "Medical cover" }, { label: "Preferred hospital" },
                { label: "Referral" }, { label: "Authorisation" }, { label: "Parent" },
              ].map((node, index) => (
                <div className="s-chain-node" key={node.label}>
                  <i>{String(index + 1).padStart(2, "0")}</i>
                  <b>{node.label}</b>
                </div>
              ))}
            </div>
            <p className="s-small" style={{ marginTop: 18 }}>
              Mlezi is not an insurer. It organises cover information and connects it to the moments where it matters.
            </p>
          </div>
          <CoverMock />
        </div>
      </Section>

      {/* ---------------- Health Station ---------------- */}
      <Section id="health-station">
        <div className="s-head-split">
          <SectionHead
            eyebrow="The school health kit"
            title="Software is only half the health department."
            lede="Schools can start with a Mlezi Health Station: essential assessment equipment, a connected workflow and Mlezi software in one deployment package."
          />
          <div style={{ paddingBottom: 6 }}>
            <Btn href="/platform#health-station" tone="outline">See the Health Station</Btn>
            <p className="s-small" style={{ marginTop: 14 }}>One-time setup package.</p>
          </div>
        </div>
        <HealthStationMock />
      </Section>

      {/* ---------------- Security ---------------- */}
      <Section tone="forest" className="s-dark">
        <div className="s-split s-split-top">
          <div>
            <Eyebrow dark>Security and trust</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 18px" }}>Children's health information deserves exceptional care.</h2>
            <p className="s-lede">
              Role-based access, least-privilege permissions, audit logs, controlled exports, secure documents, emergency
              access controls, parent consent workflows and data governance — designed in, not added later.
            </p>
            <div style={{ marginTop: 30 }}><Btn href="/security" tone="cream">How We Protect Health Information</Btn></div>
          </div>
          <div>
            <p className="s-micro" style={{ color: "#8fae9f", marginBottom: 12, textTransform: "uppercase", letterSpacing: ".12em" }}>
              Who can see what
            </p>
            <div style={{ background: "#fff", borderRadius: 14, padding: 14 }}>
              <AccessMock />
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------- Impact ---------------- */}
      <Section tone="cream-deep">
        <div className="s-split s-split-wide s-split-top">
          <Photo photo={photos.portraitCare} />
          <div>
            <Eyebrow>The Mlezi Fund</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 18px" }}>Every Mlezi family helps us extend care to children who need it most.</h2>
            <p className="s-lede">
              A defined portion of Mlezi Care supports the Mlezi Fund — healthcare access for school-going children who
              need help, through four programmes we intend to report on publicly as the fund grows.
            </p>
            <div className="s-grid-2" style={{ gap: 12, marginTop: 28 }}>
              {[
                { icon: GraduationCap, title: "Keep Them in School", copy: "Support necessary medical care that could otherwise keep a child away from school." },
                { icon: Package, title: "Equip Them to Care", copy: "Provide health equipment to under-resourced schools." },
                { icon: Eye, title: "Get Them Seen", copy: "Support access to clinical consultations." },
                { icon: Handshake, title: "Help Them Thrive", copy: "Support preventive care, mental health, vision, hearing and other interventions." },
              ].map((program) => (
                <div className="s-card-flat" key={program.title} style={{ background: "#fff" }}>
                  <program.icon size={17} style={{ color: "var(--sage)" }} />
                  <h3 style={{ marginTop: 12, fontSize: 14.5 }}>{program.title}</h3>
                  <p style={{ fontSize: 12.5 }}>{program.copy}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 28 }}><TextLink href="/impact">See how the fund works</TextLink></div>
          </div>
        </div>
      </Section>

      {/* ---------------- Why Mlezi ---------------- */}
      <Section>
        <SectionHead
          center
          eyebrow="Why Mlezi"
          title="Built around the reality of boarding school."
          lede="Every adjacent category was designed for someone else. This one was designed for the child who lives at school."
          className="s-head-center"
        />
        <div className="s-grid-4" style={{ marginTop: 44 }}>
          {categories.map((category) => (
            <div
              key={category.title}
              className="s-card"
              style={category.tone === "accent"
                ? { background: "var(--forest-deep)", borderColor: "var(--forest-deep)" }
                : { background: "var(--grey)", borderColor: "transparent" }}
            >
              <h3 style={category.tone === "accent" ? { color: "#fff" } : undefined}>{category.title}</h3>
              <p style={category.tone === "accent" ? { color: "#a9c4b8" } : undefined}>{category.copy}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------------- Story arc ---------------- */}
      <Section tone="grey" size="sm">
        <div className="s-strip">
          <span><Building2 size={15} /> Built for boarding schools</span>
          <span><HeartPulse size={15} /> Parent-first</span>
          <span><ShieldCheck size={15} /> Privacy-conscious</span>
          <span><Stethoscope size={15} /> Clinician-connected</span>
          <span><ClipboardCheck size={15} /> Designed for Kenya</span>
        </div>
      </Section>

      <Finale
        title={<>They're growing up away from home. Make sure care doesn't grow distant with them.</>}
        copy="Mlezi connects schools, parents and healthcare professionals around the health of every student."
      />
    </SiteLayout>
  );
}

function ConnectedCard({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div style={{ display: "flex", gap: 11, alignItems: "center", border: "1px solid rgba(255,255,255,.14)", background: "rgba(255,255,255,.05)", borderRadius: 11, padding: "12px 14px" }}>
      <span style={{ width: 30, height: 30, borderRadius: 8, display: "grid", placeItems: "center", background: "rgba(127,209,166,.16)", color: "#7fd1a6", flexShrink: 0 }}>
        <Icon size={15} />
      </span>
      <span style={{ minWidth: 0 }}>
        <b style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#7fb69a" }}>{label}</b>
        <span style={{ display: "block", marginTop: 3, fontSize: 12.5, fontWeight: 600, color: "#e3f1e8" }}>{value}</span>
      </span>
    </div>
  );
}
