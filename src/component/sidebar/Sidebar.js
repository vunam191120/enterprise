import React from "react";
import styles from "./Sidebar.module.css";
import clsx from "clsx";
import { ImStack } from "react-icons/im";
import { BsFillBookmarkCheckFill } from "react-icons/bs";

import sidebarAdmin from "./sidebarData";
import avatar from "./../../assets/user/avatar/avt1.jpg";
import SidebarItem from "./sidebarItem/SidebarItem";
import checkRole from "../../helpers/checkRole";

export default function Sidebar(props) {
  const sidebarList = props.type === "Admin" ? sidebarAdmin : null;
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <>
      <div className={clsx(styles.logo)}>
        <ImStack style={{ fontSize: "26px" }} />
        <span className={clsx(styles.logoText)}>Purple</span>
      </div>
      <div className={clsx(styles.avtarContainer)}>
        <img
          className={clsx(styles.avataImg)}
          src={`http://103.107.182.190/${currentUser.avatar}`}
          alt="Avatar User from sidebar"
        />
        <div className={clsx(styles.userInfo)}>
          <p>{currentUser.full_name}</p>
          <p>{checkRole(currentUser.role_id)}</p>
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
