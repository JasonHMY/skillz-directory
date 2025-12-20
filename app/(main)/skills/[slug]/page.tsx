import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { SkillPageClient } from "./skill-page-client";

interface SkillPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: SkillPageProps): Promise<Metadata> {
  const { slug } = await params;
  const skill = await fetchQuery(api.skills.getBySlug, { slug });

  if (!skill) {
    return {
      title: "Skill Not Found",
      description: "The requested skill could not be found.",
    };
  }

  const description =
    skill.description.length > 160
      ? skill.description.slice(0, 157) + "..."
      : skill.description;

  return {
    title: skill.name,
    description,
    openGraph: {
      title: `${skill.name} | AI Agent Skills`,
      description,
      type: "article",
      url: `/skills/${skill.slug}`,
    },
    twitter: {
      card: "summary",
      title: `${skill.name} | AI Agent Skills`,
      description,
    },
    keywords: [skill.name, skill.category, ...skill.tags],
  };
}

export default async function SkillPage({ params }: SkillPageProps) {
  const { slug } = await params;
  const skill = await fetchQuery(api.skills.getBySlug, { slug });

  if (!skill) {
    notFound();
  }

  return <SkillPageClient skill={skill} />;
}
