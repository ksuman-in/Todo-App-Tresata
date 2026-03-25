import { Task, TaskAction } from "@/types/types";

export const taskReducer = (state: Task[], action: TaskAction): Task[] => {
  const handlePayloadEdit = (state) => {
    let tempState = [...state];
    const { id, title, description, actionType } = action.payload;
    tempState = tempState.map((list) => {
      if (list.id === id) {
        list.title = title;
        list.description = description;
        list.actionType = actionType;
      }
      return list;
    });
    return tempState;
  };
  const handleSearch = (state) => {
    let tempState = [...state];
    const payload = action;
    tempState = tempState.filter((list) => {
      if (
        list?.title?.includes(payload) ||
        list?.description?.includes(payload)
      ) {
        return list;
      }
    });
    return payload ? tempState : state;
  };
  switch (action.type) {
    case "ADD_TASK":
      return [
        {
          id: crypto.randomUUID(),
          title: action.payload.title,
          description: action.payload.description,
          completed: false,
          createdAt: Date.now(),
          actionType: "in-progress",
        },
        ...state,
      ];
    case "EDIT_TASK":
      return handlePayloadEdit(state);
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);
    case "LOAD_TASKS":
      return handleSearch(state);
    default:
      return state;
  }
};
