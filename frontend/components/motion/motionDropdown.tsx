"use client";

import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;

  className?: string;
}

export default function MotionDropdown({
  children,

  className = "",
}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95,
        y: -5,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        duration: 0.15,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
