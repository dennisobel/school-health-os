import { useMemo, useState } from "react";
import { Link } from "wouter";
import type { LucideIcon } from "lucide-react";
import {
  Search, Plus, Siren, Inbox, Send, Bell, ArrowRight, MonitorSmartphone, Archive,
  Paperclip, X, ChevronDown, Check, CheckCheck, Phone, MessageCircle, ShieldCheck,
  LockKeyhole, FileText, Image as ImageIcon, Pill, Stethoscope, HeartPulse, Users,
  Info, Clock3, Mail, Smartphone, AlertTriangle, AlertCircle, FileHeart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PortalLayout, InfoBlock } from "./Home";
import {
  conversations, messagesByConversation, templates, staffDirectory, parents, students,
  studentParentName, emergencyEvents,
} from "@/data/messagesData";
import type {
  Conversation, ChatMessage, ConversationTab, MessagePriority, MessageCategory,
  MessageStatus, NotificationChannel, MessageTemplate, MessageAttachment, StudentSummary,
} from "@/types/messages";

type StudentKey = keyof typeof students;
const studentKeys = Object.keys(students) as StudentKey[];

const categoryIcon: Record<MessageCategory, LucideIcon> = {
  "General Health": HeartPulse,
  Medication: Pill,
  "Sick Bay": Stethoscope,
  Referral: ArrowRight,
  Telehealth: MonitorSmartphone,
  Consent: ShieldCheck,
  "Follow-up": Clock3,
  Emergency: Siren,
};

const categoryTagTone: Record<MessageCategory, string> = {
  "General Health": "tag-blue",
  Medication: "tag-amber",
  "Sick Bay": "tag-teal",
  Referral: "tag-blue",
  Telehealth: "tag-teal",
  Consent: "tag-blue",
  "Follow-up": "tag-amber",
  Emergency: "tag-critical",
};

const statusTone: Record<MessageStatus, string> = {
  Draft: "bg-[#f2f5f4] text-[#6b8180]",
  Queued: "tag-amber",
  Sent: "tag-blue",
  Delivered: "tag-blue",
  Read: "tag-teal",
  Failed: "tag-red",
};

const statusIcon: Record<MessageStatus, LucideIcon> = {
  Draft: FileText,
  Queued: Clock3,
  Sent: Send,
  Delivered: Check,
  Read: CheckCheck,
  Failed: AlertTriangle,
};

const tabConfig: { key: ConversationTab; label: string; icon: LucideIcon }[] = [
  { key: "inbox", label: "Inbox", icon: Inbox },
  { key: "sent", label: "Sent", icon: Send },
  { key: "needs-response", label: "Needs Response", icon: AlertCircle },
  { key: "health-notifications", label: "Health Notifications", icon: Bell },
  { key: "referral", label: "Referral Conversations", icon: ArrowRight },
  { key: "consultation", label: "Consultation Conversations", icon: MonitorSmartphone },
  { key: "archived", label: "Archived", icon: Archive },
];

const attachmentIcon: Record<MessageAttachment["kind"], LucideIcon> = {
  pdf: FileText,
  image: ImageIcon,
  prescription: Pill,
  "referral-letter": ArrowRight,
  "discharge-summary": FileHeart,
};

function otherParty(conv: Conversation) {
  return conv.participants[0];
}

function selfParticipant(conv: Conversation) {
  return conv.participants.find((p) => p.id !== otherParty(conv).id) ?? staffDirectory.you;
}

function senderLabel(conv: Conversation, tab: ConversationTab) {
  const other = otherParty(conv);
  return tab === "sent" ? `To ${other.name}` : other.name;
}

function resolveTemplate(template: MessageTemplate, student: StudentSummary, parentName: string) {
  const values: Record<string, string> = {
    student_name: student.name,
    parent_name: parentName,
    date: "15 Sep 2026",
    follow_up_date: "22 Sep 2026",
    health_event: student.recentEvent,
    facility: "Aga Khan University Hospital",
  };
  return template.body.replace(/{{(\w+)}}/g, (_match, key: string) => values[key] ?? `{{${key}}}`);
}

function buildAuditTrail(conv: Conversation, msgs: ChatMessage[]) {
  const entries: { action: string; actor: string; timestamp: string }[] = [];
  for (const m of msgs) {
    entries.push({ action: "Message sent", actor: m.sender.name, timestamp: m.sentAt });
    if (m.status === "Read") entries.push({ action: "Message read", actor: otherParty(conv).name, timestamp: m.sentAt });
    for (const a of m.attachments ?? []) entries.push({ action: `Attachment viewed · ${a.name}`, actor: otherParty(conv).name, timestamp: m.sentAt });
  }
  return entries;
}

