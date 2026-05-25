"use client";

import { ThemeProvider } from "next-themes";

interface Props {
  children: React.ReactNode;
}

export default function AppThemeProvider({
  children,
}: Props) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      {children}
    </ThemeProvider>
  );
}
