import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const create = mutation({
  args: {
    skillId: v.id("skills"),
  },
  handler: async (ctx, args) => {
    // Generate a random token
    const token = generateSecureToken();

    // 24 hour expiration
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000;

    await ctx.db.insert("approvalTokens", {
      skillId: args.skillId,
      token,
      createdAt: Date.now(),
      expiresAt,
      used: false,
    });

    return { token };
  },
});

export const validate = mutation({
  args: {
    token: v.string(),
  },
  handler: async (ctx, args) => {
    const tokenDoc = await ctx.db
      .query("approvalTokens")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (!tokenDoc) {
      return { valid: false, error: "Invalid token" };
    }

    if (tokenDoc.used) {
      return { valid: false, error: "Token already used" };
    }

    if (tokenDoc.expiresAt < Date.now()) {
      return { valid: false, error: "Token expired" };
    }

    // Mark token as used
    await ctx.db.patch(tokenDoc._id, { used: true });

    return { valid: true, skillId: tokenDoc.skillId };
  },
});

export const getByToken = query({
  args: {
    token: v.string(),
  },
  handler: async (ctx, args) => {
    const tokenDoc = await ctx.db
      .query("approvalTokens")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (!tokenDoc) {
      return null;
    }

    return {
      skillId: tokenDoc.skillId,
      used: tokenDoc.used,
      expired: tokenDoc.expiresAt < Date.now(),
    };
  },
});

// Simple secure token generator
function generateSecureToken(): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < 32; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}
