import { render, screen } from "@testing-library/react"
import EnterName from "./EnterName"
import NameContext from "./NameContext"
describe('EnterName', () => {

    //unit tests
    it('renders with a heading, paragraph, and input', () => {
        let name = ''
        let setName = jest.fn()
        render(<NameContext.Provider value={[name, setName]}>
                <EnterName />
            </NameContext.Provider>)
        expect(screen).toMatchSnapshot()
    })

    it.skip('renders initially with no input value', () => {

    })

    it.skip('input state changes when input value changes', () => {

    })

    //integration tests
    it.skip('routes to Leaderboard when button is clicked', () => {

    })

    it.skip('updates name when button is clicked', () => {

    })
})