import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const hasUpvoted = query({
  args: {
    skillId: v.id("skills"),
    sessionId: v.string(),
  },
  handler: async (ctx, args) => {
    const upvote = await ctx.db
      .query("upvotes")
      .withIndex("by_session_skill", (q) =>
        q.eq("sessionId", args.sessionId).eq("skillId", args.skillId)
      )
      .first();

    return upvote !== null;
  },
});

export const toggle = mutation({
  args: {
    skillId: v.id("skills"),
    sessionId: v.string(),
  },
  handler: async (ctx, args) => {
    const skill = await ctx.db.get(args.skillId);
    if (!skill) {
      throw new Error("Skill not found");
    }

    const existingUpvote = await ctx.db
      .query("upvotes")
      .withIndex("by_session_skill", (q) =>
        q.eq("sessionId", args.sessionId).eq("skillId", args.skillId)
      )
      .first();

    if (existingUpvote) {
      // Remove upvote
      await ctx.db.delete(existingUpvote._id);
      await ctx.db.patch(args.skillId, {
        upvoteCount: Math.max(0, skill.upvoteCount - 1),
      });
      return { upvoted: false, count: Math.max(0, skill.upvoteCount - 1) };
    } else {
      // Add upvote
      await ctx.db.insert("upvotes", {
        skillId: args.skillId,
        sessionId: args.sessionId,
        createdAt: Date.now(),
      });
      await ctx.db.patch(args.skillId, {
        upvoteCount: skill.upvoteCount + 1,
      });
      return { upvoted: true, count: skill.upvoteCount + 1 };
    }
  },
});
