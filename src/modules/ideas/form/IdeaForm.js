import axiosClient from "../../../apis/axios.config";
import React, { useState, useEffect, Fragment, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AiOutlineFile,
  AiOutlineCloudUpload,
  AiFillCloseCircle,
  AiFillFile,
} from "react-icons/ai";
import { IoInformationCircleOutline } from "react-icons/io5";
import clsx from "clsx";

import styles from "./IdeaForm.module.css";
import Input from "../../../component/input/Input";
import Button from "../../../component/button/Button";
import Spinner from "../../../component/spinner/Spinner";
import Select from "../../../component/select/Select";
import Preview from "../../../component/preview/Preview";
import { ROLES } from "../../../constants";
import Popup from "../../../component/popup/Popup";

function IdeaForm({ mode }) {
  const navigate = useNavigate();
  const { ideaId } = useParams();
  const [idea, setIdea] = useState(null);
  const [categories, setCategories] = useState([]);
  const [agreements, setAggrements] = useState([]);
  const [newDocuments, setNewDocuments] = useState([]);
  const [oldDocsLength, setOldDocsLength] = useState(0);
  const [agree, setAgree] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Body for agreement popups
  let body;

  async function getCategories() {
    const res = await axiosClient.get(
      `http://103.107.182.190/service1/category`
    );
    setCategories(res.data.data);
  }

  async function getOneIdea() {
    const res = await axiosClient.get(
      `http://103.107.182.190/service1/idea/${ideaId}`
    );
    setIdea(res.data.data);
    setOldDocsLength(res.data.data.documents.length);
  }

  async function getAggrements() {
    const res = await axiosClient.get(
      "http://103.107.182.190/service1/aggrement"
    );
    setAggrements(res.data.data);
  }

  useEffect(() => {
    // Check role
    // if (currentUser.role_id === ROLES.QA_COORDINATOR) {
    //   alert("You can not access this page");
    //   navigate("/dashboard", { replace: true });
    // }
    getAggrements();
    getCategories();

    if (mode === "update") {
      getOneIdea();
    } else if (mode === "create") {
      return setIdea({
        title: "",
        documents: [],
        description: "",
        category_id: "",
      });
    }
  }, []);

  if (agreements.length > 0) {
    body = (
      <div className={styles.agreeContainer}>
        {agreements.map((agree, index) => (
          <div
            className={styles.agreeItem}
            key={`${agree.aggrement_name} ${index}`}
          >
            <h3>
              {index + 1}. {agree.aggrement_name}
            </h3>
            <p>{agree.description}</p>
          </div>
        ))}
      </div>
    );
  } else {
    body = <p>No data</p>;
  }

  const configInput = (
    id,
    className,
    nameAtt,
    type,
    value,
    placeholder,
    accept,
    multiple,
    disabled,
    hidden,
    required,
    checked
  ) => {
    return {
      id: id,
      className: className,
      name: nameAtt,
      type: type,
      value: value,
      placeholder: placeholder,
      accept: accept,
      disabled: disabled,
      multiple: multiple,
      hidden: hidden,
      required: required,
      checked: checked,
    };
  };

  const renderPreview = (doc, index, docs, onClickDownload) => {
    if (index === docs.length - 1) {
      return (
        <Fragment key={`${index} ${docs}`}>
          <div className={styles.previewItem}>
            <AiFillFile className={styles.iconThumbnail} />
            <div className={styles.fileNameContainer}>
              <AiOutlineFile className={styles.previewIcon} />
              <span className={styles.fileNameContent}>
                {mode === "update" ? doc.document : doc.name}
              </span>
            </div>
            <AiFillCloseCircle
              onClick={() =>
                handleDeleteFile(
                  index,
                  index <= oldDocsLength - 1 ? doc.document_id : undefined
                )
              }
              className={styles.deleteIcon}
            />
          </div>
          <label
            htmlFor="documents"
            className={clsx(styles.previewItem, styles.uploadBtn)}
          >
            <AiOutlineCloudUpload className={styles.uploadIcon} />
            <p>Upload</p>
            <Input
              onChange={handleOnFileChange}
              config={configInput(
                "documents",
                styles.fileInput,
                "documents",
                "file",
                "",
                "",
                "*",
                true,
                false,
                true
              )}
            />
          </label>
        </Fragment>
      );
    } else {
      return (
        <div className={styles.previewItem} key={`${index} ${docs}`}>
          <AiFillFile className={styles.iconThumbnail} />
          <div className={styles.fileNameContainer}>
            <AiOutlineFile className={styles.previewIcon} />
            <span className={styles.fileNameContent}>
              {mode === "update" ? doc.document : doc.name}
            </span>
          </div>
          <AiFillCloseCircle
            onClick={() =>
              handleDeleteFile(
                index,
                index <= oldDocsLength - 1 ? doc.document_id : undefined
              )
            }
            className={styles.deleteIcon}
          />
        </div>
      );
    }
  };

  const handleOnFileChange = (target) => {
    for (let file of target.files) {
      setIdea((idea) => {
        return { ...idea, documents: [...idea.documents, file] };
      });
      setNewDocuments((newDocuments) => [...newDocuments, file]);
    }
  };

  const handleDeleteFile = (indexItem, docId) => {
    // Delete old document of idea
    if (docId) {
      axiosClient
        .delete(`http://103.107.182.190/service1/document/${docId}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      setOldDocsLength((oldDocsLength) => oldDocsLength - 1);
    }
    setIdea((idea) => {
      return {
        ...idea,
        documents: idea.documents.filter((item, index) => {
          return index !== indexItem;
        }),
      };
    });
    return setNewDocuments(
      newDocuments.filter((item, index) => index !== indexItem)
    );
  };

  const handleOnChange = (target) => {
    setIdea({ ...idea, [target.name]: target.value });
  };

  const handleOnChangeTextArea = ({ target }) => {
    setIdea({ ...idea, [target.name]: target.value });
  };

  const handleOnChangeCheck = (target) => {
    setAgree(!agree);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (agree === false) {
      alert("You have to agree with Terms & Condition");
      return navigate("/ideas/view", { replace: true });
    }

    const formData = new FormData();
    formData.append("title", idea.title);
    for (let doc of newDocuments) {
      formData.append("documents", doc);
    }
    formData.append("description", idea.description);
    formData.append("category_id", +idea.category_id);
    if (mode === "create") {
      axiosClient
        .post(`http://103.107.182.190/service1/idea`, formData)
        .then((res) => navigate("/ideas/view", { replace: true }))
        .catch((err) => console.log(err));
    } else {
      formData.append("idea_id", idea.idea_id);
      axiosClient
        .put(`http://103.107.182.190/service1/idea/${idea.idea_id}`, formData)
        .then((res) => navigate("/ideas/view", { replace: true }))
        .catch((err) => console.log(err));
    }
  };

  const handleClickClose = () => {
    setIsOpen(false);
  };

  const handleClickAgree = () => {
    setIsOpen(false);
    setAgree(true);
  };

  if (!idea) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>
        {mode === "update" ? `Update Idea` : `Create Idea`}
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className={styles.formGroup}>
          <label htmlFor="fullName" className={styles.label}>
            Title
          </label>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "fullName",
              styles.formInput,
              "title",
              "text",
              idea.title,
              "Your Title",
              undefined
            )}
          />
        </div>
        {/* Category */}
        <div className={styles.formGroup}>
          <label htmlFor="category" className={styles.label}>
            Category
          </label>
          <Select
            name="category_id"
            defaultValue={idea.category_id !== "" ? idea.category_id : ""}
            id="category"
            onChange={handleOnChange}
          >
            <option value="" disabled hidden>
              Choose your category...
            </option>
            {categories.map((category, index) => (
              <option
                key={`${category.name} ${index}`}
                value={category.category_id}
              >
                {category.category_name}
              </option>
            ))}
          </Select>
        </div>
        {/* Description */}
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <textarea
            rows={4}
            onChange={handleOnChangeTextArea}
            name="description"
            placeholder="Your description"
            className={styles.description}
            id="description"
            value={idea.description}
          ></textarea>
        </div>
        {/* Preview */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Documents</label>
          <div>
            <Preview
              // onClickItem={undefined}
              data={idea.documents}
              renderBody={renderPreview}
              addMode={{ status: true, onFileChange: handleOnFileChange }}
            />
          </div>
        </div>
        {/* Terms */}
        <div className={clsx(styles.formGroup, styles.formCheck)}>
          <label htmlFor="agree" className={styles.checkLabel}>
            <Input
              onChange={handleOnChangeCheck}
              config={configInput(
                "agree",
                styles.checkInput,
                "agreeTerms",
                "checkbox",
                "",
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                false,
                agree
              )}
            />
            <i className={styles.inputHelper}></i>I agree to all
          </label>
          <span className={styles.termsBtn} onClick={() => setIsOpen(true)}>
            Terms & Conditions
          </span>
        </div>
        <Button
          type={"submit"}
          buttonSize={"btnLarge"}
          buttonStyle={"btnPurpleSolid"}
        >
          Confirm
        </Button>
        <Popup
          isOpen={isOpen}
          icon={<IoInformationCircleOutline className={styles.popupIcon} />}
          title="Terms & Conditions"
          message={body}
          onClose={handleClickClose}
          buttonTitle="I agree"
          onConfirm={handleClickAgree}
        />
      </form>
    </div>
  );
}

export default IdeaForm;
