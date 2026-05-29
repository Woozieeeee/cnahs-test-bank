"use client";

import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

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

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${authInputClass} ${className || ""}`}
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          text-slate-500
          transition
          hover:text-slate-700
        "
      >
        {showPassword ? (
          <EyeOff size={18} />
        ) : (
          <Eye size={18} />
        )}
      </button>
    </div>
  );
}
