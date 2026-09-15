import { FileText, Mail } from "lucide-react";
import { useState } from "react";
import { cn } from "../../pages/shared";
import { articles, resourceCategories } from "../content";
import { PageHero, SiteLayout } from "../shell";
import { Btn, Eyebrow, Finale, Section, SectionHead } from "../ui";
import { photos } from "../photos";

export default function ResourcesPage() {
  const [category, setCategory] = useState("All");
  const [subscribed, setSubscribed] = useState(false);
  const visible = category === "All" ? articles : articles.filter((article) => article.category === category);
  const [featured, ...rest] = visible;

  return (
    <SiteLayout>
      <PageHero
        cream
        eyebrow="Resources"
        title="What we've learned about health in boarding schools."
        lede="Practical writing for school health teams, school leadership and parents — on medication safety, sick-bay operations, telehealth, screening and the everyday work of caring for children away from home."
      />

      <Section size="sm">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 34 }}>
          {["All", ...resourceCategories].map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={cn("s-btn", "s-btn-sm", category === item ? "s-btn-primary" : "s-btn-outline")}
              style={{ background: category === item ? undefined : "#fff" }}
            >
              {item}
            </button>
          ))}
        </div>

        {featured ? (
          <>
            <article className="s-article" style={{ marginBottom: 20 }}>
              <div className="s-featured-article">
                <div style={{ aspectRatio: "auto", minHeight: 240, position: "relative" }}>
                  <img src={photos.homeCare.src} alt={photos.homeCare.alt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <span style={{ position: "absolute", right: 10, bottom: 8, fontSize: 9, color: "rgba(255,255,255,.85)", textShadow: "0 1px 3px rgba(0,0,0,.5)" }}>
                    Photo: <a href={photos.homeCare.photographerUrl} target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>{photos.homeCare.photographer}</a> / Pexels
                  </span>
                </div>
                <div className="s-article-body" style={{ padding: "34px 34px 30px", justifyContent: "center" }}>
                  <span className="s-tag">{featured.category}</span>
                  <h3 className="s-h3" style={{ marginTop: 16 }}>{featured.title}</h3>
                  <p style={{ fontSize: 14.5, marginTop: 12 }}>{featured.blurb}</p>
                  <span className="s-article-meta">{featured.read} · Mlezi Health</span>
                </div>
              </div>
            </article>

            <div className="s-grid-3">
              {rest.map((article) => (
                <article className="s-article" key={article.title}>
                  <div className={cn("s-article-top", article.art)}><FileText size={34} /></div>
                  <div className="s-article-body">
                    <span className="s-tag grey" style={{ alignSelf: "flex-start" }}>{article.category}</span>
                    <h3 style={{ marginTop: 14 }}>{article.title}</h3>
                    <p>{article.blurb}</p>
                    <span className="s-article-meta">{article.read}</span>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="s-card" style={{ textAlign: "center", padding: "54px 24px" }}>
            <h3 className="s-h3">Nothing published here yet.</h3>
            <p className="s-body" style={{ marginTop: 12 }}>We're still writing for this category. Try another, or subscribe below.</p>
          </div>
        )}
      </Section>

      <Section tone="cream">
        <div className="s-split s-split-top">
          <div>
            <Eyebrow>Subscribe</Eyebrow>
            <h2 className="s-h2" style={{ margin: "16px 0 18px" }}>Writing for people who run school health departments.</h2>
            <p className="s-lede">
              Occasional, practical, and never a product announcement dressed up as an article. Unsubscribe whenever you
              like.
            </p>
          </div>
          <div className="s-card" style={{ background: "#fff" }}>
            {subscribed ? (
              <div className="s-success" style={{ padding: "24px 12px" }}>
                <span className="s-success-mark"><Mail size={22} /></span>
                <h3 className="s-h3">You're on the list.</h3>
                <p className="s-body" style={{ marginTop: 10 }}>We'll be in touch when there's something worth reading.</p>
              </div>
            ) : (
              <form className="s-form" onSubmit={(event) => { event.preventDefault(); setSubscribed(true); }}>
                <div className="s-field"><label>Your name</label><input required placeholder="e.g. Grace Wanjiku" /></div>
                <div className="s-field"><label>Email</label><input required type="email" placeholder="you@school.ac.ke" /></div>
                <div className="s-field">
                  <label>I am a</label>
                  <select defaultValue="">
                    <option value="" disabled>Select one</option>
                    <option>School health professional</option>
                    <option>School leader or administrator</option>
                    <option>Parent</option>
                    <option>Healthcare professional</option>
                    <option>Other</option>
                  </select>
                </div>
                <button className="s-btn s-btn-primary" type="submit" style={{ width: "100%" }}>Subscribe</button>
              </form>
            )}
          </div>
        </div>
      </Section>

      <Section size="sm" tone="grey">
        <div className="s-head-split" style={{ marginBottom: 0 }}>
          <SectionHead eyebrow="For schools" title="Ready to see it applied to your own health department?" />
          <div style={{ paddingBottom: 8 }}><Btn href="/demo">Bring Mlezi to Your School</Btn></div>
        </div>
      </Section>

      <Finale
        title={<>Better writing is not the point. Better care is.</>}
        copy="Mlezi connects schools, parents and healthcare professionals around the health of every student."
      />
    </SiteLayout>
  );
}
