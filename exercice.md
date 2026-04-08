# Exercise: Dashboard Profile Card

Build a small `DashboardProfileCard` feature that matches your current Next.js pattern.

---

## Goal

Your project already follows this flow:

- a client page calls a local `/api/...` route
- the route proxies to your backend with `axios`
- the page passes the fetched data into a presentational component

Use that same approach for this mini feature.

---

## Tasks

### 1. Create the API route

Create a new route at:

[`/Users/mouad/Desktop/Fil Rouge/Swish-CMS/frontend/app/api/dashboard/profile-card/route.ts`](/Users/mouad/Desktop/Fil Rouge/Swish-CMS/frontend/app/api/dashboard/profile-card/route.ts)

In that route:

- read the auth cookie
- call your backend the same way as:

[`/Users/mouad/Desktop/Fil Rouge/Swish-CMS/frontend/app/api/auth/me/route.ts`](/Users/mouad/Desktop/Fil Rouge/Swish-CMS/frontend/app/api/auth/me/route.ts)

- return a simplified payload like this:

```ts
{
  greeting: "Welcome back, FirstName",
  fullName: "FirstName LastName",
  email: "user@email.com",
  tenantStatus: "Workspace ready" | "No workspace yet"
}
```

### 2. Consume the route in the dashboard

In:

[`/Users/mouad/Desktop/Fil Rouge/Swish-CMS/frontend/app/(public)/dashboard/page.tsx`](/Users/mouad/Desktop/Fil Rouge/Swish-CMS/frontend/app/(public)/dashboard/page.tsx)

- fetch `/api/dashboard/profile-card`
- use `axios` or `fetch`
- do it inside `useEffect`
- handle a small loading state
- handle a small error state

### 3. Create a presentational component

Create a small component like:

[`/Users/mouad/Desktop/Fil Rouge/Swish-CMS/frontend/app/(public)/dashboard/components/DashboardProfileCard.tsx`](/Users/mouad/Desktop/Fil Rouge/Swish-CMS/frontend/app/(public)/dashboard/components/DashboardProfileCard.tsx)

The component should:

- receive data through props
- render the values cleanly
- not fetch data by itself

Pass values such as:

- `greeting`
- `fullName`
- `email`
- `tenantStatus`

---

## What You Practice

- creating a Next.js route
- proxying backend data
- consuming an API route from the frontend
- handling loading and error state in a client page
- passing typed props to a child component

---

## Acceptance Criteria

- The dashboard still redirects if the user is not logged in.
- The new card fetches data from your new route, not directly from Redux.
- The card receives props like `greeting`, `email`, and `tenantStatus`.
- A small loading message is shown while fetching.
- A small error message is shown if the request fails.

---

## Good References

- API proxy pattern:

[`/Users/mouad/Desktop/Fil Rouge/Swish-CMS/frontend/app/api/auth/me/route.ts`](/Users/mouad/Desktop/Fil Rouge/Swish-CMS/frontend/app/api/auth/me/route.ts)

- Client fetch pattern:

[`/Users/mouad/Desktop/Fil Rouge/Swish-CMS/frontend/app/(public)/setup/page.tsx`](/Users/mouad/Desktop/Fil Rouge/Swish-CMS/frontend/app/(public)/setup/page.tsx)

- Target page:

[`/Users/mouad/Desktop/Fil Rouge/Swish-CMS/frontend/app/(public)/dashboard/page.tsx`](/Users/mouad/Desktop/Fil Rouge/Swish-CMS/frontend/app/(public)/dashboard/page.tsx)
