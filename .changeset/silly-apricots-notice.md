---
'@brisk-docs/gatsby-generator': patch
---

Fix getConfig to not export a promise, as this breaks in later versions of gatsby
