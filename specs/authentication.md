# Developer Specification: Authentication & Session Management

This document defines the authentication architecture, security controls, endpoints, and session management flow for the **Cyber Defender: Vulnerability Hunt** application.

---

## 1. Architectural Overview

The authentication system is designed with a secure, backend-proxied architecture. It bridges Nuxt 3's frontend routing/state with either a development mock or a production **NocoDB** student database, ensuring that sensitive integration tokens and credentials never touch the client-side bundle.

```
┌─────────────────┐             ┌─────────────────────┐             ┌─────────────────┐
│                 │  credentials│                     │   GET query │                 │
│  Client Browser ├────────────►│ Nuxt Server Engine  ├────────────►│  NocoDB Tables  │
│  (Login Form)   │◄────────────┤  (api/login.post)   │◄────────────┤ (Student DB)    │
│                 │  set-cookie │                     │   JSON recs │                 │
└────────┬────────┘             └──────────┬──────────┘             └─────────────────┘
         │                                 │
         │ fetch session                   │ validate
         ▼                                 ▼
┌─────────────────┐             ┌─────────────────────┐
│  Client Route   ├────────────►│ api/auth/session.get│
│   Middleware    │◄────────────┤ (Reads HttpOnly)    │
└─────────────────┘             └─────────────────────┘
```

---

## 2. Core Components

### 2.1 Client-Side Middleware (`app/middleware/auth.ts`)
The `auth` middleware protects the game's internal pages (e.g. `/game`, `/game/mission/*`) from unauthenticated access.

*   **Execution Location**: Runs exclusively on the client-side (`import.meta.server` checks bypass execution on the server to prevent unnecessary overhead/duplicate validations during initial render/hydration).
*   **Behavior**:
    1. Triggers an asynchronous request to `/api/auth/session`.
    2. If the response indicates the user is not authenticated (`session?.authenticated === false`), the user is immediately redirected to `/login`.
    3. If session validation fails (throwing an error), it logs the failure and redirects to `/login`.

### 2.2 Root Redirection Routing (`app/pages/index.vue`)
Acts as the dynamic entry-point and session-routing bridge for incoming traffic at the root URL `/`.

*   **Behavior**:
    *   Initiates an immediate on-mounted fetch request to the server session checker (`/api/auth/session`).
    *   If a valid session exists (`session.authenticated === true`), the client is redirected dynamically to `/game`.
    *   If unauthenticated or if the check fails, the user is forwarded to `/login`.

### 2.3 Agent Login Interface (`app/pages/login.vue`)
Houses the styled cyber-terminal login UI where users input access credentials.

*   **Middleware Configuration**: Bypasses global/default authentication checks by explicitly clearing active middleware (`definePageMeta({ middleware: [] })`) to avoid redirect loops.
*   **Behavior**:
    *   Displays a branded cybersecurity operations dashboard login interface.
    *   Leverages `useCybersecurityGameStore` to populate the state with authenticated student profiles (`store.setStudent()`) and triggers `store.startGame()` upon success.
    *   Communicates directly with `/api/login` and handles form submission, loading spinner states, and error alerts (e.g. invalid agent credentials).

### 2.4 Login Endpoint (`server/api/login.post.ts`)
Processes credentials submitted by the login form, handles communication with the NocoDB database (or falls back to mock authentication if environment variables are missing), and sets a secure HTTP-Only session cookie.

*   **Validation Rules**:
    *   Trims whitespace from student email.
    *   Ensures both `email` and `password` are present.
*   **Fallback Mode (Mock Login)**:
    *   If `NOCODB_BASE_URL` or `NOCODB_API_TOKEN` are not configured in environment variables or Nuxt configuration, it logs a warning and performs a mock login for development.
    *   Creates a mock student profile (`Junior Security Analyst`, Student Number `20260001`, Classroom `MockClass101`).
*   **NocoDB Production Mode**:
    *   Searches the target table (`mg6ra8dkmyrqlbx` - Students table) with a secure query filter:
        `where=(Email,eq,email)~and(Password,eq,password)`
    *   If no matching student is found, throws a `401 Unauthorized` error.
    *   Extracts necessary fields and maps classroom information (supporting both array and object formats returned by NocoDB's M2M fields).
*   **Session Exclusion Policy**:
    *   **CRITICAL**: Under no circumstances should the following data be included in the cookie:
        *   Passwords (raw or hashed)
        *   Reset tokens
        *   Uploaded files (e.g., resumes, document lists)
        *   Raw NocoDB database metadata/records
    *   Only public-facing profile markers (e.g., student ID, email, names, student number, and classroom IDs) are serialized.

### 2.5 Session Endpoint (`server/api/auth/session.get.ts`)
Retrieves and validates the session cookie from the client's request headers.

*   **Behavior**:
    1. Looks up the cookie named `sessionCookie`.
    2. If missing, returns `{ authenticated: false, student: null }`.
    3. Attempts to parse the JSON content of the cookie. If parsing fails or the cookie is malformed (missing critical properties like `id`), logs an error and returns `{ authenticated: false, student: null }`.
    4. If valid, returns `{ authenticated: true, student: sessionData }`.

### 2.6 Logout Endpoint (`server/api/auth/logout.post.ts`)
Clears the user session on the server and requests deletion of the client's cookie.

*   **Behavior**:
    1. Calls `deleteCookie` for `sessionCookie` with a path of `/`.
    2. Returns `{ success: true }`.

---

## 3. Cookie Configuration & Security Controls

To protect student sessions against Session Hijacking and Cross-Site Scripting (XSS) attacks, the `sessionCookie` is configured with strict security headers:

| Header Attribute | Value / Mode | Purpose |
| :--- | :--- | :--- |
| `httpOnly` | `true` | Prevents client-side scripts (JavaScript) from accessing the cookie, blocking potential token theft through XSS. |
| `secure` | `true` (in prod) | Ensures the cookie is only sent over encrypted HTTPS connections (set dynamically using `process.env.NODE_ENV === 'production'`). |
| `sameSite` | `lax` | Provides strong CSRF protection while still allowing top-level navigations from external URLs to send the cookie. |
| `maxAge` | `86400` seconds | Sets session lifetime to exactly 24 hours. |
| `path` | `/` | Scopes the cookie to the entire application. |

---

## 4. Data Transfer Objects (DTO)

### 4.1 Login Request Body
```json
{
  "email": "agent@metrotech.org",
  "password": "SecurePassword123"
}
```

### 4.2 Auth Session Payload (Serialized in Cookie & Returned by `/api/auth/session`)
```typescript
interface StudentSession {
  id: number;
  email: string;
  givenName: string;
  middlename?: string;
  familyName: string;
  studentNumber: string;
  classroom: string[]; // List of classroom IDs
}
```

### 4.3 Error Responses
In the event of verification or communication failure, HTTP standard status codes are returned:

*   **400 Bad Request**: Email or password missing.
*   **401 Unauthorized**: Invalid email or password credentials.
*   **500 Internal Server Error**: Database connection failed or remote table querying error.
