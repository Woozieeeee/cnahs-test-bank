"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { authInputClass } from "@/components/auth/shared/authInputClass";
import { authButtonClass } from "@/components/auth/shared/authButtonClass";
import { requestPasswordReset } from "@/services/auth_service";
import { errorToast } from "@/lib/swal";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialIdentifier?: string;
}

export default function ForgotPasswordModal({
  open,
  onOpenChange,
  initialIdentifier = "",
}: Props) {
  const [identifier, setIdentifier] = useState(
    initialIdentifier
  );
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      setIdentifier(initialIdentifier);
      setSubmitted(false);
    }
  }, [open, initialIdentifier]);

  const handleSubmit = async () => {
    if (!identifier.trim()) {
      errorToast(
        "Please enter your Student ID or username."
      );
      return;
    }

    try {
      setLoading(true);
      await requestPasswordReset(identifier.trim());
      setSubmitted(true);
    } catch (error: unknown) {
      const message =
        (
          error as {
            response?: { data?: { message?: string } };
          }
        )?.response?.data?.message ||
        "Unable to submit your request right now. Please try again later.";

      if (
        message.includes("Too many password reset requests")
      ) {
        errorToast(message);
        return;
      }

      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {submitted
                ? "Request Submitted"
                : "Forgot Password"}
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              {submitted
                ? "Your request has been recorded."
                : "Submit a password change request to the administrator."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-gray-400 transition hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="space-y-4">
            <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-sm">
              <p className="font-medium text-gray-900">
                Password change request sent to admin.
              </p>
              <p className="mt-2 text-gray-600">
                Kindly visit the Dean&apos;s Office for more
                information and in-person verification
                before your password can be reset.
              </p>
            </div>
            <p className="text-xs text-gray-500">
              If you already submitted a request today, you
              do not need to submit again. An administrator
              will assist you as soon as possible.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Enter your Student ID or username. We do not
              send email resets, so your request will be
              forwarded to the system administrator.
            </p>

            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-gray-600">
                Student ID or Username
              </span>
              <input
                type="text"
                value={identifier}
                onChange={(e) =>
                  setIdentifier(e.target.value)
                }
                placeholder="Enter your Student ID or username"
                className={authInputClass}
              />
            </label>
          </div>
        )}

        {submitted ? (
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => void handleSubmit()}
              disabled={loading}
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
