import { ArrowRight, ChevronRight, Facebook, Linkedin, Menu, Twitter, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { cn } from "../pages/shared";
import { MleziLogo } from "./brand";
import { Btn } from "./ui";

const primaryNav = [
  ["Platform", "/platform"],
  ["How It Works", "/how-it-works"],
  ["For Schools", "/for-schools"],
  ["For Parents", "/for-parents"],
  ["Clinical Network", "/clinical-network"],
  ["Impact", "/impact"],
  ["Resources", "/resources"],
  ["About", "/about"],
] as const;

const footerColumns = [
  {
    title: "Platform",
    links: [["School Health", "/for-schools"], ["Medication", "/platform#medication"], ["Telehealth", "/platform#telehealth"], ["Referrals", "/platform#referrals"], ["Screening", "/platform#screening"], ["Health Intelligence", "/platform#intelligence"]],
  },
  {
    title: "For Parents",
    links: [["Mlezi Care", "/for-parents"], ["Activate Mlezi Care", "/activate"], ["Parent FAQ", "/faq"]],
  },
  {
    title: "For Schools",
    links: [["Book a Demo", "/demo"], ["Implementation", "/for-schools#implementation"], ["Pricing", "/pricing"], ["Health Station", "/platform#health-station"]],
  },
  {
    title: "Network",
    links: [["Clinical Network", "/clinical-network"], ["Impact", "/impact"]],
  },
  {
    title: "Trust",
    links: [["Security & Privacy", "/security"], ["Data Protection", "/security#data-protection"], ["Terms", "/security#terms"], ["Privacy Policy", "/security#privacy-policy"]],
  },
] as const;

/** Wouter keeps scroll position between routes; the marketing site should always open at the top. */
function useScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
  }, [location]);
}

function MobileMenu({ close }: { close: () => void }) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, []);

  return (
    <div className="s-mobile-menu">
      <div className="s-mobile-top">
        <Link href="/" onClick={close}><MleziLogo size={32} /></Link>
        <button className="s-nav-burger" style={{ display: "grid" }} onClick={close} aria-label="Close menu"><X size={19} /></button>
      </div>
      <div className="s-mobile-links">
        {primaryNav.map(([label, href]) => (
          <Link key={href} href={href} onClick={close}>{label} <ChevronRight size={18} /></Link>
        ))}
        <Link href="/pricing" onClick={close}>Pricing <ChevronRight size={18} /></Link>
        <Link href="/security" onClick={close}>Security & Privacy <ChevronRight size={18} /></Link>
        <Link href="/faq" onClick={close}>FAQ <ChevronRight size={18} /></Link>
        <Link href="/contact" onClick={close}>Contact <ChevronRight size={18} /></Link>
      </div>
      <div className="s-mobile-foot">
        <Btn href="/demo" tone="primary">Book a Demo</Btn>
        <Btn href="/activate" tone="outline" icon={false}>Activate Mlezi Care</Btn>
      </div>
    </div>
  );
}

export function SiteNav() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="s-nav">
        <div className="s-container s-nav-inner">
          <Link href="/" aria-label="Mlezi Health home"><MleziLogo /></Link>
          <nav className="s-nav-links">
            {primaryNav.map(([label, href]) => (
              <Link key={href} href={href} className={cn(location.startsWith(href) && "is-active")}>{label}</Link>
            ))}
          </nav>
          <div className="s-nav-right">
            <Link href="/activate" className="s-nav-signin">Activate Mlezi Care</Link>
            <Btn href="/demo" size="sm" icon={false}>Book a Demo</Btn>
            <button className="s-nav-burger" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={19} /></button>
          </div>
        </div>
      </header>
      {menuOpen && <MobileMenu close={() => setMenuOpen(false)} />}
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="s-footer">
      <div className="s-container">
        <div className="s-footer-top">
          <div className="s-footer-brand">
            <MleziLogo dark />
            <p>The healthcare network for children while they're away at school.</p>
            <div className="s-social" style={{ marginTop: 20 }}>
              <a href="#" aria-label="Mlezi Health on LinkedIn"><Linkedin size={15} /></a>
              <a href="#" aria-label="Mlezi Health on X"><Twitter size={15} /></a>
              <a href="#" aria-label="Mlezi Health on Facebook"><Facebook size={15} /></a>
            </div>
          </div>
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4>{column.title}</h4>
              <ul>
                {column.links.map(([label, href]) => (
                  <li key={label}><Link href={href}>{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="s-footer-bottom">
          <span>© 2026 Mlezi Health. Away from home. Never away from care.</span>
          <span style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/contact#careers">Careers</Link>
            <Link href="/security">Security & Privacy</Link>
          </span>
        </div>
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,.08)", fontSize: 11.5, color: "#6f8d7d" }}>
          Technology, systems and digital infrastructure by{" "}
          <a href="https://cortexgridsolutionlimited.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#8caa9b", fontWeight: 600 }}>
            Cortexgrid Solution Limited
          </a>.
        </div>
      </div>
    </footer>
  );
}

export function StickyCta({ label = "Bring Mlezi to Your School", href = "/demo" }: { label?: string; href?: string }) {
  return (
    <div className="s-sticky-cta">
      <Link href={href} className="s-btn s-btn-primary">{label} <ArrowRight size={15} /></Link>
    </div>
  );
}

export function SiteLayout({
  children, stickyCta = { label: "Bring Mlezi to Your School", href: "/demo" },
}: { children: React.ReactNode; stickyCta?: { label: string; href: string } | null }) {
  useScrollToTop();
  return (
    <div className="site">
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
      {stickyCta && <StickyCta label={stickyCta.label} href={stickyCta.href} />}
    </div>
  );
}

/** Shared page hero for the interior marketing pages. */
export function PageHero({
  eyebrow, title, lede, actions, cream, children,
}: { eyebrow: string; title: React.ReactNode; lede: React.ReactNode; actions?: React.ReactNode; cream?: boolean; children?: React.ReactNode }) {
  return (
    <section className={cn("s-page-hero", cream ? "is-cream" : "s-dark")}>
      <div className="s-container">
        <span className={cn("s-eyebrow", !cream && "on-dark")}><i />{eyebrow}</span>
        <h1 className="s-h1" style={{ marginTop: 18 }}>{title}</h1>
        <p className="s-lede">{lede}</p>
        {actions && <div className="s-hero-actions" style={{ marginTop: 32 }}>{actions}</div>}
        {children}
      </div>
    </section>
  );
}
