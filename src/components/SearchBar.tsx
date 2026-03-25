import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchBar({
  setValue,
  value,
}: {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  setValue: Function;
  value: string;
}) {
  return (
    <form>
      <div className="relative w-full">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          type="text"
          placeholder="Search tasks..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="pl-9 focus-visible:ring-tresata-color transition-all rounded-sm"
          aria-label="Search tasks"
        />
      </div>
    </form>
  );
}