function PriorityTag({ priority }: { priority: MessagePriority }) {
  if (priority === "Routine") return null;
  const tone = priority === "Needs Response" ? "tag-amber" : priority === "Urgent" ? "tag-red" : "tag-critical";
  const Icon = priority === "Critical" ? Siren : AlertCircle;
  return (
    <span className={cn("tag", tone)}>
      <Icon size={10} /> {priority}
    </span>
  );
}

function StatusPill({ status }: { status: MessageStatus }) {
  const Icon = statusIcon[status];
  return (
    <span className={cn("tag", statusTone[status])}>
      <Icon size={10} /> {status}
    </span>
  );
}

function AudienceBadge({ audience }: { audience: Conversation["audience"] }) {
  return audience === "internal" ? (
    <span className="tag tag-blue">
      <LockKeyhole size={10} /> Internal only
    </span>
  ) : (
    <span className="tag tag-teal">
      <Users size={10} /> Parent-facing
    </span>
  );
}

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState<ConversationTab>("inbox");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [composerOpen, setComposerOpen] = useState(false);
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [draftReplies, setDraftReplies] = useState<Record<string, ChatMessage[]>>({});

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return conversations.filter((c) => {
      if (!c.tabs.includes(activeTab)) return false;
      if (!q) return true;
      const haystack = [c.subject, c.category, c.student?.name, ...c.participants.map((p) => p.name)]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [activeTab, search]);

  const selected = filtered.find((c) => c.id === selectedId) ?? filtered[0] ?? null;

  const tabCounts = useMemo(() => {
    const counts: Record<ConversationTab, number> = {
      inbox: 0, sent: 0, "needs-response": 0, "health-notifications": 0,
      referral: 0, consultation: 0, archived: 0,
    };
    for (const c of conversations) for (const t of c.tabs) counts[t] += 1;
    return counts;
  }, []);

  const needsResponseCount = conversations.filter((c) => c.priority === "Needs Response").length;
  const unreadCount = conversations.filter((c) => c.unread).length;
  const criticalCount = conversations.filter((c) => c.priority === "Critical" || c.category === "Emergency").length;

  const notify = (message: string) => {
    setToast(message);
  };

  const sendReply = (conversationId: string, message: ChatMessage) => {
    setDraftReplies((prev) => ({ ...prev, [conversationId]: [...(prev[conversationId] ?? []), message] }));
  };

  return (
    <PortalLayout section="messages">
      <main className="portal-content">
        <div className="portal-header">
          <div>
            <div className="eyebrow">Care operations</div>
            <h1>Messages</h1>
            <p>Secure, case-aware communication for student health · not a general chat tool</p>
          </div>
          <div className="portal-header-actions">
            <button className="emergency-button" onClick={() => setEmergencyOpen(true)}>
              <Siren size={13} />
              <span>Emergency communication</span>
            </button>
            <button className="btn btn-primary btn-small" onClick={() => setComposerOpen(true)}>
              <Plus size={13} /> New message
            </button>
          </div>
        </div>

        {toast && (
          <div className="notice flex items-center justify-between">
            <span>
              <Check size={14} className="mr-2 inline text-[#3c9488]" />
              {toast}
            </span>
            <button onClick={() => setToast("")}>
              <X size={14} />
            </button>
          </div>
        )}

        <div className="alert-banner">
          <ShieldCheck size={18} />
          <div>
            <strong>A secure, case-aware communication system</strong>
            <span>
              Every conversation is tied to a student, a health purpose and a sender — and, where
              linked to an encounter, medication, referral or consultation, becomes part of the
              operational record.
            </span>
          </div>
        </div>

        <div className="stat-grid">
          <Stat icon={AlertCircle} label="Needs response" value={String(needsResponseCount).padStart(2, "0")} note="across all conversations" tone="amber" />
          <Stat icon={Inbox} label="Unread" value={String(unreadCount).padStart(2, "0")} note="in your inbox" tone="blue" />
          <Stat icon={Siren} label="Critical / emergency" value={String(criticalCount).padStart(2, "0")} note="all channels used" tone="purple" />
          <Stat icon={Clock3} label="Avg. response time" value="18m" note="within school policy" tone="teal" />
        </div>

        <div className="panel mb-4">
          <div className="panel-head">
            <div className="flex flex-wrap gap-1">
              {tabConfig.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  className={cn("btn btn-small", activeTab === key ? "btn-primary" : "btn-quiet")}
                  onClick={() => { setActiveTab(key); setSelectedId(null); }}
                >
                  <Icon size={12} /> {label}
                  {tabCounts[key] > 0 && (
                    <span className="ml-1 rounded-full bg-[#fff0d7] px-1.5 py-0.5 text-[9px] text-[#a16b1d]">
                      {tabCounts[key]}
                    </span>
                  )}
                </button>
              ))}
            </div>
            <button className="btn btn-quiet btn-small" onClick={() => setTemplatesOpen(true)}>
              <FileText size={12} /> Templates
            </button>
          </div>
          <div className="table-toolbar p-4 !mb-0">
            <div className="table-search">
              <Search size={14} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by student, parent, sender or subject..."
              />
            </div>
            <div className="flex gap-2">
              <button className="btn btn-quiet btn-small">Type <ChevronDown size={11} /></button>
              <button className="btn btn-quiet btn-small">Status <ChevronDown size={11} /></button>
              <button className="btn btn-quiet btn-small">Date <ChevronDown size={11} /></button>
            </div>
          </div>
        </div>

        <div className="messages-grid">
          <div className="panel conversation-list">
            {filtered.length === 0 && (
              <div className="thread-empty">
                <Inbox size={26} />
                <strong>No conversations here</strong>
                <span>Nothing matches this tab and filter yet.</span>
              </div>
            )}
            {filtered.map((conv) => (
              <button
                key={conv.id}
                type="button"
                className={cn("conversation-row", selected?.id === conv.id && "active", conv.unread && "unread")}
                onClick={() => setSelectedId(conv.id)}
              >
                <div className="row-avatar">{otherParty(conv).initials}</div>
                <div className="conversation-main">
                  <div className="conversation-top">
                    <span className="conversation-sender">{senderLabel(conv, activeTab)}</span>
                    <span className="conversation-time">{conv.lastMessageAt}</span>
                  </div>
                  {conv.student && <div className="conversation-subject">Regarding {conv.student.name}</div>}
                  <div className="conversation-preview">{conv.lastMessagePreview}</div>
                  <div className="conversation-tags">
                    {conv.unread && <span className="unread-dot" />}
                    <span className={cn("tag", categoryTagTone[conv.category])}>
                      {(() => { const Icon = categoryIcon[conv.category]; return <Icon size={10} />; })()}
                      {" "}{conv.category}
                    </span>
                    <PriorityTag priority={conv.priority} />
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="panel thread-panel">
            {!selected ? (
              <div className="thread-empty">
                <MessageCircle size={30} />
                <strong>Select a conversation</strong>
                <span>Who is communicating, about which student, and for what purpose will show here.</span>
              </div>
            ) : (
              <MessageThread
                key={selected.id}
                conversation={selected}
                activeTab={activeTab}
                extraMessages={draftReplies[selected.id] ?? []}
                onSend={(msg) => sendReply(selected.id, msg)}
              />
            )}
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="panel p-5">
            <div className="eyebrow">Message templates</div>
            <h3 className="mt-2 text-[15px] font-extrabold tracking-[-.04em] text-[#2d5661]">
              Structured, reusable and consistent
            </h3>
            <p className="mt-2 text-[11px] leading-[1.55] text-[#839795]">
              Composing a new message offers templates for Medication Updates, Appointment
              Reminders, Referral Updates, Follow-up Reminders, Consent Requests and General
              Health Updates — each with variables resolved from the selected student.
            </p>
            <button className="mt-3 text-[10px] font-extrabold text-[#2c8179]" onClick={() => setTemplatesOpen(true)}>
              View all templates <ArrowRight size={11} className="ml-1 inline" />
            </button>
          </div>
          <div className="panel p-5">
            <div className="flex items-center gap-2 text-[11px] font-extrabold text-[#335b63]">
              <LockKeyhole size={15} className="text-[#3c978b]" /> About access to Messages
            </div>
            <p className="mt-2 text-[10px] leading-[1.5] text-[#839795]">
              Nurses and doctors hold full clinical and referral messaging. Health administrators
              have full oversight. Matrons, teachers and health prefects hold limited,
              operational-only access. Parents see only their own children. External providers
              see only their assigned referral or consultation thread. Internal conversations
              never appear in the Parent Portal.
            </p>
            <Link href="/portal/settings/roles-permissions" className="mt-3 inline-block text-[10px] font-extrabold text-[#2c8179]">
              Review Roles & Permissions <ArrowRight size={11} className="ml-1 inline" />
            </Link>
          </div>
        </div>

        <div className="mt-4 panel">
          <div className="panel-head">
            <h2>Emergency communications</h2>
            <span>Logged · recorded in the audit log</span>
          </div>
          <div className="panel-body">
            {emergencyEvents.map((event) => (
              <div className="person-card" key={event.id}>
                <div className="avatar !bg-[#feebea] !text-[#b54d4c]">
                  <Siren size={14} />
                </div>
                <div className="flex-1">
                  <strong>{event.student} · {event.emergencyType}</strong>
                  <span>{event.response}</span>
                </div>
                <span className="text-[9px] text-[#8aa09e]">{event.createdAt}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {composerOpen && (
        <ComposerDrawer
          close={() => setComposerOpen(false)}
          onSent={(message) => { setComposerOpen(false); notify(message); }}
        />
      )}
      {emergencyOpen && (
        <EmergencyMessageDrawer
          close={() => setEmergencyOpen(false)}
          onSent={(message) => { setEmergencyOpen(false); notify(message); }}
        />
      )}
      {templatesOpen && <TemplatesDrawer close={() => setTemplatesOpen(false)} />}
    </PortalLayout>
  );
}

function Stat({ icon: Icon, label, value, note, tone }: { icon: LucideIcon; label: string; value: string; note: string; tone: string }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span>{label}</span>
        <div className={cn("stat-icon", `icon-${tone}`)}>
          <Icon size={14} />
        </div>
      </div>
      <h3>{value}</h3>
      <p><b>●</b> {note}</p>
    </div>
  );
}

function MessageThread({
  conversation, activeTab, extraMessages, onSend,
}: {
  conversation: Conversation;
  activeTab: ConversationTab;
  extraMessages: ChatMessage[];
  onSend: (msg: ChatMessage) => void;
}) {
  const [reply, setReply] = useState("");
  const [auditOpen, setAuditOpen] = useState(false);
  const baseMessages = messagesByConversation[conversation.id] ?? [];
  const allMessages = [...baseMessages, ...extraMessages];
  const audit = buildAuditTrail(conversation, allMessages);
  const self = selfParticipant(conversation);
  const other = otherParty(conversation);

  const handleSend = () => {
    if (!reply.trim()) return;
    onSend({
      id: `local-${Date.now()}`,
      conversationId: conversation.id,
      sender: self,
      isSelf: true,
      body: reply.trim(),
      sentAt: "Just now",
      status: "Sent",
    });
    setReply("");
  };

  return (
    <>
      <div className="drawer-head !mb-0 border-b border-[#edf2f0] p-4">
        <div>
          <div className="eyebrow">
            {conversation.student ? `${conversation.student.name} — ` : ""}
            {self.role}
          </div>
          <h2 className="!text-[16px]">{conversation.subject}</h2>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <AudienceBadge audience={conversation.audience} />
            <span className={cn("tag", categoryTagTone[conversation.category])}>
              {(() => { const Icon = categoryIcon[conversation.category]; return <Icon size={10} />; })()}
              {" "}{conversation.category}
            </span>
            <PriorityTag priority={conversation.priority} />
            {conversation.sensitive && (
              <span className="tag tag-critical">
                <LockKeyhole size={10} /> Sensitive
              </span>
            )}
          </div>
        </div>
        <button className="btn btn-quiet btn-small" onClick={() => setAuditOpen((v) => !v)}>
          <Info size={12} /> Audit log
        </button>
      </div>

      {conversation.student && (
        <div className="thread-context">
          <InfoBlock label="Current health status" value={conversation.student.currentStatus} tone={conversation.student.currentStatus === "Stable" ? "teal" : "amber"} />
          <InfoBlock label="Active medication" value={conversation.student.activeMedication} tone="amber" />
          <InfoBlock label="Relevant alert" value={conversation.student.relevantAlert} tone={conversation.student.relevantAlert === "None recorded" ? undefined : "red"} />
          <InfoBlock label="Recent health event" value={conversation.student.recentEvent} />
        </div>
      )}

      {(conversation.links || conversation.referralContext) && (
        <div className="flex flex-wrap gap-2 border-b border-[#edf2f0] px-4 py-3">
          {conversation.links?.encounterId && <LinkChip icon={Stethoscope} label="Sick-bay encounter" />}
          {conversation.links?.medicationId && <LinkChip icon={Pill} label="Medication record" />}
          {conversation.links?.referralId && <LinkChip icon={ArrowRight} label="Referral" />}
          {conversation.links?.telehealthId && <LinkChip icon={MonitorSmartphone} label="Telehealth consultation" />}
          {conversation.links?.incidentId && <LinkChip icon={Siren} label="Incident" />}
          {conversation.links?.consentId && <LinkChip icon={ShieldCheck} label="Consent record" />}
        </div>
      )}

      {conversation.referralContext && (
        <div className="border-b border-[#edf2f0] p-4">
          <div className="eyebrow">Referral communication</div>
          <div className="mt-2 detail-row"><span>Referral facility</span><strong>{conversation.referralContext.facility}</strong></div>
          <div className="detail-row"><span>School health team</span><strong>{conversation.referralContext.schoolTeam}</strong></div>
          <div className="detail-row"><span>Parent</span><strong>{conversation.referralContext.parent}</strong></div>
          <div className="detail-row"><span>Status</span><strong className="!text-[#a36e25]">{conversation.referralContext.status}</strong></div>
        </div>
      )}

      {conversation.category === "Telehealth" && (
        <div className="notice !mb-0 !mt-0 rounded-none border-x-0 border-t-0">
          <MonitorSmartphone size={13} className="mr-2 inline text-[#3c9488]" />
          This conversation is attached to a telehealth consultation and stays separate from
          unrelated school messages.
        </div>
      )}

      {auditOpen && (
        <div className="border-b border-[#edf2f0] p-4">
          <div className="eyebrow">Access & delivery log</div>
          <div className="mt-2">
            {audit.map((entry, i) => (
              <div className="notif-row" key={i}>
                <span>{entry.action} · {entry.actor}</span>
                <strong className="!text-[#8aa09e]">{entry.timestamp}</strong>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="msg-thread">
        {allMessages.map((m) => (
          <div key={m.id} className={cn("msg-bubble", m.isSelf && "msg-bubble-self")}>
            <div className="msg-bubble-meta">
              <span>{m.isSelf ? "You" : m.sender.name}</span>
              <span>{m.sentAt}</span>
              <StatusPill status={m.status} />
            </div>
            <div className="msg-bubble-body">{m.body}</div>
            {m.attachments?.map((a) => {
              const AIcon = attachmentIcon[a.kind];
              return (
                <div className="msg-attachment" key={a.id}>
                  <AIcon size={12} /> {a.name} <span className="text-[#8aa09e]">· {a.size}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="msg-composer">
        <textarea
          className="w-full rounded-lg border border-[#dfebe8] bg-[#f8fbfa] p-3 text-[12px] text-[#527077] outline-none"
          rows={3}
          placeholder={`Reply to ${other.name}...`}
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />
        <div className="flex gap-2">
          <button className="btn btn-quiet btn-small">
            <Paperclip size={12} /> Attach
          </button>
          <button className="btn btn-primary btn-small flex-1" onClick={handleSend}>
            <Send size={12} /> Send reply
          </button>
        </div>
      </div>
    </>
  );
}

function LinkChip({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-[#e4ecea] bg-[#f7faf8] px-2 py-1 text-[10px] text-[#3a5e66]">
      <Icon size={11} /> {label}
    </span>
  );
}

function ComposerDrawer({ close, onSent }: { close: () => void; onSent: (message: string) => void }) {
  const [step, setStep] = useState(1);
  const [audience, setAudience] = useState<"parent" | "internal">("parent");
  const [studentKey, setStudentKey] = useState<StudentKey>("amara");
  const [category, setCategory] = useState<MessageCategory>("General Health");
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [body, setBody] = useState("");
  const [channels, setChannels] = useState<NotificationChannel[]>(["Parent Portal", "SMS"]);
  const [attached, setAttached] = useState(false);

  const student = students[studentKey];
  const parentName = studentParentName[studentKey];
  const isCritical = category === "Emergency";
  const effectiveChannels: NotificationChannel[] = isCritical ? ["SMS", "Email", "Parent Portal"] : channels;
  const wizardSteps = audience === "internal"
    ? ["Recipient & category", "Choose template", "Compose & send"]
    : ["Recipient & category", "Choose template", "Compose", "Notification preview"];

  const toggleChannel = (c: NotificationChannel) => {
    if (isCritical) return;
    setChannels((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  };

  const applyTemplate = (tpl: MessageTemplate | null) => {
    if (!tpl) { setTemplateId(null); setBody(""); return; }
    setTemplateId(tpl.id);
    setCategory(tpl.category);
    setBody(resolveTemplate(tpl, student, parentName));
  };

  const categories: MessageCategory[] = [
    "General Health", "Medication", "Sick Bay", "Referral", "Telehealth", "Consent", "Follow-up", "Emergency",
  ];

  const isLastStep = step === wizardSteps.length;

  return (
    <div className="drawer" onClick={close}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head">
          <div>
            <div className="eyebrow">New message · step {step} of {wizardSteps.length}</div>
            <h2>{wizardSteps[step - 1]}</h2>
            <p>A structured message linked to a student health purpose.</p>
          </div>
          <button className="icon-button" onClick={close}>
            <X size={15} />
          </button>
        </div>
        <div className="wizard-steps">
          {wizardSteps.map((s, i) => (
            <div key={s} className={cn("wizard-step", step === i + 1 && "step-active", step > i + 1 && "step-done")}>
              {s}
            </div>
          ))}
        </div>

        {step === 1 && (
          <>
            <div className="drawer-section !pt-0 !border-t-0">
              <h4>Recipient type</h4>
              <div className="flex gap-2">
                <button type="button" className={cn("btn btn-small flex-1", audience === "parent" ? "btn-primary" : "btn-quiet")} onClick={() => setAudience("parent")}>
                  <Users size={12} /> Parent / guardian
                </button>
                <button type="button" className={cn("btn btn-small flex-1", audience === "internal" ? "btn-primary" : "btn-quiet")} onClick={() => setAudience("internal")}>
                  <LockKeyhole size={12} /> Internal staff
                </button>
              </div>
            </div>
            <div className="drawer-section">
              <h4>Student</h4>
              <div className="grid grid-cols-2 gap-2">
                {studentKeys.map((key) => (
                  <button key={key} type="button" className={cn("btn btn-small", studentKey === key ? "btn-primary" : "btn-quiet")} onClick={() => setStudentKey(key)}>
                    {students[key].name}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[10px] text-[#8aa09e]">
                {audience === "parent" ? `To ${parentName} · ${students[studentKey].name}'s parent` : "To the school health team"}
              </p>
            </div>
            <div className="drawer-section">
              <h4>Category</h4>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((c) => (
                  <button key={c} type="button" className={cn("btn btn-small", category === c ? "btn-primary" : "btn-quiet")} onClick={() => setCategory(c)}>
                    {c}
                  </button>
                ))}
              </div>
              {isCritical && (
                <div className="alert-banner mt-3 !mb-0">
                  <Siren size={16} />
                  <div>
                    <strong>Critical communication</strong>
                    <span>All notification channels will be used and cannot be turned off.</span>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {step === 2 && (
          <div className="drawer-section !pt-0 !border-t-0">
            <h4>Choose a template</h4>
            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                className={cn("rounded-lg border bg-white p-3 text-left transition hover:-translate-y-0.5 hover:shadow-md", templateId === null ? "border-[#72b9ad] ring-2 ring-[#72b9ad1a]" : "border-[#e1eae8]")}
                onClick={() => applyTemplate(null)}
              >
                <strong className="block text-[12px] text-[#2f5963]">Start blank</strong>
                <span className="mt-1 block text-[10px] text-[#849896]">Write a free-text message with no template.</span>
              </button>
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  type="button"
                  className={cn("rounded-lg border bg-white p-3 text-left transition hover:-translate-y-0.5 hover:shadow-md", templateId === tpl.id ? "border-[#72b9ad] ring-2 ring-[#72b9ad1a]" : "border-[#e1eae8]")}
                  onClick={() => applyTemplate(tpl)}
                >
                  <div className="flex items-center justify-between gap-2">
                    <strong className="block text-[12px] text-[#2f5963]">{tpl.name}</strong>
                    <span className={cn("tag", categoryTagTone[tpl.category])}>{tpl.category}</span>
                  </div>
                  <span className="mt-1 block text-[10px] text-[#849896]">{tpl.body}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="drawer-section !pt-0 !border-t-0">
            <h4>Message</h4>
            <textarea
              className="w-full rounded-lg border border-[#dfebe8] bg-[#f8fbfa] p-3 text-[12px] text-[#527077] outline-none"
              rows={6}
              placeholder="Write your message..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <button type="button" className={cn("btn btn-small mt-2", attached ? "btn-quiet" : "btn-quiet")} onClick={() => setAttached(true)}>
              <Paperclip size={12} /> {attached ? "1 attachment added" : "Add attachment"}
            </button>
          </div>
        )}

        {step === 4 && audience === "parent" && (
          <div className="drawer-section !pt-0 !border-t-0">
            <h4>Notification channels</h4>
            <div className="flex gap-2">
              {(["SMS", "Email", "Parent Portal"] as NotificationChannel[]).map((c) => {
                const Icon = c === "SMS" ? Smartphone : c === "Email" ? Mail : Users;
                const active = effectiveChannels.includes(c);
                return (
                  <button key={c} type="button" className={cn("btn btn-small flex-1", active ? "btn-primary" : "btn-quiet")} onClick={() => toggleChannel(c)} disabled={isCritical}>
                    <Icon size={12} /> {c}
                  </button>
                );
              })}
            </div>
            <h4 className="mt-5">Preview</h4>
            <div className="rounded-lg border border-[#dfebe8] bg-[#f8fbfa] p-3">
              <p className="text-[12px] leading-[1.55] text-[#33565e]">{body || "Your message will appear here."}</p>
              <div className="mt-3 detail-row !py-1"><span>Student</span><strong>{student.name}</strong></div>
              <div className="detail-row !py-1"><span>Recipient</span><strong>{parentName}</strong></div>
              <div className="detail-row !py-1"><span>Send time</span><strong>Immediately</strong></div>
              <div className="detail-row !py-1"><span>Channels</span><strong>{effectiveChannels.join(", ")}</strong></div>
            </div>
          </div>
        )}

        <div className="mt-5 flex gap-2">
          {step > 1 && (
            <button className="btn btn-quiet flex-1" onClick={() => setStep(step - 1)}>
              Back
            </button>
          )}
          {!isLastStep ? (
            <button className="btn btn-primary flex-1" onClick={() => setStep(step + 1)}>
              Continue <ArrowRight size={14} />
            </button>
          ) : (
            <button
              className="btn btn-primary flex-1"
              onClick={() => onSent(audience === "parent" ? "Message queued for delivery to the parent portal" : "Message sent to the school health team")}
            >
              Send <Check size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function EmergencyMessageDrawer({ close, onSent }: { close: () => void; onSent: (message: string) => void }) {
  const [studentKey, setStudentKey] = useState<StudentKey>("maria");
  const [emergencyType, setEmergencyType] = useState("Breathing difficulty");
  const [calledParent, setCalledParent] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const [portalSent, setPortalSent] = useState(false);
  const [response, setResponse] = useState("");

  const student = students[studentKey];
  const parentName = studentParentName[studentKey];
  const emergencyTypes = ["Breathing difficulty", "Severe allergic reaction", "Serious injury", "Medical collapse", "Fire / evacuation", "Other"];

  return (
    <div className="drawer" onClick={close}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head">
          <div>
            <div className="eyebrow !text-[#b4574f]">Emergency communication</div>
            <h2>{student.name}</h2>
            <p>{student.form} · {student.house}</p>
          </div>
          <button className="icon-button" onClick={close}>
            <X size={15} />
          </button>
        </div>
        <div className="confidential-banner">
          <Siren size={18} />
          <div>
            <strong>This is an emergency broadcast</strong>
            <span>All enabled channels are shown and used. This event is recorded in the audit log.</span>
          </div>
        </div>
        <div className="drawer-section !border-t-0 !pt-0">
          <h4>Student</h4>
          <div className="grid grid-cols-2 gap-2">
            {studentKeys.map((key) => (
              <button key={key} type="button" className={cn("btn btn-small", studentKey === key ? "btn-danger" : "btn-quiet")} onClick={() => setStudentKey(key)}>
                {students[key].name}
              </button>
            ))}
          </div>
        </div>
        <div className="drawer-section">
          <h4>Emergency type</h4>
          <div className="grid grid-cols-2 gap-2">
            {emergencyTypes.map((t) => (
              <button key={t} type="button" className={cn("btn btn-small", emergencyType === t ? "btn-danger" : "btn-quiet")} onClick={() => setEmergencyType(t)}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="drawer-section">
          <h4>Recipients</h4>
          <div className="detail-row"><span>Parent / guardian</span><strong>{parentName}</strong></div>
          <div className="detail-row"><span>School doctor</span><strong>{staffDirectory.drWambui.name}</strong></div>
          <div className="detail-row"><span>Health administrator</span><strong>{staffDirectory.healthAdmin.name}</strong></div>
        </div>
        <div className="drawer-section">
          <h4>Send status</h4>
          <div className="notif-row">
            <span className="flex items-center gap-2"><Phone size={12} /> Call parent</span>
            <button className={cn("btn btn-small", calledParent ? "btn-quiet" : "btn-danger")} onClick={() => setCalledParent(true)}>
              {calledParent ? <><Check size={12} /> Answered</> : "Call now"}
            </button>
          </div>
          <div className="notif-row">
            <span className="flex items-center gap-2"><Smartphone size={12} /> Send SMS</span>
            <button className={cn("btn btn-small", smsSent ? "btn-quiet" : "btn-primary")} onClick={() => setSmsSent(true)}>
              {smsSent ? <><Check size={12} /> Sent</> : "Send"}
            </button>
          </div>
          <div className="notif-row">
            <span className="flex items-center gap-2"><Bell size={12} /> Send portal alert</span>
            <button className={cn("btn btn-small", portalSent ? "btn-quiet" : "btn-primary")} onClick={() => setPortalSent(true)}>
              {portalSent ? <><Check size={12} /> Sent</> : "Send"}
            </button>
          </div>
        </div>
        <div className="drawer-section">
          <h4>Record response</h4>
          <textarea
            className="w-full rounded-lg border border-[#dfebe8] bg-[#f8fbfa] p-3 text-[12px] text-[#527077] outline-none"
            rows={3}
            placeholder="e.g. Parent reached by phone, advised student is stable..."
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />
        </div>
        <button className="btn btn-danger w-full" onClick={() => onSent("Emergency communication logged and recorded in the audit log")}>
          Log emergency communication <Check size={14} />
        </button>
      </div>
    </div>
  );
}

function TemplatesDrawer({ close }: { close: () => void }) {
  return (
    <div className="drawer" onClick={close}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head">
          <div>
            <div className="eyebrow">Reusable templates</div>
            <h2>Message templates</h2>
            <p>Used by the structured composer · variables resolve from the selected student.</p>
          </div>
          <button className="icon-button" onClick={close}>
            <X size={15} />
          </button>
        </div>
        <div className="drawer-section !border-t-0 !pt-0">
          {templates.map((tpl) => (
            <div className="person-card !items-start" key={tpl.id}>
              <div className={cn("stat-icon", "icon-teal")}>
                {(() => { const Icon = categoryIcon[tpl.category]; return <Icon size={14} />; })()}
              </div>
              <div className="flex-1">
                <strong>{tpl.name}</strong>
                <span className="!mt-1 !block">{tpl.body}</span>
                <div className="mt-2 flex flex-wrap gap-1">
                  {tpl.variables.map((v) => (
                    <span key={v} className="tag bg-[#f2f5f4] text-[#6b8180]">{`{{${v}}}`}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ParentMessagePanel({ close }: { close: () => void }) {
  const [draft, setDraft] = useState("");
  const [sent, setSent] = useState<ChatMessage[]>([]);
  const student = students.amara;

  const threadConversations = conversations.filter((c) => c.student?.id === student.id);
  const baseMessages = threadConversations.flatMap((c) => messagesByConversation[c.id] ?? []);
  const allMessages = [...baseMessages, ...sent];

  const send = () => {
    if (!draft.trim()) return;
    setSent((prev) => [
      ...prev,
      {
        id: `parent-${prev.length}`,
        conversationId: "parent-thread",
        sender: parents.maryNjeri,
        isSelf: true,
        body: draft.trim(),
        sentAt: "Just now",
        status: "Sent",
      },
    ]);
    setDraft("");
  };

  return (
    <div className="drawer" onClick={close}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head">
          <div>
            <div className="eyebrow">Health Department</div>
            <h2>Message the health team</h2>
            <p>Child: {student.name}</p>
          </div>
          <button className="icon-button" onClick={close}>
            <X size={15} />
          </button>
        </div>
        <div className="msg-thread" style={{ maxHeight: 340, border: "1px solid #edf2f0", borderRadius: 10 }}>
          {allMessages.map((m) => (
            <div key={m.id} className={cn("msg-bubble", m.isSelf && "msg-bubble-self")}>
              <div className="msg-bubble-meta">
                <span>{m.isSelf ? "You" : m.sender.name}</span>
                <span>{m.sentAt}</span>
              </div>
              <div className="msg-bubble-body">{m.body}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-2">
          <textarea
            className="w-full rounded-lg border border-[#dfebe8] bg-[#f8fbfa] p-3 text-[12px] text-[#527077] outline-none"
            rows={3}
            placeholder="Write a message to the health department..."
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <div className="flex gap-2">
            <button className="btn btn-quiet btn-small">
              <Paperclip size={12} /> Attach
            </button>
            <button className="btn btn-primary btn-small flex-1" onClick={send}>
              <Send size={12} /> Send
            </button>
          </div>
        </div>
        <div className="notice mt-4 !mb-0 !bg-[#fff7ec] !border-[#f1dfc1] !text-[#785420]">
          <AlertTriangle size={13} className="mr-2 inline" />
          For emergencies, contact the school health department directly.
        </div>
      </div>
    </div>
  );
}
