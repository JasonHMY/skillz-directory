import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { SkillSubmissionForm } from "@/components/forms/skill-submission-form";

export default function SubmitPage() {
  return (
    <div className="container max-w-2xl py-8 md:py-12 mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} className="size-5" />
        Back to directory
      </Link>

      <div className="space-y-6 text-center">
        <div>
          <h1 className="text-3xl font-bold">Submit a Skill</h1>
          <p className="text-muted-foreground mt-2">
            Share your AI agent skill with the community. Your submission will
            be reviewed before being published.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 text-left">
          <SkillSubmissionForm />
        </div>
      </div>
    </div>
  );
}
