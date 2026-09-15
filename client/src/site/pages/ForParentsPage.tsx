import { Activity, Bell, FileText, HeartPulse, MessageCircle, Pill, Send, ShieldCheck } from "lucide-react";
import { Photo, photos } from "../photos";
import { parentFaq } from "../content";
import { PageHero, SiteLayout } from "../shell";
import { Btn, Callout, Eyebrow, Faq, Finale, Section, SectionHead, TextLink } from "../ui";
import { MedicationTimelineMock, ParentPhoneMock } from "../mockups";

const careFeatures = [
  { icon: HeartPulse, title: "Health timeline", copy: "Every meaningful health event in one place, in order, written by the people who were there." },
  { icon: Pill, title: "Medication", copy: "See that the medicine you handed over is being stored, scheduled and actually given." },
  { icon: Bell, title: "Notifications", copy: "Alerts for the events that matter, configured by your school according to seriousness." },
  { icon: FileText, title: "Documents", copy: "Prescriptions, discharge summaries, cover letters and screening results, kept together." },
  { icon: Send, title: "Referrals", copy: "Know when your child has been referred, where to, and what happens next." },
  { icon: Activity, title: "Telehealth", copy: "Participate in consultations where they are clinically appropriate and available." },
  { icon: ShieldCheck, title: "Medical cover", copy: "Keep your child's cover information current so it is there when it's needed." },
  { icon: MessageCircle, title: "Messages", copy: "Reach the school health team without going through the school switchboard." },
];

export default function ForParentsPage() {
  return (
    <SiteLayout stickyCta={{ label: "Join Mlezi Care", href: "/activate" }}>
      <PageHero
        cream
        eyebrow="For parents"
        title="Know how your child is doing, even when they're far from home."
        lede="Mlezi Care connects you to the health team caring for your child at school — so you are not relying on a phone call, a rumour, or the end of term to find out how they've been."
        actions={<>
          <Btn href="/activate" tone="primary" size="lg">Join Mlezi Care</Btn>
          <Btn href="#how" tone="outline" size="lg" icon={false}>How it works</Btn>
        </>}
      />

      <Section size="sm">
        <div className="s-split s-split-top">
          <div style={{ display: "grid", justifyItems: "center" }}>
            <ParentPhoneMock />
          </div>
          <div>
            <Eyebrow>What you see</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 18px" }}>Your child's care, as it happens.</h2>
            <p className="s-lede">
              Not an app you have to remember to open. Mlezi Care reaches you as SMS and WhatsApp messages — sent when
              something matters, and quiet when it doesn't.
            </p>
            <div className="s-grid-2" style={{ gap: 12, marginTop: 28 }}>
              {careFeatures.map((feature) => (
                <div key={feature.title} className="s-card-flat">
                  <feature.icon size={17} style={{ color: "var(--sage)" }} />
                  <h3 style={{ marginTop: 12, fontSize: 14.5 }}>{feature.title}</h3>
                  <p style={{ fontSize: 12.5 }}>{feature.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section tone="cream" id="how">
        <div className="s-split s-split-narrow s-split-top">
          <div>
            <Eyebrow>Medication</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 18px" }}>You handed over an inhaler in September. Here's what happened to it.</h2>
            <p className="s-lede">
              The single most common worry parents raise about boarding school is medication. Mlezi answers it with a
              record, not a reassurance.
            </p>
            <div style={{ marginTop: 26 }}>
              <Callout>
                Your child's school health team decides and delivers the care. Mlezi shows you that it happened.
              </Callout>
            </div>
          </div>
          <MedicationTimelineMock />
        </div>
      </Section>

      {/* Mlezi Care offer */}
      <Section>
        <div className="s-split s-split-wide s-split-top">
          <Photo photo={photos.parentsCare} />
          <div>
            <Eyebrow>Mlezi Care</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 16px" }}>A little more peace of mind while they're away.</h2>
            <p className="s-lede">
              One small subscription for better visibility into your child's health while they're away at school — and a
              way to take part in their care when your input is needed.
            </p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: 30, flexWrap: "wrap" }}>
              <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.045em", color: "var(--ink)" }}>KES 250</span>
              <span className="s-small">per term, or KES 650/year — for your whole family, not per child</span>
            </div>
            <div style={{ display: "flex", gap: 11, marginTop: 24, flexWrap: "wrap" }}>
              <Btn href="/activate">Activate Mlezi Care</Btn>
              <Btn href="/pricing" tone="outline" icon={false}>What's included</Btn>
            </div>
            <div style={{ marginTop: 28, borderTop: "1px solid var(--line)", paddingTop: 22 }}>
              <p className="s-body">
                <b style={{ color: "var(--ink)" }}>The school health team remains responsible for on-campus care.</b> Mlezi
                connects you to that care — it does not replace the nurse, the school doctor or a hospital.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="forest" className="s-dark" size="sm">
        <div className="s-split s-split-top">
          <div>
            <Eyebrow dark>What Mlezi Care is not</Eyebrow>
            <h2 className="s-h3" style={{ marginTop: 14 }}>Being clear is part of being trustworthy.</h2>
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            {[
              "It is not a medical service. Mlezi does not diagnose or treat your child.",
              "It is not medical insurance. Mlezi organises cover information; it does not underwrite or pay claims.",
              "It is not an emergency line. In an emergency the school acts first, following their emergency procedures.",
              "It is not unrestricted access to a clinical record. What you can see depends on the information type, the school's policy and clinical confidentiality.",
            ].map((item) => (
              <p key={item} style={{ fontSize: 14, lineHeight: 1.6, color: "#a9c4b8", paddingLeft: 16, borderLeft: "2px solid rgba(127,209,166,.35)" }}>{item}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="cream">
        <div className="s-head-split">
          <SectionHead eyebrow="Parent questions" title="The things parents actually ask us." />
          <div style={{ paddingBottom: 6 }}><TextLink href="/faq">See all frequently asked questions</TextLink></div>
        </div>
        <Faq items={parentFaq} />
      </Section>

      <Finale
        eyebrow="Away from home. Never away from care."
        title={<>They're growing up away from home. Stay close to how they're doing.</>}
        copy="Mlezi Care connects you to the health team looking after your child at school."
        primary={{ label: "Join Mlezi Care", href: "/activate" }}
        secondary={{ label: "Bring Mlezi to your school", href: "/demo" }}
      />
    </SiteLayout>
  );
}
