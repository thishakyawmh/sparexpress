# SpareXpress

SpareXpress is a static frontend prototype for browsing vehicle spare-part categories and submitting a sample part request.

## Current scope

- Static HTML pages for the home page, manufacturer categories, part search, account mock-up, contact, and part requests.
- Shared CSS and vanilla JavaScript for dropdowns, category filtering, navigation, loading screen, and testimonial carousel.
- No server-side API or database is included in this repository.

## Run locally

Open `index.html` in a browser, or serve the repository root with a local static server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Quality checks

The project uses Node's built-in test runner; no npm dependencies are required:

```bash
node --check script.js
node --test
```

## Security and production limitations

This repository is a frontend-only prototype. The account page is a visual mock-up, and the part-request form has no backend endpoint. Form submissions, authentication, payments, user accounts, inventory availability, and vehicle-part compatibility are **not** implemented as trusted server-side features.

Do not collect real passwords, payment information, or sensitive personal data with this prototype. Before production use, add a backend API, database, server-side authentication and authorization, input validation, file-upload controls, rate limiting, secure payment-provider integration, and server-side compatibility checks. Browser-side validation and UI controls are not security boundaries.

Third-party icons are loaded from the Font Awesome CDN. A production deployment should pin and self-host or integrity-protect third-party assets where appropriate.
