import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router"
import Header from "./Header"
import { IsGameOverContext } from "./IsGameOverContext"
import { TimeContext } from "./TimeContext"



describe("Header", () => {
    it('renders a navbar and a heading', () => {
        render(<Header />, { wrapper: MemoryRouter})
        expect(screen).toMatchSnapshot()
    })

    it('does not render a clock or "play again?" link when mode is welcomePage', () => {
        render(<Header mode="welcomePage"/>, { wrapper: MemoryRouter})
        expect(screen.queryByText("00 : 00: 00")).not.toBeInTheDocument()
        expect(screen.queryByText("Play again?")).not.toBeInTheDocument()
    })

    it('renders a clock when the mode is level', () => {
        render(
        <IsGameOverContext.Provider value={[false, jest.fn()]}>
            <TimeContext.Provider value={[0, jest.fn()]}>
                    <Header mode="level"/>
                </TimeContext.Provider>
        </IsGameOverContext.Provider>
        , { wrapper: MemoryRouter})
        expect(screen.getByText("00 : 00 : 00")).toBeInTheDocument()
    })

    it('renders a "Play Again?" button when mode is leaderboard', () => {
        render(<Header mode="leaderboard"/>, { wrapper: MemoryRouter})
        expect(screen.getByText("Play again?")).toBeInTheDocument()
    })
})