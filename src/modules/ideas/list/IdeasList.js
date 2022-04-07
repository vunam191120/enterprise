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
import Pagination from "../../../component/pagination/Pagination";
import Input from "../../../component/input/Input";
import Select from "../../../component/select/Select";

function IdeasList() {
  const [ideaId, setIdeaId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [ideas, setIdeas] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalRows: 1,
  });
  const [seperatePage, setSeperatePage] = useState([]);

  const [filter, setFilter] = useState({
    key: "",
    value: "",
  });

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  async function getIdeas() {
    let res = await axiosClient.get("http://103.107.182.190/service1/idea");
    setIdeas(res.data.data);
  }

  useEffect(() => {
    getIdeas();
  }, []);

  useEffect(() => {
    setPagination((pagination) => ({ ...pagination, totalRows: ideas.length }));
  }, [ideas.length]);

  useEffect(() => {
    setSeperatePage(
      ideas.slice(
        (pagination.page - 1) * pagination.limit,
        pagination.page * pagination.limit > ideas.length
          ? undefined
          : pagination.page * pagination.limit
      )
    );
  }, [ideas, pagination.limit, pagination.page]);

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
    const filename = new Date() + "-idea.csv";

    axiosClient
      .get("http://103.107.182.190/service1/csv", { responseType: "blob" })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
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
        <Link
          className={styles.iconAction}
          to={`/ideas/${idea.idea_id}/documents`}
        >
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

  const handleOnFilter = (target) => {
    setFilter({ ...filter, value: target.value });
  };

  const handleOnSelectChange = (target) => {
    setFilter({ ...filter, key: target.value });
  };

  const handleOnSubmitFilter = (e) => {
    e.preventDefault();
    // axiosClient
    //   .get(`http://103.107.182.190/service1/idea?${filter.key}=${filter.value}`)
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => console.log(err));
    console.log(
      `http://103.107.182.190/service1/idea?${filter.key}=${filter.value}`
    );
  };

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
        <form onSubmit={handleOnSubmitFilter} className={styles.filter}>
          <Input
            onChange={handleOnFilter}
            config={{
              name: "filter",
              type: "number",
              placeholder: "Select one filed and search",
              className: styles.filterInput,
            }}
          />
          <Select
            name="field"
            defaultValue={""}
            onChange={handleOnSelectChange}
          >
            <option value="" disabled hidden>
              Choose your filter...
            </option>
            <option value="department">Department ID</option>
            <option value="category">Category ID</option>
          </Select>
        </form>
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
        data={seperatePage}
      />
      <Pagination pagination={pagination} onPageChage={handlePageChange} />
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
