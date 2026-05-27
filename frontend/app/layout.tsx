import type { Metadata } from "next";
import AppThemeProvider from "@/components/providers/themeProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: "CNAHS Test Bank",

  description:
    "CNAHS Online Examination and Test Bank System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="
           min-h-screen
           bg-background
           text-foreground
           antialiased
        "
      >
        <AppThemeProvider>{children}</AppThemeProvider>
      </body>
    </html>
  );
}
