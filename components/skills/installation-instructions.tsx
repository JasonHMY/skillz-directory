"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Copy01Icon, Tick01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";

interface InstallationInstructionsProps {
  skillName: string;
  githubUrl: string;
}

export function InstallationInstructions({
  skillName,
  githubUrl,
}: InstallationInstructionsProps) {
  const [copiedPersonal, setCopiedPersonal] = useState(false);
  const [copiedProject, setCopiedProject] = useState(false);

  const slug = skillName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const personalCommand = `mkdir -p ~/.claude/skills/${slug}
# Copy SKILL.md from GitHub to ~/.claude/skills/${slug}/`;

  const projectCommand = `mkdir -p .claude/skills/${slug}
# Copy SKILL.md from GitHub to .claude/skills/${slug}/
git add .claude/skills/${slug}`;

  const copyToClipboard = async (text: string, type: "personal" | "project") => {
    await navigator.clipboard.writeText(text);
    if (type === "personal") {
      setCopiedPersonal(true);
      setTimeout(() => setCopiedPersonal(false), 2000);
    } else {
      setCopiedProject(true);
      setTimeout(() => setCopiedProject(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Installation</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Claude Code skills are folder-based. Download the SKILL.md file from
          GitHub and place it in one of these locations:
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Personal Use</h4>
            <span className="text-xs text-muted-foreground">
              Available across all projects
            </span>
          </div>
          <div className="relative">
            <pre className="bg-muted rounded-lg p-4 text-sm overflow-x-auto">
              <code>{personalCommand}</code>
            </pre>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => copyToClipboard(personalCommand, "personal")}
            >
              {copiedPersonal ? (
                <HugeiconsIcon icon={Tick01Icon} className="size-4" />
              ) : (
                <HugeiconsIcon icon={Copy01Icon} className="size-4" />
              )}
            </Button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Project/Team Use</h4>
            <span className="text-xs text-muted-foreground">
              Shared via git with team
            </span>
          </div>
          <div className="relative">
            <pre className="bg-muted rounded-lg p-4 text-sm overflow-x-auto">
              <code>{projectCommand}</code>
            </pre>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => copyToClipboard(projectCommand, "project")}
            >
              {copiedProject ? (
                <HugeiconsIcon icon={Tick01Icon} className="size-4" />
              ) : (
                <HugeiconsIcon icon={Copy01Icon} className="size-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t">
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          View on GitHub
          <svg
            className="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
