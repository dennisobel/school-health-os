// Domain types for the Messages module — secure, case-aware student-health communication.
// Mock-data typed (no backend), but modeled as real records since conversations become
// part of the operational record and link back into other clinical modules by id.

export type MessageCategory =
  | "General Health"
  | "Medication"
  | "Sick Bay"
  | "Referral"
  | "Telehealth"
  | "Consent"
  | "Follow-up"
  | "Emergency";

export type MessagePriority = "Routine" | "Needs Response" | "Urgent" | "Critical";

export type MessageStatus = "Draft" | "Queued" | "Sent" | "Delivered" | "Read" | "Failed";

export type ConversationAudience = "internal" | "parent";

export type ConversationTab =
  | "inbox"
  | "sent"
  | "needs-response"
  | "health-notifications"
  | "referral"
  | "consultation"
  | "archived";

export type NotificationChannel = "SMS" | "Email" | "Parent Portal";

export interface Participant {
  id: string;
  name: string;
  role: string;
  initials: string;
}

export type AttachmentKind = "pdf" | "image" | "prescription" | "referral-letter" | "discharge-summary";

export interface MessageAttachment {
  id: string;
  name: string;
  kind: AttachmentKind;
  size: string;
}

// Optional links back into other modules — this is what makes a thread part of the
// operational record rather than a standalone chat.
export interface MessageLinks {
  encounterId?: string;
  medicationId?: string;
  referralId?: string;
  incidentId?: string;
  telehealthId?: string;
  consentId?: string;
}

export interface StudentSummary {
  id: string;
  name: string;
  form: string;
  house: string;
  initials: string;
  currentStatus: string;
  activeMedication: string;
  relevantAlert: string;
  recentEvent: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  sender: Participant;
  isSelf?: boolean;
  isSystem?: boolean;
  body: string;
  sentAt: string;
  status: MessageStatus;
  attachments?: MessageAttachment[];
}

export interface ReferralContext {
  facility: string;
  status: string;
  schoolTeam: string;
  parent: string;
}

export interface Conversation {
  id: string;
  subject: string;
  category: MessageCategory;
  priority: MessagePriority;
  audience: ConversationAudience;
  tabs: ConversationTab[];
  participants: Participant[];
  student?: StudentSummary;
  links?: MessageLinks;
  referralContext?: ReferralContext;
  lastMessagePreview: string;
  lastMessageAt: string;
  status: MessageStatus;
  unread: boolean;
  sensitive?: boolean;
}

export interface MessageTemplate {
  id: string;
  name: string;
  category: MessageCategory;
  body: string;
  variables: string[];
}

export interface EmergencyChannelStatus {
  channel: "Call Parent" | "Send SMS" | "Send Portal Alert";
  status: MessageStatus | "Not started" | "Answered" | "No answer";
}

export interface EmergencyEvent {
  id: string;
  student: string;
  emergencyType: string;
  recipients: string[];
  channels: EmergencyChannelStatus[];
  response: string;
  createdAt: string;
}

export interface AuditEntry {
  action: string;
  actor: string;
  timestamp: string;
}
