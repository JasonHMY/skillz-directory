export const CATEGORIES = [
  { value: "automation", label: "Automation" },
  { value: "code-generation", label: "Code Generation" },
  { value: "code-review", label: "Code Review" },
  { value: "debugging", label: "Debugging" },
  { value: "documentation", label: "Documentation" },
  { value: "devops", label: "DevOps" },
  { value: "git", label: "Git" },
  { value: "refactoring", label: "Refactoring" },
  { value: "security", label: "Security" },
  { value: "testing", label: "Testing" },
  { value: "other", label: "Other" },
] as const;

export type Category = (typeof CATEGORIES)[number]["value"];

export function getCategoryLabel(value: string): string {
  const category = CATEGORIES.find((c) => c.value === value);
  return category?.label ?? value;
}
