# Security

## Production Checklist

Before deploying to production, ensure:

1. **Admin credentials** – Set `ADMIN_USERNAME`, `ADMIN_PASSWORD` (min 12 chars), and `ADMIN_SECRET` (min 32 chars) in your environment. Never use defaults in production.

2. **JWT / Admin secret** – Set `JWT_SECRET` or `ADMIN_SECRET` to a cryptographically random string. Generate with: `openssl rand -hex 32`

3. **IndexNow** – If you use the IndexNow API, set `INDEXNOW_SECRET` and pass it as `?secret=...` when calling the endpoint. In production, this is required.

4. **Debug endpoints** – `/api/debug-env` is disabled in production automatically.

5. **Rate limiting** – Contact form (5/min) and chatbot (20/min) are rate-limited per IP. Consider Upstash Redis for stricter limits across serverless instances.

## Security Measures in Place

- **Admin auth** – Admin routes require valid session (admin-token cookie)
- **API protection** – `/api/admin/posts`, `/api/admin/generate-blog`, etc. require admin session
- **Security headers** – X-Frame-Options, HSTS, CSP, X-Content-Type-Options, Referrer-Policy
- **Input validation** – Contact form validates and limits field lengths
- **No hardcoded secrets** – Admin credentials and secrets come from environment variables
