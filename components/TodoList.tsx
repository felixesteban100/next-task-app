// app/todos/TodoList.tsx
"use client";

import { useState, useTransition } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { createTodo, deleteTodo, toggleTodo } from "@/server/actions";
import { ObjectId } from "mongodb";
import { RecurrencePicker } from "./RecurrencePicker";

export type ToDoTask = {
    _id: ObjectId;           // ← now required – MongoDB ObjectId as string
    title: string;
    type: "once" | "daily" | "weekly" | "monthly" | "yearly";
    done: boolean;
    lastCompletedAt?: Date;       // ← key field: when was it last marked done
    createdAt: Date;
    updatedAt: Date;
    recurrence: {
        frequency: "once" | "daily" | "weekly" | "monthly" | "yearly";
        interval?: number;
        daysOfWeek?: number[];     // 0=Sun ... 6=Sat
        dayOfMonth?: number;
        month?: number;
        end?: { type: "never" | "after" | "on"; afterCount?: number; date?: Date };
    };
    completionHistory?: Date[];
};

export default function TodoList({ initialTodos }: { initialTodos: ToDoTask[] }) {
    const [isPending, startTransition] = useTransition();
    const [newTitle, setNewTitle] = useState("");
    const [recurrence, setRecurrence] = useState<ToDoTask["recurrence"]>({
        frequency: "once",
        interval: 1,
    });

    function shouldBeDoneToday(task: ToDoTask, todaysDate = new Date()): boolean {
        if (!task.lastCompletedAt) {
            return false;
        }

        const last = new Date(task.lastCompletedAt);
        const ref = new Date(todaysDate);

        // Normalize both dates to start of day for consistent comparison
        const lastDay = new Date(last);
        lastDay.setHours(0, 0, 0, 0);

        const refDay = new Date(ref);
        refDay.setHours(0, 0, 0, 0);

        const freq = task.recurrence?.frequency ?? "once";

        if (freq === "once") {
            // One-time task: once completed, always considered done
            return true;
        }

        // Daily: only done if completed on the current day
        if (freq === "daily") {
            return lastDay.getTime() === refDay.getTime();
        }

        // Weekly: done only if completed during the current week on an allowed day
        if (freq === "weekly") {
            const allowedDays = task.recurrence?.daysOfWeek ?? [];
            if (allowedDays.length === 0) {
                return false;
            }

            // Start of current week (Sunday)
            const weekStart = new Date(refDay);
            weekStart.setDate(refDay.getDate() - refDay.getDay());

            // Must be in current week + on an allowed weekday
            return (
                lastDay >= weekStart &&
                lastDay <= refDay &&
                allowedDays.includes(ref.getDay())
            );
        }

        // Monthly: done only if completed on the target day of the current month
        if (freq === "monthly") {
            const targetDay = task.recurrence?.dayOfMonth ?? 1;

            // Special case for "last day of month" (if you want to support it later)
            if (targetDay === -1) {
                // Approximate: if today is last day of month
                const lastDayOfMonth = new Date(ref.getFullYear(), ref.getMonth() + 1, 0);
                return ref.getDate() === lastDayOfMonth.getDate();
            }

            return (
                ref.getDate() === targetDay &&
                last.getMonth() === ref.getMonth() &&
                last.getFullYear() === ref.getFullYear()
            );
        }

        // Yearly: done only if completed on the target month + day of the current year
        if (freq === "yearly") {
            const targetMonth = task.recurrence?.month ?? 0;
            const targetDay = task.recurrence?.dayOfMonth ?? 1;

            return (
                ref.getMonth() === targetMonth &&
                ref.getDate() === targetDay &&
                last.getFullYear() === ref.getFullYear()
            );
        }

        // Fallback - if frequency is unknown
        return false;
    }

    function handleCreate() {
        if (!newTitle.trim()) return;

        startTransition(async () => {
            const formData = new FormData();
            formData.append("title", newTitle.trim());
            formData.append("recurrence", JSON.stringify(recurrence));

            await createTodo(formData);
            setNewTitle("");
            // Reset recurrence to default after creation
            setRecurrence({ frequency: "once", interval: 1 });
        });
    };

    function handleToggle(todo: ToDoTask) {
        startTransition(async () => {
            const now = new Date();
            await toggleTodo(todo._id, !shouldBeDoneToday(todo, new Date()), now);
        });
    };

    function handleDelete(id: ObjectId) {
        startTransition(async () => {
            await deleteTodo(id);
        });
    };

    function formatRelativeTime(dateInput: Date) {
        const date = new Date(dateInput)
        if (!date || isNaN(date.getTime())) return "—";
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMin = Math.round(diffMs / 60000);
        if (diffMin < 1) return "just now";
        if (diffMin < 60) return `${diffMin}m ago`;
        const diffHr = Math.floor(diffMin / 60);
        if (diffHr < 24) return `${diffHr}h ago`;
        return date.toLocaleDateString([], { month: "short", day: "numeric" });
    };

    function formatRecurrence(r?: ToDoTask["recurrence"]) {
        if (!r || r.frequency === "once") return "once";
        let str: string = r.frequency;
        if (r.interval && r.interval > 1) str = `every ${r.interval} ${str}`;
        if (r.daysOfWeek?.length) {
            str += ` (${r.daysOfWeek.map(d => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d]).join(", ")})`;
        }
        if (r.dayOfMonth) str += ` on day ${r.dayOfMonth}`;
        if (r.end?.type === "after") str += ` (${r.end.afterCount} times)`;
        if (r.end?.type === "on" && r.end.date) {
            str += ` until ${new Date(new Date(r.end.date).getTime() + 5 * 60 * 60 * 1000).toLocaleDateString()}`;
        }
        return str;
    };



    return (
        <div className="space-y-8">
            {/* ── Add new task form ────────────────────────────────────────────── */}
            <div className="space-y-6 rounded-lg border bg-muted/40 p-6">
                <Input
                    placeholder="What needs to be done?"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                    disabled={isPending}
                />

                <RecurrencePicker
                    value={recurrence}
                    onChange={setRecurrence}
                />

                <div className="flex justify-end">
                    <Button
                        onClick={handleCreate}
                        disabled={isPending || !newTitle.trim()}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Task
                    </Button>
                </div>
            </div>


            {/* ── Task list ────────────────────────────────────────────────────── */}
            <div className="space-y-3">
                {initialTodos.map((todo) => {
                    const isDoneToday = shouldBeDoneToday(todo, new Date());
                    const timesCompleted = todo.completionHistory?.length ?? 0;

                    return (
                        <div
                            key={todo._id.toString()}
                            className={`group flex flex-col sm:flex-row sm:items-center gap-4 rounded-lg border px-5 py-4 transition-colors ${isPending ? "opacity-70" : ""}`}
                        >
                            <Checkbox
                                checked={isDoneToday}
                                onCheckedChange={() => handleToggle(todo)}
                                disabled={isPending}
                            />

                            <div className="flex-1 min-w-0">
                                <p className={`font-medium ${isDoneToday ? "line-through text-muted-foreground" : ""}`}>
                                    {todo.title}
                                </p>
                                <div className="mt-1 text-xs text-muted-foreground flex flex-wrap gap-x-3 gap-y-1">
                                    <span>updated {formatRelativeTime(todo.updatedAt)}</span>
                                    <span>•</span>
                                    <span className="font-medium">{formatRecurrence(todo.recurrence)}</span>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    Completed {timesCompleted} time{timesCompleted !== 1 ? "s" : ""}
                                    {timesCompleted > 0 && ` • last ${formatRelativeTime(todo.lastCompletedAt!)}`}
                                </div>
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
                                onClick={() => handleDelete(todo._id)}
                                disabled={isPending}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}