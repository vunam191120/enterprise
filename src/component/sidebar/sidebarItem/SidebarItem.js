import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import styles from "./SidebarItem.module.css";
import SidebarDetail from "../sidebarDetail/SidebarDetail";

const styleLinks = {};

export default function SidebarItem({ item }) {
  const [detail, setDetail] = useState(false);
  // const [isActive, setIsActive] = useState(false);

  // useEffect(() => {
  //   if (item.subNav) {
  //     setDetail(true);
  //   }
  // }, []);

  const toggleDetail = () => {
    setDetail(!detail);
  };

  if (!item.subNav) {
    return (
      <div className={clsx(styles.sidebarItem)}>
        <NavLink
          to={item.path}
          style={styleLinks}
          className={({ isActive }) =>
            `${styles.sidebarLink}` + (isActive ? ` ${styles.active}` : " ")
          }
        >
          <span className={clsx(styles.sidebarLable)}>{item.title}</span>
          <span className={clsx(styles.sidebarIcon)}>{item.icon}</span>
        </NavLink>
      </div>
    );
  } else {
    return (
      <div className={clsx(styles.sidebarWithSubNav)}>
        <div className={clsx(styles.sidebarItem)} onClick={toggleDetail}>
          <p className={clsx(styles.sidebarLable)}>{item.title}</p>
          <div className={clsx(styles.iconsContainer)}>
            <span className={clsx(styles.sidebarIcon)}>
              {!detail ? item.iconClosed : item.iconOpened}
            </span>
            <span className={clsx(styles.sidebarIcon)}>{item.icon}</span>
          </div>
        </div>
        {/* Subnav */}
        <div
          className={clsx(
            styles.subNavContainer,
            detail ? `${styles.active}` : ` `
          )}
        >
          <SidebarDetail subItem={item.subNav} />
        </div>
      </div>
    );
  }
}
