import { ArrowRight, ChevronRight, Info, Plus } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { cn } from "../pages/shared";

/* ---------------- Layout primitives ---------------- */

export function Section({
  id, tone = "paper", size = "lg", className, children,
}: { id?: string; tone?: "paper" | "cream" | "cream-deep" | "grey" | "forest"; size?: "lg" | "sm"; className?: string; children: React.ReactNode }) {
  const toneClass = tone === "cream" ? "s-cream" : tone === "cream-deep" ? "s-cream-deep" : tone === "grey" ? "s-grey" : tone === "forest" ? "s-forest" : "";
  return (
    <section id={id} className={cn(size === "sm" ? "s-section-sm" : "s-section", toneClass, className)}>
      <div className="s-container">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return <span className={cn("s-eyebrow", dark && "on-dark")}><i />{children}</span>;
}

export function SectionHead({
  eyebrow, title, lede, dark, center, className, children,
}: { eyebrow?: string; title: React.ReactNode; lede?: React.ReactNode; dark?: boolean; center?: boolean; className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("s-head", center && "s-head-center", className)}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2 className="s-h2">{title}</h2>
      {lede && <p className="s-lede">{lede}</p>}
      {children}
    </div>
  );
}

/* ---------------- Buttons ---------------- */

type BtnTone = "primary" | "outline" | "cream" | "onforest" | "clay";
export function Btn({
  href, tone = "primary", size, icon = true, className, onClick, type, children,
}: { href?: string; tone?: BtnTone; size?: "sm" | "lg"; icon?: boolean; className?: string; onClick?: () => void; type?: "submit" | "button"; children: React.ReactNode }) {
  const classes = cn("s-btn", `s-btn-${tone}`, size === "sm" && "s-btn-sm", size === "lg" && "s-btn-lg", className);
  const body = <>{children}{icon && <ArrowRight size={15} />}</>;
  if (href) {
    return href.startsWith("#") || href.startsWith("http")
      ? <a className={classes} href={href}>{body}</a>
      : <Link href={href} className={classes}>{body}</Link>;
  }
  return <button className={classes} type={type ?? "button"} onClick={onClick}>{body}</button>;
}

export function TextLink({ href, dark, children }: { href: string; dark?: boolean; children: React.ReactNode }) {
  const classes = cn("s-link", dark && "on-dark");
  const body = <>{children}<ArrowRight size={14} /></>;
  return href.startsWith("#") ? <a className={classes} href={href}>{body}</a> : <Link href={href} className={classes}>{body}</Link>;
}

/* ---------------- Content blocks ---------------- */

export function FeatureCard({
  icon: Icon, title, copy, tone, href,
}: { icon: any; title: string; copy: string; tone?: "clay" | "teal"; href?: string }) {
  const inner = (
    <>
      <div className={cn("s-icon", tone)}><Icon size={18} /></div>
      <h3>{title}</h3>
      <p>{copy}</p>
      {href && <span className="s-article-meta">Learn more <ChevronRight size={13} /></span>}
    </>
  );
  return href
    ? <Link href={href} className="s-card s-card-hover" style={{ display: "flex", flexDirection: "column" }}>{inner}</Link>
    : <div className="s-card s-card-hover">{inner}</div>;
}

export function Bullets({ items, dark }: { items: string[]; dark?: boolean }) {
  return (
    <ul className={cn("s-list", dark && "on-dark")}>
      {items.map((item) => (
        <li key={item}><Check /> <span>{item}</span></li>
      ))}
    </ul>
  );
}

function Check() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7.2" stroke="currentColor" strokeWidth="1.3" opacity=".45" />
      <path d="M5 8.2l2.1 2.1L11 6.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Steps({ items }: { items: { num: string; title: string; copy: string }[] }) {
  return (
    <div className="s-steps">
      {items.map((step) => (
        <div className="s-step" key={step.num}>
          <span className="s-step-num">{step.num}</span>
          <h3>{step.title}</h3>
          <p>{step.copy}</p>
        </div>
      ))}
    </div>
  );
}

export function Metrics({ items, note }: { items: { value: string; label: string }[]; note?: string }) {
  return (
    <>
      <div className="s-metrics">
        {items.map((metric) => (
          <div className="s-metric" key={metric.label}>
            <b>{metric.value}</b>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>
      {note && <p className="s-small" style={{ marginTop: 14 }}>{note}</p>}
    </>
  );
}

export function Callout({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className={cn("s-callout", dark && "on-dark")}>
      <Info size={17} />
      <p>{children}</p>
    </div>
  );
}

/* ---------------- FAQ ---------------- */

export function Faq({ items, defaultOpen = 0 }: { items: { q: string; a: React.ReactNode }[]; defaultOpen?: number }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  return (
    <div className="s-faq">
      {items.map((item, i) => (
        <div className={cn("s-faq-item", open === i && "is-open")} key={item.q}>
          <button className="s-faq-q" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
            {item.q}
            <Plus size={19} />
          </button>
          {open === i && <div className="s-faq-a">{item.a}</div>}
        </div>
      ))}
    </div>
  );
}

/* ---------------- Final CTA ---------------- */

export function Finale({
  eyebrow = "Away from home. Never away from care.",
  title, copy, primary = { label: "Bring Mlezi to Your School", href: "/demo" }, secondary = { label: "See What Parents Get", href: "/for-parents" },
}: {
  eyebrow?: string; title: React.ReactNode; copy: string;
  primary?: { label: string; href: string }; secondary?: { label: string; href: string };
}) {
  return (
    <section className="s-finale s-dark">
      <div className="s-container">
        <Eyebrow dark>{eyebrow}</Eyebrow>
        <h2 className="s-h2">{title}</h2>
        <p>{copy}</p>
        <div className="s-finale-actions">
          <Btn href={primary.href} tone="cream" size="lg">{primary.label}</Btn>
          <Btn href={secondary.href} tone="onforest" size="lg" icon={false}>{secondary.label}</Btn>
        </div>
      </div>
    </section>
  );
}
