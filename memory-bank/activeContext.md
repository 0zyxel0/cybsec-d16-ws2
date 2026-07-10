# Active Context - TechNova SOC Analyst Simulator

## Current Status
We have reviewed the core application structure in `index.html`. It contains a single-page interactive application using Vue 3 and Tailwind CSS.
We are now initializing the Memory Bank to document the system patterns, technology stack, project goals, and future directions.

## Recent Changes
- Initialized `memory-bank/projectbrief.md` defining project goals and scope.
- Initialized `memory-bank/productContext.md` detailing the classroom simulator UX and core training outcomes.

## Next Steps
- Complete the initialization of the Memory Bank files (`systemPatterns.md`, `techContext.md`, and `progress.md`).
- Ensure all files are thoroughly mapped to the current implementation state.

## Core Decisions & Considerations
- **Architecture**: Single HTML page (`index.html`) using CDN-loaded libraries for lightweight execution and no-build deployment.
- **Answer Validation Strategy**: Handled entirely on the client-side within Vue `computed` property (`ticketValidation`), checking input fields against expected answers using strict case-insensitive trimming.
- **Print Optimization**: A custom certificate uses Tailwind's `@media print` utilities to hide interactive elements and render a clean award printable document.
