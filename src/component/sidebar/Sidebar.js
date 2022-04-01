import React, { Fragment } from "react";
import styles from "./Sidebar.module.css";
import clsx from "clsx";
import { BsFillBookmarkCheckFill } from "react-icons/bs";

import {
  SidebarStaff,
  SidebarAdmin,
  SidebarQAC,
  SidebarQAM,
} from "./sidebarData";
import SidebarItem from "./sidebarItem/SidebarItem";
import checkRole from "../../helpers/checkRole";

export default function Sidebar(props) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let sidebarList;
  if (props.type === "Admin") {
    sidebarList = SidebarAdmin;
  } else if (props.type === "Staff") {
    sidebarList = SidebarStaff;
  } else if (props.type === "QA Coordinator") {
    sidebarList = SidebarQAC;
  } else {
    sidebarList = SidebarQAM;
  }

  return (
    <Fragment>
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
    </Fragment>
  );
}
