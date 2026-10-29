import PerfumeCard from "@/components/perfumes/PerfumeCard";
import { collectionPerfumes } from "@/db/mongodb/mongodb";
import { PerfumeDocument } from "@/types";
import Link from "next/link";

interface PageProps {
    searchParams: Promise<{ page?: string }>;
}

const PAGE_SIZE = 8;

export default async function PerfumesPage({ searchParams }: PageProps) {
    const resolvedParams = await searchParams;
    const currentPage = Math.max(1, Number(resolvedParams.page) || 1);
    const skip = (currentPage - 1) * PAGE_SIZE;

    // Fetch total count for pagination math
    const totalPerfumes = await collectionPerfumes.countDocuments({});
    const totalPages = Math.ceil(totalPerfumes / PAGE_SIZE);

    // Fetch paginated records from MongoDB
    const rawPerfumes = await collectionPerfumes
        .find({})
        .skip(skip)
        .limit(PAGE_SIZE)
        .toArray();

    // Serialize ObjectIds to string for client component compatibility
    const perfumes: PerfumeDocument[] = rawPerfumes.map((p) => ({
        ...p,
        _id: p._id.toString(),
    })) as unknown as PerfumeDocument[];

    return (
        <main className="min-h-screen max-w-7xl ">
            <div className="">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight">Fragrance Collection</h1>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                            Manage your personal scent wardrobe, ratings, and stats.
                        </p>
                    </div>
                    <div className="text-xs px-3 py-1.5 rounded-full font-medium">
                        Total Fragrances: {totalPerfumes}
                    </div>
                </div>

                {/* Grid List */}
                {perfumes.length === 0 ? (
                    <div className="text-center py-20 rounded-2xl border border-zinc-200 ">
                        <p className="text-zinc-500">No perfumes found in the database.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {perfumes.map((perfume) => (
                            <PerfumeCard key={perfume._id?.toString()} perfume={perfume} />
                        ))}
                    </div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-10">
                        <Link
                            href={`/perfumes?page=${currentPage - 1}`}
                            aria-disabled={currentPage <= 1}
                            className={`px-4 py-2 text-xs font-semibold rounded-xl border border-zinc-300 dark:border-zinc-700 transition-colors ${currentPage <= 1
                                ? 'pointer-events-none opacity-40 bg-zinc-100 dark:bg-zinc-900'
                                : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
                                }`}
                        >
                            Previous
                        </Link>

                        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                            Page {currentPage} of {totalPages}
                        </span>

                        <Link
                            href={`/perfumes?page=${currentPage + 1}`}
                            aria-disabled={currentPage >= totalPages}
                            className={`px-4 py-2 text-xs font-semibold rounded-xl border border-zinc-300 dark:border-zinc-700 transition-colors ${currentPage >= totalPages
                                ? 'pointer-events-none opacity-40 bg-zinc-100 dark:bg-zinc-900'
                                : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
                                }`}
                        >
                            Next
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
}