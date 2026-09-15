import { ArrowDown, BadgeCheck, Brain, Building2, ShieldCheck, Stethoscope, UserRound } from "lucide-react";
import { PageHero, SiteLayout } from "../shell";
import { Btn, Bullets, Callout, Eyebrow, Finale, Section, SectionHead } from "../ui";
import { ClinicianQueueMock, TelehealthMock } from "../mockups";
import { Photo, photos } from "../photos";

const roles = [
  { icon: Stethoscope, title: "Clinical Officers", copy: "The backbone of the network — assessment, common presentations and guidance for school health teams." },
  { icon: UserRound, title: "Doctors", copy: "Input on more complex presentations, and decisions about whether a student needs to be seen in person." },
  { icon: BadgeCheck, title: "Specialists", copy: "Focused input where a student's condition calls for it, arranged through the school health team." },
  { icon: Brain, title: "Counsellors", copy: "Mental health support for boarding students, through structured, confidential sessions." },
];

const consultationTypes = ["Acute assessment support", "Chronic condition review", "Medication guidance", "Post-referral follow-up", "Counselling session", "Second opinion for the school health team"];

export default function ClinicalNetworkPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Clinical network"
        title="A clinical network built around the school."
        lede="Mlezi connects schools to qualified healthcare professionals based on demand, rather than requiring every institution to permanently employ a clinician for every possible health need."
        actions={<>
          <Btn href="/demo" tone="cream" size="lg">Bring Mlezi to Your School</Btn>
          <Btn href="/how-it-works" tone="onforest" size="lg" icon={false}>See How Mlezi Works</Btn>
        </>}
      />

      <Section>
        <SectionHead
          center
          eyebrow="The model"
          title="Many schools. One structured queue. Qualified professionals."
          lede="A single school rarely has enough demand to justify a full clinical team. Together, a network of schools does."
          className="s-head-center"
        />
        <div style={{ maxWidth: 720, margin: "48px auto 0" }}>
          <div className="s-grid-3" style={{ gap: 8 }}>
            {["Greenfields Academy", "St. Monica's Girls", "Rift Valley High", "Nakuru Boys' High", "Lakeview Academy", "Highlands School"].map((school) => (
              <div key={school} className="s-card-flat" style={{ display: "flex", alignItems: "center", gap: 9, padding: "12px 14px", fontSize: 12.5, fontWeight: 600 }}>
                <Building2 size={14} style={{ color: "var(--sage)", flexShrink: 0 }} /> {school}
              </div>
            ))}
          </div>
          <Connector />
          <div style={{ background: "var(--forest)", borderRadius: 13, padding: "22px 24px", textAlign: "center" }}>
            <b style={{ fontSize: 17, color: "#fff", letterSpacing: "-0.025em" }}>Mlezi Clinical Queue</b>
            <p style={{ marginTop: 7, fontSize: 13, color: "#9fc6b2" }}>Every case arrives with a clinical summary prepared by the school health team.</p>
          </div>
          <Connector />
          <div className="s-grid-4" style={{ gap: 8 }}>
            {["Clinical Officers", "Doctors", "Specialists", "Counsellors"].map((role) => (
              <div key={role} className="s-card-flat" style={{ padding: "13px 12px", textAlign: "center", fontSize: 12.5, fontWeight: 650 }}>{role}</div>
            ))}
          </div>
          <Connector />
          <div className="s-grid-2" style={{ gap: 8 }}>
            <div className="s-card-flat" style={{ padding: "13px 14px", textAlign: "center", fontSize: 12.5, fontWeight: 650 }}>Consultation</div>
            <div className="s-card-flat" style={{ padding: "13px 14px", textAlign: "center", fontSize: 12.5, fontWeight: 650 }}>Follow-up or referral</div>
          </div>
          <p className="s-small" style={{ marginTop: 22, textAlign: "center" }}>
            Not every role is available in every location today. <b style={{ color: "var(--ink)" }}>Network expands as Mlezi grows.</b>
          </p>
        </div>
      </Section>

      <Section tone="cream">
        <div className="s-split s-split-top">
          <div>
            <Eyebrow>Who is in the network</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 18px" }}>Professional categories, as availability allows.</h2>
            <p className="s-lede">
              Clinicians join the Mlezi network by invitation, following verification of their professional registration
              and scope of practice.
            </p>
          </div>
          <Photo photo={photos.clinicianNotes} />
        </div>
        <div className="s-grid-4" style={{ marginTop: 40 }}>
          {roles.map((role) => (
            <div className="s-card" key={role.title}>
              <div className="s-icon"><role.icon size={18} /></div>
              <h3>{role.title}</h3>
              <p>{role.copy}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 26 }}>
          <Callout>
            Mlezi does not imply unrestricted prescribing or treatment capability. What a clinician in the network can do
            is governed by their professional registration, scope of practice and the clinical appropriateness of the case.
          </Callout>
        </div>
      </Section>

      <Section>
        <div className="s-split s-split-wide s-split-top">
          <ClinicianQueueMock />
          <div>
            <Eyebrow>How it works for clinicians</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 18px" }}>Healthcare professionals care wherever care is needed.</h2>
            <p className="s-lede">
              Mlezi enables qualified healthcare professionals to support students across multiple schools through a
              structured clinical workflow — not an open marketplace, and not an on-demand consumer queue.
            </p>
            <Bullets items={[
              "A consultation queue with real clinical context attached",
              "A clinical summary prepared by a school health professional",
              "A school nurse present with the student throughout",
              "Outcomes written back into the student's health record",
              "Follow-up owned by the school health team, not lost at the end of a call",
            ]} />
          </div>
        </div>
      </Section>

      <Section tone="forest" className="s-dark">
        <div className="s-split s-split-top">
          <div>
            <Eyebrow dark>The consultation</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 18px" }}>You are never the only clinician in the room.</h2>
            <p className="s-lede">
              In a Mlezi consultation the school nurse has already assessed the student, recorded observations and gathered
              the relevant history. They stay present, and they carry out what is agreed.
            </p>
            <div style={{ marginTop: 28 }}>
              <p className="s-micro" style={{ color: "#8fae9f", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 12 }}>Consultation types</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {consultationTypes.map((type) => (
                  <span key={type} style={{ border: "1px solid rgba(255,255,255,.16)", borderRadius: 99, padding: "7px 13px", fontSize: 12.5, color: "#cfe6d8" }}>{type}</span>
                ))}
              </div>
            </div>
          </div>
          <TelehealthMock />
        </div>
      </Section>

      <Section tone="cream" size="sm">
        <div className="s-container-narrow">
          <Callout>
            <span>
              <b style={{ color: "var(--ink)" }}>The clinical network grows by invitation.</b> Clinicians join after
              verification by the Mlezi clinical team, and schools are matched to the network as part of onboarding —
              there is no public application queue.
            </span>
          </Callout>
        </div>
      </Section>

      <Finale
        title={<>Care that reaches the children who are hardest to reach.</>}
        copy="Mlezi connects schools, parents and a clinical network around the health of every student."
      />
    </SiteLayout>
  );
}

function Connector() {
  return <div style={{ display: "grid", placeItems: "center", padding: "14px 0", color: "#b3c8bd" }}><ArrowDown size={20} /></div>;
}
