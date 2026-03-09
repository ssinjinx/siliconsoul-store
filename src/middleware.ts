import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/products(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/privacy',
  '/terms',
  '/api/webhooks/stripe',
]);

export default clerkMiddleware((req, auth) => {
  if (isPublicRoute(req)) {
    return;
  }
  auth().protect();
});
