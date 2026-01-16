"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

// ────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────

type Frequency = "once" | "daily" | "weekly" | "monthly" | "yearly"

type RecurrenceRule = {
    frequency: Frequency
    interval?: number                  // every N ...
    daysOfWeek?: number[]              // 0=Sun ... 6=Sat          (weekly)
    dayOfMonth?: number                // 1-31                     (monthly)
    nthDayOfMonth?: { n: number; day: number } // 1st Monday, 2nd Friday...
    month?: number                     // 0-11                     (yearly)
    end?: {
        type: "never" | "after" | "on"
        afterCount?: number
        date?: Date
    }
}

// ────────────────────────────────────────────────
// Component
// ────────────────────────────────────────────────

export function RecurrencePicker({
    value,
    onChange,
}: {
    value: RecurrenceRule
    onChange: (rule: RecurrenceRule) => void
}) {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    const handleFrequencyChange = (freq: Frequency) => {
        // reset irrelevant fields when frequency changes
        onChange({
            frequency: freq,
            interval: freq === "once" ? undefined : 1,
            daysOfWeek: freq === "weekly" ? value.daysOfWeek ?? [] : undefined,
            dayOfMonth: freq === "monthly" ? value.dayOfMonth ?? 1 : undefined,
            nthDayOfMonth: undefined,
            month: freq === "yearly" ? value.month ?? new Date().getMonth() : undefined,
            end: value.end ?? { type: "never" },
        })
    }

    return (
        <Card className="border-dashed py-6">
            <CardContent className="pt-6 space-y-6">

                {/* Frequency + Interval */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label>Repeats</Label>
                        <Select
                            value={value.frequency}
                            onValueChange={(v) => handleFrequencyChange(v as Frequency)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="once">Once</SelectItem>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="yearly">Yearly</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {value.frequency !== "once" && (
                        <div className="space-y-2">
                            <Label>Every</Label>
                            <Input
                                type="number"
                                min={1}
                                max={99}
                                value={value.interval ?? 1}
                                onChange={(e) => onChange({ ...value, interval: Number(e.target.value) || 1 })}
                                className="w-24"
                            />
                        </div>
                    )}
                </div>

                {/* Weekly specific */}
                {value.frequency === "weekly" && (
                    <div className="space-y-3">
                        <Label>On these days</Label>
                        <div className="flex flex-wrap gap-3">
                            {weekdays.map((day, i) => (
                                <label key={day} className="flex items-center gap-2 cursor-pointer">
                                    <Checkbox
                                        checked={(value.daysOfWeek ?? []).includes(i)}
                                        onCheckedChange={(checked) => {
                                            const current = value.daysOfWeek ?? []
                                            onChange({
                                                ...value,
                                                daysOfWeek: checked
                                                    ? [...current, i]
                                                    : current.filter(d => d !== i),
                                            })
                                        }}
                                    />
                                    <span className="text-sm">{day}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                {/* Monthly specific - simple version */}
                {value.frequency === "monthly" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>On day</Label>
                            <Select
                                value={(value.dayOfMonth ?? 1).toString()}
                                onValueChange={(v) => onChange({ ...value, dayOfMonth: Number(v) })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {Array.from({ length: 31 }, (_, i) => i + 1).map(n => (
                                        <SelectItem key={n} value={n.toString()}>
                                            {n}{n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th"}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                )}

                {/* Yearly - very simple version */}
                {value.frequency === "yearly" && (
                    <div className="space-y-2">
                        <Label>Month</Label>
                        <Select
                            value={(value.month ?? new Date().getMonth()).toString()}
                            onValueChange={(v) => onChange({ ...value, month: Number(v) })}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {[
                                    "January", "February", "March", "April", "May", "June",
                                    "July", "August", "September", "October", "November", "December"
                                ].map((m, i) => (
                                    <SelectItem key={m} value={i.toString()}>
                                        {m}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {/* End condition - common in complete implementations */}
                {value.frequency !== "once" && (
                    <div className="space-y-3 pt-4 border-t">
                        <Label>Ends</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Select
                                value={value.end?.type ?? "never"}
                                onValueChange={(v) =>
                                    onChange({
                                        ...value,
                                        end: {
                                            ...value.end,
                                            type: v as "never" | "after" | "on",
                                        } as RecurrenceRule["end"],
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="never">Never</SelectItem>
                                    <SelectItem value="after">After</SelectItem>
                                    <SelectItem value="on">On date</SelectItem>
                                </SelectContent>
                            </Select>

                            {value.end?.type === "after" && (
                                <Input
                                    type="number"
                                    placeholder="Occurrences"
                                    min={1}
                                    value={value.end.afterCount ?? ""}
                                    onChange={(e) =>
                                        onChange({
                                            ...value,
                                            end: { ...value.end, afterCount: Number(e.target.value) || 1 },
                                        } as RecurrenceRule)
                                    }
                                />
                            )}

                            {value.end?.type === "on" && (
                                <Input
                                    type="date"
                                    value={
                                        value.end.date
                                            ? new Date(value.end.date).toISOString().split("T")[0]
                                            : ""
                                    }
                                    onChange={(e) =>
                                        onChange({
                                            ...value,
                                            end: { ...value.end, date: e.target.value ? new Date(e.target.value) : undefined },
                                        } as RecurrenceRule)
                                    }
                                />
                            )}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}