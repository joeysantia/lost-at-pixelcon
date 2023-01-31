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

        if (!intervalId) {
            let intervalId = setInterval(() => {
                increment()}
                , 1000)
            setIntervalId(intervalId)        
        }
        

        return function sendInfo() {
                clearInterval(intervalId)
                if (counter > 0) setTime(counter)
        }
    }, [])

    function increment() {
        setCounter(counter => counter + 1)
    }

    return (
        <div>

            <h2>
                {formatTime(counter)}
            </h2>
        </div>
    )
}