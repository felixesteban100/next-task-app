import { ObjectId } from "mongodb";

export type Alien = {
    name: string;
    img: string;
    video: string;
    height?: {
        silouette?: string;
        character?: string;
    };
    ultimate?: Alien
    color?: string
    little?: Alien
    abilities?: string;
    weaknesses?: string;
}

export type OwnershipStatus = 'OWNED' | 'WISHLIST' | 'SAMPLED' | 'DECLUTTERED' | 'HAD_IT';
export type WearFrequency = 'DAILY_SIGNATURE' | 'REGULAR_ROTATION' | 'OCCASIONAL' | 'RARELY' | 'NEVER';
export type SeasonPreference = 'SPRING_SUMMER' | 'FALL_WINTER' | 'ALL_YEAR' | 'COLD_WEATHER_ONLY';
export type Occasion = 'DAILY_CASUAL' | 'OFFICE_WORK' | 'EVENING_SPECIAL' | 'GYM_SPORT' | 'DATE_NIGHT';
export type LongevityRating = 'WEAK' | 'MODERATE' | 'LONG_LASTING' | 'ETERNAL';
export type ProjectionRating = 'INTIMATE' | 'MODERATE' | 'STRONG' | 'BEASTMODE';
export type RepurchaseIntent = 'DEFINITELY' | 'MAYBE' | 'NEVER' | 'UNDECIDED';
export type Rating = 1 | 2 | 3 | 4 | 5 | null;

export interface UserPerfumeData {
    rating: Rating;
    ownership_status: OwnershipStatus;
    wear_frequency: WearFrequency;
    season_preference: SeasonPreference;
    occasion: Occasion;
    longevity_rating: LongevityRating;
    projection_rating: ProjectionRating;
    repurchase_intent: RepurchaseIntent;
}

export interface PerfumeDocument {
    _id?: ObjectId | string;
    name: string;
    brand: string;
    gender: string;
    concentration: string;
    size: string;
    sku: string;
    price: string;
    retail_price: string;
    fragrance_family: string;
    launch_year: number;
    top_notes: string[];
    heart_notes: string[];
    base_notes: string[];
    image: string;
    user_data: UserPerfumeData;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}