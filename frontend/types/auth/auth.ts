export interface AuthUser {
  id: number;

  name: string;

  username?: string | null;

  studentId?: string | null;

  role: "ADMIN" | "FACULTY" | "STUDENT";

  status: string;

  isFirstLogin: boolean;

  createdAt?: string | Date;

  updatedAt?: string | Date;

  hasAvatar?: boolean;
}
