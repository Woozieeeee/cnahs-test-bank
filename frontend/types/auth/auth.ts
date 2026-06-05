export interface AuthUser {
  id: number;

  name: string;

  role: "ADMIN" | "FACULTY" | "STUDENT";

  status: string;

  isFirstLogin: boolean;
}
