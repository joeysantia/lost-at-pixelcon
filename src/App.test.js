import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import App from "./App";

describe("App", () => {
  let mockAddScore = jest.fn();
  jest.mock("./components/firebase.js", () => {
    return {
      __esModule: true,
      ...jest.requireActual("./components/firebase.js"),
      addScores: () => {
        console.log('add Score')
        return mockAddScore()
      },
      getScores: () => {
        console.log('get scores')
        return [
          {
            name: "Mario",
            time: 120,
            date: "Feb 11, 2023",
          },
          {
            name: "Waluigi",
            time: 80,
            date: "Feb 12, 2023",
          },
          {
            name: "Luigi",
            time: 110,
            date: "Mar 4, 2023",
          },
          {
            name: "Wario",
            time: 700,
            date: "Feb 13, 2001",
          },
        ];
      },
    };
  });

  //routing tests
  it("renders on the Home page", () => {
    render(<App />);
    expect(screen.getByText("Start")).toBeInTheDocument();
  });

  it("routes to the Level when the start button is clicked", () => {
    render(<App />);
    userEvent.click(screen.getByRole("button", { name: "Start" }));
    expect(screen.getByRole("img", { name: "background" })).toBeInTheDocument();
  });

  it("routes back to the Home page when the logo is clicked", () => {
    render(<App />);
    userEvent.click(screen.getByRole("link", { name: "Lost at PixelCon" }));
    expect(screen.getByText("Start")).toBeInTheDocument();
  });
})
