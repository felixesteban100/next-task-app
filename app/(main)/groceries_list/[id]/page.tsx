// app/(main)/groceries/[id]/page.tsx  (Server Component)
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

export default async function GroceriesPage({ params }: { params: { id: string } }) {
  const list = await collectionGroceriesList.findOne({ _id: new ObjectId(params.id) })
  if (!list) return <div>List not found</div>

  // Serialize ObjectId to string for the client
  return <GroceriesListClient list={{ ...list, _id: list._id.toString() }} />
}