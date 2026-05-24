"use client";

import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

export default function MotionPage({ children }: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      {children}
    </motion.div>
  );
}
