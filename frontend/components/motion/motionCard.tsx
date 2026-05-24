"use client";

import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;

  className?: string;
}

export default function MotionCard({
  children,

  className = "",
}: Props) {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      transition={{
        duration: 0.2,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
