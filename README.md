# CRM Test Automation Framework

This repository contains the end-to-end and API testing framework for the Employee Management CRM.
Built with **Playwright**, **TypeScript**, and fully containerized via **Docker**.

## 🚀 Setup & Prerequisites

1. Ensure you have the main CRM application running via Docker locally (`docker-compose up --build`).
2. Ensure you have Docker installed on your machine.

---

## 🐳 Running Tests in Docker (Recommended)

You can run the entire test suite completely isolated inside a Docker container:

```bash
docker-compose up --build
```

Test reports (`playwright-report` and `allure-results`) will be automatically synced to your host machine via Docker volumes.

---

## 💻 Running Tests Locally (Node.js)

1. Install dependencies: `npm install`
2. Install Playwright browsers: `npx playwright install`
3. Run all tests: `npm test`
4. Run UI only: `npm run test:ui`
5. Run API only: `npm run test:api`

---

## 📊 Viewing Reports

To generate and view Allure reports:

```bash
npm run report
```

---

## 🏗️ Architecture

- **API Tests:** Use standalone API Clients encapsulating requests and structural validations.
- **UI Tests:** Follow the strict Page Object Model (POM) pattern for maintainability. Avoid implicit sleeps; rely on Playwright's state auto-waiting.