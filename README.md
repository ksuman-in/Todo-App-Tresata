# Task Management Application - Tresata Assessment

A robust, performant, and scalable task management application built as part of the Senior Front-end Engineer assessment for Tresata. This application translates complex state management requirements into a seamless, accessible, and responsive user experience.

🌍 **Live Demo:** [https://todo-app-tresata.vercel.app/](https://todo-app-tresata.vercel.app/)  
💻 **Repository:** [https://github.com/ksuman-in/Todo-App-Tresata](https://github.com/ksuman-in/Todo-App-Tresata)

---

## 🚀 Tech Stack

- **Core:** React 18, strict TypeScript, Vite
- **Routing:** React Router DOM (v6)
- **State Management:** React Context API + `useReducer`
- **Styling & UI:** Tailwind CSS, shadcn/ui, Radix UI Primitives, Lucide Icons
- **Forms & Validation:** `react-hook-form`, `react-select`
- **Deployment:** Vercel

---

## ✨ Key Features

- **Complete Task Lifecycle:** Create, read, update, and delete tasks with instant UI feedback.
- **Persistent Storage:** Seamless synchronization with `localStorage` ensures data survives page reloads.
- **Debounced Search:** Custom `useDebounce` implementation prevents UI blocking and rapid re-renders during text input.
- **Dynamic Client-Side Filtering:** The search functionality is handled instantly in the UI without risking data loss or unnecessary API-like calls.
- **Accessible UI:** Custom dropdowns and form inputs built on top of Radix UI to ensure full ARIA compliance and keyboard navigation.
- **Responsive Design:** Mobile-first layout tailored to the Tresata brand design system (`tresata-color`).

---

## 🧠 Architectural Decisions

To demonstrate senior-level engineering practices, several specific architectural patterns were implemented:

### 1. Derived State vs. State Mutation
Instead of modifying the global task array during search operations (which risks permanently overwriting local storage data), search results are handled purely as **derived state** at the component level. The `useReducer` strictly manages the source of truth, while the UI dynamically filters the visible tasks based on the active search query.

### 2. Immutable Reducer with Discriminated Unions
The global state is managed by a heavily typed `taskReducer`. Action payloads use TypeScript Discriminated Unions to guarantee type safety across transitions, ensuring that properties are never accessed before their specific action types are verified. All state updates are strictly immutable.

### 3. Code Splitting & TTI Optimization
To ensure a rapid Time-to-Interactive (TTI), React Router routes are wrapped in `React.lazy` and `Suspense`. The application is split into highly optimized chunks at build time, ensuring users only download the specific JavaScript necessary for the active route (e.g., the Add/Edit form logic is decoupled from the main list view).

### 4. Crash Resilience & "Bouncer" Logic
Dynamic routes (like the Edit Task view) implement proactive mounting checks. If a user performs a hard refresh on an edit route causing the location state to clear, the component safely intercepts the `undefined` state and redirects to the home view, preventing runtime crashes.

---

## 🛠️ Local Development Setup

To run this project locally, ensure you have Node.js (v18+) installed.

**1. Clone the repository:**
```bash
git clone [https://github.com/ksuman-in/Todo-App-Tresata.git](https://github.com/ksuman-in/Todo-App-Tresata.git)
cd Todo-App-Tresata