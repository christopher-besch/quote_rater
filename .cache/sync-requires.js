
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": preferDefault(require("/home/chris/files/web/quote_rater/.cache/dev-404-page.js")),
  "component---src-pages-404-tsx": preferDefault(require("/home/chris/files/web/quote_rater/src/pages/404.tsx")),
  "component---src-pages-index-tsx": preferDefault(require("/home/chris/files/web/quote_rater/src/pages/index.tsx"))
}

