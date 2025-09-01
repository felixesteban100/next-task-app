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
import { allowedTypes, allowedWatchingStates, getTypeColor, getTypeIcon } from "@/lib/toWatch_utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
import { Badge } from "./ui/badge";
import { Star } from "lucide-react";
import Link from "next/link";

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
        // console.log(values)

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

            {/* w-screen lg:max-w-[1000px] h-[80vh] max-h-[900px] */}
            <DialogContent className="max-w-[50rem]">
                <DialogHeader className="flex-shrink-0">
                    <DialogTitle>{media.name}</DialogTitle>
                </DialogHeader>
                <div className="h-full flex flex-col lg:flex-row gap-4 w-full overflow-y-auto">
                    <div className="row-span-1 flex justify-center items-center">
                        <div className="h-[25rem] w-[15rem]">
                            <Image
                                src={media.img_portrait || "/placeholder.svg"}
                                alt={media.name}
                                className="w-full h-full object-cover rounded-lg border"
                                width={500}
                                height={500}
                            />
                        </div>
                    </div>
                    <Tabs defaultValue="info" className="w-full">
                        <TabsList className="w-full">
                            <TabsTrigger value="info">Info</TabsTrigger>
                            <TabsTrigger value="edit">Edit</TabsTrigger>
                        </TabsList>
                        <TabsContent value="info" className="p-4 space-y-4">

                            <div className="w-full flex justify-between">
                                <h3 className={`font-bold text-lg leading-tight text-card-foreground line-clamp-1 transition-colors`}>
                                    {media.name}
                                </h3>
                                <Badge className={`flex justify-center gap-1 ${getTypeColor(media.type)}`}>
                                    {getTypeIcon(media.type)}
                                    {media.type.charAt(0).toUpperCase() + media.type.slice(1)}
                                </Badge>
                            </div>

                            <div className="flex items-center gap-2 w-full">
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-medium text-sm text-foreground">{media.rating}</span>
                                </div>
                                <span className="text-muted-foreground text-sm">•</span>
                                <span className="text-muted-foreground text-sm">{media.release_year} - {media.end_year}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground font-medium">{media.rated}</span>
                                <div>
                                    {media.seasons && <span className="text-xs text-muted-foreground">S{media.seasons}</span>}
                                    <span> - </span>
                                    {media.episodes && <span className="text-xs text-muted-foreground">{media.episodes} episodes</span>}
                                </div>
                            </div>

                            <div>
                                <p>{media.description}</p>
                            </div>

                            {media.url_last_watched !== "" && <Link href={media.url_last_watched}> Continue watching {media.name}</Link>}
                        </TabsContent>
                        <TabsContent value="edit" >
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center gap-2">
                                    <div className="grid gap-4 pr-2 lg:overflow-y-scroll max-h-[270px]">
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
                                                name="url_last_watched"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Last watched URL</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="url" {...field} />
                                                        </FormControl>
                                                        <FormDescription>
                                                            Web page url
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
                                    <Button onClick={() => onSubmit(form.watch())} type="submit" className="w-[200px] self-end">Save Changes</Button>
                                </form>
                            </Form>
                        </TabsContent>
                    </Tabs>
                </div>
            </DialogContent>
        </Dialog>
    )
}
