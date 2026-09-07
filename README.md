# 1Fi Marketplace

A new **1Fi Marketplace** section added to the Shop tab of the 1Fi app, built to
match the existing app's look and feel (purple brand, Plus Jakarta type, pill
buttons, floating tab bar, soft cards).

The Shop page now has three segments:

| Segment          | State                                   |
| ---------------- | --------------------------------------- |
| Top Brands       | Placeholder ("Coming soon") — per brief |
| Nearby Stores    | Placeholder ("Coming soon") — per brief |
| **1Fi Marketplace** | Fully built                          |

## What's in the Marketplace

- **Listing** – product cards with image, brand, name, price + MRP/discount, and
  the lowest no-cost EMI (`₹X/mo · N mo`). Search + category chips.
- **Product detail** – image carousel, price block, **variant selector**
  (storage / colour / battery, re-prices the item), highlights, spec sheet, and a
  compact EMI summary.
- **EMI plan picker** – selectable plan cards (3–24 months), no-cost vs
  interest-bearing, monthly amount, total payable, processing fee. Single-select
  with a sticky footer CTA.
- **Confirmation** – mocked order reference and a summary of the chosen plan.
- **States** – skeleton loaders, error + retry, empty search results,
  out-of-stock variants, pull-to-refresh.

## Architecture

```
src/
  theme/                 Design tokens: colors, spacing, radius, typography, shadows
  components/             App-wide primitives (AppText, Card, PrimaryButton,
                          SegmentedControl, SearchField, Badge, StateViews, icons…)
  navigation/             Bottom tabs (Home / Shop / EMI Dues / Limit / Profile)
                          + Shop native stack
  screens/
    shop/                 Shop page: hero, 3-way segmented control, panels
    misc/                 Placeholder screens for the non-assignment tabs
  features/marketplace/
    types.ts             Domain models (ProductSummary, ProductDetail, EmiPlan…)
    api/                  marketplaceApi (the only surface screens call) +
                          mockServer (swap-in fake backend) + query keys
    data/                 Seed catalogue + EMI engine (plans derived from price)
    hooks/                useProducts / useProduct / useEmiQuote (React Query)
    lib/                  Pure selectors (default variant, default plan…)
    components/           Marketplace UI (ProductCard, VariantSelector,
                          EmiPlanCard, ImageCarousel, PriceBlock, SpecList…)
    screens/              ProductDetail, EmiCheckout, OrderConfirmed
  lib/                    queryClient, currency formatting
```

### Data & APIs

Nothing is hardcoded into components. Screens depend on `marketplaceApi`, which
today delegates to `mockServer` — an in-memory service that:

- returns Promises with a realistic delay,
- can be told to fail (`mockConfig.failListing / failDetail / failQuote`) so the
  loading and error states are demonstrable,
- **derives** EMI plans from the selected variant's price via `data/emiEngine.ts`
  (reducing-balance maths; 3- and 6-month tenures are no-cost), rather than
  storing plans per product.

Pointing the app at a real backend is a single-file change in
`features/marketplace/api/marketplaceApi.ts`.

### State management

- **Server state**: React Query (`@tanstack/react-query`) — caching, retry,
  `invalidateQueries` on pull-to-refresh, `enabled` gating for the EMI quote.
- **UI state**: local `useState` (search text, category, chosen variant, chosen
  plan). Selections are *derived* with a fallback (chosen → route param →
  recommended) so there's no `setState`-in-effect.

## Running it

```bash
npm install
npm start          # then press a for Android, i for iOS, w for web
```

Other scripts:

```bash
npm run typecheck  # tsc --noEmit
npm run lint       # eslint (flat config, eslint-config-expo)
npm run format     # prettier
```

## Notes / trade-offs

- The four non-Shop tabs render a minimal placeholder so navigation stays
  coherent; they're out of scope.
- Product imagery uses remote URLs for brevity; a production build would bundle
  or CDN-optimise these.
- The checkout is mocked end-to-end — there's no payment or pledge step.
- Catalogue theme (phones, a laptop, headphones, an e-scooter, a vacuum) mirrors
  the "phone / laptop / car / bike" artwork on the existing Shop hero.
