// app/(main)/groceries_list/[id]/page.tsx
import GroceriesListClient from '@/components/GroceriesListClient'
import { collectionGroceriesList } from '@/db/mongodb/mongodb'
import { ObjectId } from 'mongodb'

export type GroceryItem = {
  id: string
  label: string
  qty?: string
  checked: boolean
  note?: string
}

export type GroceryDepartment = {
  id: string
  icon: string
  name: string
  items: GroceryItem[]
}

export type GroceriesList = {
  _id?: ObjectId
  name: string
  createdAt: Date
  departments: GroceryDepartment[]
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function GroceriesPage({ params }: PageProps) {
  // Await the params Promise required in Next.js 15
  const { id } = await params

  const list = await collectionGroceriesList.findOne({ _id: new ObjectId(id) })
  if (!list) return <div>List not found</div>

  // Serialize ObjectId to string for the client
  return <GroceriesListClient list={{ ...list, _id: list._id.toString() }} />
}