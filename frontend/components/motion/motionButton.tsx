"use client";

import { motion, HTMLMotionProps } from "framer-motion";

import { ReactNode } from "react";

interface Props extends HTMLMotionProps<"button"> {
  children: ReactNode;

  hoverScale?: number;

  tapScale?: number;
}

export default function MotionButton({
  children,

  className = "",

  hoverScale = 1.01,

  tapScale = 0.97,

  ...props
}: Props) {
  return (
    <motion.button
      whileHover={{
        scale: hoverScale,
      }}
      whileTap={{
        scale: tapScale,
      }}
      transition={{
        duration: 0.15,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}
