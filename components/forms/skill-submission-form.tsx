"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { CATEGORIES } from "@/lib/categories";

interface FormData {
  name: string;
  email: string;
  description: string;
  githubUrl: string;
  category: string;
  tags: string;
  imageUrl: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  description?: string;
  githubUrl?: string;
  category?: string;
}

export function SkillSubmissionForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    description: "",
    githubUrl: "",
    category: "",
    tags: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }

    if (!formData.githubUrl.trim()) {
      newErrors.githubUrl = "GitHub URL is required";
    } else if (!formData.githubUrl.startsWith("https://github.com/")) {
      newErrors.githubUrl = "Must be a valid GitHub URL";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.error || "Something went wrong");
        return;
      }

      router.push("/submit/success");
    } catch {
      setServerError("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {serverError && (
        <div className="p-4 rounded-lg bg-destructive/10 text-destructive text-sm">
          {serverError}
        </div>
      )}

      <Field>
        <FieldLabel>Skill Name *</FieldLabel>
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., PR Review Assistant"
        />
        {errors.name && <FieldError>{errors.name}</FieldError>}
      </Field>

      <Field>
        <FieldLabel>Your Email *</FieldLabel>
        <FieldDescription>
          We'll notify you when your skill is approved
        </FieldDescription>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
        />
        {errors.email && <FieldError>{errors.email}</FieldError>}
      </Field>

      <Field>
        <FieldLabel>Description *</FieldLabel>
        <FieldDescription>
          Describe what this skill does and when Claude should use it
        </FieldDescription>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="This skill helps Claude..."
          rows={4}
        />
        {errors.description && <FieldError>{errors.description}</FieldError>}
      </Field>

      <Field>
        <FieldLabel>GitHub URL *</FieldLabel>
        <FieldDescription>
          Link to the repository containing the SKILL.md file
        </FieldDescription>
        <Input
          name="githubUrl"
          value={formData.githubUrl}
          onChange={handleChange}
          placeholder="https://github.com/username/repo"
        />
        {errors.githubUrl && <FieldError>{errors.githubUrl}</FieldError>}
      </Field>

      <Field>
        <FieldLabel>Category *</FieldLabel>
        <Select
          value={formData.category}
          onValueChange={(value) => {
            if (value) {
              setFormData((prev) => ({ ...prev, category: value }));
              if (errors.category) {
                setErrors((prev) => ({ ...prev, category: undefined }));
              }
            }
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && <FieldError>{errors.category}</FieldError>}
      </Field>

      <Field>
        <FieldLabel>Tags</FieldLabel>
        <FieldDescription>Comma-separated list of tags</FieldDescription>
        <Input
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="react, typescript, testing"
        />
      </Field>

      <Field>
        <FieldLabel>Icon/Image URL</FieldLabel>
        <FieldDescription>Optional image to display with your skill</FieldDescription>
        <Input
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/icon.png"
        />
      </Field>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Skill"}
      </Button>
    </form>
  );
}
