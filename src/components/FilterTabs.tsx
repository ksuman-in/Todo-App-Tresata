// src/components/FilterTabs.tsx
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function FilterTabs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get("filter") || "all";

  const setFilter = (value: string) => {
    setSearchParams({ filter: value });
  };

  const filters = ["all", "completed", "incomplete"];

  return (
    <div className="flex space-x-2 border-b pb-4 mb-4">
      {filters.map((f) => (
        <Button
          key={f}
          variant={currentFilter === f ? "default" : "ghost"}
          onClick={() => setFilter(f)}
          className="capitalize transition-all"
        >
          {f}
        </Button>
      ))}
    </div>
  );
}
