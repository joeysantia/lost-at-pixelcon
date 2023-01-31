import CharArrayContext from "./CharArrayContext";
import Dropdown from "./Dropdown";
import { useState, useContext, useEffect } from "react";

export default function Level() {
    return null 
    const [isDropdownRendered, setIsDropdownRendered] = useState(false)
    const [target, setTarget] = useState(null)
    const [coords, setCoords] = useState(coords)
    const [didPlayerWin, setDidPlayerWin] = useState(false)

    const [charArray, setCharArray] = useContext(CharArrayContext)

    useEffect(() => {
        for (const char of charArray) {
            if (!char.hasBeenClicked) {
                return 
            }
            setDidPlayerWin(true)
        }
    }, [isDropdownRendered])

    function generateDropdown(e) {
        setTarget(e.target)
        setCoords([e.offsetX, e.offsetY])
        setIsDropdownRendered(true)
    }

    return (
        <img src="#" alt="background" useMap="level" onClick={(e) => generateDropdown(e)}>
            {isDropdownRendered && <Dropdown />}
            <map name="level">
                {charArray.map(char => {
                    const [x, y, radius] = char.coords
                    return <area 
                                alt="target"
                                id={char.name}
                                shape="circle"
                                coords={`${x}, ${y}, ${radius}`}
                            />
                })}
            </map>
        </img>
    )
}