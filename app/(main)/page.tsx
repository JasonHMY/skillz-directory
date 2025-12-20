"use client";

import { useState, useCallback } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SkillSearch } from "@/components/skills/skill-search";
import { SkillGrid } from "@/components/skills/skill-grid";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);

  const featuredSkills = useQuery(api.skills.getFeatured);
  const allSkills = useQuery(api.skills.list, { search, category });

  const handleSearch = useCallback((newSearch: string, newCategory: string | undefined) => {
    setSearch(newSearch);
    setCategory(newCategory);
  }, []);

  const isSearching = search.trim() !== "" || category !== undefined;
  const displaySkills = isSearching ? allSkills : featuredSkills;

  return (
    <div className="container py-8 md:py-12 max-w-7xl mx-auto">
      <div className="mx-auto max-w-4xl text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4">
          AI Agent Skills
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Discover and share skills for AI agents. Browse community-contributed
          skills for Claude Code, Cursor, Windsurf, and more.
        </p>

        <SkillSearch onSearch={handleSearch} className="max-w-2xl mx-auto" />
      </div>

      <section>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold">
            {isSearching ? "Search Results" : "Featured Skills"}
          </h2>
          {!isSearching && featuredSkills && featuredSkills.length > 0 && (
            <p className="text-sm text-muted-foreground mt-1">
              Top skills by community votes
            </p>
          )}
        </div>

        <SkillGrid
          skills={displaySkills}
          isLoading={displaySkills === undefined}
        />
      </section>

      {!isSearching && allSkills && allSkills.length > 6 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">All Skills</h2>
          <SkillGrid skills={allSkills} />
        </section>
      )}
    </div>
  );
}
