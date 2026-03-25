import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTasks } from "@/hooks/useTask";
import { Button } from "@base-ui/react/button";
import { useEffect, useState, ElementType } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { TaskFormData } from "@/types/types";
import { Circle } from "lucide-react";
import { type } from "@/utils/constant";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

interface TaskOption {
  id: string;
  value: string;
  label: string;
  icon: ElementType;
  color: string;
}

const options: TaskOption[] = [
  {
    id: type.IN_PROGRESS,
    value: type.IN_PROGRESS,
    label: "In Progress",
    icon: Circle,
    color: "text-orange-500 fill-orange-500",
  },
  {
    id: type.PENDING,
    value: type.PENDING,
    label: "Pending",
    icon: Circle,
    color: "text-gray-500 fill-gray-500",
  },
  {
    id: type.COMPLETED,
    value: type.COMPLETED,
    label: "Completed",
    icon: Circle,
    color: "text-green-500 fill-green-500",
  },
];

const formatOptionLabel = ({ label, icon: Icon, color }: TaskOption) => {
  return (
    <div className="flex items-center gap-2">
      <Icon className={`size-3 text-muted-foreground ${color}`} />
      <span>{label}</span>
    </div>
  );
};

export default function EditTaskForm() {
  useDocumentTitle("Edit Task");
  const [actionType, setActionType] = useState<string | null>("");
  const { dispatch, tasks } = useTasks();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const targetId = location?.state?.id;
    if (!targetId) {
      navigate("/");
      return;
    }

    const editTask = tasks.find((task) => task.id === targetId);

    if (!editTask) {
      navigate("/");
      return;
    }

    if (editTask.actionType) {
      const selectedValue = options.find(
        (task) => task.value === editTask.actionType,
      );
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (selectedValue) setActionType(selectedValue.value);
    }

    reset({ title: editTask.title, description: editTask.description });
  }, [location?.state?.id, reset, tasks, navigate]);

  const handleAdd = (data: TaskFormData) => {
    dispatch({
      type: "EDIT_TASK",
      payload: {
        id: location.state.id,
        title: data.title,
        description: data.description,
        actionType: actionType || type.IN_PROGRESS,
      },
    });
    reset();
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(handleAdd)}>
      <div className="flex gap-3 flex-col">
        <Input
          className="focus-visible:ring-tresata-color transition-all rounded-sm"
          placeholder="Enter the title"
          {...register("title", {
            required: "Title is required",
          })}
        />
        {errors.title && (
          <p className="text-red-500 text-sm m-0">{errors.title.message}</p>
        )}
        <Textarea
          className="focus-visible:ring-tresata-color transition-all rounded-sm"
          placeholder="Enter the description"
          {...register("description", {
            required: "Description is required",
          })}
        />
        {errors.description && (
          <p className="text-red-500 text-sm m-0">
            {errors.description.message}
          </p>
        )}
        <Select
          className="focus-visible:ring-tresata-color transition-all rounded-sm"
          value={options.find((opt) => opt.value === actionType) || null}
          onChange={(newValue) => {
            if (newValue) {
              setActionType(newValue.value);
            }
          }}
          options={options}
          formatOptionLabel={formatOptionLabel}
        />
      </div>
      <div className="flex justify-between mt-8">
        <Button
          type="button"
          className="w-24 p-2 border-tresata-color rounded-sm border text-tresata-color"
          onClick={() => navigate("/")}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="w-24 p-2 rounded-sm border bg-tresata-color text-white"
        >
          Update
        </Button>
      </div>
    </form>
  );
}
