import type { Metadata } from "next";
import AppThemeProvider from "@/components/providers/themeProvider";
import AppProviders from "@/components/providers/appProviders";

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
      <body className="bg-background text-foreground min-h-screen antialiased">
        <AppThemeProvider>
          <AppProviders>{children}</AppProviders>
        </AppThemeProvider>
      </body>
    </html>
  );
}
