# HTTP Caching: Client–Backend Alignment

## Overview of the Mobile (Client) Implementation

### Where it lives
- **Base HTTP client:** `services/httpClient.ts`
- **GET with cache:** `httpClient.get(path, config)` where `config` can include cache options.

### What the client sends (GET only)

When a GET request is made **with** cache options, the client adds these **request** headers:

| Header             | When sent              | Example value        | Purpose |
|--------------------|------------------------|----------------------|--------|
| `X-Cache-TTL`      | Always when caching    | `"3600"`             | Desired cache lifetime in **seconds** (e.g. 3600 = 1 hour). Backend can use this to set `Cache-Control` max-age on the response. |
| `Cache-Control`     | Always when caching    | `max-age=3600`       | Standard hint: client is willing to use a response cached for this many seconds. |
| `If-None-Match`     | Only if client has ETag | `"\"abc123\""`      | Conditional GET: if the current resource ETag equals this, backend may respond **304 Not Modified** (no body). |
| `If-Modified-Since` | Only if client has date | `Wed, 21 Oct 2025 07:28:00 GMT` | Conditional GET: if resource wasn’t modified since this date, backend may respond **304 Not Modified** (no body). |

- Cache options are **per request**: `cacheTtlSeconds`, and optionally `etag` and `lastModified`.
- If only `etag` or `lastModified` is set (no `cacheTtlSeconds`), the client still sends `X-Cache-TTL` and `Cache-Control` with a default of **3600** (1 hour).
- **No** cache headers are sent for POST/PUT/PATCH/DELETE; only GET supports them.

### What the client expects from the backend (response headers)

So that the client (and any standard HTTP caches) can cache and revalidate correctly:

| Header            | Required | Example value                         | Purpose |
|-------------------|----------|---------------------------------------|--------|
| `Cache-Control`   | Recommended | `private, max-age=3600`            | TTL in seconds; `private` = not for shared proxies. |
| `ETag`            | Optional | `"abc123"` or `W/"abc123"`            | Opaque version id; client will send it back as `If-None-Match` on next request. |
| `Last-Modified`   | Optional | `Wed, 21 Oct 2025 07:28:00 GMT`       | Client may send it back as `If-Modified-Since`. |
| `Expires`         | Optional | `Thu, 22 Oct 2025 08:28:00 GMT`        | Legacy fallback; prefer `Cache-Control` when possible. |

- **304 Not Modified:** When the client sends `If-None-Match` or `If-Modified-Since`, the backend may respond with **304** and **no body** when the resource is unchanged. The client will then use its cached copy.

### Client usage examples

```ts
// 1 hour cache (default)
httpClient.get('/customer/services/categories', { cacheTtlSeconds: 3600 });

// 30 minutes
httpClient.get('/some/path', { cacheTtlSeconds: 30 * 60 });

// Conditional request (client had previous ETag)
httpClient.get('/some/path', { cacheTtlSeconds: 3600, etag: '"abc123"' });
```

### Exported constants (for alignment)

- **Header names:** `CACHE_HEADERS.X_CACHE_TTL`, `CACHE_HEADERS.CACHE_CONTROL`, `CACHE_HEADERS.IF_NONE_MATCH`, `CACHE_HEADERS.IF_MODIFIED_SINCE`
- **Default TTL:** `CACHE_TTL_1H = 3600` (seconds)

---

## Backend alignment prompt (copy below)

Use the following prompt when implementing or documenting the backend so it aligns with this client.

---

**PROMPT START**

Implement HTTP caching for **GET** endpoints so they align with our mobile client.

**Request headers the client may send (GET only):**

- **`X-Cache-TTL`** (string): Desired cache lifetime in **seconds** (e.g. `"3600"` = 1 hour). Use this to decide `Cache-Control` max-age on the response (you may cap or ignore it for security/load).
- **`Cache-Control`** (string): e.g. `max-age=3600`. Client hint; you can mirror or derive your response `Cache-Control` from `X-Cache-TTL`.
- **`If-None-Match`** (string): ETag value from a previous response. If the current resource’s ETag equals this, respond with **304 Not Modified** and no body.
- **`If-Modified-Since`** (string): HTTP date from a previous `Last-Modified`. If the resource was not modified after this date, respond with **304 Not Modified** and no body.

**Response headers the backend should set (for GET endpoints that support caching):**

- **`Cache-Control`**: e.g. `private, max-age=3600` (use `X-Cache-TTL` from the request or a default, e.g. 3600).
- **`ETag`**: Strong or weak ETag (e.g. `"abc123"` or `W/"abc123"`) so the client can send `If-None-Match` on the next request.
- **`Last-Modified`**: HTTP-date of last modification, so the client can send `If-Modified-Since` on the next request.
- **`Expires`** (optional): HTTP-date when the response is considered stale (legacy fallback).

**Behavior:**

1. For GET requests that support caching:  
   - Read `X-Cache-TTL` (and optionally `Cache-Control`) to decide response TTL.  
   - Set `Cache-Control`, and optionally `ETag` and `Last-Modified` (and `Expires`), on the response.

2. Conditional GETs:  
   - If the client sends `If-None-Match`: compare to the current resource ETag; if they match, respond **304 Not Modified** (no body).  
   - If the client sends `If-Modified-Since`: compare to the resource’s last-modified time; if not modified since that date, respond **304 Not Modified** (no body).  
   - When returning 304, still send `Cache-Control`, `ETag`, and `Last-Modified` (and optionally `Expires`) so the client can continue to cache and revalidate.

3. Do **not** apply caching semantics to non-GET methods (POST, PUT, PATCH, DELETE); the client does not send cache headers for those.

Implement the above so the mobile app’s GET requests with cache TTL (e.g. 1 hour) and optional conditional headers work correctly with your responses and 304s.

**PROMPT END**

---
