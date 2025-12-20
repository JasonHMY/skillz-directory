"use client";

import { SkillCard } from "./skill-card";
import { Doc } from "@/convex/_generated/dataModel";

interface SkillGridProps {
  skills: Doc<"skills">[] | undefined;
  isLoading?: boolean;
}

export function SkillGrid({ skills, isLoading }: SkillGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-48 rounded-lg bg-muted animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!skills || skills.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No skills found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((skill) => (
        <SkillCard key={skill._id} skill={skill} />
      ))}
    </div>
  );
}
