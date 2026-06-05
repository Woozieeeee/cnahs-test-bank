"use client";

import { motion, AnimatePresence } from "framer-motion";

interface Props {
  open: boolean;

  children: React.ReactNode;

  className?: string;
}

export default function MotionPopover({
  open,
  children,
  className = "",
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
            y: -6,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -6,
            scale: 0.98,
          }}
          transition={{
            duration: 0.15,
          }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
