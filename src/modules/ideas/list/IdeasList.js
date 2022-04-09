import React, { useEffect, useState } from "react";
import axiosClient from "../../../apis/axios.config";
import { Link } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { ImEye } from "react-icons/im";
import { HiDownload } from "react-icons/hi";
import queryString from "query-string";

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
  const [terms, setTerms] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({});

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  async function getIdeas() {
    let res = await axiosClient.get("http://103.107.182.190/service1/idea");
    setIdeas(res.data.data);
  }

  useEffect(() => {
    async function getCategories() {
      const res = await axiosClient.get(
        "http://103.107.182.190/service1/category"
      );
      setCategories(res.data.data);
    }

    async function getDepartments() {
      const res = await axiosClient.get(
        "http://103.107.182.190/service1/department"
      );
      setDepartments(res.data.data);
    }

    async function getTerms() {
      const res = await axiosClient.get("http://103.107.182.190/service1/term");
      setTerms(res.data.data);
    }

    getCategories();
    getDepartments();
    getTerms();
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

  const handleOnChange = (target) => {
    setFilters({ ...filters, [target.name]: target.value });
  };

  const handleOnSubmitFilter = (e) => {
    e.preventDefault();
    const paramString = queryString.stringify(filters);
    axiosClient
      .get(`http://103.107.182.190/service1/idea?${paramString}`)
      .then((res) => {
        setIdeas(res.data.data);
      })
      .catch((err) => console.log(err));
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
      <div className={styles.filterContainer}>
        <h2>Filter</h2>
        <form onSubmit={handleOnSubmitFilter} className={styles.filterForm}>
          <div className={styles.filterContent}>
            <div className={styles.left}>
              <Input
                onChange={handleOnChange}
                config={{
                  name: "title",
                  type: "text",
                  placeholder: "Type your title",
                  className: styles.filterInput,
                }}
              />
              <Input
                onChange={handleOnChange}
                config={{
                  name: "full_name",
                  type: "text",
                  placeholder: "Type Full Name",
                  className: styles.filterInput,
                }}
              />
            </div>
            <div className={styles.right}>
              <div className={styles.rightFirst}>
                <Select
                  name="category_id"
                  defaultValue={""}
                  onChange={handleOnChange}
                  required={false}
                >
                  <option value="">Select category</option>
                  {categories.map((item, index) => (
                    <option
                      value={item.category_id}
                      key={`${item.name} ${index}`}
                    >
                      {item.category_name}
                    </option>
                  ))}
                </Select>
                <Select
                  name="status"
                  defaultValue={""}
                  onChange={handleOnChange}
                  required={false}
                >
                  <option value="">Select status</option>
                  <option value="first_closure">First Closure</option>
                  <option value="final_closure">Final Closure</option>
                </Select>
              </div>
              <div className={styles.rightSecond}>
                <Select
                  name="department_id"
                  defaultValue={""}
                  required={false}
                  onChange={handleOnChange}
                >
                  <option value="">Select department</option>
                  {departments.map((item, index) => (
                    <option
                      value={item.department_id}
                      key={`${item.department_name} ${index}`}
                    >
                      {item.department_name}
                    </option>
                  ))}
                </Select>
                <Select
                  name="term_id"
                  defaultValue={""}
                  required={false}
                  onChange={handleOnChange}
                >
                  <option value="">Select term</option>
                  {terms.map((item, index) => (
                    <option
                      value={item.term_id}
                      key={`${item.term_name} ${index}`}
                    >
                      {item.term_name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
          <Button
            className={styles.filterBtn}
            type={"submit"}
            buttonSize={"btnMedium"}
            buttonStyle={"btnPrimarySolid"}
          >
            Filter
          </Button>
          <Button
            className={styles.resetBtn}
            type={"submit"}
            buttonSize={"btnMedium"}
            buttonStyle={"btnPrimarySolid"}
            onClick={() => getIdeas()}
          >
            Update Table
          </Button>
        </form>
      </div>
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
