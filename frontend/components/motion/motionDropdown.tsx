"use client";

import { motion, AnimatePresence } from "framer-motion";

import {
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

interface Props {
  trigger?: ReactNode;

  children: ReactNode;

  align?: "left" | "right";

  width?: string;
  className?: string;
}

export default function MotionDropdown({
  trigger,
  children,
  align = "right",
  width = "w-56",
  className = "",
}: Props) {
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {trigger ? (
        <div onClick={() => setOpen(!open)}>{trigger}</div>
      ) : null}

      <AnimatePresence>
        {open && (
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
            className={`bg-popover border-border absolute top-full z-50 mt-2 ${width} rounded-xl border shadow-lg ${className} ${
              align === "right" ? "right-0" : "left-0"
            }`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
