// import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import styles from "./Layout.module.css";
// import clsx from "clsx";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

import Header from "../component/header/Header";
import Sidebar from "../component/sidebar/Sidebar";
import Dashboard from "../pages/dashboard/Dashboard";
import Term from "../pages/term/Term";
import Department from "../pages/department/Department";
import Category from "../pages/category/Category";
import User from "../pages/user/User";
import UpdateTerm from "../pages/term/update/UpdateTerm";
import UpdateDepartment from "../pages/department/update/UpdateDepartment";
import UpdateCategory from "../pages/category/update/UpdateCategory";
import UpdateUser from "../pages/user/update/UpdateUser";
import CreateTerm from "../pages/term/create/CreateTerm";
import CreateDepartment from "../pages/department/create/CreateDepartment";
import CreateCategory from "../pages/category/create/CreateCategory";
import CreateUser from "../pages/user/create/CreateUser";

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
    <div className={styles.app}>
      <div className={styles.sidebar}>
        <Sidebar type="QAM" />
      </div>
      <div className={styles.contentContainer}>
        <Header onClick={showSidebar} />
        {/* Content showed below */}
        <div className={styles.content}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/terms">
              <Route path="/terms/update">
                <Route path="/terms/update/:termID" element={<UpdateTerm />} />
              </Route>
              <Route path="/terms/create" element={<CreateTerm />} />
              <Route path="/terms/view" element={<Term />} />
            </Route>
            <Route path="/departments">
              <Route path="/departments/update">
                <Route
                  path="/departments/update/:departmentID"
                  element={<UpdateDepartment />}
                />
              </Route>
              <Route
                path="/departments/create"
                element={<CreateDepartment />}
              />
              <Route path="/departments/view" element={<Department />} />
            </Route>
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
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          {/* <Outlet /> */}
        </div>
        {/* Footer */}
        <section className={styles.footer}>
          <span>Copyright &copy; ABC-Enterprise.com 2022</span>
          <span>
            All Right Reserved by{" "}
            <a
              href="https://www.facebook.com/GreenwichVietnam/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Greenwich Vietnam
            </a>{" "}
            from FPT Group.
          </span>
        </section>
      </div>
    </div>
  );
}
