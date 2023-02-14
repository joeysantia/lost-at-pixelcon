import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CharArrayContext } from "./CharArrayContext";
import { IsGameOverContext } from "./IsGameOverContext";
import Level from "./Level";
import { NameContext } from "./NameContext";

describe("Level", () => {
  let [charArray, setCharArray] = [
    [
      {
        name: "Reptar",
        coords: "703, 334, 30",
        img: { src: "#" },
        hasBeenFound: false,
      },
      {
        name: "Benson",
        coords: "542, 166, 25",
        img: { src: "#" },
        hasBeenFound: false,
      },
      {
        name: "Patrick",
        coords: "1155, 219, 25",
        img: { src: "#" },
        hasBeenFound: false,
      },
    ],
    jest.fn(),
  ];
  let [isGameOver, setIsGameOver] = [false, jest.fn()];

  it("renders an image and areas", () => {
    render(
      <CharArrayContext.Provider value={[charArray, setCharArray]}>
        <IsGameOverContext.Provider value={[isGameOver, setIsGameOver]}>
          <Level />
        </IsGameOverContext.Provider>
      </CharArrayContext.Provider>
    );
    expect(screen).toMatchSnapshot();
  });

  it("generates an EnterName component when a player wins", () => {
    let allCharsFound = [
      {
        name: "Reptar",
        coords: "703, 334, 30",
        img: { src: "#" },
        hasBeenFound: true,
      },
      {
        name: "Benson",
        coords: "542, 166, 25",
        img: { src: "#" },
        hasBeenFound: true,
      },
      {
        name: "Patrick",
        coords: "1155, 219, 25",
        img: { src: "#" },
        hasBeenFound: true,
      },
    ];
    render(
      <CharArrayContext.Provider value={[allCharsFound, setCharArray]}>
        <NameContext.Provider value={["", jest.fn()]}>
          <IsGameOverContext.Provider value={[true, setIsGameOver]}>
            <Level />
          </IsGameOverContext.Provider>
        </NameContext.Provider>
      </CharArrayContext.Provider>
    );

    //this button will only render if the EnterName component renders
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("generates a Dropdown element when the image is clicked", () => {
    render(
      <CharArrayContext.Provider value={[charArray, setCharArray]}>
        <IsGameOverContext.Provider value={[isGameOver, setIsGameOver]}>
          <Level />
        </IsGameOverContext.Provider>
      </CharArrayContext.Provider>
    );
    userEvent.click(screen.getByRole("img"));
    expect(screen.getByRole("list")).toBeInTheDocument();
  });
});
