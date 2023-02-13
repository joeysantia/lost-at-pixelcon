import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { MemoryRouter, Route, Router, Routes } from "react-router";
import { CharArrayContext } from "./CharArrayContext";
import Header from "./Header";
import Home from "./Home";
import { IsGameOverContext } from "./IsGameOverContext";
import { NameContext } from "./NameContext";
import { TimeContext } from "./TimeContext";

jest.mock("./Header");
jest.mock("./Level");
jest.mock("./CharList");

describe("Home", () => {
  let setCharArray = jest.fn();
  let setName = jest.fn();
  let setTime = jest.fn();
  let setIsGameOver = jest.fn();
  //unit tests
  it("renders with a heading, paragraph, and CharList", () => {
    render(
      <CharArrayContext.Provider value={[[], setCharArray]}>
        <IsGameOverContext.Provider value={[false, setIsGameOver]}>
          <TimeContext.Provider value={[0, setTime]}>
            <NameContext.Provider value={["", setName]}>
              <Home />
            </NameContext.Provider>
          </TimeContext.Provider>
        </IsGameOverContext.Provider>
      </CharArrayContext.Provider>,
      { wrapper: MemoryRouter }
    );
    expect(screen).toMatchSnapshot();
  });

  it("resets context for charArray, time, and name", () => {
    render(
      <CharArrayContext.Provider
        value={[[{ hasBeenFound: true }], setCharArray]}
      >
        <IsGameOverContext.Provider value={[true, setIsGameOver]}>
          <TimeContext.Provider value={[10, setTime]}>
            <NameContext.Provider value={["Jim", setName]}>
              <Home />
            </NameContext.Provider>
          </TimeContext.Provider>
        </IsGameOverContext.Provider>
      </CharArrayContext.Provider>,
      { wrapper: MemoryRouter }
    );
    expect(setCharArray.mock.calls).toHaveLength(1);
    expect(setName.mock.calls).toHaveLength(1);
    expect(setTime.mock.calls).toHaveLength(1);
    expect(setIsGameOver.mock.calls).toHaveLength(1);
  });
});
