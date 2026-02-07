import { Task, TaskStates, TaskTypes } from "@/components/TaskToEdit";
import { ToDoTask } from "@/components/TodoList";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export function getTodaysDate() {
//   // return new Intl.DateTimeFormat("en-US", {
//   //   timeZone: "America/New_York",
//   //   year: "numeric",
//   //   month: "2-digit",
//   //   day: "2-digit"
//   // }).format(new Date());
//   return new Date()
// }

export function DateString(input: Date | string | null | undefined): string {
  if (!input) return "—";

  const date = typeof input === 'string' ? new Date(input) : input;
  if (isNaN(date.getTime())) return "Invalid date";

  // Option 1: clean ISO style
  // return date.toISOString().split('T')[0];          // → "2026-01-02"

  // Option 2: same M/D/YYYY format, but forced UTC
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    dateStyle: "full"
  }).format(new Date(date.getTime() + 5 * 60 * 60 * 1000));
}
export function getFormattedTime(timestamp: Date | number): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(timestamp);
}

export function getDayName(dateFormat: Date): string {
  return DateString(dateFormat).split(',')[0];
  // const dateString = DateString(dateFormat)
  // const [month, day, year] = dateString.split(',').map(Number);

  // // Validate date components
  // if (!month || !day || !year) {
  //   throw new Error('Invalid date format. Use "m/d/y".');
  // }

  // const date = new Date(year, month - 1, day); // JavaScript months are 0-based

  // const dayNames = [
  //   'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  // ];

  // return dayNames[date.getDay()];
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

// export function timeToMinutes(timeStr: string): number {
//   const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/i)
//   if (!match) throw new Error(`Invalid time format: ${timeStr}`)

//   const [, h, m, period] = match
//   let hour = parseInt(h, 10)

//   if (period.toLowerCase() === 'pm' && hour !== 12) hour += 12
//   if (period.toLowerCase() === 'am' && hour === 12) hour = 0

//   return hour * 60 + parseInt(m, 10)
// }

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

/**
 * Determines if this task should currently appear as "done" (checked) on the given day.
 * 
 * Logic:
 * - "once" tasks → done forever after first completion
 * - recurring tasks → done only if the user marked it done on the current period
 *   (today for daily, this week for weekly, this month for monthly, this year for yearly)
 */
export function shouldBeDoneToday(task: ToDoTask, referenceDate = new Date()): boolean {
  //No completion ever → not done
  if (!task.lastCompletedAt) {
    // console.log(task.title, "no lastCompletedAt");
    return false;
  }

  const last = new Date(task.lastCompletedAt /* ?? (new Date(new Date().setHours(0, 0, 0, 0))) */);  // Fallback to epoch start if missing
  const ref = new Date(referenceDate);

  // Normalize both to start of day (00:00:00) for fair period comparison
  const lastDay = new Date(last);
  lastDay.setHours(0, 0, 0, 0);

  const refDay = new Date(ref);
  refDay.setHours(0, 0, 0, 0);

  const freq = task.recurrence.frequency ?? "once";

  // ────────────────────────────────────────────────────────────────
  // One-time task: once completed → always done forever
  // ────────────────────────────────────────────────────────────────
  if (freq === "once") {
    return true;
  }

  // ────────────────────────────────────────────────────────────────
  // Daily: only done if marked done today
  // ────────────────────────────────────────────────────────────────
  if (freq === "daily") {
    if (task.title === "ok") {
      console.log(task.title, task.lastCompletedAt)
      console.log("last", lastDay.getTime(), new Date(last));
      console.log("refDay", refDay.getTime(), new Date(ref));
    }
    return lastDay.getTime() === refDay.getTime();
  }

  // ────────────────────────────────────────────────────────────────
  // Weekly: done only if marked done on an allowed weekday in current week
  // ────────────────────────────────────────────────────────────────
  if (freq === "weekly") {
    const allowedDays = task.recurrence?.daysOfWeek ?? [];
    if (allowedDays.length === 0) {
      return false;
    }

    // Start of current week (Sunday)
    const weekStart = new Date(refDay);
    weekStart.setDate(refDay.getDate() - refDay.getDay());

    // Must be:
    // 1. in current week
    // 2. on an allowed weekday
    return (
      lastDay.getTime() >= weekStart.getTime() &&
      lastDay.getTime() <= refDay.getTime() &&
      allowedDays.includes(ref.getDay())
    );
  }

  // ────────────────────────────────────────────────────────────────
  // Monthly: done only if marked done on the target day of this month
  // ────────────────────────────────────────────────────────────────
  if (freq === "monthly") {
    const targetDay = task.recurrence?.dayOfMonth ?? 1;

    // Basic check: same day of month, same month, same year
    return (
      ref.getDate() === targetDay &&
      last.getMonth() === ref.getMonth() &&
      last.getFullYear() === ref.getFullYear()
    );
  }

  // ────────────────────────────────────────────────────────────────
  // Yearly: done only if marked done on the target month+day this year
  // ────────────────────────────────────────────────────────────────
  if (freq === "yearly") {
    const targetMonth = task.recurrence?.month ?? 0;
    const targetDay = task.recurrence?.dayOfMonth ?? 1;

    return (
      ref.getMonth() === targetMonth &&
      ref.getDate() === targetDay &&
      last.getFullYear() === ref.getFullYear()
    );
  }

  // Fallback for unknown frequency
  console.log("unknown frequency", freq);
  return false;
}

export function isAllowedToday(task: ToDoTask, referenceDate = new Date()): boolean {
  const freq = task.recurrence?.frequency ?? "once";
  const ref = new Date(referenceDate);
  ref.setHours(0, 0, 0, 0); // normalize to day start

  if (freq === "once") {
    return true; // always allowed
  }

  if (freq === "daily") {
    return true; // always allowed
  }

  if (freq === "weekly") {
    const allowedDays = task.recurrence?.daysOfWeek ?? [];
    return allowedDays.includes(ref.getDay());
  }

  if (freq === "monthly") {
    const targetDay = task.recurrence?.dayOfMonth ?? 1;
    return ref.getDate() === targetDay;
  }

  if (freq === "yearly") {
    const targetMonth = task.recurrence?.month ?? 0;
    const targetDay = task.recurrence?.dayOfMonth ?? 1;
    return ref.getMonth() === targetMonth && ref.getDate() === targetDay;
  }

  return false;
}