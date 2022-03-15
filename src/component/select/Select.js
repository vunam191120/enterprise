import React from "react";

function Select({ onChange, id, name, className, defaultValue, children }) {
  const handleOnChange = (event) => {
    onChange(event.target);
  };
  return (
    <select
      name={name}
      className={className}
      defaultValue={defaultValue !== "" ? defaultValue : ""}
      id={id}
      onChange={handleOnChange}
      required
    >
      {children}
    </select>
  );
}

export default Select;
