import { useEffect, useState } from "react";
import { getScores } from "./firebase";
import formatTime from "./formatTime";
import "./Leaderboard.css";

export default function Leaderboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    initScores();
  }, []);

  async function initScores() {
    let scores = await getScores();
    let highScores = getHighScores(scores);
    setScores(highScores);

    function getHighScores(scores) {
      return scores.sort((a, b) => a.time - b.time).slice(0, 10);
    }
  }

  return (
    <main id="leaderboard">
      <h2>Best Times</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Time</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{score.name}</td>
                <td>{formatTime(score.time)}</td>
                <td>{score.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
