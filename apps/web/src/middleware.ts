import { NextResponse } from "next/server";
import { authMiddleware } from "@clerk/nextjs/server";
// import { Ratelimit } from "@upstash/ratelimit";
// import { Redis } from "@upstash/redis";
// import { env } from "@/env";

// // Create a new ratelimiter, that allows 10 requests per 10 seconds
// const redis = new Redis({
//   url: env.UPSTASH_REDIS_REST_URL,
//   token: env.UPSTASH_REDIS_TOKEN,
// });
// const ratelimit = new Ratelimit({
//   redis: redis,
//   limiter: Ratelimit.slidingWindow(10, "10 s"),
// });

export default authMiddleware({
  // Public routes are routes that don't require authentication
  publicRoutes: ["/", "/api(.*)"],
  async afterAuth(auth, req) {
    if (auth.isPublicRoute ) {
      return NextResponse.next();
    }
    // } else if (auth.isApiRoute && auth.userId) {
    //   const { limit, remaining, success: rateLimitSuccess } = await ratelimit.limit(auth.userId);
    //   if (!rateLimitSuccess) return NextResponse.json({ error: "Too many requests!" }, { status: 429 });

    //   console.log("RATE DATA", rateLimitSuccess, limit, remaining, auth.userId);
    // }

    const url = new URL(req.nextUrl.origin);

    if (!auth.userId) {
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api)(.*)"],
};
