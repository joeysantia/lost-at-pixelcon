import Clock from "./Clock";
import { Link } from "react-router-dom";
import CharList from "./CharList";
import "./Header.css"
const Header = ({ mode }) => {

  return (
    <nav>
      <div id="header-left-box">
        <Link to="/">
          <h1>Lost at PixelCon</h1>
        </Link>
      </div>
        {mode === "level" && <Clock />}
        {mode === "level" && <CharList />}
        {mode === "leaderboard" && <Link id='play-again' to="/">Play again?</Link>}
    </nav>
  );
};

export default Header;
