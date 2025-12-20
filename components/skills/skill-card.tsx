"use client";

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUp01Icon } from "@hugeicons/core-free-icons";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCategoryLabel } from "@/lib/categories";
import { Doc } from "@/convex/_generated/dataModel";

interface SkillCardProps {
  skill: Doc<"skills">;
}

export function SkillCard({ skill }: SkillCardProps) {
  return (
    <Link href={`/skills/${skill.slug}`}>
      <Card className="h-full transition-colors hover:bg-accent/50 cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              {skill.imageUrl ? (
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className="h-10 w-10 rounded-lg object-cover"
                />
              ) : (
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-semibold text-primary">
                    {skill.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <CardTitle className="text-lg">{skill.name}</CardTitle>
                <Badge variant="secondary" className="mt-1">
                  {getCategoryLabel(skill.category)}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <HugeiconsIcon icon={ArrowUp01Icon} className="size-4" />
              <span>{skill.upvoteCount}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-2">
            {skill.description}
          </CardDescription>
        </CardContent>
        <CardFooter>
          <div className="flex flex-wrap gap-1">
            {skill.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {skill.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{skill.tags.length - 3}
              </Badge>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
