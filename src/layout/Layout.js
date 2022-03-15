// import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import styles from "./Layout.module.css";
import clsx from "clsx";
import { Routes, Route } from "react-router-dom";

import Header from "../component/header/Header";
import Sidebar from "../component/sidebar/Sidebar";
import Category from "../pages/category/Category";
import Dashboard from "../pages/dashboard/Dashboard";
import User from "../pages/user/User";
import UpdateUser from "../pages/user/update/UpdateUser";
import UpdateCategory from "../pages/category/update/UpdateCategory";
import CreateUser from "../pages/user/create/CreateUser";
import CreateCategory from "../pages/category/create/CreateCategory";
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
            <Route path="/categories">
              <Route path="/categories/update">
                <Route
                  path="/categories/update/:cateId"
                  element={<UpdateCategory />}
                />
              </Route>
              <Route path="/categories/create" element={<CreateCategory />} />
              <Route path="/categories/view" element={<Category />} />
            </Route>
            <Route path="/users">
              <Route path="/users/update">
                <Route
                  path="/users/update/:username"
                  element={<UpdateUser />}
                />
              </Route>
              <Route path="/users/view" element={<User />} />
              <Route path="/users/create" element={<CreateUser />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}
