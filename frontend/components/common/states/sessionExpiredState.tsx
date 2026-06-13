"use client";

import { memo } from "react";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

interface Props {
  onLogin?: () => void;
  redirectUrl?: string;
}

/**
 * SessionExpiredState Component
 * Displays when user's session has expired due to token expiration
 * Shows after 12 hours of login or manual logout
 */
function SessionExpiredState({
  onLogin,
  redirectUrl = "/login",
}: Props) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8">
      {/* Error Icon */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
        <AlertCircle className="h-10 w-10 text-destructive" />
      </div>

      {/* Title */}
      <h1 className="mb-2 text-center text-3xl font-bold text-foreground">
        Session Expired
      </h1>

      {/* Description */}
      <p className="mb-8 max-w-md text-center text-muted-foreground">
        Your session has expired because you were inactive for an extended period
        or your login token reached its 12-hour limit.
      </p>

      {/* Reasons */}
      <div className="mb-8 w-full max-w-md rounded-lg border border-border bg-card p-4">
        <h2 className="mb-4 font-semibold text-foreground">What does this mean?</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="mt-1 flex-shrink-0 text-destructive">•</span>
            <span>Your authentication token has expired</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 flex-shrink-0 text-destructive">•</span>
            <span>All active sessions have been terminated</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 flex-shrink-0 text-destructive">•</span>
            <span>You need to log in again to continue</span>
          </li>
        </ul>
      </div>

      {/* Security Info */}
      <div className="mb-8 w-full max-w-md rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm text-amber-900">
          <span className="font-semibold">🔒 Security Note:</span> This happens
          automatically for your protection. Session timeouts help keep your
          account secure.
        </p>
      </div>

      {/* Action Button */}
      <div className="flex gap-3">
        {onLogin ? (
          <button
            onClick={onLogin}
            className="rounded-lg bg-primary px-8 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Log In Again
          </button>
        ) : (
          <Link
            href={redirectUrl}
            className="inline-block rounded-lg bg-primary px-8 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go to Login
          </Link>
        )}

        <Link
          href="/"
          className="rounded-lg border border-border bg-background px-8 py-3 font-medium text-foreground transition-colors hover:bg-muted"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default memo(SessionExpiredState);
