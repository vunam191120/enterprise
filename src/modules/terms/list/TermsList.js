import React, { useEffect, useState } from "react";
import axiosClient from "../../../apis/axios.config";
import { Link, useNavigate } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";

import styles from "./TermsList.module.css";
import Popup from "../../../component/popup/Popup";
import Table from "../../../component/table/Table";
import TermTableHead from "./table-head";
import { ROLES } from "../../../constants";
import Pagination from "../../../component/pagination/Pagination";

function TermsList() {
  const [termId, setTermId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [terms, setTerms] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalRows: 1,
  });
  const [seperatePage, setSeperatePage] = useState([]);

  async function getTerms() {
    let res = await axiosClient.get("http://103.107.182.190/service1/term");
    setTerms(res.data.data);
  }

  useEffect(() => {
    if (currentUser.role_id === ROLES.QA_COORDINATOR) {
      alert("You cannot access this page");
      navigate("/dashboard", { replace: true });
    }
    getTerms();
  }, []);

  useEffect(() => {
    setPagination((pagination) => ({
      ...pagination,
      totalRows: terms.length,
    }));
  }, [terms.length]);

  useEffect(() => {
    setSeperatePage(
      terms.slice(
        (pagination.page - 1) * pagination.limit,
        pagination.page * pagination.limit > terms.length
          ? undefined
          : pagination.page * pagination.limit
      )
    );
  }, [terms, pagination.limit, pagination.page]);

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  const handleClickClose = () => setIsOpen(false);

  const onClickDelete = (deleteTermId) => {
    setIsOpen(true);
    setTermId(deleteTermId);
  };

  const handleClickDeleteTerm = (deleteTermId) => {
    axiosClient
      .delete(`http://103.107.182.190/service1/term/${deleteTermId}`)
      .then((response) => {
        console.log(response.data);
        getTerms();
      })
      .catch((err) => console.log(err));
  };

  const renderRows = (term, index, onClickDelete) => {
    const convertFormat = (date) => {
      const newDate = new Date(date);
      return [
        newDate.getDate(),
        newDate.getMonth() + 1,
        newDate.getFullYear(),
      ].join("/");
    };

    return (
      <tr
        style={{ backgroundColor: (index + 1) % 2 !== 0 ? "#f2edf3" : "#fff" }}
        key={`${term.term_id} - ${index}`}
      >
        <td>{term.term_name}</td>
        <td>{convertFormat(term.start_date)}</td>
        <td>{convertFormat(term.end_date)}</td>
        <td>{convertFormat(term.first_closure_date)}</td>
        <td>{convertFormat(term.final_closure_date)}</td>
        <td>{term.status}</td>
        <td>
          <Link
            className={styles.iconAction}
            to={`/terms/update/${term.term_id}`}
          >
            <BiEditAlt />
          </Link>
          <RiDeleteBin5Line
            className={styles.iconAction}
            onClick={() => onClickDelete(term.term_id)}
          />
        </td>
      </tr>
    );
  };

  if (terms.length === 0) {
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
        head={<TermTableHead />}
        renderRows={renderRows}
        onClickDeleteButton={onClickDelete}
        data={seperatePage}
        title={"Term List"}
      />
      <Pagination pagination={pagination} onPageChage={handlePageChange} />

      <Popup
        isOpen={isOpen}
        title="Confirm Information"
        message="Are you sure to delete this record?"
        onClose={handleClickClose}
        onConfirm={() => handleClickDeleteTerm(termId)}
      />
    </div>
  );
}

export default TermsList;
