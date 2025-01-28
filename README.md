# Charlotte Scripture Memory

Charlotte is a scripture memorization app that helps users adopt a systematic and spaced-repetition approach to learning Bible verses. The project is organized around React (front-end) and will eventually integrate with a backend and database for robust data persistence and user management.

## Table of Contents
- [Overview](#overview)
- [Roadmap & To-Do Items](#roadmap--to-do-items)
  - [1. Data Persistence & Database](#1-data-persistence--database)
  - [2. User Management & Authentication](#2-user-management--authentication)
  - [3. Domain & Configuration](#3-domain--configuration)
  - [4. Tutorials & Onboarding](#4-tutorials--onboarding)
  - [5. Mobile App & Monetization](#5-mobile-app--monetization)
  - [6. KJV Scripture Data](#6-kjv-scripture-data)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Currently, the application stores user data and verses in the browser's `localStorage`. As usage grows, we will introduce a proper database and expand feature support:
- Keep track of verse progress, scheduling, and user streaks.
- Provide tutorial material for new users.
- Eventually deploy as an iOS app with subscription-based features.

---

## Roadmap & To-Do Items

Below is the high-level product roadmap with to-do items inspired by the existing code and upcoming features.

### 1. Data Persistence & Database

- [ ] Research and select a suitable database solution (e.g., PostgreSQL, MySQL, or a cloud NoSQL service).
- [ ] Create a backend (could be Node.js, Go, or Python, depending on preference) to manage database interactions.
- [ ] Replace current `localStorage` usage with REST/GraphQL calls to persist:
  - User information (ID, streak, name, etc.).
  - Verse data (reference, text, translation, dateAdded, lastPracticed, etc.).
- [ ] Migrate existing verse logic (spaced repetition/bucket system) into the backend for consistency and security.

### 2. User Management & Authentication

- [ ] Implement secure user registration and login (JWT tokens, OAuth, etc.).
- [ ] Store user profiles, streak count, and lastPracticeDate in the database securely.
- [ ] Provide user profile editing and password change flows.
- [ ] Consider roles or admin privileges if future moderation or advanced features are required.

### 3. Domain & Configuration

- [ ] Acquire a custom domain name (e.g., "yourappdomain.com") and set up DNS.
- [ ] Configure hosting (Vercel, Netlify, AWS, etc.) for the front-end.
- [ ] Configure hosting or containerization (Docker) for the backend.

### 4. Tutorials & Onboarding

- [ ] Create an onboarding flow for new users (e.g., pop-up tooltips or guided instructions).
- [ ] Write quick-start tutorials:
  1. How to add a new verse.
  2. How to set up custom translations.
  3. How to practice verses daily.
- [ ] Add in-app hints or advanced tips (like how the spaced repetition criteria work).

### 5. Mobile App & Monetization

- [ ] Develop or adapt the front-end to React Native or another framework for an iOS app.
- [ ] Integrate payment and billing for subscriptions (e.g., Stripe, in-app purchases).
- [ ] Add user account sync so paid subscribers can unlock premium features across devices.
- [ ] Test app submission to the Apple App Store and maintain compliance with their guidelines.

### 6. KJV Scripture Data

- [ ] Obtain a complete King James Version text (public domain) and integrate it into the project.
- [ ] Replace the current "sample verses" with a full dataset to allow users to search across the entire KJV.
- [ ] Provide a set of recommended/popular verses (e.g., John 3:16, Romans 8:28, Proverbs 3:5-6) for newcomers.
- [ ] Add logic to help users easily discover and add these popular verses to their daily practice.

---

## Getting Started

1. **Installation**
   - Clone the repo, then install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```
2. **Explore the Code**
   - Check out the core logic in "src/App.tsx" and "src/components."
   - Review "DailyPractice" for how verses are scheduled and tested.

3. **Contributing**
   - Before opening a pull request, run linting:
     ```bash
     npm run lint
     ```
   - Discuss major changes via GitHub Issues or Slack to keep the design consistent.

---

## Contributing

We welcome contributions! Whether it's fixing a bug, implementing a feature, or writing documentation, please open an issue or pull request with your suggestions.

## License

MIT License. See [LICENSE](LICENSE) for details.

---

*Thank you for your interest in Charlotte Scripture Memory! We hope this roadmap helps everyone stay organized as the project evolves.*
