import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row max-w-7xl mx-auto">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built for the AI agent community.{" "}
          <Link
            href="https://github.com/keyman500/skills"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Open source
          </Link>
          .
        </p>
        <p className="text-center text-sm text-muted-foreground md:text-right">
          Skills are community-contributed. Use at your own discretion.
        </p>
      </div>
    </footer>
  );
}
