"use client";

import { useEffect, useState } from "react";

import { fetchAvatarBlob } from "@/services/profile_service";

export function useUserAvatar(
  hasAvatar?: boolean,
  version?: string | Date,
) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const versionKey =
    version instanceof Date ? version.toISOString() : version;

  useEffect(() => {
    if (!hasAvatar) {
      setAvatarUrl(null);
      return;
    }

    let objectUrl: string | null = null;
    let cancelled = false;

    const loadAvatar = async () => {
      try {
        const blob = await fetchAvatarBlob();

        if (cancelled) return;

        objectUrl = URL.createObjectURL(blob);
        setAvatarUrl(objectUrl);
      } catch {
        if (!cancelled) {
          setAvatarUrl(null);
        }
      }
    };

    loadAvatar();

    return () => {
      cancelled = true;

      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [hasAvatar, versionKey]);

  return avatarUrl;
}
