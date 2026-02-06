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
import { toast } from "sonner";
import { shouldBeDoneToday } from "@/lib/utils";
import AnimateWrapper from "./AnimateWrapper";

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
        const todoId = todo._id.toString();
        const currentDone = todo.done;  // directly from DB prop
        const intendedDone = !currentDone;

        toast.loading(`Updating "${todo.title}"...`, { id: todoId });

        startTransition(async () => {
            const now = new Date();
            const response = await toggleTodo(todo._id, intendedDone, now);  // ← pass full todo

            if (response.success) {
                toast.success(
                    `"${todo.title}" marked as ${intendedDone ? "done" : "not done"}`,
                    { id: todoId, duration: 4000 }
                );
            } else {
                toast.error(
                    response.message || `"${todo.title}" could not be updated (recurrence rules)`,
                    { id: todoId, duration: 6000 }
                );
            }
        });
    }

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

    function isDoneToday(todo: ToDoTask): boolean {
        return shouldBeDoneToday(todo) && todo.done;
    }


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
                    const isDoneTodayTodo = isDoneToday(todo);
                    const timesCompleted = todo.completionHistory?.length ?? 0;

                    return (
                        <AnimateWrapper
                            key={todo._id.toString()}
                            keyItem={todo._id.toString()}
                        >
                            <div
                                className={`${!shouldBeDoneToday(todo) ? "opacity-40" : "opacity-100"} group flex flex-col sm:flex-row sm:items-center gap-4 rounded-lg border px-5 py-4 transition-colors ${isPending ? "opacity-70" : ""}`}
                            >
                                <Checkbox
                                    checked={isDoneTodayTodo}
                                    onCheckedChange={() => handleToggle(todo)}
                                    disabled={isPending}
                                />

                                <div className="flex-1 min-w-0">
                                    <p className={`font-medium ${isDoneTodayTodo ? "line-through text-muted-foreground" : ""}`}>
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
                        </AnimateWrapper>
                    );
                })}
            </div>
        </div>
    );
}