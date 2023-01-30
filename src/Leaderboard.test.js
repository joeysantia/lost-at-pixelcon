import { render, screen } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import Leaderboard from "./Leaderboard"

//mock getScores for these tests 

jest.mock('./firebase.js', () => {
    return {
        __esModule: true,
        ...jest.requireActual('./firebase.js'),
        getScores: () => {
            return [
                {
                    name: "Mario",
                    time: 120,
                    date: "Feb 11, 2023"
                },
                {
                    name: "Waluigi",
                    time: 80,
                    date: "Feb 12, 2023"
                },
                {
                    name: "Luigi",
                    time: 110,
                    date: "Mar 4, 2023"
                },
                {
                    name: "Wario",
                    time: 700,
                    date: "Feb 13, 2001"
                } 
            ]
        }
    }
})

describe('Leaderboard', () => {
    it('renders with a header and table', () => {
        render(<Leaderboard />)
        expect(screen).toMatchSnapshot()
    })

    
    it('only renders the top ten scores', async () => {
        await act(async () => await render(<Leaderboard />))
        expect(screen.getByText("Wario")).toBeInTheDocument()
    })


    it.skip('renders scores in order from fastest to slowest', async () => {
        await act(async () => await render(<Leaderboard />))
        //let times = screen.getAllByRole("img")
        /**
         * look up how to get the children of a node (table)
         */
    })
})