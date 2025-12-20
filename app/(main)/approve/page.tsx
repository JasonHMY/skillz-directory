import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";

export default function ApproveSuccessPage() {
  return (
    <div className="container max-w-lg py-16 md:py-24 mx-auto">
      <div className="text-center space-y-6">
        <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <HugeiconsIcon icon={Tick01Icon} className="size-8 text-green-600 dark:text-green-400" />
        </div>

        <div>
          <h1 className="text-2xl font-bold">Skill Approved!</h1>
          <p className="text-muted-foreground mt-2">
            The skill has been approved and is now visible in the directory.
          </p>
        </div>

        <Link href="/">
          <Button>View Directory</Button>
        </Link>
      </div>
    </div>
  );
}
