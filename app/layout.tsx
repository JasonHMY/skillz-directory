import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteDescription =
  "Discover and share skills for AI agents. Browse community-contributed skills for Claude Code, Cursor, Windsurf, and more.";

export const metadata: Metadata = {
  title: {
    default: "AI Agent Skills Directory",
    template: "%s | AI Agent Skills",
  },
  description: siteDescription,
  keywords: [
    "AI agent skills",
    "Claude Code",
    "Cursor",
    "Windsurf",
    "AI tools",
    "agent extensions",
    "MCP",
    "Model Context Protocol",
    "AI automation",
    "coding assistants",
  ],
  authors: [{ name: "AI Agent Skills Community" }],
  creator: "AI Agent Skills",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://aiagentskills.com"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "AI Agent Skills Directory",
    title: "AI Agent Skills Directory",
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agent Skills Directory",
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
