# Istanbul Food Centre

A React and Vite demonstration storefront for a family-run international supermarket in Reading, Berkshire. It includes a filterable catalogue of 54 sample products, a browser-local basket, a delivery scheduler preview and a demonstration checkout.

Product listings, prices, fees and delivery windows are illustrative. The site does not submit orders, process payments or send checkout details to a server. Checkout details are held in memory for the session.

## Develop locally

Use Node.js 22.12 or newer on the Node 22 line, or a later version supported by Vite.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

The customer site runs at `http://localhost:5173/`. The separate local admin prototype runs at `http://localhost:5173/admin` and uses fictional orders and browser-local demo data. Admin changes are independent of the storefront. The standard production build does not include the admin entry point.

## Customer deployment

Import this repository into Vercel with the Vite framework preset and the intended production branch. The committed Vercel configuration builds with `npm run build`, publishes `dist` and rewrites known React Router URLs to the customer entry point. Admin routes are excluded from those rewrites.

No environment variables are required for the customer demonstration. Keep secrets, local environment files and Vercel's local project metadata out of Git. Any separately hosted admin demonstration requires verified platform access protection before deployment.

## Project structure

- `src/pages` and `src/components` contain the storefront routes, UI and shopping flow.
- `src/data` contains the demonstration catalogue, delivery configuration and store details.
- `src/admin` contains the standalone local admin prototype.
- `src/assets` contains optimised WebP images. Source credits are recorded in the catalogue data and relevant components.
