import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function GET(request: NextRequest) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  try {
    const token = request.nextUrl.searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(`${appUrl}/approve/error?reason=missing_token`);
    }

    // Validate token
    const result = await convex.mutation(api.approvalTokens.validate, { token });

    if (!result.valid) {
      return NextResponse.redirect(
        `${appUrl}/approve/error?reason=${encodeURIComponent(result.error || "invalid")}`
      );
    }

    // Approve the skill
    await convex.mutation(api.skills.approve, { skillId: result.skillId! });

    return NextResponse.redirect(`${appUrl}/approve`);
  } catch (error) {
    console.error("Approve error:", error);
    return NextResponse.redirect(`${appUrl}/approve/error?reason=server_error`);
  }
}
