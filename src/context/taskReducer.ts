import { Task, TaskAction } from "@/types/types";
import { type } from "@/utils/constant";

export const taskReducer = (state: Task[], action: TaskAction): Task[] => {
  switch (action.type) {
    case "ADD_TASK": {
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: action.payload.title,
        description: action.payload.description,
        completed: false,
        createdAt: Date.now(),
        actionType: action.payload.actionType || "in-progress",
      };

      return [newTask, ...state];
    }

    case "EDIT_TASK": {
      return state.map((task) => {
        if (task.id === action.payload.id) {
          const completed = action.payload.actionType === type.COMPLETED;
          return {
            ...task,
            title: action.payload.title,
            description: action.payload.description,
            actionType: action.payload.actionType,
            completed: completed,
          };
        }
        return task;
      });
    }

    case "DELETE_TASK": {
      return state.filter((task) => task.id !== action.payload);
    }

    default:
      return state;
  }
};
