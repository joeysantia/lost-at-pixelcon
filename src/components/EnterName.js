import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { NameContext } from "./NameContext"
import './EnterName.css'

export default function EnterName() {
    const [input, setInput] = useState('')
    const [name, setName] = useContext(NameContext)

    useEffect(() => {
        document.body.style = {
            position: "fixed",
            overflow: "hidden"
        }

        return () => {
            console.log('entername cleanup')
            setName(input)
        }
    }, [])

    function handleOnSubmit(e) {
        e.preventDefault()
        if (input.length > 0) {
            setName(input)
            console.log('i submitted', input)
        }
    }

    return (
        <form id="enter-name" onSubmit={(e) => handleOnSubmit(e)}>
            <h2>You won!</h2>
            <label htmlFor="name">Enter your name to submit your time to the leaderboard.</label>
            <input id="name" name="name" type="text" required onChange={(e) => setInput(e.target.value)}></input>
            {input.length > 0 ? <Link to="../leaderboard"><button>Submit</button></Link> : <button>Submit</button>}
        </form>
    )


}