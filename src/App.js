import format from "date-fns/format";
import { addScore, getScores } from "./firebase";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CharArrayContext from "./CharArrayContext";
import IsGameOverContext from "./IsGameOverContext";
import NameContext from "./NameContext";
import TimeContext from "./TimeContext";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Level from "./Level";
import Leaderboard from "./Leaderboard";

export default function App() {
  const [charArray, setCharArray] = useState([
    {
      name: "",
      location: {},
      hasBeenFound: false,
    },
    {
      name: "",
      location: {},
      hasBeenFound: false,
    },
    {
      name: "",
      location: {},
      hasBeenFound: false,
    },
  ]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [time, setTime] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    sendScore();
  }, [name, time]);

  async function sendScore() {
    if (time && name) {
      let newScore = {
        name,
        time,
        date: format(new Date(), "MMM Do, YYYY"),
      };
      try {
        await addScore(newScore);
      } catch(err) {
        console.error(err)
      }
    }
  }

  return (
    <BrowserRouter>
      <CharArrayContext.Provider value={[charArray, setCharArray]}>
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
              <IsGameOverContext.Provider value={[isGameOver, setIsGameOver]}>
                <NameContext.Provider value={[name, setName]}>
                  <TimeContext.Provider value={[time, setTime]}>
                  <Header mode="level" />
                  <Level />
                  </TimeContext.Provider>
                </NameContext.Provider>
              </IsGameOverContext.Provider>
              
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
      </CharArrayContext.Provider>
    </BrowserRouter>
  );
}
