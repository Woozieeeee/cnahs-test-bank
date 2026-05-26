"use client";

import { motion, HTMLMotionProps } from "framer-motion";

import { ReactNode } from "react";

interface Props extends HTMLMotionProps<"div"> {
  children: ReactNode;
}

export default function MotionDropdown({
  children,

  className = "",

  ...props
}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.96,
        y: -6,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.96,
        y: -6,
      }}
      transition={{
        duration: 0.15,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
