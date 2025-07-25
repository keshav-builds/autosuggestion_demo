import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AutoSuggestion Kit - Modern React Autosuggestion Component for React",
  description:
    "A beautiful, modern autosuggestion input component for React with search history support and async fetch. Used in the Autosuggestion Kit library.",
  keywords:
    "react autosuggestion, autocomplete component, autosuggestion kit, react input suggestions",
 
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
