# SoftStrangeStore — crochet bee candidate

Crochet bee update based on main a9dfbd6d7adff20454db5511857a8ec9fa73fbe2. Publication to main authorized; deployment outcome is reported after the Pages build.

The homepage and product template now focus on Angel’s crochet bees. The former concept catalog is retained in data/concepts-archive.json and is not loaded by the storefront. The current bee record is a draft, with a decorative flower placeholder, not a product photograph.

## Preview

Run `npm start` and open http://localhost:4173/SoftStrangeStore/. Run `npm test` for validation.

## Complete the first listing

Edit data/products.json. Supply actual photographs, price in integer cents, stock, materials, dimensions, color, care, suitability, shipping and a verified Stripe Payment Link. Fulfillment must be ready_to_ship or made_to_order. For made-to-order, stock represents the approved order capacity.

Keep approved, photosApproved and inventoryVerified false until the corresponding review is complete. Keep mode preview until shipping, contact, policies and checkout are approved. Never put credentials or customer information in this public JSON.

The browser purchase gate is not inventory enforcement. A checkout-side sale limit or authoritative inventory service must prevent simultaneous orders. Verify that arrangement before setting inventoryVerified true. Manual JSON updates alone cannot prevent overselling or instantly update sold-out state.

## Outstanding owner inputs

- Real bee photographs, including scale and alternate views
- Price, available quantity and ready-to-ship versus made-to-order
- Materials, measurements, care and product suitability
- Shipping destinations, charges, dispatch time and tracking process
- Support contact and return/cancellation/damage policies
- Account-owned checkout link and completed payment/cancellation/inventory tests

## Validation

15 automated tests pass, including fail-closed purchase checks for missing photo approval, stock, inventory verification and fulfillment mode. Local HTTP serving and resource checks pass. No payment transactions were performed. Visual review has not been completed for this candidate.
