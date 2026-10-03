// app/(main)/groceries/[id]/actions.ts
'use server'

import { collectionGroceriesList } from '@/db/mongodb/mongodb'
import { ObjectId } from 'mongodb'

export async function toggleGroceryItem(
    listId: string,
    deptId: string,
    itemId: string,
    checked: boolean
) {
    const list = await collectionGroceriesList.findOne({ _id: new ObjectId(listId) })
    if (!list) throw new Error('List not found')

    const deptIndex = list.departments.findIndex(d => d.id === deptId)
    const itemIndex = list.departments[deptIndex].items.findIndex(i => i.id === itemId)

    await collectionGroceriesList.updateOne(
        { _id: new ObjectId(listId) },
        { $set: { [`departments.${deptIndex}.items.${itemIndex}.checked`]: checked } }
    )
}