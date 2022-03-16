import React from "react";
import styles from "./Sidebar.module.css";
import clsx from "clsx";
import { ImStack } from "react-icons/im";
import { BsFillBookmarkCheckFill } from "react-icons/bs";

import sidebarQAM from "./sidebarData";
import avatar from "./../../assets/user/avatar/avt1.jpg";
import SidebarItem from "./sidebarItem/SidebarItem";

export default function Sidebar(props) {
  const sidebarList = props.type === "QAM" ? sidebarQAM : null;

  return (
    <>
      <div className={clsx(styles.logo)}>
        <ImStack style={{ fontSize: "26px" }} />
        <span className={clsx(styles.logoText)}>Purple</span>
      </div>
      <div className={clsx(styles.avtarContainer)}>
        <img
          className={clsx(styles.avataImg)}
          src={avatar}
          alt="Avatar User from sidebar"
        />
        <div className={clsx(styles.userInfo)}>
          <p>Vu Hai Nam</p>
          <p>Front End Developer</p>
        </div>
        <BsFillBookmarkCheckFill
          style={{ color: "#1bcfb4", fontSize: "16px" }}
        />
      </div>
      <nav>
        {sidebarList.map((sidebar, index) => (
          <SidebarItem key={index} item={sidebar} />
        ))}
      </nav>
    </>
  );
}
