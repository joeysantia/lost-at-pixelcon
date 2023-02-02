import { CharArrayContext } from "./CharArrayContext";
import Dropdown from "./Dropdown";
import { useState, useContext, useEffect } from "react";
import EnterName from "./EnterName";

export default function Level() {
  const [isDropdownRendered, setIsDropdownRendered] = useState(false);
  const [target, setTarget] = useState(null);
  const [coords, setCoords] = useState([]);
  const [didPlayerWin, setDidPlayerWin] = useState(false);

  const [charArray, setCharArray] = useContext(CharArrayContext);

  useEffect(() => {
    for (const char of charArray) {
      if (!char.hasBeenFound) {
        return;
      }
      setDidPlayerWin(true);
      console.log('happy path')
    }
  }, [isDropdownRendered]);

  function generateDropdown(e) {
    setTarget(e.target);
    setCoords([e.offsetX, e.offsetY]);
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
      {didPlayerWin && <EnterName />}
      <img
        src="#"
        alt="background"
        useMap="level"
        onClick={(e) => generateDropdown(e)}
      ></img>
      <map name="level">
        {charArray.map((char, i) => {
          const [x, y, radius] = char.coords;
          return (
            <area
              key={i}
              alt="target"
              id={char.name}
              shape="circle"
              coords={`${x}, ${y}, ${radius}`}
            />
          );
        })}
      </map>
    </main>
  );
}
