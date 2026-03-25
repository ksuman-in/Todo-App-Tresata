import { Task } from "@/types/types";

export function formatCustomDate(value) {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(value);
  const dayOfWeek = weekdays[date.getDay()];
  const dayOfMonth = date.getDate();
  const monthName = months[date.getMonth()];
  const yearShort = date.getFullYear().toString().slice(-2);

  return `${dayOfWeek} ${dayOfMonth}, ${monthName} ${yearShort}`;
}

export function getActionTypeList({
  tasks,
  type,
}: {
  tasks: Task[];
  type: string;
}) {
  return tasks.filter((task) => task.actionType === type);
}
