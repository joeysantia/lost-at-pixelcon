import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CharArrayContext } from "./CharArrayContext";
import Dropdown from "./Dropdown";
describe("Dropdown", () => {
  let coords = [100, 150];
  let target = null;
  let setIsDropdownRendered = jest.fn();
  let charArray = [
    {
      name: "Reptar",
      coords: [],
      img: { src: "#" },
      hasBeenFound: false,
    },
    {
      name: "Benson",
      coords: [],
      img: { src: "#" },
      hasBeenFound: false,
    },
    {
      name: "Patrick",
      coords: [],
      img: { src: "#" },
      hasBeenFound: false,
    },
  ];
  let setCharArray = jest.fn();

  it("renders a div with an unordered list and three buttons", () => {
    render(
      <CharArrayContext.Provider value={[charArray, setCharArray]}>
        <Dropdown
          coords={coords}
          target={target}
          setIsDropdownRendered={setIsDropdownRendered}
        />
      </CharArrayContext.Provider>
    );

    expect(screen).toMatchSnapshot();
  });

  it("renders a div at the coordinates passed through props", () => {
    render(
      <CharArrayContext.Provider value={[charArray, setCharArray]}>
        <Dropdown
          coords={coords}
          target={target}
          setIsDropdownRendered={setIsDropdownRendered}
        />
      </CharArrayContext.Provider>
    );
    expect(screen.getByRole("list")).toHaveStyle("left: 100px");
    expect(screen.getByRole("list")).toHaveStyle("top: 150px");
  });

  it("dropdown will render when user clicks on a target", () => {
    //gotta figure out how to capture the eventTarget of userEvent, or to mock it
    render(
      <CharArrayContext.Provider value={[charArray, setCharArray]}>
        <img
          src="#"
          alt="alt"
          useMap="#map"
          style={{ height: "100vh", width: "100vw" }}
        ></img>
        <map id="map">
          <area
            title="Reptar-area"
            id="Reptar"
            alt="Reptar"
            coords={coords}
            shape="circle"
          ></area>
        </map>
        <Dropdown
          coords={coords}
          target={target}
          setIsDropdownRendered={setIsDropdownRendered}
        />
      </CharArrayContext.Provider>
    );
    userEvent.click(screen.getByTitle("Reptar"));
    expect(setIsDropdownRendered).toHaveBeenCalled();
  });

  it("does not mutate charArray if the target is outside of a target element", () => {
    render(
      <CharArrayContext.Provider value={[charArray, setCharArray]}>
        <img
          src="#"
          alt="alt"
          useMap="#map"
          style={{ height: "100vh", width: "100vw" }}
        ></img>
        <div title="not-target"></div>
        <map id="map">
          <area
            title="Reptar-area"
            id="Reptar"
            alt="Reptar"
            coords={coords}
            shape="circle"
          ></area>
        </map>
        <Dropdown
          coords={coords}
          target={target}
          setIsDropdownRendered={setIsDropdownRendered}
        />
      </CharArrayContext.Provider>
    );
    userEvent.click(screen.getByTitle("not-target"));
    userEvent.click(screen.getByRole("listitem", { name: "Reptar" }));
    expect(charArray[0].hasBeenFound).toBeFalsy();
  });

  it("mutates the charArray if the correct character is selected", () => {
    render(
      <CharArrayContext.Provider value={[charArray, setCharArray]}>
        <img
          src="#"
          alt="alt"
          useMap="#map"
          style={{ height: "100vh", width: "100vw" }}
        ></img>
        <div title="not-target"></div>
        <map id="map">
          <area
            title="Reptar-area"
            id="Reptar"
            alt="Reptar"
            coords={coords}
            shape="circle"
          ></area>
        </map>
        <Dropdown
          coords={coords}
          target={target}
          setIsDropdownRendered={setIsDropdownRendered}
        />
      </CharArrayContext.Provider>
    );
    userEvent.click(screen.getByTitle("Reptar-area"));
    userEvent.click(screen.getByRole("listitem", { name: "Reptar" }));
    expect(charArray[0].hasBeenFound).toBeFalsy();
  });
});
