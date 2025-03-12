import { Loader } from 'lucide-react'
import React from 'react'

export default function loading() {
    return (
        <div>
            <Loader size={"100px"} className='animate-spin' />
        </div>
    )
}
