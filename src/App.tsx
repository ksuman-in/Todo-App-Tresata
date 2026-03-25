import Header from "@/components/Header";
import { Loader2 } from "lucide-react";
import { lazy, Suspense, useMemo } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

const TaskListPage = lazy(() => import("@/pages/TaskListPage"));
const AddTaskPage = lazy(() => import("@/pages/AddTaskForm"));
const EditTaskForm = lazy(() => import("@/pages/EditTaskForm"));

const PageSkeleton = () => (
  <div className="flex justify-center items-center py-20 text-muted-foreground">
    <Loader2 className="w-8 h-8 animate-spin text-tresata-color" />
    <span className="ml-2">Loading view...</span>
  </div>
);

export default function App() {
  const { pathname } = useLocation();
  const headerTitle = useMemo(() => {
    if (pathname === "/add") {
      return { isArrow: true, title: "Add Task" };
    } else if (pathname === "/edit") {
      return { isArrow: true, title: "Edit Task" };
    } else {
      return { isArrow: false, title: "TO-DO APP" };
    }
  }, [pathname]);
  console.log({ headerTitle }, { pathname });
  return (
    <div className="relative max-w-xl mx-auto max-h-svh bg-white text-foreground">
      <Header headerTitle={headerTitle} />

      <main className="p-4 relative h-[calc(100svh-64px)] overflow-auto">
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<TaskListPage />} />
            <Route path="/add" element={<AddTaskPage />} />
            <Route path="/edit" element={<EditTaskForm />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}
