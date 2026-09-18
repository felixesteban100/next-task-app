export default function WatchGridSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="flex flex-col gap-2">
                    <div className="h-[22rem] w-[15rem] rounded-lg bg-foreground/50 animate-pulse" />
                </div>
            ))}
        </div>
    )
}