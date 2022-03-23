import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { GoThreeBars } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdFullscreen,
} from "react-icons/md";
import { BiEnvelope } from "react-icons/bi";
import { AiOutlineBell } from "react-icons/ai";
import { BsPower } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import clsx from "clsx";

import styles from "./Header.module.css";
import Search from "../search/Search";

export default function Header() {
  const [search, setSearch] = useState("");
  const [expand, setExpand] = useState(false);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const configInput = (id, className, nameAtt, type, value, placeholder) => {
    return {
      id: id,
      className: className,
      name: nameAtt,
      type: type,
      value: value,
      placeholder: placeholder,
    };
  };

  const handleOnChange = (newData) => {
    setSearch(newData);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
    navigate("/login", { replace: true });
  };

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <GoThreeBars className={styles.iconLeft} />
        <FiSearch className={styles.iconLeft} />
        <Search
          onChange={handleOnChange}
          config={configInput(
            "search",
            `${styles.searchInput}`,
            "search",
            "search",
            search,
            "Search Idea"
          )}
        />
      </div>
      <div className={styles.right}>
        <div
          onClick={() => setExpand(!expand)}
          className={clsx(styles.user, expand ? styles.expand : "")}
        >
          <img
            src={`http://103.107.182.190/${currentUser.avatar}`}
            alt="Avatar user"
          />
          <p>{currentUser.full_name}</p>
          {!expand ? (
            <MdKeyboardArrowDown className={styles.iconRight} />
          ) : (
            <MdKeyboardArrowUp className={styles.iconRight} />
          )}
          <div className={styles.subNav}>
            <Link className={styles.subNavLink} to="/users/profile">
              <CgProfile className={styles.subNavIcon} />
              My profile
            </Link>
            <Link className={styles.subNavLink} to="/users/profile">
              <IoMdSettings className={styles.subNavIcon} />
              Settings
            </Link>
          </div>
        </div>
        <IconContext.Provider value={{ className: styles.iconsAction }}>
          <MdFullscreen />
          <BiEnvelope />
          <AiOutlineBell />
          <BsPower onClick={logout} />
          {/* <BsPower /> */}
        </IconContext.Provider>
      </div>
    </div>
  );
}
