import { Plus } from "lucide-react";

export const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

export function InfoBlock({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div>
      <span className="block text-[9px] font-bold uppercase tracking-[.1em] text-[#91a4a0]">{label}</span>
      <strong className={cn("mt-1 block text-[11px] text-[#315963]", tone === "red" && "!text-[#b4534e]", tone === "teal" && "!text-[#2d897e]", tone === "amber" && "!text-[#a36e25]")}>{value}</strong>
    </div>
  );
}

export function Stat({ icon: Icon, label, value, note, tone }: { icon: any; label: string; value: string; note: string; tone: string }) {
  return (
    <div className="stat-card">
      <div className="stat-top"><span>{label}</span><div className={cn("stat-icon", `icon-${tone}`)}><Icon size={14}/></div></div>
      <h3>{value}</h3>
      <p><b>●</b> {note}</p>
    </div>
  );
}

export function PageHeader({ eyebrow, title, description, action, onAction }: { eyebrow: string; title: string; description: string; action?: string; onAction?: () => void }) {
  return (
    <div className="portal-header">
      <div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>
      {action && <button className="btn btn-primary btn-small" onClick={onAction}><Plus size={13}/>{action}</button>}
    </div>
  );
}
