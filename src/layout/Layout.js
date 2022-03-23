// import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import styles from "./Layout.module.css";
// import clsx from "clsx";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "../component/header/Header";
import Sidebar from "../component/sidebar/Sidebar";
import Dashboard from "../pages/dashboard/Dashboard";
import Term from "../pages/term/Term";
import Department from "../pages/department/Department";
import Category from "../pages/category/Category";
import User from "../pages/user/User";
import Profile from "../pages/user/profile/Profile";
import Idea from "../pages/idea/Idea";
import IdeaDetail from "../modules/ideas/ideaDetail/IdeaDetail";
import UpdateTerm from "../pages/term/update/UpdateTerm";
import UpdateDepartment from "../pages/department/update/UpdateDepartment";
import UpdateCategory from "../pages/category/update/UpdateCategory";
import UpdateUser from "../pages/user/update/UpdateUser";
import UpdateIdea from "../pages/idea/update/UpdateIdea";
import CreateTerm from "../pages/term/create/CreateTerm";
import CreateDepartment from "../pages/department/create/CreateDepartment";
import CreateCategory from "../pages/category/create/CreateCategory";
import CreateUser from "../pages/user/create/CreateUser";
import CreateIdea from "../pages/idea/create/CreateIdea";
import Aggrement from "../pages/aggrement/Aggrement";
import CreateAggrement from "../pages/aggrement/create/CreateAggrement";
import UpdateAggrement from "../pages/aggrement/update/UpdateAggrement";

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
        <Sidebar type="Admin" />
      </div>
      <div className={styles.contentContainer}>
        <Header onClick={showSidebar} />
        {/* Content showed below */}
        <div className={styles.content}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/terms">
              <Route path="update">
                <Route path=":termID" element={<UpdateTerm />} />
              </Route>
              <Route path="create" element={<CreateTerm />} />
              <Route path="view" element={<Term />} />
            </Route>
            <Route path="/departments">
              <Route path="update">
                <Route path=":departmentID" element={<UpdateDepartment />} />
              </Route>
              <Route path="create" element={<CreateDepartment />} />
              <Route path="view" element={<Department />} />
            </Route>
            <Route path="/categories">
              <Route path="update">
                <Route path=":cateId" element={<UpdateCategory />} />
              </Route>
              <Route path="create" element={<CreateCategory />} />
              <Route path="view" element={<Category />} />
            </Route>
            <Route path="/users">
              <Route path="profile" element={<Profile />} />
              <Route path="update">
                <Route path=":username" element={<UpdateUser />} />
              </Route>
              <Route path="view" element={<User />} />
              <Route path="create" element={<CreateUser />} />
            </Route>
            <Route path="/ideas">
              <Route path=":ideaId/*" element={<IdeaDetail />}></Route>
              <Route path="update">
                <Route path=":ideaId" element={<UpdateIdea />} />
              </Route>
              <Route path="view" element={<Idea />} />
              <Route path="create" element={<CreateIdea />} />
            </Route>
            <Route path="/aggrements">
              <Route path="update">
                <Route path=":aggrementId" element={<UpdateAggrement />} />
              </Route>
              <Route path="create" element={<CreateAggrement />} />
              <Route path="view" element={<Aggrement />} />
            </Route>
            {/* <Route path="*" element={<Navigate to="/dashboard" replace />} /> */}
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
