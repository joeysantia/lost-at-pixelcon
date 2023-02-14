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
    /**
     * the dropdown will render below and
     *  to the right of the cursor unless it is 
     * too far right or too far down. In
     * this case, it will render above
     * and to the left of the cursor 
     */
    left: (x + 200 >= window.innerWidth ? x - 200 : x),
    top:  (y + 200 >= window.innerWidth ? y - 200 : y),
  };

  return (
      <ul id="dropdown" style={style}>
        {charArray.map((char, i) => {
          if (!char.hasBeenFound) {
            //for documentation on the following line, see CharList.js
            let img = Object.values(char.img)[0]
            return (
              <li title={char.name} key={i} onClick={(e) => checkTarget(char)}>
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
