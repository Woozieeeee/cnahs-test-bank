"use client";

import { useAuthContext } from "@/contexts/authContext";

export default function useAuth() {
  return useAuthContext();
}
