# react-nextjs-test

Building a React Application with Next.js, MySQL, [Tailwind CSS](https://tailwindcss.com/), and [Next UI](https://nextui.org/).

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the package:

```bash
npm i
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

API routes can be accessed on [http://localhost:3000/api/items](http://localhost:3000/api/items).

Database has already created and the seeds are also migrated when running the development server. Script for these procedures is in `scripts/init-db.js`, and opening the database connection is in `src/lib/db.js`

The `src/pages/api` directory is mapped to `/api/*`. Files in this directory are treated as API routes instead of React pages.
