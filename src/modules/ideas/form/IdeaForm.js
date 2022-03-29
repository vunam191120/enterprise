import axiosClient from "../../../apis/axios.config";
import React, { useState, useEffect, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AiOutlineFile,
  AiOutlineCloudUpload,
  AiFillCloseCircle,
} from "react-icons/ai";
import clsx from "clsx";

import styles from "./IdeaForm.module.css";
import Input from "../../../component/input/Input";
import Button from "../../../component/button/Button";
import Spinner from "../../../component/spinner/Spinner";
import Select from "../../../component/select/Select";
import Preview from "../../../component/preview/Preview";

function IdeaForm({ mode }) {
  const navigate = useNavigate();
  const { ideaId } = useParams();
  const [idea, setIdea] = useState(null);
  const [categories, setCategories] = useState(null);

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
    console.log("Idea:", res.data.data);
    setIdea(res.data.data);
  }

  useEffect(() => {
    getCategories();
    if (mode === "update") {
      getOneIdea();
    } else if (mode === "create") {
      setIdea({
        title: "",
        documents: [],
        description: "",
        category_id: "",
      });
    }
  }, []);

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
    required
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
    };
  };

  const renderPreview = (doc, index, docs, onClickDownload) => {
    if (index === docs.length - 1) {
      return (
        <Fragment key={`${index} ${docs}`}>
          <div className={styles.previewItem} onClick={() => onClickDownload()}>
            <img
              className={styles.thumbnail}
              src="https://i.pinimg.com/originals/aa/13/db/aa13dbd443f78ba5b2a08feedba95dfd.jpg"
              alt="Document"
            />
            <div className={styles.fileNameContainer}>
              <AiOutlineFile className={styles.previewIcon} />
              <span className={styles.fileNameContent}>{doc.name}</span>
            </div>
            <AiFillCloseCircle
              onClick={() => handleDeleteFile(index)}
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
        <div
          className={styles.previewItem}
          key={`${index} ${docs}`}
          onClick={() => onClickDownload()}
        >
          <img
            className={styles.thumbnail}
            src="https://i.pinimg.com/originals/aa/13/db/aa13dbd443f78ba5b2a08feedba95dfd.jpg"
            alt="Document"
          />
          <div className={styles.fileNameContainer}>
            <AiOutlineFile className={styles.previewIcon} />
            <span className={styles.fileNameContent}>{doc.name}</span>
          </div>
          <AiFillCloseCircle
            onClick={() => handleDeleteFile(index)}
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
    }
  };

  const handleDeleteFile = (indexItem) => {
    setIdea((idea) => {
      return {
        ...idea,
        documents: idea.documents.filter((item, index) => {
          return index !== indexItem;
        }),
      };
    });
  };

  // const onClickDownload = () => {};

  const handleOnChange = (target) => {
    setIdea({ ...idea, [target.name]: target.value });
  };

  const handleOnChangeTextArea = ({ target }) => {
    setIdea({ ...idea, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (mode === "create") {
      formData.append("title", idea.title);
      formData.append("documents", idea.documents);
      formData.append("description", idea.description);
      formData.append("category_id", +idea.category_id);
      axiosClient
        .post(`http://103.107.182.190/service1/idea`, formData)
        .then((res) => navigate("/ideas/view", { replace: true }))
        .catch((err) => console.log(err));
    } else if (mode === "update") {
    }
  };

  if (!categories) {
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
              // onClickItem={onClickDownload}
              data={idea.documents}
              renderBody={renderPreview}
              addMode={{ status: true, onFileChange: handleOnFileChange }}
            />
          </div>
        </div>
        <Button
          type={"submit"}
          buttonSize={"btnLarge"}
          buttonStyle={"btnPurpleSolid"}
        >
          Confirm
        </Button>
      </form>
    </div>
  );
}

export default IdeaForm;
