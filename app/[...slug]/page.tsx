import fs from "fs";
import path from "path";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MarkdownRenderer from "@/components/MarkdownRenderer";

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

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section className="grid-container usa-section">
          <div className="usa-width-one-whole">
            <div className="plandoc-content">
              <MarkdownRenderer content={content} baseUrl={slugPath} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
