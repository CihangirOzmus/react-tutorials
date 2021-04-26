import React, { useState } from "react";
import Accordion from "./components/Accordion";
import Dropdowm from "./components/Dropdown";
import Search from "./components/Search";

const items = [
  {
    title: "What is React?",
    content: "React is a front end js library.",
  },
  {
    title: "Why use React?",
    content: "React is a favourite js library.",
  },
  {
    title: "How do you use React?",
    content: "You can use by components",
  },
];

const options = [
  { label: "The Color Red", value: "Red" },
  { label: "The Color Gree", value: "Green" },
  { label: "The Color Blue", value: "Blue" },
];

export default () => {
  const [selected, setSelected] = useState(options[0]);
  const [showDropdown, setShowDropdown] = useState(true);

  return (
    <div>
      <button onClick={() => setShowDropdown(!showDropdown)}>
        Toogle Dropdown
      </button>
      {showDropdown ? (
        <Dropdowm
          selected={selected}
          onSelectedChange={setSelected}
          options={options}
        />
      ) : null}
    </div>
  );
};
