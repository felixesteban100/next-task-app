// app/(main)/groceries/[id]/GroceriesListClient.tsx
'use client'

import { toggleGroceryItem } from '@/app/actions/groceries'
import { useState } from 'react'

type GroceryItem = {
  id: string
  label: string
  qty?: string
  note?: string
  checked: boolean
}

type GroceryDepartment = {
  id: string
  icon: string
  name: string
  items: GroceryItem[]
}

type GroceriesList = {
  _id: string
  name: string
  departments: GroceryDepartment[]
}

export default function GroceriesListClient({ list }: { list: GroceriesList }) {
  const [departments, setDepartments] = useState<GroceryDepartment[]>(list.departments)
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const allItems = departments.flatMap(d => d.items)
  const checkedCount = allItems.filter(i => i.checked).length
  const pct = allItems.length > 0 ? Math.round((checkedCount / allItems.length) * 100) : 0

  function toggleCollapse(deptId: string) {
    setCollapsed(prev => ({ ...prev, [deptId]: !prev[deptId] }))
  }

  async function handleToggle(deptId: string, itemId: string, checked: boolean) {
    // Optimistic update
    setDepartments(prev =>
      prev.map(dept =>
        dept.id !== deptId ? dept : {
          ...dept,
          items: dept.items.map(item =>
            item.id !== itemId ? item : { ...item, checked }
          )
        }
      )
    )

    // Server action — writes directly to MongoDB
    await toggleGroceryItem(list._id, deptId, itemId, checked)
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8] px-3 py-6 pb-20">
      <h1 className="text-center text-3xl font-bold text-[#2d6a4f] mb-1">{list.name}</h1>
      <p className="text-center text-sm text-[#7a7060] mb-4">Organizada por departamento</p>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="h-2 bg-[#e0d8cc] rounded-full overflow-hidden mb-1">
          <div
            className="h-full bg-gradient-to-r from-[#2d6a4f] to-[#52b788] rounded-full transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-[#7a7060]">
          <span>{checkedCount} de {allItems.length} artículos marcados</span>
          <span>{pct}%</span>
        </div>
      </div>

      {/* Departments */}
      <div className="flex flex-col gap-3 max-w-xl mx-auto">
        {departments.map(dept => {
          const isCollapsed = collapsed[dept.id]
          const deptChecked = dept.items.filter(i => i.checked).length

          return (
            <div key={dept.id} className="bg-white rounded-2xl border border-[#e0d8cc] shadow-sm overflow-hidden">
              {/* Department header */}
              <button
                onClick={() => toggleCollapse(dept.id)}
                className="w-full flex items-center gap-3 px-4 py-3 border-b border-[#e0d8cc] min-h-[56px]"
              >
                <span className="text-2xl">{dept.icon}</span>
                <span className="flex-1 text-left font-semibold text-sm text-[#1a1a1a]">{dept.name}</span>
                <span className="text-xs font-semibold bg-[#edf6f0] text-[#2d6a4f] border border-[#b7dfc9] px-2 py-0.5 rounded-full">
                  {deptChecked}/{dept.items.length}
                </span>
                <span
                  className="text-[#7a7060] text-xs transition-transform duration-200"
                  style={{ transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)' }}
                >
                  ▼
                </span>
              </button>

              {/* Items */}
              {!isCollapsed && (
                <div>
                  {dept.items.map(item => (
                    <label
                      key={item.id}
                      className="flex items-center gap-3 px-4 py-3 min-h-[52px] border-b border-[#f2ede4] last:border-b-0 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={e => handleToggle(dept.id, item.id, e.target.checked)}
                        className="hidden"
                      />
                      {/* Custom checkbox */}
                      <div className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${item.checked
                          ? 'bg-[#2d6a4f] border-[#2d6a4f]'
                          : 'bg-white border-[#e0d8cc]'
                        }`}>
                        {item.checked && <span className="text-white text-xs font-bold">✓</span>}
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className={`text-base transition-all ${item.checked ? 'line-through text-[#7a7060] opacity-60' : 'text-[#1a1a1a]'
                          }`}>
                          {item.label}
                        </span>
                        {item.note && (
                          <p className="text-xs text-[#7a7060] italic mt-0.5">{item.note}</p>
                        )}
                      </div>

                      {item.qty && (
                        <span className="text-xs font-semibold text-[#e76f51] bg-[#fff4f1] border border-[#f4c5b4] px-2 py-0.5 rounded-full whitespace-nowrap">
                          {item.qty}
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}