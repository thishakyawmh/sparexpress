import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import vm from "node:vm";

const root = process.cwd();

test("shared JavaScript parses without syntax errors", () => {
  const source = readFileSync(join(root, "script.js"), "utf8");
  assert.doesNotThrow(() => new vm.Script(source, { filename: "script.js" }));
});

test("every HTML page has one valid document body and basic responsive metadata", () => {
  const pages = readdirSync(root).filter((file) => file.toLowerCase().endsWith(".html"));
  assert.ok(pages.length > 0, "expected at least one HTML page");

  for (const page of pages) {
    const html = readFileSync(join(root, page), "utf8");
    const bodyOpenTags = html.match(/<body\b/gi) || [];
    const bodyCloseTags = html.match(/<\/body\s*>/gi) || [];

    assert.equal(bodyOpenTags.length, 1, `${page} should contain exactly one body element`);
    assert.equal(bodyCloseTags.length, 1, `${page} should close its body exactly once`);
    assert.match(html, /<html\b[^>]*\blang=["'][a-z-]+["']/i, `${page} should declare its document language`);
    assert.match(html, /<meta\s+name=["']viewport["']/i, `${page} should include responsive viewport metadata`);
  }
});
