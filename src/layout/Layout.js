// import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import styles from "./Layout.module.css";
import clsx from "clsx";
import Header from "../component/header/Header";
import Sidebar from "../component/sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import Categories from "../pages/categories/Categories";
import Dashboard from "../pages/dashboard/Dashboard";
import User from "../pages/user/User";
import UpdateUser from "../pages/user/update/UpdateUser";
import CreateUser from "../pages/user/create/CreateUser";

import Popup from "../component/popup/Popup";

export default function Layout() {
  // const renderRoutes = (routes) => {
  //   routes.map((route) => (
  //     <Route key={route.path} path={route.path} element={route.element} />
  //   ));
  // };

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };
  // styles={{left : sidebar ? "30px" : "260px"}}

  return (
    <div className={clsx(styles.app)}>
      <div className={clsx(styles.sidebar)}>
        <Sidebar type="QAM" />
      </div>
      <div className={clsx(styles.contentContainer)}>
        <Header onClick={showSidebar} />
        {/* Content showed below */}
        <div className={clsx(styles.content)}>
          <Routes>
            <Route path="/dashboard" element={<Popup />} />
            <Route path="/categories" element={<Categories />}></Route>
            <Route path="/users">
              <Route path="/users/update">
                <Route
                  path="/users/update/:usernameParam"
                  element={<UpdateUser />}
                ></Route>
              </Route>
              <Route path="/users/view" element={<User />}></Route>
              <Route path="/users/create" element={<CreateUser />}></Route>
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}
