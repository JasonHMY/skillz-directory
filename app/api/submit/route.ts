import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { aj } from "@/lib/arcjet";
import { resend } from "@/lib/resend";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, description, githubUrl, category, tags, imageUrl } =
      body;

    // Validate required fields
    if (!name || !email || !description || !githubUrl || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email with Arcjet (if configured)
    if (aj) {
      const decision = await aj.protect(request, { email });

      if (decision.isDenied()) {
        if (decision.reason.isEmail()) {
          return NextResponse.json(
            { error: "Please use a valid email address" },
            { status: 400 }
          );
        }
        return NextResponse.json(
          { error: "Request blocked" },
          { status: 403 }
        );
      }
    }

    // Create skill in Convex
    const { skillId } = await convex.mutation(api.skills.create, {
      name,
      description,
      githubUrl,
      authorEmail: email,
      category,
      tags: tags || [],
      imageUrl: imageUrl || undefined,
    });

    // Create approval token
    const { token } = await convex.mutation(api.approvalTokens.create, {
      skillId,
    });

    // Build approval URL
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const approveUrl = `${appUrl}/api/approve?token=${token}`;

    // Send approval email
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail && resend) {
      await resend.emails.send({
        from: `AI Agent Skills <${process.env.SEND_EMAIL || "noreply@resend.dev"}>`,
        to: adminEmail,
        subject: `New Skill Submission: ${name}`,
        html: `
          <h1>New Skill Submission</h1>
          <p>A new skill has been submitted for review.</p>

          <h2>Details</h2>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Author:</strong> ${email}</li>
            <li><strong>Category:</strong> ${category}</li>
            <li><strong>GitHub:</strong> <a href="${githubUrl}">${githubUrl}</a></li>
          </ul>

          <h3>Description</h3>
          <p>${description}</p>

          <hr />

          <p>
            <a href="${approveUrl}" style="display: inline-block; padding: 12px 24px; background-color: #000; color: #fff; text-decoration: none; border-radius: 6px;">
              Approve Skill
            </a>
          </p>

          <p style="color: #666; font-size: 12px;">
            This link will expire in 24 hours.
          </p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Submit error:", error);
    return NextResponse.json(
      { error: "Failed to submit skill" },
      { status: 500 }
    );
  }
}
