import React from "react";
import Accordion from "./components/Accordion";
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

export default () => {
  return (
    <div>
      <br />
      <Search />
    </div>
  );
};
