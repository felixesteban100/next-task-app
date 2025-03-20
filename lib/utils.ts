import { Task, TaskStates, TaskTypes } from "@/components/TaskToEdit";
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

export function filterFutureTimes(times: string[]): string[] {
  const now = new Date(), currentMinutes = now.getHours() * 60 + now.getMinutes();

  const toMinutes = (time: string) => {
    const match = time.match(/(\d{1,2}):(\d{2}) (am|pm)/i);
    if (!match) return -1;
    const [, h, m, p] = match;
    const hour = parseInt(h, 10) % 12 + (p.toLowerCase() === "pm" ? 12 : 0);
    return hour * 60 + parseInt(m, 10);
  };

  // Find the first time that is equal to or greater than current time
  let index = times.findIndex(t => toMinutes(t) >= currentMinutes);

  // If there’s a previous time, include it
  if (index > 0) index--;

  return index === -1 ? [] : times.slice(index);
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

export function getTotalTasksByType(tasks: Task[], type: TaskTypes) {
  const tasksByType = tasks.filter(c => c.type === type)
  console.log("tasksByType", type, tasksByType)
  return `✅${tasksByType.filter(c => c.state === "done").length} ❌${tasksByType.filter(c => c.state === "no done").length} ☑${tasksByType.filter(c => c.state === "job/occupied").length}` /* + ` / ${tasksByType.length}` */
}
