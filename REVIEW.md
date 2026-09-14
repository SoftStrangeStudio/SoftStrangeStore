# Storybook storefront review

This upgrade starts from public main revision `6895c9561807d0482f1d218550a8cef0de4db18b`. The user authorized the visual and interaction upgrade, generated artwork, GitHub uploads and publication to main.

## Review method

The local browser URL policy prevented local page review. The candidate was therefore staged on the **same authorized GitHub Pages site**, under `review/storybook/`, while the existing root storefront remained in place. All visual evidence is actual Chrome rendering. No generated website mockup substitutes for a screenshot.

The new `pass-it` run has a maximum of five attempted revisions. The evidence ledger distinguishes accepted work, rejected/uncertain work and screenshot retries. This is not a claim to have completed the historical request for 50 loops or 500 improvements.

## Implemented

- Minimal hero copy and simplified public navigation and notices.
- Self-hosted Fraunces headings and DM Sans body text with included OFL licenses.
- Two generated transparent botanical accents, SVG flower mark, responsive CSS paper and double-outline frames.
- Consistent card frames with an optional validated per-image composition adjustment.
- Native product gallery: thumbnails, original group scene, zoom, Escape, focus return, arrow-key navigation and touch-swipe code.
- Expandable product information with honest concept status.
- Finite entrances and staggered collection updates. No scroll hijacking, endless decoration loops, animation framework or application migration.
- Reduced motion follows the operating-system preference. The review harness can additionally request `?motion=off`, which exercises the same application suppression path without adding technical controls to the shop UI.

## Evidence and limits

`reviews/storybook/run.json` is the ordered evidence index, including exact candidate revisions and observed results. Image files are actual screenshots or lossily compressed/cropped presentation derivatives of those screenshots. Crop-only derivatives do not alter page content. Raw working captures are retained in the working directory.

The mobile harness checks CSS viewport layout, with browser scrollbars consuming some width. It does not emulate a physical device or prove native touch behavior. Native OS preference switching, physical-device swipe/pinch behavior and cross-browser coverage are not certified by this review. Browser extension metadata errors are distinct from application errors.

Some screenshot/evaluation requests timed out. Successful captures, relevant DOM state, and interaction results are named individually; unavailable captures are not claimed. Full-page native View Transitions were removed in favor of immediate DOM updates and small item animations after ambiguous motion-enabled iframe timeouts.

Purchasing remains disabled. No real inventory, prices, merchant configuration, shipment workflow or actual product photographs were invented. The original studio scene supplies the gallery's second view; it is not presented as another photograph of a physical product.

## Validation

- Source tests cover preview purchase blocking, catalog/gallery validation, safe image paths, exact checkout host, resource existence, source/image budgets and local HTTP paths.
- Browser checks cover collection selection and empty-state reset, thumbnail changes, zoom, previous/next view, Escape, focus restoration and expandable information.
- Transparent artwork was inspected against cream, sage and dark backgrounds without a chroma key.
- Exact final deployment status is recorded in `validation.json` after the final smoke check.
