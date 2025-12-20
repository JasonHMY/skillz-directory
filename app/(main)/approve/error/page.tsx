"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";

const ERROR_MESSAGES: Record<string, string> = {
  missing_token: "No approval token provided.",
  invalid: "Invalid approval token.",
  "Token already used": "This approval link has already been used.",
  "Token expired": "This approval link has expired.",
  server_error: "An error occurred while processing the approval.",
};

function ApproveErrorContent() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason") || "unknown";

  const message =
    ERROR_MESSAGES[reason] ||
    "Something went wrong with the approval process.";

  return (
    <div className="container max-w-lg py-16 md:py-24 mx-auto">
      <div className="text-center space-y-6">
        <div className="mx-auto w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
          <HugeiconsIcon icon={Cancel01Icon} className="size-8 text-red-600 dark:text-red-400" />
        </div>

        <div>
          <h1 className="text-2xl font-bold">Approval Failed</h1>
          <p className="text-muted-foreground mt-2">{message}</p>
        </div>

        <Link href="/">
          <Button variant="outline">Back to Directory</Button>
        </Link>
      </div>
    </div>
  );
}

export default function ApproveErrorPage() {
  return (
    <Suspense fallback={<div className="container max-w-lg py-16 md:py-24 mx-auto text-center">Loading...</div>}>
      <ApproveErrorContent />
    </Suspense>
  );
}
