import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTasks } from "@/hooks/useTask";
import { TaskFormData } from "@/types/types";
import { Button } from "@base-ui/react/button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function AddTaskForm() {
  const { dispatch } = useTasks();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>();
  const navigate = useNavigate();

  const handleAdd = (data: TaskFormData) => {
    dispatch({
      type: "ADD_TASK",
      payload: {
        title: data.title,
        description: data.description,
      },
    });
    reset({ title: "", description: "" });
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
          Add
        </Button>
      </div>
    </form>
  );
}
