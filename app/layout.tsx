import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
export const metadata: Metadata = { title: "AruAI — AI employee for beauty salons", description: "AI salon employee trained on real Telegram and WhatsApp conversations." };
export default function RootLayout({ children }: { children: ReactNode }) { return <html lang="ru" className="dark"><body className={`${geistSans.variable} ${geistMono.variable} min-h-screen aurora antialiased`}>{children}</body></html>; }
