/* import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'


// const isPublicRoute = createRouteMatcher(['/sign-in(.*)', "/", "/public/(.*)'"])
const isProtectedRoute = createRouteMatcher(['/today', '/previous-days', "/to-watch", "/clock", "/speak-english", "/todo"])

export default clerkMiddleware(async (auth, req) => {
        // const { userId, redirectToSignIn } = await auth();
        // if (!userId && !isPublicRoute(req)) return redirectToSignIn();

    // if (isProtectedRoute(req)) await auth.protect()

    const { userId, redirectToSignIn } = await auth();

    if (isProtectedRoute(req) && !userId) {
        return redirectToSignIn();
    }
})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}

 */

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// === PUBLIC ROUTES (never protected) ===
const isPublicRoute = createRouteMatcher([
    "/sign-in(.*)",
    "/sign-up(.*)",
]);

// === PROTECTED ROUTES (require user to be signed in) ===
const isProtectedRoute = createRouteMatcher([
    "/today(.*)",
    "/previous-days(.*)",
    "/to-watch(.*)",
    "/clock(.*)",
    "/speak-english(.*)",
    "/todo(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
    // // Get the current user session
    // const { userId, redirectToSignIn } = await auth();

    // // 1️⃣ Redirect to Sign In if trying to access a protected route while logged out
    // if (isProtectedRoute(req) && !userId) {
    //     return redirectToSignIn();
    // }

    // // 2️⃣ Redirect signed-in users away from public auth pages
    // if (isPublicRoute(req) && userId) {
    //     return Response.redirect(new URL("/today", req.url));
    // }

    // // 3️⃣ Otherwise, allow access
});

export const config = {
    matcher: [
        // All routes except Next.js internals and static assets
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // API routes
        "/(api|trpc)(.*)",
    ],
};
