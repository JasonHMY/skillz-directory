"use client";

import { useState, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { CATEGORIES } from "@/lib/categories";

interface SkillSearchProps {
  onSearch: (search: string, category: string | undefined) => void;
  className?: string;
}

export function SkillSearch({ onSearch, className }: SkillSearchProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(search, category);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, category, onSearch]);

  return (
    <div className={className}>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <HugeiconsIcon
            icon={Search01Icon}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-5"
          />
          <Input
            type="search"
            placeholder="Search skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-12 text-lg"
          />
        </div>
        <Select
          value={category ?? "all"}
          onValueChange={(value) => setCategory(!value || value === "all" ? undefined : value)}
        >
          <SelectTrigger className="w-full sm:w-48 h-12">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
