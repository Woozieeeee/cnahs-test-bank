"use client";

import { motion, HTMLMotionProps } from "framer-motion";

import { ReactNode } from "react";

interface Props extends HTMLMotionProps<"div"> {
  children: ReactNode;

  hoverY?: number;
}

export default function MotionCard({
  children,

  className = "",

  hoverY = -3,

  ...props
}: Props) {
  return (
    <motion.div
      whileHover={{
        y: hoverY,
      }}
      transition={{
        duration: 0.2,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
