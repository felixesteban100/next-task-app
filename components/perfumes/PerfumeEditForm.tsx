'use client';

import { useState, useTransition } from 'react';
import { PerfumeDocument, UserPerfumeData, OwnershipStatus, WearFrequency, SeasonPreference, Occasion, LongevityRating, ProjectionRating, RepurchaseIntent, Rating } from '@/types';
import { updatePerfumeUserData } from '@/app/actions/perfume-actions';
import Image from 'next/image';

interface PerfumeEditFormProps {
    perfume: PerfumeDocument;
    onClose: () => void;
}

export default function PerfumeEditForm({ perfume, onClose }: PerfumeEditFormProps) {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<UserPerfumeData>({
        rating: perfume.user_data?.rating ?? null,
        ownership_status: perfume.user_data?.ownership_status ?? 'WISHLIST',
        wear_frequency: perfume.user_data?.wear_frequency ?? 'NEVER',
        season_preference: perfume.user_data?.season_preference ?? 'ALL_YEAR',
        occasion: perfume.user_data?.occasion ?? 'DAILY_CASUAL',
        longevity_rating: perfume.user_data?.longevity_rating ?? 'MODERATE',
        projection_rating: perfume.user_data?.projection_rating ?? 'MODERATE',
        repurchase_intent: perfume.user_data?.repurchase_intent ?? 'UNDECIDED',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        startTransition(async () => {
            const res = await updatePerfumeUserData(perfume._id!.toString(), formData);
            if (res.success) {
                onClose();
            } else {
                setError(res.error || 'Something went wrong.');
            }
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-zinc-200 dark:border-zinc-800 my-8">
                <div className="flex justify-between items-center pb-4 mb-4 border-b border-zinc-100 dark:border-zinc-800">
                    <div>
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1">{perfume.name}</h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">Edit Personal Collection Stats</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-xl font-bold px-2 py-1"
                    >
                        &times;
                    </button>
                </div>

                <Image src={perfume.image} alt={perfume.name} width={800} height={800} className={`w-auto h-48 mx-auto rounded-md mb-1`} />

                {error && (
                    <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-sm rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                    {/* Rating */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1">Rating (1-5)</label>
                        <select
                            value={formData.rating ?? ''}
                            onChange={(e) => setFormData({ ...formData, rating: e.target.value ? (Number(e.target.value) as Rating) : null })}
                            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                        >
                            <option value="">Unrated</option>
                            <option value="1">⭐ 1 - Poor</option>
                            <option value="2">⭐⭐ 2 - Fair</option>
                            <option value="3">⭐⭐⭐ 3 - Good</option>
                            <option value="4">⭐⭐⭐⭐ 4 - Great</option>
                            <option value="5">⭐⭐⭐⭐⭐ 5 - Masterpiece</option>
                        </select>
                    </div>

                    {/* Ownership Status */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1">Ownership Status</label>
                        <select
                            value={formData.ownership_status}
                            onChange={(e) => setFormData({ ...formData, ownership_status: e.target.value as OwnershipStatus })}
                            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100"
                        >
                            <option value="OWNED">Owned</option>
                            <option value="WISHLIST">Wishlist</option>
                            <option value="SAMPLED">Sampled</option>
                            <option value="DECLUTTERED">Decluttered</option>
                            <option value="HAD_IT">Had It</option>
                        </select>
                    </div>

                    {/* Wear Frequency */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1">Wear Frequency</label>
                        <select
                            value={formData.wear_frequency}
                            onChange={(e) => setFormData({ ...formData, wear_frequency: e.target.value as WearFrequency })}
                            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100"
                        >
                            <option value="DAILY_SIGNATURE">Daily Signature</option>
                            <option value="REGULAR_ROTATION">Regular Rotation</option>
                            <option value="OCCASIONAL">Occasional</option>
                            <option value="RARELY">Rarely</option>
                            <option value="NEVER">Never</option>
                        </select>
                    </div>

                    {/* Season Preference */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1">Season Preference</label>
                        <select
                            value={formData.season_preference}
                            onChange={(e) => setFormData({ ...formData, season_preference: e.target.value as SeasonPreference })}
                            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100"
                        >
                            <option value="SPRING_SUMMER">Spring / Summer</option>
                            <option value="FALL_WINTER">Fall / Winter</option>
                            <option value="ALL_YEAR">All Year</option>
                            <option value="COLD_WEATHER_ONLY">Cold Weather Only</option>
                        </select>
                    </div>

                    {/* Occasion */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1">Primary Occasion</label>
                        <select
                            value={formData.occasion}
                            onChange={(e) => setFormData({ ...formData, occasion: e.target.value as Occasion })}
                            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100"
                        >
                            <option value="DAILY_CASUAL">Daily Casual</option>
                            <option value="OFFICE_WORK">Office / Work</option>
                            <option value="EVENING_SPECIAL">Evening / Special</option>
                            <option value="GYM_SPORT">Gym / Sport</option>
                            <option value="DATE_NIGHT">Date Night</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {/* Longevity */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1">Longevity</label>
                            <select
                                value={formData.longevity_rating}
                                onChange={(e) => setFormData({ ...formData, longevity_rating: e.target.value as LongevityRating })}
                                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100"
                            >
                                <option value="WEAK">Weak</option>
                                <option value="MODERATE">Moderate</option>
                                <option value="LONG_LASTING">Long Lasting</option>
                                <option value="ETERNAL">Eternal</option>
                            </select>
                        </div>

                        {/* Projection */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1">Projection</label>
                            <select
                                value={formData.projection_rating}
                                onChange={(e) => setFormData({ ...formData, projection_rating: e.target.value as ProjectionRating })}
                                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100"
                            >
                                <option value="INTIMATE">Intimate</option>
                                <option value="MODERATE">Moderate</option>
                                <option value="STRONG">Strong</option>
                                <option value="BEASTMODE">Beastmode</option>
                            </select>
                        </div>
                    </div>

                    {/* Repurchase Intent */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1">Repurchase Intent</label>
                        <select
                            value={formData.repurchase_intent}
                            onChange={(e) => setFormData({ ...formData, repurchase_intent: e.target.value as RepurchaseIntent })}
                            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100"
                        >
                            <option value="DEFINITELY">Definitely</option>
                            <option value="MAYBE">Maybe</option>
                            <option value="UNDECIDED">Undecided</option>
                            <option value="NEVER">Never</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isPending}
                            className="px-4 py-2 text-sm font-medium rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="px-4 py-2 text-sm font-medium rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50"
                        >
                            {isPending ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}