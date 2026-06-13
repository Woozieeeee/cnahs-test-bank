export type UserRole = "ADMIN" | "FACULTY" | "STUDENT";

export function getSettingsPath(role: string): string {
  switch (role) {
    case "ADMIN":
      return "/admin/settings";
    case "FACULTY":
      return "/faculty/settings";
    case "STUDENT":
      return "/student/settings";
    default:
      return "/login";
  }
}

export function formatRoleLabel(role: string): string {
  switch (role) {
    case "ADMIN":
      return "Admin";
    case "FACULTY":
      return "Faculty";
    case "STUDENT":
      return "Student";
    default:
      return role;
  }
}
