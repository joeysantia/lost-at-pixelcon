import { useContext } from "react";
import { IsGameOverContext } from "./IsGameOverContext";
import Clock from "./Clock";
import { TimeContext } from "./TimeContext";
import { CharArrayContext } from "./CharArrayContext";
import { Link } from "react-router-dom";
const Header = ({ mode }) => {

  return (
    <nav>
      <div id="header-left-box">
        <Link to="/">
          <h1>Lost at PixelCon</h1>
        </Link>
        {mode === "level" && <Clock />}
        {mode === "leaderboard" && <Link to="/l1">Play again?</Link>}
      </div>
    </nav>
  );
};

export default Header;
