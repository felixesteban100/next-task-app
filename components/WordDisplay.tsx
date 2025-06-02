"use client"
import { useEffect, useState } from 'react'
import { ArrowLeft, Pause, Play } from 'lucide-react'
import { Button } from './ui/button'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from './ui/input'

const words = [
    'apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape',
    "love", "joy", "peace", "patience", "kindness", "goodness", "faithfulness", "gentleness", "self-control"
]

export default function WordDisplay() {
    // const [word, setWord] = useState<string>(words[Math.floor(Math.random() * words.length)])
    const [word, setWord] = useState<string>("PRESS PLAY")
    const [isPaused, setIsPaused] = useState<boolean>(true)
    const [timer, setTimer] = useState<string>("00:04")
    const [defaultTimeLeft, setDefaultTimeLeft] = useState<number>(4)

    useEffect(() => {
        if (word === "PRESS PLAY" && isPaused === false) setWord(words[Math.floor(Math.random() * words.length)])

        let currentIndex = 0
        let timeLeft = defaultTimeLeft // seconds

        setTimer(`00:${defaultTimeLeft < 10 ? '0' : ''}${defaultTimeLeft}`)

        const interval = setInterval(() => {
            if (!isPaused) {
                if (timeLeft <= 0) {
                    currentIndex = (currentIndex + 1) % words.length
                    setWord(words[currentIndex])
                    timeLeft = defaultTimeLeft // reset timer
                } else {
                    timeLeft -= 1
                }
                setTimer(`00:${timeLeft < 10 ? '0' : ''}${timeLeft}`)
            }
        }, (1000))

        return () => clearInterval(interval)
    }, [isPaused, word, defaultTimeLeft])

    return (
        <div className='flex flex-col gap-5 justify-center items-center h-[75vh] w-full'>
            <div className='flex flex-col gap-4 justify-center items-center'>
                <p className='text-4xl font-bold'>{word}</p>
                <Dialog>
                    <DialogTrigger disabled={!isPaused} className='cursor-pointer'>
                        <div className='border border-gray-300 hover:border-primary rounded-full p-5'>
                            <p>{timer}</p>
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Change seconds per word</DialogTitle>
                            <DialogDescription>
                                <p className='text-sm'>Default is 4 seconds. You can change it to any number of seconds you want (max 10 secs). </p>
                                <Input
                                    type="number"
                                    value={defaultTimeLeft}
                                    onChange={(e) => setDefaultTimeLeft(Number(e.target.value))}
                                    className='mt-2 w-full'
                                    min={1}
                                    max={10}
                                    placeholder="Enter seconds (1-10)"
                                />
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <div className='flex flex-row justify-between items-center gap-2 px-10'>
                    <Button
                        onClick={() => setIsPaused(!isPaused)}
                    >
                        {isPaused ? <Play /> : <Pause />}
                    </Button>
                    <Button
                        onClick={() => {
                            setWord("PRESS PLAY")
                            setTimer(`00:04`)
                        }}
                        disabled={!isPaused}
                        variant={"outline"}
                    >
                        <ArrowLeft />
                    </Button>
                </div>
                <div className='border border-gray-300 rounded-full p-5'>
                    <p>00:00 (Full time)</p>
                </div>
            </div>
        </div>
    )
}
