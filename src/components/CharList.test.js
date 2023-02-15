/* eslint-disable */

import { render, screen } from "@testing-library/react";
import { CharArrayContext } from "./CharArrayContext";
import CharList from "./CharList";

let charArray = [
  {
    name: "Reptar",
    coords: "",
    img: { src: "#" },
    hasBeenFound: false,
  },
  {
    name: "Benson",
    coords: "",
    img: { src: "#" },
    hasBeenFound: false,
  },
  {
    name: "Patrick",
    coords: "",
    img: { src: "#" },
    hasBeenFound: false,
  },
];

describe("CharList", () => {
  it("renders as a div with one child div per character", () => {
    render(
      <CharArrayContext.Provider value={[charArray, jest.fn()]}>
        <CharList />
      </CharArrayContext.Provider>
    );
    expect(screen).toMatchSnapshot();
  });

  it("if no chars have been found, no div should have inactive class", () => {
    const { container } = render(
        <CharArrayContext.Provider value={[charArray, jest.fn()]}>
          <CharList />
        </CharArrayContext.Provider>
      );
    expect(container.getElementsByClassName('inactive')).toHaveLength(0)
  })



  it("all chars that have been found will have inactive class", () => {
    let newCharArray = [
        {
          name: "Reptar",
          coords: "",
          img: { src: "#" },
          hasBeenFound: false,
        },
        {
          name: "Benson",
          coords: "",
          img: { src: "#" },
          hasBeenFound: true,
        },
        {
          name: "Patrick",
          coords: "",
          img: { src: "#" },
          hasBeenFound: false,
        },
      ];
      const { container } = render(
        <CharArrayContext.Provider value={[newCharArray, jest.fn()]}>
          <CharList />
        </CharArrayContext.Provider>
      );
      expect(container.getElementsByClassName('inactive')).toHaveLength(1)
    })
});
