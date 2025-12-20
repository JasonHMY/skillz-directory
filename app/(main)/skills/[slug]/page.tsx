"use client";

import { useEffect, use } from "react";
import { useQuery, useMutation } from "convex/react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UpvoteButton } from "@/components/skills/upvote-button";
import { InstallationInstructions } from "@/components/skills/installation-instructions";
import { getCategoryLabel } from "@/lib/categories";

interface SkillPageProps {
  params: Promise<{ slug: string }>;
}

export default function SkillPage({ params }: SkillPageProps) {
  const { slug } = use(params);
  const skill = useQuery(api.skills.getBySlug, { slug });
  const incrementView = useMutation(api.skills.incrementViewCount);

  useEffect(() => {
    if (skill) {
      incrementView({ slug });
    }
  }, [skill?._id]);

  if (skill === undefined) {
    return (
      <div className="container py-12 max-w-7xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="h-12 w-96 bg-muted rounded" />
          <div className="h-32 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (skill === null) {
    notFound();
  }

  return (
    <div className="container py-8 md:py-12 max-w-7xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} className="size-5" />
        Back to all skills
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-start gap-4">
            {skill.imageUrl ? (
              <img
                src={skill.imageUrl}
                alt={skill.name}
                className="h-16 w-16 rounded-xl object-cover"
              />
            ) : (
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">
                  {skill.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{skill.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge>{getCategoryLabel(skill.category)}</Badge>
                {skill.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground">{skill.description}</p>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t">
            <UpvoteButton skillId={skill._id} initialCount={skill.upvoteCount} />
            <a href={skill.githubUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">
                View on GitHub
              </Button>
            </a>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-lg border bg-card p-6">
            <InstallationInstructions
              skillName={skill.name}
              githubUrl={skill.githubUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
