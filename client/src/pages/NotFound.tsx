import { Link } from "wouter";
import { PhotoBadge, photos } from "../site/photos";
import { SiteLayout } from "../site/shell";
import { Btn } from "../site/ui";

export default function NotFound() {
  return (
    <SiteLayout stickyCta={null}>
      <section className="s-section" style={{ paddingTop: 96, paddingBottom: 110 }}>
        <div className="s-container-narrow" style={{ textAlign: "center" }}>
          <div style={{ display: "grid", justifyItems: "center", marginBottom: 26 }}>
            <PhotoBadge photo={photos.portraitCare} size={92} />
          </div>
          <span className="s-eyebrow"><i />Page not found</span>
          <h1 className="s-h2" style={{ margin: "16px 0 16px" }}>We couldn't find that page.</h1>
          <p className="s-lede" style={{ maxWidth: "48ch", margin: "0 auto" }}>
            The link may have moved, or it may never have existed. Nothing needs your attention — let's get you back to
            somewhere useful.
          </p>
          <div className="s-finale-actions" style={{ marginTop: 32 }}>
            <Btn href="/">Back to Mlezi Health</Btn>
            <Btn href="/contact" tone="outline" icon={false}>Tell us what you were looking for</Btn>
          </div>
          <div style={{ marginTop: 44, display: "flex", flexWrap: "wrap", gap: 22, justifyContent: "center", fontSize: 13, fontWeight: 600 }}>
            {[["Platform", "/platform"], ["For Schools", "/for-schools"], ["For Parents", "/for-parents"], ["Pricing", "/pricing"], ["FAQ", "/faq"]].map(([label, href]) => (
              <Link key={href} href={href} style={{ color: "var(--forest)" }}>{label}</Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
