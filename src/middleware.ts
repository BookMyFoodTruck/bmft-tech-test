import { NextRequest, NextResponse } from 'next/server';

export default function httpsRedirectMiddleware(
  req: NextRequest,
): NextResponse {
  const isHttps = req.headers.get('x-forwarded-proto') === 'https';

  if (process.env.NODE_ENV !== 'development' && !isHttps) {
    return new NextResponse(null, {
      status: 301,
      headers: {
        Location: `https://${req.headers.get('host')}`,
      },
    });
  }

  if (
    process.env.MAINTENANCE === 'true' &&
    req.nextUrl.pathname !== '/maintenance'
  ) {
    return new NextResponse(null, {
      status: 301,
      headers: {
        Location: `${isHttps ? 'https' : 'http'}://${req.headers.get(
          'host',
        )}/maintenance`,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
