import React, { useEffect, useState } from "react";
import axiosClient from "../../../apis/axios.config";
import { Link, useNavigate } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";

import styles from "./CategoriesList.module.css";
import Popup from "../../../component/popup/Popup";
import Table from "../../../component/table/Table";
import CategoryTableHead from "./table-head";

function CategoriesList({ currentPage, onCurrentPage, onPageSize }) {
  const [cateId, setCateID] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get("http://103.107.182.190/service1/category")
      .then((response) => setCategories(response.data.data));
  }, []);

  const handleClickClose = () => setIsOpen(false);

  const onClickDelete = (deleteCateId) => {
    setIsOpen(true);
    setCateID(deleteCateId);
  };

  const handleClickDeleteCate = (deleteCateId) => {
    axiosClient
      .delete(`http://103.107.182.190/service1/category/${deleteCateId}`)
      .then((response) => {
        console.log(response.data);
        navigate(-1);
      })
      .catch((err) => console.log(err));
  };

  const renderRows = (category, index, onClickDelete) => (
    <tr
      style={{ backgroundColor: (index + 1) % 2 !== 0 ? "#f2edf3" : "#fff" }}
      key={`${category.category_id} - ${index}`}
    >
      <td>{category.category_name}</td>
      <td>{category.staff_id}</td>
      <td>{category.department_id}</td>
      <td>{category.description}</td>
      <td>
        <Link
          className={styles.iconAction}
          to={`/categories/update/${category.category_id}`}
        >
          <BiEditAlt />
        </Link>
        <RiDeleteBin5Line
          className={styles.iconAction}
          onClick={() => onClickDelete(category.category_id)}
        />
      </td>
    </tr>
  );

  if (categories.length === 0) {
    return (
      <div className={styles.container}>
        <Table loading={true} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Table
        loading={false}
        head={<CategoryTableHead />}
        renderRows={renderRows}
        onClickDeleteButton={onClickDelete}
        data={categories}
        title={"Category List"}
      />

      <Popup
        isOpen={isOpen}
        title="Confirm Information"
        message="Are you sure to delete this record?"
        onClose={handleClickClose}
        onConfirm={() => handleClickDeleteCate(cateId)}
      />
    </div>
  );
}

export default CategoriesList;
