import { Briefcase, Building2, CheckCircle2, HeartPulse, LifeBuoy, Mail, Stethoscope } from "lucide-react";
import { useState } from "react";
import { PageHero, SiteLayout } from "../shell";
import { Btn, Eyebrow, Finale, Section, SectionHead } from "../ui";
import { Photo, photos } from "../photos";

const routes = [
  { icon: Building2, title: "Sales", copy: "For schools evaluating Mlezi, pricing and the Health Station package.", action: "Book a demo", href: "/demo", email: "schools@mlezi.health" },
  { icon: LifeBuoy, title: "School onboarding", copy: "For schools already implementing Mlezi — configuration, data import and go-live.", action: "Email onboarding", href: "/contact", email: "onboarding@mlezi.health" },
  { icon: Stethoscope, title: "Clinical network", copy: "For clinicians already part of the Mlezi network, and schools coordinating with it.", action: "About the network", href: "/clinical-network", email: "clinical@mlezi.health" },
  { icon: HeartPulse, title: "Parent support", copy: "For parents using Mlezi Care — activation, billing and questions about what you'll be sent.", action: "Activate Mlezi Care", href: "/activate", email: "care@mlezi.health" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <SiteLayout stickyCta={null}>
      <PageHero
        cream
        eyebrow="Contact"
        title="Find the right person, not a switchboard."
        lede="Four routes in, depending on why you're here. Every one of them reaches a person who works on Mlezi."
      />

      <Section size="sm">
        <div className="s-grid-4">
          {routes.map((route) => (
            <div className="s-card" key={route.title} style={{ display: "flex", flexDirection: "column" }}>
              <div className="s-icon"><route.icon size={18} /></div>
              <h3>{route.title}</h3>
              <p>{route.copy}</p>
              <p style={{ marginTop: 14, fontSize: 13, fontWeight: 650, color: "var(--forest)" }}>{route.email}</p>
              <div style={{ marginTop: "auto", paddingTop: 20 }}>
                <Btn href={route.href} tone="outline" size="sm" icon={false}>{route.action}</Btn>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="cream">
        <div className="s-split s-split-top" style={{ gap: 52 }}>
          <div>
            <Eyebrow>General enquiries</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 18px" }}>Something that doesn't fit the four boxes?</h2>
            <p className="s-lede">
              Press, partnerships, research, a question about the Mlezi Fund, or a school health problem you would like a
              second opinion on. Write to us and we'll route it.
            </p>
            <div style={{ marginTop: 30, display: "grid", gap: 16 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <Mail size={16} style={{ color: "var(--sage)" }} />
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>hello@mlezi.health</span>
              </div>
              <div id="careers" style={{ display: "flex", gap: 12, alignItems: "center", scrollMarginTop: 90 }}>
                <Briefcase size={16} style={{ color: "var(--sage)" }} />
                <span style={{ fontSize: 14, color: "var(--ink-soft)" }}>
                  <b style={{ color: "var(--ink)" }}>Careers.</b> We hire engineers, clinicians and people who have actually
                  worked in a school health department — careers@mlezi.health
                </span>
              </div>
            </div>
            <div style={{ marginTop: 28, maxWidth: 280 }}>
              <Photo photo={photos.parentPhone} ratio="tall" />
            </div>
          </div>

          <div className="s-card" style={{ background: "#fff" }}>
            {submitted ? (
              <div className="s-success">
                <span className="s-success-mark"><CheckCircle2 size={24} /></span>
                <h3 className="s-h3">Message sent</h3>
                <p className="s-body" style={{ marginTop: 12, maxWidth: "40ch" }}>Thank you. We'll route your message to the right person and come back to you.</p>
                <button className="s-btn s-btn-outline s-btn-sm" style={{ marginTop: 22 }} onClick={() => setSubmitted(false)}>Send another message</button>
              </div>
            ) : (
              <form className="s-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
                <h3 className="s-h3" style={{ marginBottom: 4 }}>Send us a message</h3>
                <div className="s-field-row">
                  <div className="s-field"><label>Your name</label><input required placeholder="e.g. Grace Wanjiku" /></div>
                  <div className="s-field"><label>Email</label><input required type="email" placeholder="you@example.com" /></div>
                </div>
                <div className="s-field">
                  <label>I am contacting you as a</label>
                  <select required defaultValue="">
                    <option value="" disabled>Select one</option>
                    <option>School leader or administrator</option>
                    <option>School health professional</option>
                    <option>Parent or guardian</option>
                    <option>Healthcare professional</option>
                    <option>Press or media</option>
                    <option>Partner or supplier</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="s-field"><label>Message</label><textarea required placeholder="Tell us what you need." /></div>
                <button className="s-btn s-btn-primary" type="submit" style={{ width: "100%" }}>Send message</button>
                <p className="s-form-note">
                  <CheckCircle2 size={14} />
                  <span>Please don't include any student health information in this form.</span>
                </p>
              </form>
            )}
          </div>
        </div>
      </Section>

      <Section size="sm">
        <SectionHead center eyebrow="Where we are" title="Nairobi, Kenya — working with boarding schools across the country." className="s-head-center" />
      </Section>

      <Finale
        title={<>Whatever brought you here, there's a way forward.</>}
        copy="Mlezi connects schools, parents and healthcare professionals around the health of every student."
      />
    </SiteLayout>
  );
}
