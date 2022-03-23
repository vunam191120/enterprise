import React, { useEffect, useState } from "react";
import axiosClient from "../../../apis/axios.config";
import { Link } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";

import styles from "./UsersList.module.css";
import Popup from "../../../component/popup/Popup";
import Table from "../../../component/table/Table";
import UserTableHead from "./table-head";

function UsersList({ currentPage, onCurrentPage, onPageSize }) {
  const [userId, setUserId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);

  async function getUsers() {
    let res = await axiosClient.get("http://103.107.182.190/service1/user/");
    setUsers(res.data.data.rows);
  }

  useEffect(() => {
    getUsers();
  }, []);

  const handleClickClose = () => setIsOpen(false);

  const onClickDelete = (deleteUserId) => {
    setIsOpen(true);
    setUserId(deleteUserId);
  };

  const handleClickDeleteUser = (deleteUserId) => {
    axiosClient
      .delete(`http://103.107.182.190/service1/user/${deleteUserId}`)
      .then((response) => {
        console.log(response.data);
        getUsers();
      })
      .catch((err) => console.log(err));
  };

  const renderRows = (user, index, onClickDelete) => (
    <tr
      style={{ backgroundColor: (index + 1) % 2 !== 0 ? "#f2edf3" : "#fff" }}
      key={`${user.user_id} - ${index}`}
    >
      <td>
        <img
          src={`http://103.107.182.190/${user.avatar}`}
          alt="Avatar"
          className={styles.avatarImg}
        />
      </td>
      <td>{user.full_name}</td>
      <td>{user.username}</td>
      <td>{user.phone}</td>
      <td>
        {user.profile_status ? (
          <span className={styles.badgeActive}>Active</span>
        ) : (
          <span className={styles.badgeDisabled}>Disabled</span>
        )}
      </td>
      <td>
        <Link
          className={styles.iconAction}
          to={`/users/update/${user.username}`}
        >
          <BiEditAlt />
        </Link>
        <RiDeleteBin5Line
          className={styles.iconAction}
          onClick={() => onClickDelete(user.user_id)}
        />
      </td>
    </tr>
  );

  if (users.length === 0) {
    return (
      <div className={styles.container}>
        <Table loading={true} />
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <Table
          loading={false}
          head={<UserTableHead />}
          renderRows={renderRows}
          onClickDeleteButton={onClickDelete}
          data={users}
          title="User List"
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
