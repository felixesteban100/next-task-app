"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ToWatch as MediaItem } from "@/app/(main)/to-watch/page"
import Image from "next/image"

interface MediaEditDialogProps {
    media: MediaItem | null
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (media: MediaItem) => void
}

export function MediaEditDialog({ media, open, onOpenChange, onSave }: MediaEditDialogProps) {
    const [editedMedia, setEditedMedia] = useState<MediaItem | null>(media)

    useEffect(() => {
        setEditedMedia(media)
    }, [media])

    if (!editedMedia) return null

    const handleSave = () => {
        onSave(editedMedia)
        onOpenChange(false)
    }

    const updateField = (field: keyof MediaItem, value: string | number) => {
        setEditedMedia((prev) => (prev ? { ...prev, [field]: value } : null))
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Edit Media Information</DialogTitle>
                </DialogHeader>

                <div className="flex gap-6 py-4">
                    <div className="flex-1 min-h-[400px]">
                        <Image
                            src={editedMedia.img_portrait || "/placeholder.svg"}
                            alt={editedMedia.name}
                            className="w-full h-full object-cover rounded-lg border"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.src = `/placeholder.svg?height=400&width=300&query=movie poster placeholder`
                            }}
                            height={500}
                            width={500}
                        />
                    </div>

                    <div className="flex-1 grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" value={editedMedia.name} onChange={(e) => updateField("name", e.target.value)} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="poster">Poster URL</Label>
                            <Input id="poster" value={editedMedia.img_portrait} onChange={(e) => updateField("img_portrait", e.target.value)} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="rating">Rating</Label>
                                <Input
                                    id="rating"
                                    type="number"
                                    min="0"
                                    max="10"
                                    step="0.1"
                                    value={editedMedia.rating}
                                    onChange={(e) => updateField("rating", Number.parseFloat(e.target.value) || 0)}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="year">Release Year</Label>
                                <Input
                                    id="year"
                                    type="number"
                                    value={editedMedia.release_year}
                                    onChange={(e) => updateField("release_year", Number.parseInt(e.target.value) || 0)}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="year">End Year</Label>
                                <Input
                                    id="year"
                                    type="number"
                                    value={editedMedia.end_year}
                                    onChange={(e) => updateField("end_year", Number.parseInt(e.target.value) || 0)}
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="genre">Rated</Label>
                            <Input id="genre" value={editedMedia.rated} onChange={(e) => updateField("rated", e.target.value)} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="type">Type</Label>
                            <Select value={editedMedia.type} onValueChange={(value) => updateField("type", value)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="movie">Movie</SelectItem>
                                    <SelectItem value="series">Series</SelectItem>
                                    <SelectItem value="anime">Anime</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {editedMedia.type === "movie" && (
                            <div className="grid gap-2">
                                <Label htmlFor="duration">Seasons</Label>
                                <Input
                                    id="duration"
                                    value={editedMedia.seasons || ""}
                                    onChange={(e) => updateField("seasons", e.target.value)}
                                    placeholder="e.g., S1, S2, S3..."
                                />
                            </div>
                        )}

                        {(editedMedia.type === "series" || editedMedia.type === "anime") && (
                            <div className="grid gap-2">
                                <Label htmlFor="episodes">Episodes</Label>
                                <Input
                                    id="episodes"
                                    type="number"
                                    value={editedMedia.episodes || ""}
                                    onChange={(e) => updateField("episodes", Number.parseInt(e.target.value))}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
