"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface SidebarContextType {
  collapsed: boolean;

  toggleSidebar: () => void;
}

const SidebarContext =
  createContext<SidebarContextType | null>(null);

export function SidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("sidebarCollapsed");

    if (stored) {
      setCollapsed(stored === "true");
    }
  }, []);

  const toggleSidebar = () => {
    setCollapsed((prev) => {
      const next = !prev;

      localStorage.setItem(
        "sidebarCollapsed",
        String(next)
      );

      return next;
    });
  };

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        toggleSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error(
      "useSidebar must be used inside SidebarProvider"
    );
  }

  return context;
}
