import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import NameContext from "./NameContext"

export default function EnterName() {
    const [input, setInput] = useState('')
    const [name, setName] = useContext(NameContext)

    //useEffect(() => () => setName(input), [])
        //might want to put this on the button's click
        /*return function submitName() {
            setName(input)
        }
    }, [input])*/

    function handleOnSubmit(e) {
        e.preventDefault()
        if (input.length > 0) {
            setName(input)
        }
    }

    return (
        <form id="enter-name" onSubmit={(e) => handleOnSubmit(e)}>
            <h2>You won!</h2>
            <label htmlFor="name">Enter your name to submit your score.</label>
            <input id="name" name="name" type="text" required onChange={(e) => setInput(e.target.value)}></input>
            <button>
                {input.length > 0 && <Link to="/leaderboard"/>}
                Submit
            </button>
        </form>
    )


}