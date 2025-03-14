import { ModeToggle } from "@/components/mode-toggle"
import { Calendar, History, PlusIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"

export default function Navbar() {
    return (
        <nav className='h-fit bg-secondary flex flex-row justify-between py-2 px-10 fixed top-0 w-screen z-50'>
            <Link href={`/`}>
                <h1 className="text-2xl font-bold text-center mt-2">GLORIFY GOD IN EVERY THOUGHT/ACTION/INTENTION</h1>
            </Link>
            <div className="flex gap-2 items-center">
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <Button variant={"outline"} asChild>
                        <Link href={`/today`}>
                            Today<Calendar />
                        </Link>
                    </Button>
                    <Button variant={"outline"} asChild>
                        <Link href={`/previous-days`}>
                            History<History />
                        </Link>
                    </Button>
                    <Button variant={"outline"} asChild>
                        <Link href={`/api/today`}>
                            Add today<PlusIcon />
                        </Link>
                    </Button>
                    <UserButton />
                </SignedIn>
                <ModeToggle />
            </div>
        </nav>
    )
}
