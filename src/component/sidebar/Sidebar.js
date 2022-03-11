import React from "react";
import styles from "./Sidebar.module.css";
import clsx from "clsx";
import { ImStack } from "react-icons/im";
import { MdSpaceDashboard, MdManageAccounts } from "react-icons/md";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";

import avatar from "./../../assets/avt1.jpg";
import SidebarItem from "./sidebarItem/SidebarItem";

const SidebarQAM = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <MdSpaceDashboard />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
  {
    title: "Category",
    path: "/category",
    icon: <BiCategoryAlt />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "View",
        path: "/categories/view",
      },
      {
        title: "Create",
        path: "/categories/create",
      },
    ],
  },
  {
    title: "User",
    path: "/users",
    icon: <MdManageAccounts />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "View",
        path: "/users/view",
      },
      {
        title: "Create",
        path: "/users/create",
      },
    ],
  },
];

// const SidebarAdmin = [];
// const SidebarQA = []

export default function Sidebar(props) {
  const sidebarList = props.type === "QAM" ? SidebarQAM : null;

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
      {sidebarList.map((sidebar, index) => (
        <SidebarItem key={index} item={sidebar} />
      ))}
    </>
  );
}
