import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  skills: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    githubUrl: v.string(),
    authorEmail: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
    imageUrl: v.optional(v.string()),
    approved: v.boolean(),
    viewCount: v.number(),
    upvoteCount: v.number(),
    createdAt: v.number(),
    approvedAt: v.optional(v.number()),
  })
    .index("by_slug", ["slug"])
    .index("by_approved", ["approved"])
    .index("by_category", ["category", "approved"])
    .searchIndex("search_name", {
      searchField: "name",
      filterFields: ["approved", "category"],
    })
    .searchIndex("search_description", {
      searchField: "description",
      filterFields: ["approved", "category"],
    }),

  upvotes: defineTable({
    skillId: v.id("skills"),
    sessionId: v.string(),
    createdAt: v.number(),
  })
    .index("by_skill", ["skillId"])
    .index("by_session_skill", ["sessionId", "skillId"]),

  approvalTokens: defineTable({
    skillId: v.id("skills"),
    token: v.string(),
    createdAt: v.number(),
    expiresAt: v.number(),
    used: v.boolean(),
  })
    .index("by_token", ["token"])
    .index("by_skill", ["skillId"]),
});
