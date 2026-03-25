export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
  actionType: string;
}

export type FilterType = "all" | "completed" | "incomplete";

export type TaskAction =
  | {
      type: "ADD_TASK";
      payload: {
        title: string;
        description: string;
        id?: number;
        actionType?: string;
      };
    }
  | {
      type: "EDIT_TASK";
      payload: {
        id: string;
        title: string;
        description: string;
        actionType: string;
      };
    }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "LOAD_TASKS"; payload: string };

export interface TaskFormData {
  title: string;
  description: string;
}
