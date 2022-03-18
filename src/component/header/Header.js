import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

import avatar from "./../../assets/user/avatar/avt1.jpg";
import styles from "./Header.module.css";
import Search from "../search/Search";

export default function Header() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

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
        <div className={styles.user}>
          <img src={avatar} alt="Avatar user" />
          <p>Vu Hai Nam</p>
          <MdKeyboardArrowDown className={styles.iconRight} />
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
