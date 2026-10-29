'use client';

import { useState } from 'react';
import { PerfumeDocument } from '@/types';
import PerfumeEditForm from './PerfumeEditForm';
import Image from 'next/image';

export default function PerfumeCard({ perfume }: { perfume: PerfumeDocument }) {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <>
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                <div>
                    {/* Header Badge Row */}
                    <div className="flex justify-between items-start gap-2 mb-3">
                        <span className="inline-block px-2.5 py-1 text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-full">
                            {perfume.brand}
                        </span>
                        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full">
                            {perfume.price}
                        </span>
                    </div>

                    <Image src={perfume.image} alt={perfume.name} width={800} height={800} className={`w-auto h-48 mx-auto rounded-md mb-1`} />

                    {/* Title & Specs */}
                    <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1 line-clamp-3">
                        {perfume.name}
                    </h2>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
                        {perfume.fragrance_family} • {perfume.concentration} ({perfume.size})
                    </p>

                    {/* Notes Preview */}
                    <div className="space-y-1.5 mb-4 text-xs">
                        <p className="text-zinc-600 dark:text-zinc-400">
                            <strong className="text-zinc-900 dark:text-zinc-200">Top:</strong> {perfume.top_notes?.join(', ')}
                        </p>
                        <p className="text-zinc-600 dark:text-zinc-400 line-clamp-1">
                            <strong className="text-zinc-900 dark:text-zinc-200">Base:</strong> {perfume.base_notes?.join(', ')}
                        </p>
                    </div>

                    {/* Personal Collection Status Badge Box */}
                    <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-3 mb-4 space-y-2 border border-zinc-100 dark:border-zinc-800">
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-zinc-500 font-medium">Status</span>
                            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                                {perfume.user_data?.ownership_status || 'WISHLIST'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-zinc-500 font-medium">Rating</span>
                            <span className="text-amber-500 font-bold">
                                {perfume.user_data?.rating ? '⭐'.repeat(perfume.user_data.rating) : 'Unrated'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-zinc-500 font-medium">Season</span>
                            <span className="text-zinc-700 dark:text-zinc-300">
                                {perfume.user_data?.season_preference || 'ALL_YEAR'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <button
                    onClick={() => setIsEditing(true)}
                    className="w-full py-2 px-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                >
                    Edit Stats & Collection
                </button>
            </div>

            {isEditing && (
                <PerfumeEditForm perfume={perfume} onClose={() => setIsEditing(false)} />
            )}
        </>
    );
}