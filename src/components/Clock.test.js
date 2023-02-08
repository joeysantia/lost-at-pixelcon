import { render, screen } from "@testing-library/react";
import { IsGameOverContext } from "./IsGameOverContext";
import { TimeContext } from "./TimeContext";
import Clock from "./Clock";

describe("Clock", () => {
  let [isGameOver, setIsGameOver] = [false, jest.fn()];
  let [time, setTime] = [0, jest.fn()];
  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  it("renders as a heading", () => {
    let setIsGameOver = jest.fn();
    render(
      <IsGameOverContext.Provider value={[isGameOver, setIsGameOver]}>
        <TimeContext.Provider value={[time, setTime]}>
          <Clock setTime={setTime} />
        </TimeContext.Provider>
      </IsGameOverContext.Provider>
    );
    expect(screen).toMatchSnapshot();
  });

  it("starts the timer upon rendering", async () => {
    render(
      <IsGameOverContext.Provider value={[isGameOver, setIsGameOver]}>
        <TimeContext.Provider value={[time, setTime]}>
          <Clock setTime={setTime} />
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
    
    //0.5s delay for rendering
    await wait(2500);

    expect(screen.getByText("00 : 00 : 02")).toBeInTheDocument();
  });

  it("sends time when component unmounts", async () => {

    const { unmount } = render(
      <IsGameOverContext.Provider value={[isGameOver, setIsGameOver]}>
        <TimeContext.Provider value={[time, setTime]}>
          <Clock />
        </TimeContext.Provider>
      </IsGameOverContext.Provider>
    );
    await wait(2500);

    unmount();

    expect(setTime).toHaveBeenCalled();
  });
});
