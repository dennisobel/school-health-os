import { CalendarCheck, CheckCircle2, Phone, ShieldCheck, Users } from "lucide-react";
import { useState } from "react";
import { PageHero, SiteLayout } from "../shell";
import { Eyebrow, Finale, Section, SectionHead, TextLink } from "../ui";
import { PhotoBadge, photos } from "../photos";

const counties = [
  "Nairobi", "Kiambu", "Nakuru", "Uasin Gishu", "Machakos", "Kisumu", "Mombasa", "Muranga", "Nyeri",
  "Kakamega", "Kericho", "Meru", "Kajiado", "Laikipia", "Bungoma", "Other",
];

const healthSetups = [
  "Full-time nurse on site", "Nurse plus visiting school doctor", "Part-time or visiting nurse",
  "Matron or first-aider only", "Outsourced clinic arrangement", "Still being established",
];

const challenges = [
  "Medication management and custody", "Sick-bay records and reporting", "Parent communication",
  "Referrals and medical cover", "Emergency readiness", "Screening and follow-up",
  "Access to clinical support", "Everything is on paper",
];

export default function DemoPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <SiteLayout stickyCta={null}>
      <PageHero
        eyebrow="Book a demo"
        title="Let's build a better health department for your school."
        lede="Tell us how your school health setup works today. A Mlezi specialist will show you how the platform fits — and tell you honestly if it doesn't."
      />

      <Section>
        <div className="s-split s-split-top" style={{ gap: 52 }}>
          <div>
            <Eyebrow>What happens next</Eyebrow>
            <h2 className="s-h3" style={{ marginTop: 14 }}>Three steps, no pressure.</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 20 }}>
              <PhotoBadge photo={photos.portraitCare} size={46} />
              <span style={{ fontSize: 13, color: "var(--ink-soft)" }}>
                A real Mlezi specialist calls you back — never a bot, never a generic sales queue.
              </span>
            </div>
            <div style={{ marginTop: 24, display: "grid", gap: 20 }}>
              {[
                { icon: Phone, title: "A short conversation", copy: "We ask how your health department runs today — the nurse, the records, the medication, the parents." },
                { icon: Users, title: "A walkthrough with your team", copy: "We show Mlezi against your actual workflow, with your health team and leadership in the room." },
                { icon: CalendarCheck, title: "A plan, if it fits", copy: "Configuration, implementation timeline and pricing for your school size. If Mlezi isn't right for you, we'll say so." },
              ].map((step) => (
                <div key={step.title} style={{ display: "flex", gap: 14 }}>
                  <span className="s-icon" style={{ marginBottom: 0, flexShrink: 0 }}><step.icon size={17} /></span>
                  <span>
                    <b style={{ display: "block", fontSize: 15, fontWeight: 650, letterSpacing: "-0.022em", color: "var(--ink)" }}>{step.title}</b>
                    <span style={{ display: "block", marginTop: 5, fontSize: 13.5, lineHeight: 1.6, color: "var(--ink-soft)" }}>{step.copy}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="s-card-flat" style={{ marginTop: 32, background: "var(--cream)", borderColor: "var(--line-warm)" }}>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#6a5c46", margin: 0 }}>
                <b style={{ color: "var(--ink)" }}>Parents:</b> you don't need to go through this form. Mlezi Care is a
                direct subscription delivered by SMS and WhatsApp — no login required.
              </p>
              <div style={{ marginTop: 12 }}><TextLink href="/activate">Activate Mlezi Care</TextLink></div>
            </div>
          </div>

          <div className="s-card">
            {submitted ? (
              <div className="s-success">
                <span className="s-success-mark"><CheckCircle2 size={24} /></span>
                <h3 className="s-h3">Request received</h3>
                <p className="s-body" style={{ marginTop: 12, maxWidth: "42ch" }}>
                  Thank you. A Mlezi specialist will contact you to understand your school's health setup and show you how
                  the platform works.
                </p>
                <button className="s-btn s-btn-outline s-btn-sm" style={{ marginTop: 22 }} onClick={() => setSubmitted(false)}>
                  Submit another school
                </button>
              </div>
            ) : (
              <form className="s-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
                <h3 className="s-h3" style={{ marginBottom: 4 }}>Request a Mlezi demo</h3>
                <div className="s-field"><label>School name</label><input required placeholder="e.g. Greenfields Academy" /></div>
                <div className="s-field-row">
                  <div className="s-field"><label>Number of students</label><input required type="number" min="1" placeholder="e.g. 1,248" /></div>
                  <div className="s-field">
                    <label>County</label>
                    <select required defaultValue="">
                      <option value="" disabled>Select a county</option>
                      {counties.map((county) => <option key={county}>{county}</option>)}
                    </select>
                  </div>
                </div>
                <div className="s-field-row">
                  <div className="s-field"><label>Contact name</label><input required placeholder="e.g. Grace Wanjiku" /></div>
                  <div className="s-field">
                    <label>Your role</label>
                    <select required defaultValue="">
                      <option value="" disabled>Select a role</option>
                      <option>Principal / Head teacher</option>
                      <option>Director / Board member</option>
                      <option>School administrator</option>
                      <option>School nurse</option>
                      <option>School doctor</option>
                      <option>Bursar</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="s-field-row">
                  <div className="s-field"><label>Phone</label><input required type="tel" placeholder="e.g. +254 7xx xxx xxx" /></div>
                  <div className="s-field"><label>Email</label><input required type="email" placeholder="you@school.ac.ke" /></div>
                </div>
                <div className="s-field">
                  <label>Current health setup</label>
                  <select required defaultValue="">
                    <option value="" disabled>Select the closest description</option>
                    {healthSetups.map((setup) => <option key={setup}>{setup}</option>)}
                  </select>
                </div>
                <div className="s-field">
                  <label>Primary challenge</label>
                  <select required defaultValue="">
                    <option value="" disabled>What would you most like to fix?</option>
                    {challenges.map((challenge) => <option key={challenge}>{challenge}</option>)}
                  </select>
                </div>
                <div className="s-field"><label>Anything else we should know</label><textarea placeholder="Optional — term dates, existing systems, particular concerns." /></div>
                <button className="s-btn s-btn-primary s-btn-lg" type="submit" style={{ width: "100%" }}>Request a Mlezi Demo</button>
                <p className="s-form-note">
                  <ShieldCheck size={14} />
                  <span>We use these details only to contact you about Mlezi for your school. No student information is collected on this form.</span>
                </p>
              </form>
            )}
          </div>
        </div>
      </Section>

      <Section tone="cream" size="sm">
        <SectionHead
          center
          eyebrow="What we'll ask about"
          title="Come with the messy version. That's the useful one."
          className="s-head-center"
        />
        <div className="s-grid-4" style={{ marginTop: 36 }}>
          {[
            { title: "Your health team", copy: "Who is on site, when, and what they are qualified to do." },
            { title: "Your records today", copy: "Paper files, a spreadsheet, a system that nobody likes — whatever it actually is." },
            { title: "Medication", copy: "How it arrives, where it is kept and how a dose gets recorded." },
            { title: "Parents", copy: "How you communicate today, and what you get asked most often." },
          ].map((item) => (
            <div className="s-card-flat" key={item.title} style={{ background: "#fff" }}>
              <h3 style={{ fontSize: 14.5 }}>{item.title}</h3>
              <p style={{ fontSize: 12.5 }}>{item.copy}</p>
            </div>
          ))}
        </div>
      </Section>

      <Finale
        title={<>The health department you already run, with a system behind it.</>}
        copy="Mlezi connects schools, parents and healthcare professionals around the health of every student."
        primary={{ label: "See how it works", href: "/how-it-works" }}
        secondary={{ label: "See pricing", href: "/pricing" }}
      />
    </SiteLayout>
  );
}
