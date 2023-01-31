import { render, screen } from "@testing-library/react";
import IsGameOverContext from "./IsGameOverContext";
import TimeContext from "./TimeContext";
import Clock from "./Clock";

describe("Clock", () => {
  let [isGameOver, setIsGameOver] = [
    false,
    jest.fn(() => {
      isGameOver = true;
      return;
    }),
  ];
  let [time, setTime] = [0, jest.fn()];
  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  it("renders as a heading", () => {
    let setIsGameOver = jest.fn();
    render(
      <IsGameOverContext.Provider value={[isGameOver, setIsGameOver]}>
        <TimeContext.Provider value={[time, setTime]}>
          <Clock />
        </TimeContext.Provider>
      </IsGameOverContext.Provider>
    );
    expect(screen).toMatchSnapshot();
  });

  it("starts the timer upon rendering", async () => {
    render(
      <IsGameOverContext.Provider value={[isGameOver, setIsGameOver]}>
        <TimeContext.Provider value={[time, setTime]}>
          <Clock />
        </TimeContext.Provider>
      </IsGameOverContext.Provider>
    );
    expect(screen.getByText("00 : 00 : 00")).toBeInTheDocument();
  });

  it("updates the timer to display the passage of 3 seconds", async () => {
    render(
      <IsGameOverContext.Provider value={[isGameOver, setIsGameOver]}>
        <TimeContext.Provider value={[time, setTime]}>
          <Clock />
        </TimeContext.Provider>
      </IsGameOverContext.Provider>
    );

    //0.5s delay to allow state to update
    await wait(3500);
    expect(screen.getByText("00 : 00 : 03")).toBeInTheDocument();
  });

  it.skip("stops the timer when IsGameOverContext changes", () => {
    //look up how to update context during a test
  });

  it.skip("updates TimeContext when component unmounts", () => {
    //look up how to unmount a component during a test
    render(
      <IsGameOverContext.Provider value={[true, setIsGameOver]}>
        <TimeContext.Provider value={[time, setTime]}>
          <Clock />
        </TimeContext.Provider>
      </IsGameOverContext.Provider>
    );
    setIsGameOver();
    expect(setTime).toHaveBeenCalled();
  });
});