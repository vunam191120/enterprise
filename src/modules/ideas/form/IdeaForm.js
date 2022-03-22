import axiosClient from "../../../apis/axios.config";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import styles from "./IdeaForm.module.css";
import Input from "../../../component/input/Input";
import Button from "../../../component/button/Button";
import Spinner from "../../../component/spinner/Spinner";

function IdeaForm({ mode }) {
  const navigate = useNavigate();
  const { ideaId } = useParams();
  const [idea, setIdea] = useState(null);
  const [preview, setPreview] = useState([]);

  useEffect(() => {
    if (mode === "update") {
      axiosClient
        .get(`http://103.107.182.190/service1/idea/${ideaId}`)
        .then((response) => setIdea({ ...response.data.data }))
        .catch((err) => console.log(err));
    } else if (mode === "create") {
      setIdea({});
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
    disabled
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
    };
  };

  const handleOnChange = (target) => {
    setIdea({ ...idea, [target.name]: target.value });
  };

  // if (!idea) {
  //   return (
  //     <div>
  //       <Spinner />
  //     </div>
  //   );
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleOnFileChange = (event) => {
    // console.log(event.target.files);
    for (let file of event.target.files) {
      setPreview((preview) => [...preview, { file: file }]);
    }
  };

  const handleDeleteFile = (indexItem) => {
    setPreview(
      preview.filter((item, index) => {
        return index !== indexItem;
      })
    );
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>
        {mode === "update" ? `Update Idea` : `Create Idea`}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="document" className={styles.label}>
            Document
          </label>
          {/* <Input
            onChange={handleOnChange}
            config={configInput(
              "name",
              styles.formInput,
              "document",
              "file",
              department.department_name,
              "Your department name"
            )}
          /> */}
          <input
            type="file"
            id="document"
            name="document"
            multiple
            accept="*"
            onChange={handleOnFileChange}
          ></input>
        </div>
        <div className={styles.formGroup}>
          <h2>Preview Files - Lenght: {preview.length}</h2>
          <div>
            {preview.length > 0 ? (
              preview.map((item, index) => (
                <p key={index}>
                  {item.file.name} -{" "}
                  <span
                    className={styles.deleteBtn}
                    onClick={() => handleDeleteFile(index)}
                  >
                    (X)
                  </span>
                </p>
              ))
            ) : (
              <p>Empty</p>
            )}
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
