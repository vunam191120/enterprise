import React, { useEffect, useState } from "react";
import axiosClient from "../../../apis/axios.config";
import { Link } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { ImEye } from "react-icons/im";
import { HiDownload } from "react-icons/hi";

import styles from "./IdeasList.module.css";
import Popup from "../../../component/popup/Popup";
import Table from "../../../component/table/Table";
import IdeaTableHead from "./table-head";
import Button from "../../../component/button/Button";

function IdeasList({ currentPage, onCurrentPage, onPageSize }) {
  const [ideaId, setIdeaId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [ideas, setIdeas] = useState([]);

  async function getIdeas() {
    let res = await axiosClient.get("http://103.107.182.190/service1/idea");
    setIdeas(res.data.data);
  }

  useEffect(() => {
    getIdeas();
  }, []);

  const handleClickClose = () => setIsOpen(false);

  const onClickDelete = (deleteIdeaId) => {
    setIsOpen(true);
    setIdeaId(deleteIdeaId);
  };

  const handleClickDeleteIdea = (deleteIdeaId) => {
    axiosClient
      .delete(`http://103.107.182.190/service1/idea/${deleteIdeaId}`)
      .then((response) => {
        console.log(response.data);
        getIdeas();
      })
      .catch((err) => console.log(err));
  };

  const handleClickDownloadAll = () => {
    axiosClient
      .get("http://103.107.182.190/service1/csv/idea")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const renderRows = (idea, index, onClickDelete) => (
    <tr
      style={{ backgroundColor: (index + 1) % 2 !== 0 ? "#f2edf3" : "#fff" }}
      key={`${idea.idea_id} - ${index}`}
    >
      <td>{idea.full_name}</td>
      <td>{idea.title}</td>
      <td>{idea.description}</td>
      <td>{idea.department_name}</td>
      <td>{idea.category_name}</td>
      <td>{idea.term_name}</td>
      <td>{idea.status}</td>
      <td>
        <Link className={styles.iconAction} to={`/ideas/${idea.idea_id}`}>
          <ImEye />
        </Link>
        <Link
          className={styles.iconAction}
          to={`/ideas/update/${idea.idea_id}`}
        >
          <BiEditAlt />
        </Link>
        <RiDeleteBin5Line
          className={styles.iconAction}
          onClick={() => onClickDelete(idea.idea_id)}
        />
      </td>
    </tr>
  );

  if (ideas.length === 0) {
    return (
      <div>
        <Table loading={true} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Idea List</h2>
        <Button
          className={styles.downloadBtn}
          type={"button"}
          buttonSize={"btnMedium"}
          buttonStyle={"btnPurpleSolid"}
          onClick={handleClickDownloadAll}
        >
          <HiDownload className={styles.downloadIcon} />
          Export All
        </Button>
      </div>
      <Table
        loading={false}
        head={<IdeaTableHead />}
        renderRows={renderRows}
        onClickDeleteButton={onClickDelete}
        data={ideas}
        // title={"Idea List"}
      />

      <Popup
        isOpen={isOpen}
        title="Confirm Information"
        message="Are you sure to delete this record?"
        onClose={handleClickClose}
        onConfirm={() => handleClickDeleteIdea(ideaId)}
      />
    </div>
  );
}

export default IdeasList;
