"use client";

import { useState } from "react";

import { Eye, EyeOff, AlertTriangle } from "lucide-react";

import { authInputClass } from "@/components/auth/shared/authInputClass";

interface Props {
  value: string;

  onChange: (value: string) => void;

  placeholder?: string;

  className?: string;
}

export default function PasswordInput({
  value,
  onChange,
  placeholder = "Password",
  className = "",
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const [capsLockOn, setCapsLockOn] = useState(false);

  return (
    <div>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyUp={(e) =>
            setCapsLockOn(e.getModifierState("CapsLock"))
          }
          onKeyDown={(e) =>
            setCapsLockOn(e.getModifierState("CapsLock"))
          }
          className={`${authInputClass} ${className}`}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-500 transition hover:text-slate-700"
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </div>

      {capsLockOn && (
        <div className="mt-2 flex items-center gap-2 text-sm font-medium text-amber-600">
          <AlertTriangle size={16} />

          <span>Caps Lock is ON</span>
        </div>
      )}
    </div>
  );
}
