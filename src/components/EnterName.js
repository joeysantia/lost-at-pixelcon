import { useContext, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { NameContext } from "./NameContext"
import './EnterName.css'

export default function EnterName() {
    const [input, setInput] = useState('')
    const [name, setName] = useContext(NameContext)
    let inputRef = useRef();
    inputRef.current = input;
    useEffect(() => {
        

        return () => {
            setName(inputRef.current)
        }
    }, [])

    return (
        <form id="enter-name">
            <h2>You won!</h2>
            <label htmlFor="name">Enter your name to submit your time to the leaderboard.</label>
            <input id="name" name="name" type="text" required onChange={(e) => setInput(e.target.value)}></input>
            {/* link to the leaderboard only renders if the user has entered their name */}
            {input.length > 0 ? <Link to="../leaderboard"><button>Submit</button></Link> : <button>Submit</button>}
        </form>
    )


}