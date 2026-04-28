# RaagAI Frontend Assessment — React + TypeScript + Vite

This repository contains a B2B healthcare SaaS frontend demo built with React, TypeScript, and Vite.

## Project Overview

The app demonstrates:

- Firebase authentication with protected routes
- Dashboard, analytics, and patient management pages
- Patient grid/list views and detail page
- Service worker registration and notification flow
- Theme switching and contextual state management
- Responsive layout with Material UI

## Tech Stack

- React 19
- TypeScript 6
- Vite
- MUI (Material UI)
- Firebase Auth
- React Router DOM
- Recharts

## Prerequisites

- Node.js 18+ or compatible LTS version
- npm 10+ or the npm version bundled with your Node install
- Firebase project with a Web app configured

## Environment Variables

Create a `.env` file in the repo root and add the following variables:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

### Notes

- These variables are consumed by `src/firebase/config.ts`.
- Do not commit `.env`; the repository ignores `.env*` files.
- Firebase must have Email/Password authentication enabled for login to work.

## Setup

Install dependencies:

```bash
npm install
```

Create `.env` with the Firebase config values above.

## Run Locally

```bash
npm run dev
```

Open the URL shown in the terminal, typically `http://localhost:5173`.

## Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Project Structure

- `src/App.tsx` — main route and theme provider setup
- `src/hooks/useAuth.ts` — Firebase auth state hook
- `src/firebase/config.ts` — Firebase init and auth export
- `src/components/Layout.tsx` — sidebar layout, header, and theme control
- `src/pages/LoginPage.tsx` — login form page
- `src/pages/Dashboard.tsx` — main dashboard view
- `src/pages/Patients.tsx` — patient list / grid toggle view
- `src/pages/PatientDetail.tsx` — patient detail page
- `src/pages/Analytics.tsx` — analytics charts
- `public/sw.js` — service worker registration for notifications

## Notifications

The app registers a service worker from `public/sw.js` and requests browser notification permission from `src/utils/registerSW.ts`.

Native notifications are delivered by the browser/OS, so the browser may handle them differently depending on platform settings.

## Theme / Styling

The app uses global theme state from `src/context/AppContext.tsx` and MUI `CssBaseline` to apply dark/light mode consistently.

## Troubleshooting

- If login fails, check your Firebase credentials and auth settings.
- If the app does not load environment variables, ensure `.env.local` is in the root and Vite is restarted.
- If notifications do not appear, confirm browser notification permission and OS notification settings.

## Author

Lakshya Verma

## License

If no `LICENSE` file is present, copyright is retained by the repository owner.
