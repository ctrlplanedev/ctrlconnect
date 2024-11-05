import "./globals.css";
import type { Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { cn } from "@ctrlshell/ui";

export const metadata = {
  title: { default: "Ctrlshell" },
};
export const viewport: Viewport = {
  themeColor: [{ color: "black" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
