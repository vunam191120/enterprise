import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <div className={clsx("grid", styles.navbar)}>
      <div>Navbar</div>
      <Link to="/about">About</Link>
      <br></br>
      <Link to="/home">Home</Link>
    </div>
  );
}
