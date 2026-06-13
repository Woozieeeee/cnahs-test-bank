"use client";

import { useEffect } from "react";

import { usePathname } from "next/navigation";

import { AnimatePresence, motion } from "framer-motion";

import { X } from "lucide-react";

import SidebarHeader from "./sidebarHeader";
import SidebarNav from "./sidebarNav";
import SidebarLogoutButton from "./sidebarLogoutButton";

import type { NavItem } from "./sidebarNav";

interface Props {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
  title: string;
  subtitle: string;
}

export default function MobileSidebar({
  open,
  onClose,
  navItems,
  title,
  subtitle,
}: Props) {
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] lg:hidden"
            onClick={onClose}
            aria-label="Close navigation menu"
          />

          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 340,
              mass: 0.8,
            }}
            className="border-border bg-card fixed top-0 left-0 z-50 flex h-[100dvh] w-[min(88vw,300px)] flex-col border-r shadow-2xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="border-border flex items-center justify-between border-b px-4 py-3">
              <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                Navigation
              </p>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg p-2 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain p-5">
              <SidebarHeader
                title={title}
                subtitle={subtitle}
                forceExpanded
              />
              <SidebarNav items={navItems} forceExpanded />
            </div>

            <div className="border-border border-t p-5">
              <SidebarLogoutButton forceExpanded />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
