import { useEffect, useState } from "react";
import { getScores } from "./firebase";

export default function Leaderboard() {
  const [scores, setScores] = useState([]);
  useEffect(() => {
    async function initScores() {
      let scores = await getScores();
      console.log(scores)
      let highScores = getHighScores(scores);
      setScores(highScores);

      function getHighScores(scores) {
        return scores.sort((a, b) => a.time - b.time).slice(0, 10);
      }
    }
    initScores();
  }, []);

  
  return (
    <main>
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
                <td>{score.time}</td>
                <td>{score.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
