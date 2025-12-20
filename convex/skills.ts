import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const list = query({
  args: {
    search: v.optional(v.string()),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let skills;

    if (args.search && args.search.trim()) {
      // Search by name
      const nameResults = await ctx.db
        .query("skills")
        .withSearchIndex("search_name", (q) => {
          let search = q.search("name", args.search!);
          if (args.category) {
            search = search.eq("category", args.category);
          }
          return search.eq("approved", true);
        })
        .take(50);

      // Search by description
      const descResults = await ctx.db
        .query("skills")
        .withSearchIndex("search_description", (q) => {
          let search = q.search("description", args.search!);
          if (args.category) {
            search = search.eq("category", args.category);
          }
          return search.eq("approved", true);
        })
        .take(50);

      // Combine and deduplicate results
      const seenIds = new Set<string>();
      skills = [];
      for (const skill of [...nameResults, ...descResults]) {
        if (!seenIds.has(skill._id)) {
          seenIds.add(skill._id);
          skills.push(skill);
        }
      }
    } else if (args.category) {
      skills = await ctx.db
        .query("skills")
        .withIndex("by_category", (q) =>
          q.eq("category", args.category!).eq("approved", true)
        )
        .collect();
    } else {
      skills = await ctx.db
        .query("skills")
        .withIndex("by_approved", (q) => q.eq("approved", true))
        .collect();
    }

    // Sort by featured score (upvotes * 2 + views)
    return skills.sort(
      (a, b) =>
        b.upvoteCount * 2 + b.viewCount - (a.upvoteCount * 2 + a.viewCount)
    );
  },
});

export const getFeatured = query({
  args: {},
  handler: async (ctx) => {
    const skills = await ctx.db
      .query("skills")
      .withIndex("by_approved", (q) => q.eq("approved", true))
      .collect();

    // Sort by featured score and take top 6
    return skills
      .sort(
        (a, b) =>
          b.upvoteCount * 2 + b.viewCount - (a.upvoteCount * 2 + a.viewCount)
      )
      .slice(0, 6);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const skill = await ctx.db
      .query("skills")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!skill || !skill.approved) {
      return null;
    }

    return skill;
  },
});

export const incrementViewCount = mutation({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const skill = await ctx.db
      .query("skills")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (skill && skill.approved) {
      await ctx.db.patch(skill._id, {
        viewCount: skill.viewCount + 1,
      });
    }
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    githubUrl: v.string(),
    authorEmail: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Generate slug from name
    const baseSlug = args.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    // Check for existing slug and add suffix if needed
    let slug = baseSlug;
    let counter = 1;
    while (true) {
      const existing = await ctx.db
        .query("skills")
        .withIndex("by_slug", (q) => q.eq("slug", slug))
        .first();
      if (!existing) break;
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const skillId = await ctx.db.insert("skills", {
      name: args.name,
      slug,
      description: args.description,
      githubUrl: args.githubUrl,
      authorEmail: args.authorEmail,
      category: args.category,
      tags: args.tags,
      imageUrl: args.imageUrl,
      approved: false,
      viewCount: 0,
      upvoteCount: 0,
      createdAt: Date.now(),
    });

    return { skillId, slug };
  },
});

export const approve = mutation({
  args: { skillId: v.id("skills") },
  handler: async (ctx, args) => {
    const skill = await ctx.db.get(args.skillId);
    if (!skill) {
      throw new Error("Skill not found");
    }

    await ctx.db.patch(args.skillId, {
      approved: true,
      approvedAt: Date.now(),
    });

    return { success: true };
  },
});

export const getCategories = query({
  args: {},
  handler: async (ctx) => {
    const skills = await ctx.db
      .query("skills")
      .withIndex("by_approved", (q) => q.eq("approved", true))
      .collect();

    const categories = [...new Set(skills.map((s) => s.category))];
    return categories.sort();
  },
});
