# SoftStrangeStore

A minimalist, cozy static concept storefront for SoftStrange Studio. Plain HTML, CSS, JavaScript and local JSON; no runtime framework, database, account system or build step.

## Status

The storybook upgrade adds self-hosted Fraunces and DM Sans, transparent botanical artwork, paper frames, finite motion, thumbnail galleries, zoom, keyboard controls and expandable product information. The reviewed storefront is published at https://softstrangestudio.github.io/SoftStrangeStore/ in commit `4a7222a8`. GitHub Pages deployment and live root/product smoke checks passed. See `REVIEW.md` and `reviews/storybook/run.json` for exact evidence and publication status.

All products remain unapproved sample concepts and purchasing is disabled. The AI concept images are not Angel’s actual inventory.

## Run locally

Use Node.js 22 or newer. The website itself needs no Node server in production and has no runtime framework or package dependencies.

```sh
npm test
npm start
```

Open `http://localhost:4173/SoftStrangeStore/`. Responsive-frame review harness: `http://localhost:4173/SoftStrangeStore/tools/preview.html`. The frame checks CSS viewport sizes, not real-device behavior. Serve through HTTP; opening HTML through `file://` will not reliably load module scripts or JSON.

## Site files

- `index.html`: shop, filters, studio story.
- `product.html?slug=…`: product detail with fail-closed purchase gate.
- `shipping.html`, `policies.html`: truthful preview notices, not completed live-store policies.
- `404.html`: standalone missing-page view. Its return URL is configured for `/SoftStrangeStore/`; update it if the deployment base changes.
- `styles.css`: responsive design, fixed image dimensions, reduced-motion handling.
- `store.js`: DOM rendering, immediate collection updates and catalog fetch with timeout/retry.
- `gallery.js`: thumbnails, native dialog, zoom, arrow keys, Escape and touch-swipe handling.
- `motion.js`: small finite animations and automatic reduced-motion handling.
- `catalog.js`: pure validation, image/link safety, pricing, purchase rules.
- `data/products.json`: the catalog source of truth for this prototype.
- `assets/`: locally served WebP artwork, licensed WOFF2 fonts, and a small SVG flower mark.
- `tools/`, `tests/`: local developer utilities; no production dependency on them.

## Angel’s initial publishing workflow

1. Photograph the real work and retain originals privately. The included concept crops must be replaced before sale.
2. Export web-ready product images with metadata removed. Use stable filenames in `assets/products/`, with 640px card images and larger detail images as needed.
3. Add or edit a product in `data/products.json`. Use a unique ID and lowercase hyphenated slug. Fill descriptive alt text; do not put customer data or credentials in JSON. Add alternate images to `gallery` as `{ "image": "assets/products/example.webp", "alt": "A useful image description", "label": "Detail" }`. Optional `imageScale` (1 to 1.5) adjusts card framing without changing the source image.
4. Keep `approved:false`, `status:"preview"`, `checkoutUrl:null`, and catalog `mode:"preview"` while drafting. Prices are integer minor units or null, not floating-point dollars.
5. Run `npm test`, open the local preview, and review the product at narrow and wide widths. Have Angel approve artwork, copy, price, materials, dimensions, care, and availability.
6. Before selling, complete the release blockers below and perform Stripe test-mode verification. JSON is public display data, **not** secure inventory or an order ledger.
7. Publish only after a separately authorized GitHub review/deployment. This implementation does not upload files or make GitHub changes automatically.

There is no upload dashboard yet. The initial authoring workflow is image files plus JSON. A future authenticated editor can write the same schema; it must never expose a GitHub token or Stripe secret in browser code.

## Payments: deliberately not live

The dormant payment-link path only allows exact `https://buy.stripe.com/…` URLs, positive integer prices, approved and available products, shipping copy, and catalog live mode. This client-side check is a usability guard, not a security boundary or proof of correct Stripe configuration. Test payment links in unit tests are synthetic and are never contacted.

Before enabling any link: verify Stripe owner/account, product/price/currency agreement, address collection, supported destinations, shipping charges, payment confirmation, tax obligations, refunds, customer contact, and order fulfillment. A successful redirect is not proof of payment. Angel must fulfill only from verified Stripe payment status. For one-of-a-kind work, use an authoritative server-side/commerce inventory mechanism or verified sale-limit workflow before launch; static JSON cannot prevent simultaneous purchases.

## Release blockers

- [x] Browser review of the staged storefront and product controls; see evidence for exact widths and limitations.
- [x] Keyboard gallery navigation, Escape/focus return, empty-state reset and explicit motion-off mode.
- [ ] Physical-device touch, Safari/Firefox, image failure and slow-network review before commercial launch.
- Earlier 50-loop request is historical and not claimed complete. This upgrade is a separate bounded `pass-it` run; its attempts and decisions are recorded individually.
- [ ] Angel-approved real artwork, product copy, prices, stock rules, and contact channel.
- [ ] Completed shipping, return, cancellation, care, and privacy policies.
- [ ] Verified Stripe test checkout, payment confirmation, address and shipping workflow.
- [ ] Remove preview-only copy and `noindex` only when launch is approved.
- [ ] Configure canonical and social metadata for the verified final URL.
- [ ] Confirm current GitHub Pages suitability and host terms for intended commerce use before choosing a production host.
- [x] User explicitly authorized uploading assets and publishing this upgrade to `main`. Deployment verification is recorded in the review report.

## Media initiative: later, not implemented

Start from approved real product photography: create a consistent shot list, export catalog and social crops, write accessible captions, stage a small launch collection, and use a consent-based update channel only after the contact/privacy workflow is ready. Do not market the AI concept images as completed work or promise stock/launch dates that Angel has not approved.

## Concept asset provenance

Built-in image generation produced a warm editorial still life of invented sage, peach, and butter-yellow clay creatures on linen. Working prompt: “Three quirky handmade clay creature sculptures in a warm sunlit cream studio; sage rounded creature with kind eyes, peach mushroom friend, butter-yellow creature with tiny flower; muted cozy editorial still life; no text or logos; invented concept designs, not real products.”

The source image remains outside the site in the working workspace. Optimized WebP derivatives are in `assets/products/`. These are design-direction fixtures only. The new decorative illustrations and font licenses are documented in `assets/illustrations/PROVENANCE.md`. Font files are self-hosted; no third-party font requests run in the browser.
