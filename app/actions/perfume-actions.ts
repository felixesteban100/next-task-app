'use server';

import { revalidatePath } from "next/cache";
import { UserPerfumeData, PerfumeDocument } from "@/types";
import { collectionPerfumes } from "@/db/mongodb/mongodb";
import { ObjectId, Filter } from "mongodb";

export async function updatePerfumeUserData(perfumeId: string, userData: UserPerfumeData) {
    try {
        const filter = { _id: new ObjectId(perfumeId) } as unknown as Filter<PerfumeDocument>;

        const result = await collectionPerfumes.updateOne(
            filter,
            { $set: { user_data: userData, updatedAt: new Date() } }
        );

        if (result.modifiedCount === 0) {
            return { success: false, error: "Perfume not found or no changes made." };
        }

        revalidatePath('/perfumes');
        return { success: true };
    } catch (error: unknown) {
        console.error("Failed to update perfume user data:", error);
        const errorMessage = error instanceof Error ? error.message : "Database update failed.";
        return { success: false, error: errorMessage };
    }
}