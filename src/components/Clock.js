import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { TimeContext } from "./TimeContext";
import formatTime from "./formatTime";

export default function Clock() {
  const [counter, setCounter] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [time, setTime] = useContext(TimeContext);

  useEffect(() => {

    if (!intervalId) {
      let intervalId = setInterval(() => {
        increment();
      }, 1000);
      setIntervalId(intervalId);
      console.log(intervalId)
    }
  }, []);

  useLayoutEffect(() => {
    return () => {
        console.log('somewhat happy path')
        console.log('counter:' , counter)
        if (counter > 0) {
          console.log("happy path");
          setTime(counter);
          clearInterval(intervalId);
        }
      };
  }, [])

  function increment() {
    setCounter((counter) => counter + 1);
  }
  return (
    <div>
      <h2>{formatTime(counter)}</h2>
    </div>
  );
}
