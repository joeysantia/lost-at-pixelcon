import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { TimeContext } from "./TimeContext";
import formatTime from "./formatTime";
import { IsGameOverContext } from "./IsGameOverContext";

export default function Clock() {
  const [counter, setCounter] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [time, setTime] = useContext(TimeContext);
  const [isGameOver, setIsGameOver] = useContext(IsGameOverContext)
  let counterRef = useRef();
  counterRef.current = counter;

  useEffect(() => {
    if (!intervalId) {
      let intervalId = setInterval(() => {
        increment();
      }, 1000);
      setIntervalId(intervalId);
    }

    if (isGameOver) {
      clearInterval(intervalId)
    }

    return () => {
      if (counterRef.current > 0) {
        setTime(counterRef.current);
        clearInterval(intervalId);
      }
    };
  }, [isGameOver]);
  
  function increment() {
    setCounter((counter) => counter + 1);
  }

  return (
    <div>
      <h2>{formatTime(counter)}</h2>
    </div>
  );
}
