# Technical Context - TechNova SOC Analyst Simulator

## Technologies Used

1. **Core Language & Markup**:
   - HTML5 / CSS3 / JavaScript (ES6+ / Node.js)

2. **Frontend Libraries & Frameworks (CDN Delivered)**:
   - **Vue 3 (Global Build)**: Loaded via `unpkg.com/vue@3/dist/vue.global.js`. Manages reactive states, dynamically calculated user scores, input forms, conditional tabs, conditional modals, and clip-board integrations.
   - **Tailwind CSS (Play CDN)**: Loaded via `cdn.tailwindcss.com`. Supplies quick utilities, dark theme controls, responsive flex/grid layouts, cyberpunk coloring palettes, and standard animations (`pulse`, `bounce`, `ping`).

3. **Backend Stack (Node.js)**:
   - **Express**: Micro-web framework handling routing and file serving.
   - **Axios**: HTTP client used to interface securely with NocoDB table REST APIs.
   - **Dotenv**: Loads environment variables from `.env` files.
   - **Cors**: Enables Cross-Origin Resource Sharing.

4. **Containerization & Orchestration**:
   - **Docker Alpine Image**: Utilizes a highly optimized, lightweight base image (`node:18-alpine`) to bundle client and server configurations.
   - **Docker Compose**: Orchestration config (`docker-compose.yml`) enabling immediate deployment, port mapping, and automatic environment variable injection (binding `.env` to container environments).

5. **External Typography**:
   - Google Fonts (Inter & Fira Code)

## Technical Constraints

- **Secure Environment Variable Ingestion**: The database tokens and REST API endpoints are stored on the server side to protect sensitive credentials from being leaked to students on client browsers.
- **NocoDB Schema Mapping**:
  - `EmailAddress` (Text): The student's entered email address.
  - `StudentName` (Text): The student's name.
  - `SessionSet` (Text): Parsed from url parameter `SessionSet` (e.g. `?SessionSet=LabSectionA`).
  - `Answer` (JSON): Compound JSON object grouping the `score`, `reportDate`, `customEmail` (emailDraft), and all associated `ticket` answer entries.
- **NocoDB Persistence Variables**:
  - `NOCODB_API_URL`: The exact table API POST endpoint.
  - `NOCODB_TOKEN`: The authentication bearer token (`xc-token`).
- **Resilient Offline Fallback**: If NocoDB credentials are not supplied, the backend logs the payload locally in JSON format to the server console and sends a success status back to the user interface, maintaining absolute simulator uptime during offline scenarios.
- **Offline / Isolated Execution**: Since it depends on external CDNs for Vue and Tailwind, an active internet connection is required in a browser environment, but no backend API requests are made.
- **Answer Storage**: Progress is kept in memory during the browser session. Refreshing the browser resets the simulator state.
- **Clipboard Management**: Uses a custom DOM textarea-creation fallback mechanism (`document.execCommand('copy')`) to ensure high compatibility with various iframe or sandboxed container environments where standard `navigator.clipboard` APIs might be blocked or restricted.

## Workspace Conventions

- All interface details, styles, dynamic script handlers, and media layout assets are consolidated directly inside `index.html`.
- Custom styles for scrollbars and print settings reside in an embedded `<style>` block in the `<head>` of the document.
- The Vue app is mounted inside a container with `<div id="app" v-cloak>` to prevent raw interpolation curly braces from displaying during load.
