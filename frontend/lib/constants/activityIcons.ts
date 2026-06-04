import {
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  UserX,
  User,
  Monitor,
  FileText,
  GraduationCap,
} from "lucide-react";

export const ACTIVITY_ICONS = {
  ACADEMIC: GraduationCap,
  APPROVALS: UserCheck,
  REJECTIONS: UserX,
  USER_MANAGEMENT: User,
  SECURITY: ShieldAlert,
  VIOLATIONS: ShieldAlert,
  SYSTEM: Monitor,
  EXAM: FileText,
  AUTH: ShieldCheck,
} as const;
