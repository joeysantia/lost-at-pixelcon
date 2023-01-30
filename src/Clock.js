import { useContext, useEffect, useState } from "react";
import IsGameOver from "./IsGameOverContext";
import TimeContext from './TimeContext'
import formatTime from "./formatTime";

export default function Clock() {
    const [counter, setCounter] = useState(0)
    const [intervalId, setIntervalId] = useState(null)
    const [isGameOver, setIsGameOver] = useContext(IsGameOver)
    const [time, setTime] = useContext(TimeContext)

    useEffect(() => {
        if (!counter) {
            startTimer()
        }
        
        if (isGameOver) {
            stopTimer()
        }

        return () => {
            setTime(counter)
        }
    }, [isGameOver])

    function increment() {
        setCounter(counter => counter + 1)
    }

    function startTimer() {
        let intervalId = setInterval(increment(), 1000)
        setIntervalId(intervalId)
    }

    function stopTimer() {
        clearInterval(intervalId)
    }

    return (
        <div>
            {isGameOver && stopTimer()}
            <h2>
                {formatTime(counter)}
            </h2>
        </div>
    )
}