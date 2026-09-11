import fs from "fs";
import path from "path";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import SideNav from "@/components/SideNav";
import { navItems } from "@/lib/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const candidatePaths = [
    path.join(process.cwd(), "public", "title-vi-2024", ...slug, "index.md"),
    path.join(process.cwd(), "public", "title-vi-2024", slug.join("/") + ".md"),
    path.join(process.cwd(), "public", ...slug, "index.md"),
    path.join(process.cwd(), "public", slug.join("/") + ".md"),
  ];

  const filePath = candidatePaths.find((p) => fs.existsSync(p));
  if (filePath) {
    const content = fs.readFileSync(filePath, "utf8");
    const h1Match = content.match(/^#\s+(.+)$/m);
    if (h1Match) {
      return {
        title: `${h1Match[1].replace(/<[^>]*>/g, "").trim()} | Title VI 2024`,
      };
    }
  }

  const rawTitle = slug[slug.length - 1] || "Introduction";
  const formattedTitle = rawTitle
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${formattedTitle} | Title VI 2024`,
  };
}

function getSectionNav(slugPath: string, content: string) {
  // Normalize slugPath (strip title-vi-2024/ prefix if present)
  const normPath = slugPath.replace(/^title-vi-2024\//, "");
  const sectionPrefix = normPath.split("/")[0];

  // Find matching nav item with children
  const parentItem = navItems.find((item) => {
    if (!item.children) return false;
    return item.children.some((child) => child.href.replace(/^\//, "").startsWith(sectionPrefix));
  });

  if (!parentItem || !parentItem.children) {
    return null;
  }

  // Extract h2 headings from content for the active page
  const headings: { href: string; label: string }[] = [];
  const lines = content.split("\n");
  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.+)$/);
    if (h2Match) {
      const label = h2Match[1].replace(/<[^>]*>/g, "").trim();
      const id = label
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      headings.push({ href: `#${id}`, label });
    }
  }

  const currentHref = `/${normPath}`;
  const sideNavItems = parentItem.children.map((child) => {
    const active = child.href === currentHref;
    return {
      href: child.href,
      label: child.label,
      active,
      subItems: active ? headings : [],
    };
  });

  return sideNavItems;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugPath = slug.join("/");

  // Try to find the markdown file in public/title-vi-2024, public, or public/lrtp2045
  const candidatePaths = [
    path.join(process.cwd(), "public", "title-vi-2024", ...slug, "index.md"),
    path.join(process.cwd(), "public", "title-vi-2024", slug.join("/") + ".md"),
    path.join(process.cwd(), "public", ...slug, "index.md"),
    path.join(process.cwd(), "public", slug.join("/") + ".md"),
    path.join(process.cwd(), "public", "lrtp2045", ...slug, "index.md"),
    path.join(process.cwd(), "public", "lrtp2045", slug.join("/") + ".md"),
  ];

  const filePath = candidatePaths.find((p) => fs.existsSync(p));

  if (!filePath) {
    return (
      <>
        <Header />
        <main id="main-content" tabIndex={-1}>
          <section className="grid-container usa-section">
            <div className="usa-width-one-whole">
              <h1>Page Not Found</h1>
              <p>
                The page at <code>/{slugPath}</code> could not be found.
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  const content = fs.readFileSync(filePath, "utf8");
  const sideNavItems = getSectionNav(slugPath, content);

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section className="grid-container usa-section">
          {sideNavItems ? (
            <div className="grid-row grid-gap">
              <div className="desktop:grid-col-3 sticky-sidebar-wrapper">
                <aside className="sticky-sidebar">
                  <SideNav items={sideNavItems} />
                </aside>
              </div>
              <div className="usa-layout-docs-main_content desktop:grid-col-9 plandoc-content">
                <MarkdownRenderer content={content} baseUrl={slugPath} />
              </div>
            </div>
          ) : (
            <div className="usa-width-one-whole">
              <div className="plandoc-content">
                <MarkdownRenderer content={content} baseUrl={slugPath} />
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
