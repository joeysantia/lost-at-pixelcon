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


    it('renders scores in order from fastest to slowest', async () => {
        await act(async () => await render(<Leaderboard />))
        

        /**
         * if the rows below exist with those names,
         * then that means Waluigi (the fastest) is rendered
         * in first place, and Luigi (the second fastest) is
         * rendered in second place.
         * 
         * The name is a combination of the information
         * in each row's cells (place, name, time, date) 
         */
        expect(screen.getByRole("row", { name: "1 Waluigi 00 : 01 : 20 Feb 12, 2023"})).toBeInTheDocument()
        expect(screen.getByRole("row", { name: "2 Luigi 00 : 01 : 50 Mar 4, 2023"})).toBeInTheDocument()
    })
})