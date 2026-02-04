import { CardThanksgiving } from '@/components/CardThanksgiving';
import { collectionThanksgivings } from '@/db/mongodb/mongodb';
import React from 'react'

export type Thanksgivings = {
    thanksgivings: Thanksgiving[];
}

export type Thanksgiving = {
    name: string;
    description: string;
    img: string;
    date: Date;
}

export default async function page() {
    const personalThanksgivings = await collectionThanksgivings.findOne()

    return (
        <div className='grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3'>
            {personalThanksgivings?.thanksgivings.map((item, index) => (
                <CardThanksgiving key={index} thanksgiving={item} />
            ))}
        </div>
    )
}
