import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CharArrayContext } from "./CharArrayContext";
import Dropdown from "./Dropdown";

describe("Dropdown", () => {
  let coords = [100, 150];
  //this needs to be a mock EventTarget
  let target = new Node();
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

  it.only("returns true if the dropdown is within a target", () => {
    //gotta figure out how to capture the eventTarget of userEvent, or to mock it
    render(
      <CharArrayContext.Provider value={[charArray, setCharArray]}>
        <img
          src="#"
          alt="alt"
          useMap="#map"
          style={{ height: "1000px", width: "1000px" }}
        ></img>
        <map id="map">
          <area id="Reptar" alt="Reptar" coords={coords} shape="circle"></area>
        </map>
        <Dropdown
          coords={coords}
          target={target}
          setIsDropdownRendered={setIsDropdownRendered}
        />
      </CharArrayContext.Provider>
    );
    userEvent.click(screen.getByRole("img", { name: "Reptar" }));
    expect(setIsDropdownRendered).toHaveBeenCalled();
  });

  it.skip("returns false if the target is outside of a target element", () => {});

  it.skip("mutates the charArray if the correct character is selected", () => {});
});
