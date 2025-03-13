import { Task, TaskStates } from "@/components/TaskToEdit";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTodaysDate() {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());
}

export function getMostRepeatedState(tasks: Task[]) {
  const frequencyMap = tasks.reduce<Record<string, number>>((acc, item) => {
    acc[item.state] = (acc[item.state] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(frequencyMap).reduce<{ value: TaskStates; count: number }>(
    (max, [value, count]) => (count > max.count ? { value: value as TaskStates, count } : max),
    { value: "no done", count: 0 }
  ).value;
};


export function getTotalDoneSpiritualTasks(tasks: Task[]) {
  const spiritualTasks = tasks.filter(c => c.type === "spiritual")
  return `${spiritualTasks.filter(c => c.state === "done").length} / ${spiritualTasks.length}`
}

export function getTotalDoneImportantTasks(tasks: Task[]) {
  const importantTasks = tasks.filter(c => c.type === "important")
  return `${importantTasks.filter(c => c.state === "done").length} / ${importantTasks.length}`
}