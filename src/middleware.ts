import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limiting configuration (in-memory for demo - use Redis in production)
const rateLimit = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100; // Max requests per window

// Blocked patterns for security
const BLOCKED_PATTERNS = [
  /\.\.\//,                    // Path traversal
  /<script/i,                  // XSS attempts
  /javascript:/i,              // JavaScript protocol
  /on\w+\s*=/i,               // Event handlers
  /union\s+select/i,          // SQL injection
  /exec\s*\(/i,               // Command execution
  /eval\s*\(/i,               // Eval injection
];

// Suspicious user agents
const BLOCKED_USER_AGENTS = [
  /sqlmap/i,
  /nikto/i,
  /nessus/i,
  /openvas/i,
  /w3af/i,
  /acunetix/i,
  /netsparker/i,
];

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
             request.headers.get('x-real-ip') ||
             'unknown';
  const userAgent = request.headers.get('user-agent') || '';
  const url = request.nextUrl.pathname + request.nextUrl.search;

  // 1. Block suspicious user agents (known scanning tools)
  for (const pattern of BLOCKED_USER_AGENTS) {
    if (pattern.test(userAgent)) {
      console.warn(`[SECURITY] Blocked scanner UA from ${ip}: ${userAgent}`);
      return new NextResponse('Forbidden', { status: 403 });
    }
  }

  // 2. Block malicious patterns in URL
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(url)) {
      console.warn(`[SECURITY] Blocked malicious URL from ${ip}: ${url}`);
      return new NextResponse('Bad Request', { status: 400 });
    }
  }

  // 3. Rate limiting
  const now = Date.now();
  const clientData = rateLimit.get(ip);

  if (clientData) {
    if (now - clientData.timestamp < RATE_LIMIT_WINDOW) {
      if (clientData.count >= MAX_REQUESTS) {
        console.warn(`[SECURITY] Rate limit exceeded for ${ip}`);
        return new NextResponse('Too Many Requests', {
          status: 429,
          headers: {
            'Retry-After': '60',
          },
        });
      }
      clientData.count++;
    } else {
      rateLimit.set(ip, { count: 1, timestamp: now });
    }
  } else {
    rateLimit.set(ip, { count: 1, timestamp: now });
  }

  // 4. Clean up old rate limit entries (prevent memory leak)
  if (rateLimit.size > 10000) {
    const cutoff = now - RATE_LIMIT_WINDOW;
    for (const [key, value] of rateLimit.entries()) {
      if (value.timestamp < cutoff) {
        rateLimit.delete(key);
      }
    }
  }

  // 5. Add additional security headers via middleware
  response.headers.set('X-Request-Id', crypto.randomUUID());
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // 6. Log request for audit trail (SOC 2 compliance)
  if (process.env.NODE_ENV === 'production') {
    console.log(JSON.stringify({
      timestamp: new Date().toISOString(),
      ip,
      method: request.method,
      path: request.nextUrl.pathname,
      userAgent: userAgent.substring(0, 200),
      requestId: response.headers.get('X-Request-Id'),
    }));
  }

  return response;
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
