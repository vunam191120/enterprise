import React from "react";
import clsx from "clsx";
import styles from "./Input.module.css";

export default function Input({ config, onChange }) {
  const handleChange = ({ target }) => {
    // const isTrueSet = target.value === "true";
    // target.value = !isTrueSet;
    // target.checked = !isTrueSet;
    // newData = !isTrueSet;
    let newData = {
      name: target.name,
      value: target.value,
    };
    onChange(newData);
  };

  if (config.type === "checkbox") {
    return <div className={clsx(styles.checkboxItems)}></div>;
  }

  return (
    <div className={clsx(styles.formGroup)}>
      <label htmlFor={config.id} className={clsx(styles.label)}>
        {config.text}
      </label>
      <input
        onChange={handleChange}
        type={config.type}
        className={clsx(styles.formControl)}
        placeholder={config.placeholder}
        id={config.id}
        value={config.value}
        name={config.name}
      />
    </div>
  );
}
