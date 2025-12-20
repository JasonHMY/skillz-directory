import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SkillNotFound() {
  return (
    <div className="container max-w-lg py-16 md:py-24">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">404</h1>
        <div>
          <h2 className="text-xl font-semibold">Skill Not Found</h2>
          <p className="text-muted-foreground mt-2">
            The skill you're looking for doesn't exist or hasn't been approved
            yet.
          </p>
        </div>
        <Link href="/">
          <Button>Browse Skills</Button>
        </Link>
      </div>
    </div>
  );
}
