"use client";

import { useEffect, useState } from "react";

import { getMe } from "@/services/auth_service";

import { AuthUser } from "@/types/auth";

export default function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();

        setUser(data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return {
    user,

    loading,

    isAuthenticated: !!user,
  };
}
