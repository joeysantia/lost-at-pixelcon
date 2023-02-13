import format from "date-fns/format";
import { addScore } from "./components/firebase";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Level from "./components/Level";
import { CharArrayContext } from "./components/CharArrayContext";
import Leaderboard from "./components/Leaderboard";
import { IsGameOverContext } from "./components/IsGameOverContext";
import { NameContext } from "./components/NameContext";
import { TimeContext } from "./components/TimeContext";
import Patrick from "./img/patrick.png";
import Benson from "./img/benson.webp";
import Reptar from "./img/reptar.webp";
export default function App() {
  const [charArray, setCharArray] = useState([
    {
      name: "Reptar",
      coords: "703,334,30",
      img: { Reptar },
      hasBeenFound: false,
    },
    {
      name: "Benson",
      coords: "542,166,25",
      img: { Benson },
      hasBeenFound: false,
    },
    {
      name: "Patrick",
      coords: "1155,219,25",
      img: { Patrick },
      hasBeenFound: false,
    },
  ]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [time, setTime] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    if (name && time) {
      console.log([name, time]);
      sendScore();
    }
  }, [name, time]);

  async function sendScore() {
    let newScore = {
      name,
      time,
      date: format(new Date(), "MMM do, yyyy"),
    };
    try {
      await addScore(newScore);
      console.log("i sent a score!");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <BrowserRouter>
      <CharArrayContext.Provider value={[charArray, setCharArray]}>
        <IsGameOverContext.Provider value={[isGameOver, setIsGameOver]}>
          <NameContext.Provider value={[name, setName]}>
            <TimeContext.Provider value={[time, setTime]}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Header mode="home" />
                      <Home />
                    </>
                  }
                />
                <Route
                  path="/l1"
                  element={
                    <>
                      <Header mode="level" />
                      <Level />
                    </>
                  }
                />
                <Route
                  path="/leaderboard"
                  element={
                    <>
                      <Header mode="leaderboard" />
                      <Leaderboard name={name} />
                    </>
                  }
                />
              </Routes>
            </TimeContext.Provider>
          </NameContext.Provider>
        </IsGameOverContext.Provider>
      </CharArrayContext.Provider>
    </BrowserRouter>
  );
}
