import { mutation } from "./_generated/server";

// Seed data with verified AI agent skills
const SEED_SKILLS = [
  // Official Anthropic Skills
  {
    name: "PDF Skill",
    description:
      "Extract text and tables from PDFs, create new PDF documents, merge and split documents, and handle PDF forms. A comprehensive skill for all PDF manipulation tasks.",
    githubUrl: "https://github.com/anthropics/skills/tree/main/skills/pdf",
    authorEmail: "skills@anthropic.com",
    category: "documentation",
    tags: ["pdf", "documents", "extract", "merge", "official"],
  },
  {
    name: "DOCX Skill",
    description:
      "Create, edit, and analyze Word documents with tracked changes and formatting preservation. Full support for Microsoft Word document manipulation.",
    githubUrl: "https://github.com/anthropics/skills/tree/main/skills/docx",
    authorEmail: "skills@anthropic.com",
    category: "documentation",
    tags: ["word", "documents", "docx", "microsoft", "official"],
  },
  {
    name: "XLSX Skill",
    description:
      "Create, edit, and analyze Excel spreadsheets with formulas and data analysis. Handle complex spreadsheet operations programmatically.",
    githubUrl: "https://github.com/anthropics/skills/tree/main/skills/xlsx",
    authorEmail: "skills@anthropic.com",
    category: "automation",
    tags: ["excel", "spreadsheets", "data", "formulas", "official"],
  },
  {
    name: "PPTX Skill",
    description:
      "Create, edit, and analyze PowerPoint presentations with layouts and charts. Build professional presentations with slides, animations, and visual elements.",
    githubUrl: "https://github.com/anthropics/skills/tree/main/skills/pptx",
    authorEmail: "skills@anthropic.com",
    category: "documentation",
    tags: ["powerpoint", "presentations", "slides", "official"],
  },
  {
    name: "MCP Builder",
    description:
      "Comprehensive guide for creating MCP (Model Context Protocol) servers to integrate external APIs and services with Claude. Build custom integrations.",
    githubUrl: "https://github.com/anthropics/skills/tree/main/skills/mcp-builder",
    authorEmail: "skills@anthropic.com",
    category: "devops",
    tags: ["mcp", "api", "integration", "server", "official"],
  },
  {
    name: "Webapp Testing",
    description:
      "Test local web applications using Playwright. Automated browser testing, screenshots, and end-to-end testing for web applications.",
    githubUrl: "https://github.com/anthropics/skills/tree/main/skills/webapp-testing",
    authorEmail: "skills@anthropic.com",
    category: "testing",
    tags: ["playwright", "testing", "e2e", "browser", "official"],
  },
  {
    name: "Artifacts Builder",
    description:
      "Build HTML artifacts using React, Tailwind CSS, and shadcn/ui. Create interactive web components and visualizations as standalone artifacts.",
    githubUrl: "https://github.com/anthropics/skills/tree/main/skills/artifacts-builder",
    authorEmail: "skills@anthropic.com",
    category: "code-generation",
    tags: ["react", "tailwind", "html", "artifacts", "official"],
  },
  {
    name: "Algorithmic Art",
    description:
      "Generate art using p5.js with seeded randomness and particle systems. Create generative and algorithmic visual art programmatically.",
    githubUrl: "https://github.com/anthropics/skills/tree/main/skills/algorithmic-art",
    authorEmail: "skills@anthropic.com",
    category: "other",
    tags: ["art", "p5js", "generative", "creative", "official"],
  },
  {
    name: "Skill Creator",
    description:
      "Interactive tool guiding users through building new Claude skills. Templates and best practices for creating your own custom skills.",
    githubUrl: "https://github.com/anthropics/skills/tree/main/skills/skill-creator",
    authorEmail: "skills@anthropic.com",
    category: "automation",
    tags: ["meta", "templates", "creator", "official"],
  },
  {
    name: "Frontend Design",
    description:
      "Avoid generic AI aesthetics; make bold design decisions for React & Tailwind. Create distinctive, modern UI designs that stand out.",
    githubUrl: "https://github.com/anthropics/skills/tree/main/skills/frontend-design",
    authorEmail: "skills@anthropic.com",
    category: "code-generation",
    tags: ["design", "react", "tailwind", "ui", "official"],
  },
  // Community Skills
  {
    name: "iOS Simulator Skill",
    description:
      "iOS app building and testing through automation. Build, deploy, and test iOS applications in the simulator environment.",
    githubUrl: "https://github.com/conorluddy/ios-simulator-skill",
    authorEmail: "community@skills.dev",
    category: "testing",
    tags: ["ios", "mobile", "simulator", "xcode", "apple"],
  },
  {
    name: "Playwright Skill",
    description:
      "Advanced browser automation using Playwright. Comprehensive web scraping, testing, and automation capabilities.",
    githubUrl: "https://github.com/lackeyjb/playwright-skill",
    authorEmail: "community@skills.dev",
    category: "automation",
    tags: ["playwright", "browser", "automation", "scraping"],
  },
  {
    name: "D3.js Visualization Skill",
    description:
      "Create stunning data visualizations using D3.js. Build interactive charts, graphs, and data-driven documents.",
    githubUrl: "https://github.com/chrisvoncsefalvay/claude-d3js-skill",
    authorEmail: "community@skills.dev",
    category: "code-generation",
    tags: ["d3js", "visualization", "charts", "data"],
  },
  {
    name: "Scientific Skills",
    description:
      "Scientific computing skills with specialized libraries. NumPy, SciPy, pandas integration for data science and research.",
    githubUrl: "https://github.com/K-Dense-AI/claude-scientific-skills",
    authorEmail: "community@skills.dev",
    category: "other",
    tags: ["science", "numpy", "pandas", "research", "data"],
  },
  {
    name: "Web Asset Generator",
    description:
      "Generate favicons, app icons, and social media images. Create all necessary web assets from a single source image.",
    githubUrl: "https://github.com/alonw0/web-asset-generator",
    authorEmail: "community@skills.dev",
    category: "automation",
    tags: ["favicon", "icons", "assets", "images", "web"],
  },
  {
    name: "FFUF Web Fuzzing",
    description:
      "Guidance for web fuzzing during penetration testing. Security testing and vulnerability discovery using FFUF.",
    githubUrl: "https://github.com/jthack/ffuf_claude_skill",
    authorEmail: "community@skills.dev",
    category: "security",
    tags: ["security", "fuzzing", "pentesting", "ffuf"],
  },
  {
    name: "Git Worktrees",
    description:
      "Efficiently manage multiple Git worktrees for parallel development. Work on multiple branches simultaneously without stashing.",
    githubUrl: "https://github.com/anthropics/skills",
    authorEmail: "skills@anthropic.com",
    category: "git",
    tags: ["git", "worktrees", "branches", "parallel"],
  },
  {
    name: "Test Driven Development",
    description:
      "Follow TDD best practices when writing code. Write tests first, then implement features to pass those tests.",
    githubUrl: "https://github.com/anthropics/skills",
    authorEmail: "skills@anthropic.com",
    category: "testing",
    tags: ["tdd", "testing", "best-practices", "methodology"],
  },
];

export const seedSkills = mutation({
  args: {},
  handler: async (ctx) => {
    const results = [];

    for (const skill of SEED_SKILLS) {
      // Generate slug from name
      const baseSlug = skill.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      // Check if skill already exists
      const existing = await ctx.db
        .query("skills")
        .withIndex("by_slug", (q) => q.eq("slug", baseSlug))
        .first();

      if (existing) {
        results.push({ name: skill.name, status: "skipped", reason: "already exists" });
        continue;
      }

      // Create the skill (already approved since these are verified)
      await ctx.db.insert("skills", {
        name: skill.name,
        slug: baseSlug,
        description: skill.description,
        githubUrl: skill.githubUrl,
        authorEmail: skill.authorEmail,
        category: skill.category,
        tags: skill.tags,
        imageUrl: undefined,
        approved: true,
        viewCount: Math.floor(Math.random() * 100) + 10,
        upvoteCount: Math.floor(Math.random() * 50) + 5,
        createdAt: Date.now(),
        approvedAt: Date.now(),
      });

      results.push({ name: skill.name, status: "created" });
    }

    return results;
  },
});
