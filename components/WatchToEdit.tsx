"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image";
import { MediaCard } from "@/components/media-card"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ToWatch } from "@/app/(main)/to-watch/page";
import { allowedTypes, allowedWatchingStates } from "@/lib/toWatch_utils";


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { updateToWatchMedia } from "@/server/actions";

import { toast } from "sonner"

export default function WatchToEdit({ media }: { media: ToWatch }) {

    const formSchema = z.object({
        name: z.string().min(2, {
            message: "Name must be at least 2 characters.",
        }),
        url_last_watched: z.string().url({
            message: "You must provide a valid URL.",
        }),
        type: z.enum(allowedTypes as [string, ...string[]], {
            errorMap: () => ({ message: "You must select a valid type." }),
        }),
        rated: z.enum(["G", "PG", "PG-13", "R", "NC-17"] as [string, ...string[]], {
            errorMap: () => ({ message: "You must select a valid rating." }),
        }),
        rating: z.number().min(0).max(10),
        release_year: z.string().min(4),
        //
        img_portrait: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        watching_state: z.enum(allowedWatchingStates as [string, ...string[]], {
            errorMap: () => ({ message: "You must select a valid state." }),
        }),
        end_year: z.string().min(4),
        seasons: z.number().min(1),
        episodes: z.number().min(1),
    })
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: media.name,
            url_last_watched: media.url_last_watched,
            img_portrait: media.img_portrait,
            seasons: media.seasons,
            episodes: media.episodes,
            watching_state: media.watching_state,
            type: media.type,
            rated: media.rated,
            release_year: media.release_year,
            end_year: media.end_year,
            rating: media.rating,

        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)

        const result = await updateToWatchMedia(media.name, values as ToWatch)

        if (result === true) {
            toast.success("To Watch have been saved.", {
                description: values.name,
            })
        } else {
            toast.error("To Watch didn't save.", {
                description: values.name,
            })
        }
    }

    return (
        <Dialog key={media.name}>
            <DialogTrigger>
                <MediaCard media={JSON.parse(JSON.stringify(media))} />
            </DialogTrigger>

            <DialogContent className="w-screen lg:max-w-[1000px] h-[80vh] max-h-[800px] flex flex-col">
                <DialogHeader className="flex-shrink-0">
                    <DialogTitle>{media.name}</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="h-full flex flex-col  overflow-y-scroll space-y-4">
                        <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-6 py-4  justify-center items-center">
                            <div className="flex-1 max-w-[250px] justify-center items-center">
                                <Image
                                    src={media.img_portrait || "/placeholder.svg"}
                                    alt={media.name}
                                    className="w-full h-full object-cover rounded-lg border"
                                    width={500}
                                    height={500}
                                />
                            </div>
                            <div className="flex-1">
                                <div className="grid gap-4 pr-2">
                                    <div className="grid gap-2">
                                        <FormField
                                            control={form.control}
                                            name="img_portrait"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Poster URL</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="shadcn" {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Image url
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <FormField
                                            control={form.control}
                                            name="watching_state"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Watching State</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select a verified email to display" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {allowedWatchingStates.map((state) => (
                                                                <SelectItem key={state} value={state}>
                                                                    {state.charAt(0).toUpperCase() + state.slice(1)}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <FormField
                                            control={form.control}
                                            name="rating"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Rating</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="10" {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Rating from 0 to 10
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="year">Release year</Label>
                                            <Input
                                                id="year"
                                                type="number"
                                                value={media.release_year}
                                                disabled={true}
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <FormField
                                                control={form.control}
                                                name="end_year"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>End year</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Ongoing" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>


                                    {(media.type === "series" || media.type === "anime") && (
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name="seasons"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Seasons</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Ongoing" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name="episodes"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Episodes</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Ongoing" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <Button onClick={() => onSubmit(form.watch())} type="submit" className="w-[200px] self-end">Save Changes</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
