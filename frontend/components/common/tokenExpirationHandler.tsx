"use client";

import useTokenExpiration from "@/hooks/useTokenExpiration";

export default function TokenExpirationHandler() {
  // This component just initializes the token expiration hook
  // The hook handles automatic logout when token expires
  useTokenExpiration();

  return null;
}
