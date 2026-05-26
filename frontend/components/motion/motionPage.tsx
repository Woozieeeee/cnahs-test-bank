"use client";

import { motion, HTMLMotionProps } from "framer-motion";

import { ReactNode } from "react";

interface Props extends HTMLMotionProps<"div"> {
  children: ReactNode;
}

export default function MotionPage({
  children,

  ...props
}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.25,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
