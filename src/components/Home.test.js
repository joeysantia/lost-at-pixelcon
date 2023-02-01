import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router"
import Home from "./Home"

jest.mock("./Header")
jest.mock("./Level")
jest.mock("./CharList")


describe("Home", () => {
    //unit tests
    it("renders with a heading, paragraph, and CharList", () => {
        render(<Home />, { wrapper: MemoryRouter })
        expect(screen).toMatchSnapshot()
    })

    //integration tests
    it("routes to the level when the button is clicked", () => {
        render(<Home />, { wrapper: MemoryRouter })
        userEvent.click(screen.getByRole("a"))
        expect(screen.getByAltText("background")).toBeInTheDocument()
    })
})