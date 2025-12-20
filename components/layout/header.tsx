"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeTogglerButton } from "@/components/animate-ui/components/buttons/theme-toggler";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center max-w-7xl mx-auto">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-xl">AI Agent Skills</span>
        </Link>

        <nav className="flex flex-1 items-center justify-end space-x-4">
          <ThemeTogglerButton variant="ghost" size="sm" />
          <Link href="/submit">
            <Button variant="default" size="sm">
              Submit a Skill
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
