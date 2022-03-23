import React, { useEffect, useState } from "react";
import axiosClient from "../../../apis/axios.config";
import { Link, useNavigate } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";

import styles from "./AggrementsList.module.css";
import Popup from "../../../component/popup/Popup";
import Table from "../../../component/table/Table";
import AggrementTableHead from "./table-head";

function AggrementsList({ currentPage, onCurrentPage, onPageSize }) {
  const [aggrementId, setCateID] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [aggrements, setAggrements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get("http://103.107.182.190/service1/aggrement")
      .then((response) => setAggrements(response.data.data));
  }, []);

  const handleClickClose = () => setIsOpen(false);

  const onClickDelete = (deleteCateId) => {
    setIsOpen(true);
    setCateID(deleteCateId);
  };

  const handleClickDeleteCate = (deleteCateId) => {
    axiosClient
      .delete(`http://103.107.182.190/service1/aggrement/${deleteCateId}`)
      .then((response) => {
        console.log(response.data);
        navigate(-1);
      })
      .catch((err) => console.log(err));
  };

  const renderRows = (aggrement, index, onClickDelete) => (
    <tr
      style={{ backgroundColor: (index + 1) % 2 !== 0 ? "#f2edf3" : "#fff" }}
      key={`${aggrement.aggrement_id} - ${index}`}
    >
      <td>{aggrement.aggrement_name}</td>
      <td>{aggrement.description}</td>      
      <td>
        {aggrement.status ? (
          <span className={styles.badgeActive}>Active</span>
        ) : (
          <span className={styles.badgeDisabled}>Disabled</span>
        )}
      </td>
      <td>
        <Link
          className={styles.iconAction}
          to={`/aggrements/update/${aggrement.aggrement_id}`}
        >
          <BiEditAlt />
        </Link>
        <RiDeleteBin5Line
          className={styles.iconAction}
          onClick={() => onClickDelete(aggrement.aggrement_id)}
        />
      </td>
    </tr>
  );

  if (aggrements.length === 0) {
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
        head={<AggrementTableHead />}
        renderRows={renderRows}
        onClickDeleteButton={onClickDelete}
        data={aggrements}
        title={"Aggrement List"}
      />

      <Popup
        isOpen={isOpen}
        title="Confirm Information"
        message="Are you sure to delete this record?"
        onClose={handleClickClose}
        onConfirm={() => handleClickDeleteCate(aggrementId)}
      />
    </div>
  );
}

export default AggrementsList;
