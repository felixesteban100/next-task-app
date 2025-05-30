// import { Button } from '@/components/ui/button'
import WordDisplay from '@/components/WordDisplay'

export default function page() {
    return (
        <div className='flex flex-col gap-5 justify-center items-center h-[75vh] w-full'>
            <WordDisplay />
            {/* <div className='flex flex-row justify-between items-center gap-2 w-full px-10'>
                <Button className='bg-green-500 hover:bg-green-600'>Next</Button>
                <Button className='bg-red-500 hover:bg-red-600'>Stop</Button>
            </div> */}
        </div>
    )
}
