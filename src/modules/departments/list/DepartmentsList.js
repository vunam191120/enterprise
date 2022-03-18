import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";

import styles from "./DepartmentsList.module.css";
import Popup from "../../../component/popup/Popup";
import Table from "../../../component/table/Table";
import DepartmentTableHead from "./table-head";

function DepartmentsList({ currentPage, onCurrentPage, onPageSize }) {
  const [departmentId, setDepartmentId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://103.107.182.190/service1/department")
      .then((response) => setDepartments(response.data.data));
  }, []);

  const handleClickClose = () => setIsOpen(false);

  const onClickDelete = (deleteDepartmentId) => {
    setIsOpen(true);
    setDepartmentId(deleteDepartmentId);
  };

  const handleClickDeleteCate = (deleteDepartmentId) => {
    axios
      .delete(
        `http://103.107.182.190/service1/department/${deleteDepartmentId}`
      )
      .then((response) => {
        console.log(response.data);
        navigate("/departments/view", { replace: true });
      })
      .catch((err) => console.log(err));
  };

  const renderRows = (department, index, onClickDelete) => (
    <tr
      style={{ backgroundColor: (index + 1) % 2 !== 0 ? "#f2edf3" : "#fff" }}
      key={`${department.department_id} - ${index}`}
    >
      <td>{department.department_name}</td>
      <td>{department.manager_id}</td>
      <td>{department.description}</td>
      <td>
        <Link
          className={styles.iconAction}
          to={`/departments/update/${department.department_id}`}
        >
          <BiEditAlt />
        </Link>
        <RiDeleteBin5Line
          className={styles.iconAction}
          onClick={() => onClickDelete(department.department_id)}
        />
      </td>
    </tr>
  );

  if (departments.length === 0) {
    return (
      <div>
        <Table loading={true} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Table
        loading={false}
        head={<DepartmentTableHead />}
        renderRows={renderRows}
        onClickDeleteButton={onClickDelete}
        data={departments}
        title={"Department List"}
      />

      <Popup
        isOpen={isOpen}
        title="Confirm Information"
        message="Are you sure to delete this record?"
        onClose={handleClickClose}
        onConfirm={() => handleClickDeleteCate(departmentId)}
      />
    </div>
  );
}

export default DepartmentsList;
