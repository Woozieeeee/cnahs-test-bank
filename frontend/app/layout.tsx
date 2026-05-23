import type { Metadata } from "next";

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
    <html lang="en">
      <body
        className="
          min-h-screen
          bg-gray-100
          text-gray-900
          antialiased
        "
      >
        {children}
      </body>
    </html>
  );
}
