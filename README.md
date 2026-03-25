# Task Management Application - Tresata Assessment

A robust, simplified task management application built as part of the Sr. Front-end Engineer assessment for Tresata India. This project translates the provided Figma design into a fully functional, responsive, and performant React application.

**Live Demo:** [Insert Deployment Link Here]

## 🚀 Tech Stack

* **Framework:** React 18 (Bootstrapped with Vite for fast HMR and optimized builds)
* **Language:** strict TypeScript
* **Styling:** Tailwind CSS + shadcn/ui (Radix UI primitives for accessibility)
* **State Management:** React Context API + `useReducer`
* **Routing:** React Router DOM (v6)

## ✨ Key Features & Requirements Met

* **Full CRUD Operations:** Create, Read, Update, and Delete tasks efficiently.
* **Status Management:** Visually distinct completed vs. incomplete tasks.
* **Data Persistence:** Tasks are seamlessly synchronized with `localStorage` to survive page reloads.
* **Search Functionality:** Real-time search with a `300ms` debounce to optimize performance.
* **Brand Integration:** Custom Tailwind configuration utilizing the Tresata brand color (`tresata-color`) for cohesive UI/UX.

## 🧠 Architectural & Design Decisions

As a senior-level implementation, several specific design decisions were made to prioritize scalability, performance, and user experience:

1. **URL-Driven State for Filtering & Search:**
   Instead of storing the active filter and search query in local React state. This makes the application views bookmarkable, shareable, and refresh-safe, which is a modern UX best practice.

2. **State Management (`useReducer` vs Redux):**
   While Redux was considered, React's native `useReducer` combined with the Context API was chosen. It provides the same predictable, action-dispatch pattern and unidirectional data flow as Redux without the unnecessary boilerplate and bundle-size bloat for an application of this specific scope. 

3. **Debounced Search Input:**
   A custom `useDebounce` hook was implemented for the search bar. This prevents the application from executing heavy filtering logic or triggering rapid URL updates on every single keystroke, improving input responsiveness.

4. **Code Splitting & Lazy Loading:**
   React Router routes are wrapped in React's `lazy` and `Suspense`. The "Add/Edit Task" views are bundled separately and loaded on-demand, optimizing the initial Time-to-Interactive (TTI) metrics.

5. **Accessibility (a11y) & Forms:**
   All forms utilize semantic `<form>` tags with `type="submit"` buttons to ensure standard keyboard navigation (e.g., "Enter" to submit) works out of the box. UI components are built on Radix UI primitives ensuring ARIA compliance, proper focus trapping, and screen-reader support.

## 🛠️ Installation & Setup

To run this project locally, ensure you have Node.js (v18+) installed.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ksuman-in/Todo-App-Tresata.git
   cd todo-app-tresata