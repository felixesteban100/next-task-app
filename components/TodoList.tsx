// app/todos/TodoList.tsx
"use client";

import { useState, useTransition } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";
import { createTodo, deleteTodo, toggleTodo } from "@/server/actions";
import { ObjectId } from "mongodb";

export type ToDoTask = {
    _id: ObjectId;           // ← now required – MongoDB ObjectId as string
    title: string;
    type: "once" | "daily" | "weekly" | "custom";
    done: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export default function TodoList({ initialTodos }: { initialTodos: ToDoTask[] }) {
    const [isPending, startTransition] = useTransition();
    const [newTitle, setNewTitle] = useState("");
    const [type, setType] = useState<ToDoTask["type"]>("once");

    const handleCreate = () => {
        if (!newTitle.trim()) return;

        startTransition(async () => {
            const formData = new FormData();
            formData.append("title", newTitle.trim());
            formData.append("type", type);

            await createTodo(formData);
            setNewTitle("");
            // Server action will revalidate the page → fresh list
        });
    };

    const handleToggle = (todo: ToDoTask) => {
        startTransition(async () => {
            await toggleTodo(todo._id, !todo.done);
        });
    };

    const handleDelete = (id: ObjectId) => {
        startTransition(async () => {
            await deleteTodo(id);
        });
    };

    const formatRelativeTime = (date: Date) => {
        if (!date || isNaN(new Date(date).getTime())) return "—";

        const now = new Date();
        const diffMs = now.getTime() - new Date(date).getTime();
        const diffMin = Math.round(diffMs / 60000);

        if (diffMin < 1) return "just now";
        if (diffMin < 60) return `${diffMin}m ago`;
        const diffHr = Math.floor(diffMin / 60);
        if (diffHr < 24) return `${diffHr}h ago`;

        return date.toLocaleDateString([], {
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="space-y-8">
            {/* Add form */}
            <div className="flex flex-col sm:flex-row gap-3">
                <Input
                    placeholder="New task..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                    disabled={isPending}
                />

                <Select value={type} onValueChange={(v) => setType(v as ToDoTask["type"])}>
                    <SelectTrigger className="w-36">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="once">Once</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                </Select>

                <Button onClick={handleCreate} disabled={isPending || !newTitle.trim()}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add
                </Button>
            </div>

            {/* Task list */}
            <div className="space-y-3">
                {initialTodos.map((todo) => (
                    <div
                        key={todo._id.toString()}  // ← now using _id
                        className={`group flex flex-col sm:flex-row sm:items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${isPending ? "opacity-70" : ""
                            }`}
                    >
                        <div className="flex items-center gap-3 flex-1">
                            <Checkbox
                                checked={todo.done}
                                onCheckedChange={() => handleToggle(todo)}
                                disabled={isPending}
                            />
                            <div className="min-w-0">
                                <p
                                    className={`font-medium leading-tight ${todo.done ? "line-through text-muted-foreground" : ""
                                        }`}
                                >
                                    {todo.title}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    {todo.type} • updated {/* {DateString(todo.updatedAt)} */}{formatRelativeTime(todo.updatedAt)}
                                </p>
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive self-start sm:self-center"
                            onClick={() => handleDelete(todo._id)}  // ← now using _id
                            disabled={isPending}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}