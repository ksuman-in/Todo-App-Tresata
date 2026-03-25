import { SearchBar } from "@/components/SearchBar";
import { TaskItems } from "@/components/TaskItems";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/useDebounce";
import { useTasks } from "@/hooks/useTask";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TaskListPage() {
  const { tasks } = useTasks();
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  const debouncedQuery = useDebounce(value, 300);
  const searchValue = tasks?.filter((task) => {
    if (
      task.title?.includes(debouncedQuery) ||
      task.description?.includes(debouncedQuery)
    ) {
      return task;
    }
  });
  return (
    <>
      <SearchBar setValue={setValue} value={value} />

      <div className="border-none pb-4 bg-card shadow-sm max-h-svh overflow-auto">
        <TaskItems tasks={searchValue} />

        <div className="pt-10 text-sm text-muted-foreground">
          Showing {searchValue.length} tasks
        </div>
      </div>
      <div className="absolute bg-tresata-color bottom-4 right-4 h-16 w-16 flex justify-center items-center rounded-full border-black border">
        <Button
          className="flex items-center justify-center"
          onClick={() => navigate("/add")}
        >
          <Plus className="w-5 h-5 text-white" aria-hidden="true" />
        </Button>
      </div>
    </>
  );
}
