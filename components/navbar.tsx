"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { Calendar, History, Loader, PlusIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { SignInButton, useAuth, UserButton } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const links = [
    {
        href: "/today",
        label: "Today",
        icon: <Calendar />
    },
    {
        href: "/previous-days",
        label: "Previous days",
        icon: <History />
    },
    {
        href: "/api/today",
        label: "Add today to the database",
        icon: <PlusIcon />
    },
]

export default function Navbar() {
    const pathname = usePathname()
    const { isLoaded, isSignedIn } = useAuth()

    return (
        <nav className='h-fit bg-secondary flex flex-row justify-between py-2 px-10 fixed top-0 w-screen z-50'>
            <Link href={`/`}>
                <h1 className="text-2xl font-bold text-center mt-2">GLORIFY GOD IN EVERY THOUGHT/ACTION/INTENTION</h1>
            </Link>
            <div className="flex gap-2 items-center">
                {!isLoaded && <Loader className="animate-spin" />}

                {isLoaded && isSignedIn && (
                    <>
                        <UserButton appearance={{ elements: { userButtonAvatarBox: { height: "30px", width: "30px" } } }} />
                        {links.map(link => {
                            return (
                                <TooltipProvider key={link.href}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant={"outline"} size={"icon"} className={`${pathname === link.href ? "bg-primary text-primary-foreground" : ""} rounded-full`} asChild>
                                                <Link href={link.href}>
                                                    {link.icon}
                                                </Link>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{link.label}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            )
                        })}
                    </>
                )}

                {isLoaded && !isSignedIn && (
                    <Button asChild>
                        <SignInButton />
                    </Button>
                )}
                <ModeToggle />
            </div>
        </nav>
    )
}
