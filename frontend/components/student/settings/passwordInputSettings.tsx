"use client";

import { useState } from "react";

import { Eye, EyeOff, AlertTriangle } from "lucide-react";

interface Props {
  value: string;

  onChange: (value: string) => void;

  placeholder?: string;

  className?: string;
}

export default function PasswordInputSettings({
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
          className={`w-full rounded-lg border border-border/50 bg-muted px-4 py-2.5 text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground hover:border-border/70 focus:border-primary focus:ring-4 focus:ring-primary/20 ${className}`}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
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
