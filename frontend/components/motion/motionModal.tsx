"use client";

import { motion, AnimatePresence } from "framer-motion";

import { ReactNode } from "react";

interface Props {
  open: boolean;

  children: ReactNode;
}

export default function MotionModal({
  open,

  children,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.15,
          }}
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/40
            p-4
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 10,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 10,
            }}
            transition={{
              duration: 0.18,
            }}
            className="
              w-full
              max-w-md
              rounded-2xl
              border
              border-border
              bg-card
              text-card-foreground
              shadow-xl
            "
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
