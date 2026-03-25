import { Accordion } from "@/components/ui/accordion";
import { Task } from "@/types/types";
import { AccordionListDetails } from "./AccordionListDetails";
import { getActionTypeList } from "@/utils/helper";
import { type } from "@/utils/constant";

export function TaskItems({ tasks }: { tasks: Task[] }) {
  const taskType = [
    {
      header: "In Progress",
      data: getActionTypeList({ tasks, type: type.IN_PROGRESS }),
      id: type.IN_PROGRESS,
    },
    {
      header: "Pending",
      data: getActionTypeList({ tasks, type: type.PENDING }),
      id: type.PENDING,
    },
    {
      header: "Completed",
      data: getActionTypeList({ tasks, type: type.COMPLETED }),
      id: type.COMPLETED,
    },
  ];
  return (
    <Accordion className="flex gap-2 pt-2">
      {taskType?.map((task) => {
        return (
          <AccordionListDetails
            listDetails={task.data}
            header={task.header}
            key={task.id}
            id={task.id}
          />
        );
      })}
    </Accordion>
  );
}
