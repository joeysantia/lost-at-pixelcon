import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CharArrayContext } from "./CharArrayContext";
import CharList from "./CharList";
import Patrick from "../img/patrick.png";
import Benson from "../img/benson.webp";
import Reptar from "../img/reptar.webp";
import "./Home.css"

export default function Home() {
    const [charArray, setCharArray] = useContext(CharArrayContext)

    useEffect(() => {
        setCharArray([
            {
              name: "Reptar",
              coords: "703,334,30",
              img: { Reptar },
              hasBeenFound: false,
            },
            {
              name: "Benson",
              coords: "542,166,25",
              img: { Benson },
              hasBeenFound: false,
            },
            {
              name: "Patrick",
              coords: "1155,219,25",
              img: { Patrick },
              hasBeenFound: false,
            },
          ])
    }, [])
    return (
        <main id="home">
            <h2>Lost at PixelCon</h2>
            <p>Find the three characters below as quickly as you can:</p>
            <CharList />
            <Link to="/l1">
                <button>Start</button>
            </Link>
        </main>
    )
}