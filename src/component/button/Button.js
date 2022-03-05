import React from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

const STYLES = [
  "btnPrimarySolid",
  "btnWarningSolid",
  "btnDangerSolid",
  "btnSuccessSolid",
  "btnYellowSolid",
  "btnPrimarySolidOutline",
  "btnWarningSolidOutline",
  "btnDangerSolidOutline",
  "btnSuccessSolidOutline",
  "btnYellowSolidOutline",
];
const SIZES = ["btnSmall", "btnMedium", "btnLarge", "btnExLarge"];

export default function Button({
  type,
  onClick,
  text,
  buttonStype,
  buttonSize,
}) {
  const checkButtonStyle = STYLES.includes(buttonStype)
    ? buttonStype
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <button
      className={clsx(
        styles.btn,
        styles[`${checkButtonSize}`],
        styles[`${checkButtonStyle}`]
      )}
      type={type}
    >
      {text}
    </button>
  );
}
