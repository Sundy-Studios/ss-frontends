This is a A simple, single-page application (SPA) demonstrating user management with React and Firebase. The project integrates Firebase Authentication to handle user sign-ups, logins, and protected routes.
It also incudes a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

# ss-frontends

A Next.js frontend demonstrating user management and protected routes using Firebase Authentication. Built with Next.js 16 and React 19, plus Storybook for UI components.

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Add your Firebase configuration (see next section).

```typescript
export const firebaseConfig = {
  apiKey: "xxx",
  authDomain: "xxx",
  projectId: "xxx",
  storageBucket: "xxx",
  messagingSenderId: "xxx",
  appId: "xxx",
  measurementId: "xxx",
};
```

3. Run the dev server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser — the app runs on port 3000 by default.

## Firebase configuration

This project expects a Firebase configuration object. Create or update `firebase/config.ts` (or set up your preferred env approach). Example content:

```typescript
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
};
```

- The app loads Firebase from `firebase/config.ts` and initializes auth in `firebase/auth.ts`.
- Do not commit sensitive keys to public repos; prefer environment variables or a private secrets manager for production.

## Scripts

- `npm run dev` — run the Next.js development server (localhost:3000)
- `npm run build` — build for production
- `npm run start` — start the production server
- `npm run lint` — run ESLint
- `npm run storybook` — run Storybook (port 6006)
- `npm run build-storybook` — build Storybook static site
- `npm test` — runs the basic test script (see `package.json`)

## Tests

This repo currently doesn't include a full test suite. A placeholder `test` script exists so you can wire up your preferred test runner (Vitest, Jest, React Testing Library) later:

```bash
npm test
```

Suggested next steps for tests:

- Add `vitest` or `jest` and a small component/unit test to verify tooling.
- Integrate `@storybook/addon-vitest` for component tests alongside Storybook.

## Storybook

Storybook is configured. Run it with:

```bash
npm run storybook
```

## Useful notes

- Main app entry: `app/page.tsx`
- Protected routes/components live in `components/ProtectedRoute` and `components/PublicRoute`.
- Firebase helpers: see `firebase/auth.ts` and `firebase/config.ts`.
- API helpers: `api/axios.ts` and `lib/fetcher.ts`.

## Contributing

1. Fork the repo and create a branch for your feature.
2. Open a pull request with a clear description.

## License

This project does not include a license file. Add one if you plan to open-source it.

---

If you'd like, I can add an example test, wire up Vitest, or set up an `.env.example` and a `.gitignore` entry for local Firebase configs. Which would you prefer next?
