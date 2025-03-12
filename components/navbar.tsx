import { ModeToggle } from "@/components/mode-toggle"
import { AlarmCheck, History } from "lucide-react"
import Link from "next/link"

export default function Navbar() {
    return (
        <nav className='h-fit bg-secondary flex flex-row justify-between py-2 px-10 fixed top-0 w-screen z-50'>
            <h1 className="text-2xl font-bold text-center mt-2">GLORIFY GOD IN EVERY THOUGHT/ACTION/INTENTION</h1>
            <div className="flex gap-2 items-center">
                <Link href={`/`}><AlarmCheck /></Link>
                <Link href={`/previous-days`}><History /></Link>
                <ModeToggle />
            </div>
        </nav>
    )
}
