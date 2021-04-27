import React, { useState, useEffect, useRef } from "react";

const Dropdowm = ({ label, options, selected, onSelectedChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // this code is used to close dropdown when an empty area is clicked!
  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };
    
    document.body.addEventListener("click", onBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener("click", onBodyClick, {
        capture: true,
      });
    };
  }, []);

  const renderedOptions = options.map((option) => {
    if (option.value === selected.value) {
      return null;
    }

    return (
      <div
        className="item"
        key={option.value}
        onClick={() => onSelectedChange(option)}
      >
        {option.label}
      </div>
    );
  });

  // ref.current will refer to top level div below, therefore if something clicked inside that div ref.current will be defined. Otherwise it is undefined.

  return (
    <div className="ui form" ref={ref}>
      <div className="field">
        <label className="label">{label}</label>
        <div
          onClick={() => setOpen(!open)}
          className={`ui selection dropdown ${open ? "visible active" : ""}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${open ? "visible transition" : ""}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdowm;
