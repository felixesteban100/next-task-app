// app/(main)/groceries_list/page.tsx
import { collectionGroceriesList } from '@/db/mongodb/mongodb'
import Link from 'next/link'
import { GroceriesList, GroceryDepartment, GroceryItem } from './[id]/page'

export default async function GroceriesListPage() {
    const lists = await collectionGroceriesList.find({}).sort({ createdAt: -1 }).toArray()
    const serialized = JSON.parse(JSON.stringify(lists))

    return (
        <div className="min-h-screen bg-[#f5f0e8] px-3 py-8 pb-20">
            <div className="max-w-xl mx-auto">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#2d6a4f]">🛒 Listas del Mercado</h1>
                    <p className="text-sm text-[#7a7060] mt-1">Market Basket</p>
                    <div className="w-12 h-0.5 bg-[#e76f51] mx-auto mt-3 rounded-full" />
                </div>

                {/* Lists */}
                {serialized.length === 0 ? (
                    <div className="text-center text-[#7a7060] mt-16">
                        <p className="text-4xl mb-3">🧺</p>
                        <p className="text-base">No hay listas todavía</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {serialized.map((list: GroceriesList) => {
                            const allItems = list.departments.flatMap((d: GroceryDepartment) => d.items)
                            const checkedCount = allItems.filter((i: GroceryItem) => i.checked).length
                            const total = allItems.length
                            const pct = total > 0 ? Math.round((checkedCount / total) * 100) : 0
                            const done = checkedCount === total && total > 0

                            return (
                                <Link
                                    key={list._id?.toString()}
                                    href={`/groceries_list/${list._id}`}
                                    className="bg-white rounded-2xl border border-[#e0d8cc] shadow-sm p-4 flex flex-col gap-3 active:scale-[0.98] transition-transform"
                                >
                                    {/* Name + done badge */}
                                    <div className="flex items-start justify-between gap-2">
                                        <span className="font-semibold text-[#1a1a1a] text-base leading-tight">
                                            {list.name}
                                        </span>
                                        {done && (
                                            <span className="text-xs font-semibold bg-[#edf6f0] text-[#2d6a4f] border border-[#b7dfc9] px-2 py-0.5 rounded-full whitespace-nowrap">
                                                ✓ Completada
                                            </span>
                                        )}
                                    </div>

                                    {/* Progress bar */}
                                    <div>
                                        <div className="h-1.5 bg-[#e0d8cc] rounded-full overflow-hidden mb-1">
                                            <div
                                                className="h-full bg-gradient-to-r from-[#2d6a4f] to-[#52b788] rounded-full transition-all"
                                                style={{ width: `${pct}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-xs text-[#7a7060]">
                                            <span>{checkedCount} de {total} artículos</span>
                                            <span>{pct}%</span>
                                        </div>
                                    </div>

                                    {/* Meta: date + dept count */}
                                    <div className="flex items-center justify-between text-xs text-[#7a7060]">
                                        <span>
                                            {new Date(list.createdAt).toLocaleDateString('es-DO', {
                                                year: 'numeric', month: 'short', day: 'numeric'
                                            })}
                                        </span>
                                        <span>{list.departments.length} departamentos</span>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}