import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import Popup from "../../../component/popup/Popup";
import Table from "../../../component/table/Table";
import ProductTableHead from "./table-head";
import Button from "../../../component/button/Button";

function UsersList({ currentPage, onCurrentPage, onPageSize }) {
  const [userId, setUserId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://103.107.182.190/service1/user/").then((response) => {
      setProducts(response.data.data);
    });
  }, []);

  const handleClickClose = () => setIsOpen(false);

  const onClickDelete = (deleteUserId) => {
    setIsOpen(true);
    setUserId(deleteUserId);
  };

  const handleClickDeleteUser = (deleteUserId) => {
    axios
      .delete(`http://103.107.182.190/service1/user/${deleteUserId}`)
      .then((response) => {
        console.log(response.data);
        // navigate("/users/view");
        navigate(-1);
      })
      .catch((err) => console.log(err));
  };

  const renderRows = (user, index, onClickDelete) => (
    <tr key={`${user.user_id} - ${index}`}>
      <td>{index + 1}</td>
      <td>{user.avatar}</td>
      <td>{user.full_name}</td>
      <td>{user.username}</td>
      <td>{user.phone}</td>
      <td>{user.profile_status ? "Active" : "Disabled"}</td>
      <td>
        <Link to={`/users/update/${user.username}`}>
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
          onClick={() => onClickDelete(user.user_id)}
        >
          Delete
        </Button>
      </td>
    </tr>
  );

  if (products.length === 0) {
    return (
      <div>
        <Table loading={true} />
      </div>
    );
  } else {
    return (
      <div>
        <Table
          loading={false}
          head={<ProductTableHead />}
          renderRows={renderRows}
          onClickDeleteButton={onClickDelete}
          data={products}
        />

        <Popup
          isOpen={isOpen}
          title="Confirm Infomation"
          message="Are you sure to delete this record?"
          onClose={handleClickClose}
          onConfirm={() => handleClickDeleteUser(userId)}
        />
      </div>
    );
  }
}

export default UsersList;
