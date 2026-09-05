import { defineConfig } from 'vite';

/**
 * Makes the built page work when opened straight off disk (file://).
 *
 * Vite always stamps `type="module" crossorigin` on the entry tag, even when the
 * bundle is emitted as an IIFE. A file:// page has a null origin, so the browser
 * refuses both the module and the crossorigin stylesheet, and the page renders
 * with no JS and no CSS at all. Rewriting to `defer` keeps the one timing
 * guarantee app.js relies on -- it runs after parsing, so <body> exists -- while
 * dropping the CORS requirement a bare <script> would also drop but at the cost
 * of running too early.
 */
function fileProtocolFriendlyTags() {
  return {
    name: 'file-protocol-friendly-tags',
    // Build only. The dev server needs native ES modules for HMR, and it emits
    // no `crossorigin`, so this would be a no-op there anyway -- but pinning it
    // to the build keeps that a guarantee rather than a coincidence.
    apply: 'build',
    enforce: 'post',
    transformIndexHtml(html) {
      return html
        .replace(
          /<script\s+type="module"\s+crossorigin\s+src=/g,
          '<script defer src='
        )
        .replace(
          /(<link\s+rel="stylesheet"\s+)crossorigin\s+(href=)/g,
          '$1$2'
        );
    },
  };
}

export default defineConfig({
  root: 'src',
  // Relative asset URLs. Absolute '/assets/...' paths resolve against the
  // filesystem root under file://, and against the domain root on GitHub
  // Pages -- wrong in both cases for a project served from a subpath.
  base: './',
  plugins: [fileProtocolFriendlyTags()],
  build: {
    // outDir is resolved against `root`, so this keeps the bundle in ./docs.
    // GitHub Pages can serve a repo's /docs directory straight from the default
    // branch, which is why the output lives there rather than in dist/.
    outDir: '../docs',
    emptyOutDir: true,
    // Keep the stylesheet as a separate file. With an IIFE bundle Vite would
    // otherwise inline the whole thing into the JS, which makes the page flash
    // unstyled until the script has parsed.
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        // No module semantics, so the bundle loads over file://.
        format: 'iife',
      },
    },
  },
  server: {
    port: 9000,
    open: true,
  },
});
