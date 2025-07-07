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

export function getDayName(dateStr: string): string {
  const [month, day, year] = dateStr.split('/').map(Number);

  // Validate date components
  if (!month || !day || !year) {
    throw new Error('Invalid date format. Use "m/d/y".');
  }

  const date = new Date(year, month - 1, day); // JavaScript months are 0-based

  const dayNames = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  return dayNames[date.getDay()];
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
  return `✅${tasksByType.filter(c => c.state === "done").length} ❌${tasksByType.filter(c => c.state === "no done").length} ☑${tasksByType.filter(c => c.state === "occupied").length}` /* + ` / ${tasksByType.length}` */
}



export function sortByProperty(array: Task[], property: "time" | "id"): Task[] {
  return property === "time" ? array.sort((a, b) => {
    const getMinutes = (timeStr: string): number => {
      const [, hourStr, minuteStr, meridian] = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)!;
      let hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);

      if (meridian.toUpperCase() === 'PM' && hour !== 12) hour += 12;
      if (meridian.toUpperCase() === 'AM' && hour === 12) hour = 0;

      return hour * 60 + minute;
    };

    return getMinutes(a.time) - getMinutes(b.time);
  }) : array.sort((a, b) => a.id - b.id);
}