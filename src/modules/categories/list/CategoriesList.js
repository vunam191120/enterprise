import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import Popup from "../../../component/popup/Popup";
import Table from "../../../component/table/Table";
import CategoryTableHead from "./table-head";
import Button from "../../../component/button/Button";

function CategoriesList({ currentPage, onCurrentPage, onPageSize }) {
  const [cateId, setCateID] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://103.107.182.190/service1/category")
      .then((response) => setCategories(response.data.data));
  }, []);

  const handleClickClose = () => setIsOpen(false);

  const onClickDelete = (deleteCateId) => {
    setIsOpen(true);
    setCateID(deleteCateId);
  };

  const handleClickDeleteCate = (deleteCateId) => {
    axios
      .delete(`http://103.107.182.190/service1/category/${deleteCateId}`)
      .then((response) => {
        console.log(response.data);
        navigate(-1);
      })
      .catch((err) => console.log(err));
  };

  const renderRows = (category, index, onClickDelete) => (
    <tr key={`${category.category_id} - ${index}`}>
      <td>{index + 1}</td>
      <td>{category.category_name}</td>
      <td>{category.staff_id}</td>
      <td>{category.department_id}</td>
      <td>{category.description}</td>
      <td>
        <Link to={`/categories/update/${category.category_id}`}>
          <Button
            type={"button"}
            buttonSize={"btnSmall"}
            buttonStyle={"btnPrimarySolid"}
          >
            Update
          </Button>
        </Link>
        <Button
          type={"button"}
          buttonSize={"btnSmall"}
          buttonStyle={"btnDangerSolid"}
          onClick={() => onClickDelete(category.category_id)}
        >
          Delete
        </Button>
      </td>
    </tr>
  );

  if (categories.length === 0) {
    return (
      <div>
        <Table loading={true} />
      </div>
    );
  }

  return (
    <div>
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
