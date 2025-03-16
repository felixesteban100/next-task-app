import Navbar from "@/components/navbar";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        <main className="flex flex-col gap-10 w-[98vw]">
            <Navbar />
            <div className="flex flex-col gap-2 mt-10 pt-10 justify-center items-center ">
                {children}
            </div>
        </main>
    )
}