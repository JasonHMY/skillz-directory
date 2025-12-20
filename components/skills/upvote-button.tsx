"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUp01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface UpvoteButtonProps {
  skillId: Id<"skills">;
  initialCount: number;
}

function getSessionId(): string {
  if (typeof window === "undefined") return "";

  let sessionId = localStorage.getItem("skillz_session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("skillz_session_id", sessionId);
  }
  return sessionId;
}

export function UpvoteButton({ skillId, initialCount }: UpvoteButtonProps) {
  const [sessionId, setSessionId] = useState("");
  const [optimisticUpvoted, setOptimisticUpvoted] = useState<boolean | null>(null);
  const [optimisticCount, setOptimisticCount] = useState<number | null>(null);

  useEffect(() => {
    setSessionId(getSessionId());
  }, []);

  const hasUpvoted = useQuery(
    api.upvotes.hasUpvoted,
    sessionId ? { skillId, sessionId } : "skip"
  );

  const toggleUpvote = useMutation(api.upvotes.toggle);

  const isUpvoted = optimisticUpvoted ?? hasUpvoted ?? false;
  const count = optimisticCount ?? initialCount;

  const handleClick = async () => {
    if (!sessionId) return;

    // Optimistic update
    setOptimisticUpvoted(!isUpvoted);
    setOptimisticCount(isUpvoted ? count - 1 : count + 1);

    try {
      await toggleUpvote({ skillId, sessionId });
    } catch {
      // Revert on error
      setOptimisticUpvoted(null);
      setOptimisticCount(null);
    }
  };

  return (
    <Button
      variant={isUpvoted ? "default" : "outline"}
      size="lg"
      onClick={handleClick}
      className="gap-2"
    >
      <HugeiconsIcon icon={ArrowUp01Icon} className="size-5" />
      <span>{count}</span>
    </Button>
  );
}
