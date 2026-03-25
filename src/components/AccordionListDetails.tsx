import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Task } from "@/types/types";
import { formatCustomDate } from "@/utils/helper";
import { Button } from "./ui/button";
import { Circle, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "@/hooks/useTask";
import { type } from "@/utils/constant";

type AccordionListDetailsType = {
  listDetails: Task[];
  header: string;
  id: string;
};

export function AccordionListDetails({
  listDetails,
  header,
  id,
}: AccordionListDetailsType) {
  const navigate = useNavigate();
  const { dispatch } = useTasks();
  const handleEdit = (id: string) => {
    navigate("/edit", {
      state: {
        id,
      },
    });
  };
  const handleDelete = (id: string) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  };
  return (
    <AccordionItem value={id}>
      <AccordionTrigger className="bg-gray-200 p-2">
        {header} {listDetails?.length > 0 && `(${listDetails?.length})`}
      </AccordionTrigger>
      {listDetails?.length ? (
        listDetails?.map((item) => {
          const { title, description, createdAt, id, actionType, completed } =
            item;
          const titleFirst = title?.charAt(0)?.toUpperCase();
          const date = formatCustomDate(createdAt);
          return (
            <AccordionContent
              key={id}
              className="flex max-h-screen bg-gray-100 w-full p-2 mt-2 rounded-sm overflow-y-scroll"
            >
              <div className="h-10 w-10 flex justify-center items-center rounded-full border border-tresata-color">
                {titleFirst}
              </div>
              <div className="group pl-2 w-full">
                <div className="flex justify-between">
                  <h4 className="text-base">{title}</h4>
                  <div className="flex gap-2 items-center">
                    {actionType === type.IN_PROGRESS && (
                      <Circle className="size-3 fill-orange-400 text-orange-400" />
                    )}
                    {actionType === type.PENDING && (
                      <Circle className="size-3 fill-gray-400 text-gray-400" />
                    )}
                    {actionType === type.COMPLETED && (
                      <Circle className="size-3 fill-green-400 text-green-400" />
                    )}
                    {header}
                  </div>
                </div>
                <div className="pr-10">{description}</div>
                <div className="flex justify-between items-center">
                  <div className="text-black italic text-xs">{date}</div>
                  <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {!completed && (
                      <Button onClick={() => handleEdit(id)}>
                        <Pencil className="text-tresata-color" />
                      </Button>
                    )}
                    <Button onClick={() => handleDelete(id)}>
                      <Trash2 className="text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            </AccordionContent>
          );
        })
      ) : (
        <>
          <AccordionContent className="flex bg-gray-100 w-full p-2 mt-2 rounded-sm">
            No Data for {header}
          </AccordionContent>
        </>
      )}
    </AccordionItem>
  );
}
