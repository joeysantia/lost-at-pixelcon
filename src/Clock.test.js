import { render, screen } from "@testing-library/react";
import IsGameOverContext from "./IsGameOverContext";
import TimeContext from "./TimeContext";
import Clock from "./Clock";
import { shallow } from "enzyme";

describe("Clock", () => {
  let [isGameOver, setIsGameOver] = [false, jest.fn(() => {
    isGameOver = true;
    return 
  })];
  let [time, setTime] = [0, jest.fn()];

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

  it.only("starts the timer upon rendering", () => {
    render(<IsGameOverContext.Provider value={[isGameOver, setIsGameOver]}>
        <TimeContext.Provider value={[time, setTime]}>
          <Clock />
        </TimeContext.Provider>
      </IsGameOverContext.Provider>)
    //if the text below appears, then the timer has not started
    expect(screen.queryByText("00 : 00 : 00")).not.toBeInTheDocument()
  });

  it.skip("stops the timer when IsGameOverContext changes", () => {
    //look up how to update context during a test
  });

  it("updates TimeContext when component unmounts", () => {
    //look up how to unmount a component during a test
    render(
        <IsGameOverContext.Provider value={[true, setIsGameOver]}>
          <TimeContext.Provider value={[time, setTime]}>
            <Clock />
          </TimeContext.Provider>
        </IsGameOverContext.Provider>
      );
    setIsGameOver()
    expect(setTime).toHaveBeenCalled()
    
  });
});
