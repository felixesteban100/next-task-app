"use client"
import { useEffect, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { Button } from './ui/button'

const words = [
    'apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape',
    "love", "joy", "peace", "patience", "kindness", "goodness", "faithfulness", "gentleness", "self-control"
]

export default function WordDisplay() {
    const [word, setWord] = useState<string>(words[Math.floor(Math.random() * words.length)])
    const [isPaused, setIsPaused] = useState<boolean>(true)
    const [timer, setTimer] = useState<string>("00:04")

    useEffect(() => {
        let currentIndex = 0
        let timeLeft = 4 // seconds

        const interval = setInterval(() => {
            if (!isPaused) {
                if (timeLeft <= 0) {
                    currentIndex = (currentIndex + 1) % words.length
                    setWord(words[currentIndex])
                    timeLeft = 4 // reset timer
                } else {
                    timeLeft -= 1
                }
                setTimer(`00:${timeLeft < 10 ? '0' : ''}${timeLeft}`)
            }
        }, (100 * timeLeft))

        return () => clearInterval(interval)
    }, [isPaused])

    return (
        <div className='flex flex-col gap-2 justify-center items-center'>
            <p className='text-4xl font-bold'>{word}</p>
            <p>{timer}</p>
            <Button
                onClick={() => setIsPaused(!isPaused)}
            >
                {isPaused ? <Play /> : <Pause />}
            </Button>
        </div>
    )
}
