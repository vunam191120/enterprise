import React from "react";

import styles from "./Select.module.css";

function Select({ onChange, id, name, className, defaultValue, children }) {
  const handleOnChange = (event) => {
    console.log(event.target.name);
    onChange(event.target);
  };
  return (
    <select
      name={name}
      className={className ? className : styles.select}
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
