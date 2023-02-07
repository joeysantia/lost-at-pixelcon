import { useContext, useEffect, useState } from "react";
import { CharArrayContext } from "./CharArrayContext";

export default function CharList() {
  const [charArray, setCharArray] = useContext(CharArrayContext);

  return (
    <div>
      {charArray.map((char, i) => {
        return (
          <div key={i} className={char.hasBeenFound ? "inactive" : ""}>
            {char.img}
            <span>{char.name}</span>
          </div>
        );
      })}
    </div>
  );
}
