"use client";

import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;

  className?: string;

  onClick?: () => void;

  type?: "button" | "submit";
}

export default function MotionButton({
  children,

  className = "",

  onClick,

  type = "button",
}: Props) {
  return (
    <motion.button
      whileTap={{
        scale: 0.97,
      }}
      transition={{
        duration: 0.1,
      }}
      onClick={onClick}
      type={type}
      className={className}
    >
      {children}
    </motion.button>
  );
}
