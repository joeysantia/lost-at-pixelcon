import { Link } from "react-router-dom";
import CharList from "./CharList";

export default function Home() {
    return (
        <main>
            <h2>Lost at PixelCon</h2>
            <p>Find the three characters below as quickly as you can:</p>
            <CharList />
            <Link to="/l1">
                <button>Start</button>
            </Link>
        </main>
    )
}