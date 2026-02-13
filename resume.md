# Project Status Resume: FindWhats (Financial Assistant via WhatsApp)

## Overview
FindWhats is a personal finance tracker that allows users to manage expenses and goals through WhatsApp messages using natural language. It features a Next.js web dashboard for visualization and an intelligent backend that parses conversational input.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL (Neon) with Drizzle ORM
- **Authentication**: Better Auth
- **Styling**: TailwindCSS, DaisyUI
- **Integrations**: 
  - **AI/LLM**: OpenRouter (DeepSeek Model) for intent parsing
  - **Messaging**: Evolution API (WhatsApp)
  - **Payments**: Stripe (Schema support)

## Implemented Features

### 1. Core Logic & Backend (The "Brain")
- **Natural Language Processing (LLM Service)**
  - Integrated `LLMService` using OpenRouter/DeepSeek.
  - Parsing capability for specific user intents:
    - `add_expense`: Extracts category and amount.
    - `remove_last_expense`: Identifies deletion requests.
    - `set_goal`: Extracts goal name and target amount.
    - `view_goals`: Identifies requests to view status.
  - Confidence scoring and fallback handling for unknown intents.

- **WhatsApp Integration**
  - `WhatsAppService` implementing `EvolutionWhatsAppService`.
  - Webhook endpoint (`/api/v1/webhooks/whatsapp`) to receive incoming messages.
  - Basic user verification (phone number matching).
  - Message sending capability.

- **Business Logic Layer (Clean Architecture)**
  - **Use Cases**: 
    - `ProcessWhatsAppMessageUseCase`: Orchestrates the flow from Message -> LLM Parse -> DB Action -> WhatsApp Reply.
    - `AddExpenseUseCase`: (Implied/Started) Logic to persist expenses.
    - `SetGoalUseCase`: (Implied/Started) Logic to persist goals.

- **Data Model**
  - **Users**: Extended user table with phone number verification.
  - **Expenses**: Tracking amount, category, and timestamps.
  - **Goals**: Tracking target amount and progress.
  - **Subscriptions**: Stripe integration schema (`subscriptions` table).

### 2. Frontend & Dashboard
- **Landing Page**
  - Complete modular sections: Hero, Features, Pricing, Testimonials, CTA.
  - Responsive layout.

- **User Dashboard**
  - **Layout**: Sidebar navigation and main content area.
  - **Components (UI)**:
    - `ExpenseGraph`: Visual trend analysis (currently using specific mock data).
    - `ExpenseList`: Transaction history list (currently using mock data).
    - `GoalsTracker`: Progress circles for financial goals (currently using mock data).
  
- **Authentication**
  - Structure for Sign-up and Sign-in pages established.

## Pending / In-Progress
- **Frontend-Backend Connection**: Dashboard components are currently rendering mock data and need to be connected to the Drizzle/DB layer to show real user data.
- **Webhook Queue**: The WhatsApp webhook uses an in-memory queue which should be replaced with a persistent queue (Redis/Bull) for production.
- **Auth Flow**: Full end-to-end testing of the Better Auth integration with the frontend.

## Directory Structure Highlights
- `/app/_db`: Database schema and migrations.
- `/app/services`: External service integrations (LLM, WhatsApp).
- `/app/use-cases`: Application business rules.
- `/app/api/v1`: REST endpoints.
- `/app/dashboard`: Protected user interface.
