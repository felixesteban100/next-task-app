import Navbar from "@/components/navbar";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        <main className="flex flex-col gap-10 w-screen">
            <Navbar />
            <div className="flex flex-col gap-2 mt-10 pt-20 justify-center items-center px-10">
                {children}
            </div>
        </main>
    )
}