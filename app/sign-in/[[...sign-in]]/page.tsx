import { SignIn } from '@clerk/nextjs'

export default function Page() {
    //min-h-screen
    return <div className='mt-20 w-full flex justify-center items-center '>
        <SignIn />
    </div>
}