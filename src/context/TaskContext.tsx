import React, { createContext, useReducer, useEffect, ReactNode } from "react";
import { Task, TaskAction } from "@/types/types";
import { taskReducer } from "@/context/taskReducer";

const LOCAL_STORAGE_KEY = "tresata_tasks";

const initTasks = (): Task[] => {
  try {
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error("Failed to parse tasks from local storage:", error);
    return [];
  }
};

interface TaskContextProps {
  tasks: Task[];
  dispatch: React.Dispatch<TaskAction>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const TaskContext = createContext<TaskContextProps | undefined>(
  undefined,
);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, dispatch] = useReducer(taskReducer, [], initTasks);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
