import { useContext } from "react";
import { CharArrayContext } from "./CharArrayContext";
import './Dropdown.css'
const Dropdown = ({ coords, target, setIsDropdownRendered }) => {
  const [charArray, setCharArray] = useContext(CharArrayContext);

  function checkTarget(char) {
    let charArea = document.querySelector(`#${char.name}`);
    if (charArea && charArea.contains(target)) {
      let copyArr = JSON.parse(JSON.stringify(charArray));
      for (const copyChar of copyArr) {
        if (char.name === copyChar.name) {
          copyChar.hasBeenFound = true;
          console.log(copyChar)
          setCharArray(copyArr);
          break;
        }
      }
    }
    setIsDropdownRendered(false);
  }

  let [x, y] = coords;
  let style = {
    position: "absolute",
    left: x,
    top: y,
  };

  return (
      <ul id="dropdown" style={style}>
        {charArray.map((char, i) => {
          if (!char.hasBeenFound) {
            let img = Object.values(char.img)[0]
            return (
              <li key={i} onClick={(e) => checkTarget(char)}>
                <img alt={char.name} src={img}></img>
                <p>{char.name}</p>
              </li>
            );
          } else {
            return null;
          }
        })}
      </ul>
  );
};

export default Dropdown;
