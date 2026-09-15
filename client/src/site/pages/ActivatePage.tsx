import { CheckCircle2, MessageCircle, ShieldCheck, Smartphone } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { MleziLogo } from "../brand";
import { ParentPhoneMock } from "../mockups";
import { PhotoBadge, photos } from "../photos";

const relationships = ["Mother", "Father", "Guardian", "Other"];
const channels = [
  { value: "both", label: "SMS & WhatsApp" },
  { value: "sms", label: "SMS only" },
  { value: "whatsapp", label: "WhatsApp only" },
];

export default function ActivatePage() {
  const [activated, setActivated] = useState(false);

  return (
    <div className="site">
      <div className="s-auth">
        <aside className="s-auth-aside s-dark">
          <Link href="/"><MleziLogo dark /></Link>

          <div>
            <span className="s-eyebrow on-dark"><i />Mlezi Care</span>
            <h2 className="s-h2">Your child's health, sent straight to your phone.</h2>
            <p className="s-lede">
              No app to install. No password to remember. Mlezi Care reaches you as SMS and WhatsApp messages from the
              health team caring for your child at school.
            </p>
            <div style={{ marginTop: 26, display: "grid", gap: 14 }}>
              {[
                { icon: Smartphone, title: "Works on any phone", copy: "No smartphone or data plan required for SMS." },
                { icon: MessageCircle, title: "Meaningful alerts only", copy: "Configured by your school according to seriousness." },
                { icon: ShieldCheck, title: "Confirmed with your school", copy: "Activation is matched against your child's record." },
              ].map((item) => (
                <div key={item.title} style={{ display: "flex", gap: 12 }}>
                  <item.icon size={17} style={{ color: "#7fd1a6", flexShrink: 0, marginTop: 2 }} />
                  <span>
                    <b style={{ display: "block", fontSize: 13.5, fontWeight: 650, color: "#fff" }}>{item.title}</b>
                    <span style={{ display: "block", marginTop: 3, fontSize: 12.5, lineHeight: 1.5, color: "#9fc6b2" }}>{item.copy}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14, borderTop: "1px solid rgba(255,255,255,.12)", paddingTop: 22 }}>
            <PhotoBadge photo={photos.portraitCare} size={52} dark />
            <p style={{ fontSize: 13, lineHeight: 1.55, color: "#9fc6b2", margin: 0 }}>
              "We're keeping an eye on things."<br />
              <span style={{ color: "#7fb69a" }}>Away from home. Never away from care.</span>
            </p>
          </div>
        </aside>

        <main className="s-auth-main">
          <div style={{ width: "100%", maxWidth: 420 }}>
            <div className="s-auth-card">
              <div style={{ marginBottom: 24 }}><MleziLogo /></div>

              {activated ? (
                <div className="s-success" style={{ padding: "8px 0 4px" }}>
                  <span className="s-success-mark"><CheckCircle2 size={24} /></span>
                  <h2 style={{ fontSize: 22 }}>You're almost set up</h2>
                  <p className="s-body" style={{ marginTop: 10 }}>
                    We'll confirm your details with the school and start sending SMS and WhatsApp alerts to the number you
                    gave us. There's nothing to install and nothing to sign in to.
                  </p>
                  <div style={{ margin: "22px 0 4px", display: "grid", justifyItems: "center" }}>
                    <ParentPhoneMock compact />
                  </div>
                  <p className="s-small" style={{ marginTop: 18 }}>Here's roughly what those messages will look like.</p>
                  <button
                    className="s-btn s-btn-outline s-btn-sm"
                    style={{ marginTop: 14 }}
                    onClick={() => setActivated(false)}
                  >
                    Activate another child
                  </button>
                </div>
              ) : (
                <>
                  <h2>Activate Mlezi Care</h2>
                  <p className="s-body" style={{ marginTop: 10 }}>
                    Tell us who to message and who your child is. We'll confirm with the school and start sending alerts.
                  </p>

                  <form className="s-form" style={{ marginTop: 24 }} onSubmit={(event) => { event.preventDefault(); setActivated(true); }}>
                    <div className="s-field"><label>Your name</label><input required placeholder="e.g. Grace Wanjiku" /></div>
                    <div className="s-field">
                      <label>Phone number</label>
                      <input required type="tel" placeholder="e.g. +254 7xx xxx xxx" />
                    </div>
                    <div className="s-field">
                      <label>How should we reach you?</label>
                      <select required defaultValue="both">
                        {channels.map((channel) => <option key={channel.value} value={channel.value}>{channel.label}</option>)}
                      </select>
                    </div>
                    <div className="s-field-row">
                      <div className="s-field"><label>Child's name</label><input required placeholder="e.g. Maria Wanjiku" /></div>
                      <div className="s-field">
                        <label>You are the</label>
                        <select required defaultValue="">
                          <option value="" disabled>Select one</option>
                          {relationships.map((relationship) => <option key={relationship}>{relationship}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="s-field"><label>Child's school</label><input required placeholder="e.g. Greenfields Academy" /></div>
                    <label style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, lineHeight: 1.5, color: "var(--ink-mute)" }}>
                      <input type="checkbox" required style={{ width: "auto", marginTop: 2, accentColor: "var(--forest)" }} />
                      I agree to receive SMS and WhatsApp messages about my child's health from Mlezi Health.
                    </label>
                    <button className="s-btn s-btn-primary" type="submit" style={{ width: "100%" }}>Activate Mlezi Care</button>
                  </form>

                  <p className="s-form-note" style={{ marginTop: 18 }}>
                    <ShieldCheck size={14} />
                    <span>Activation requests are matched against your child's school record before alerts begin.</span>
                  </p>
                </>
              )}
            </div>

            <div style={{ marginTop: 18, display: "flex", alignItems: "flex-start", gap: 9, fontSize: 11.5, lineHeight: 1.55, color: "var(--ink-mute)" }}>
              <ShieldCheck size={14} style={{ color: "var(--sage)", flexShrink: 0, marginTop: 1 }} />
              <span>
                The school health team remains responsible for on-campus care. In an emergency, contact the school directly.
              </span>
            </div>

            <div style={{ marginTop: 20, display: "flex", gap: 18, justifyContent: "center", fontSize: 12, fontWeight: 600 }}>
              <Link href="/" style={{ color: "var(--ink-mute)" }}>← Back to Mlezi Health</Link>
              <Link href="/faq" style={{ color: "var(--ink-mute)" }}>Parent FAQ</Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
