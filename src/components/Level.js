import { CharArrayContext } from "./CharArrayContext";
import Dropdown from "./Dropdown";
import { useState, useContext, useEffect } from "react";
import EnterName from "./EnterName";
import Background from "../img/background.png"
import "./Level.css"

export default function Level() {
  const [isDropdownRendered, setIsDropdownRendered] = useState(false);
  const [target, setTarget] = useState(null);
  const [coords, setCoords] = useState([]);
  const [playerWon, setPlayerWon] = useState(false);

  const [charArray, setCharArray] = useContext(CharArrayContext);

  useEffect(() => {
    for (const char of charArray) {
      if (!char.hasBeenFound) {
        return;
      }
    }
    setPlayerWon(true);
  }, [isDropdownRendered]);

  function generateDropdown(e) {
    setTarget(e.nativeEvent.target);
    setCoords([e.nativeEvent.layerX, e.nativeEvent.layerY]);
    setIsDropdownRendered(true);
  }

  return (
    <main>
      {isDropdownRendered && (
        <Dropdown
          coords={coords}
          target={target}
          setIsDropdownRendered={setIsDropdownRendered}
        />
      )}
      {playerWon && <EnterName />}
      <img
        src={Background}
        alt="background"
        useMap="#l1"
        onClick={(e) => generateDropdown(e)}
      />
      <map id="l1" name="l1">
        {charArray.map((char, i) => {
          return (
            <area
              key={i}
              shape="circle"
              coords={char.coords}
              alt="target"
              title={char.name}
              id={char.name}
              onClick={(e) => generateDropdown(e)}
            />
          );
        })}
      </map>
    </main>
  );
}
