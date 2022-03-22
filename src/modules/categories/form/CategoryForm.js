import axiosClient from "../../../apis/axios.config";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import styles from "./CategoryForm.module.css";
import Input from "../../../component/input/Input";
import Button from "../../../component/button/Button";
import Spinner from "../../../component/spinner/Spinner";
// import Select from "../../../component/select/Select";

function CategoryForm({ mode }) {
  const navigate = useNavigate();
  const { cateId } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (mode === "update") {
      axiosClient
        .get(`http://103.107.182.190/service1/category/${cateId}`)
        .then((response) => setCategory({ ...response.data.data }))
        .catch((err) => console.log(err));
    } else if (mode === "create") {
      setCategory({
        category_name: "",
        description: "",
        staff_id: 5,
        department_id: 1,
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
    setCategory({ ...category, [target.name]: target.value });
  };

  const handleOnChangeTextArea = ({ target }) => {
    setCategory({ ...category, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "update") {
      return axiosClient
        .put(`http://103.107.182.190/service1/category`, category)
        .then((response) => {
          console.log(response.data);
          navigate("/categories/view", { replace: true });
        })
        .catch((err) => console.log(err));
    }

    return axiosClient
      .post(`http://103.107.182.190/service1/category`, {
        category_name: category.category_name,
        description: category.description,
        staff_id: category.staff_id,
        department_id: category.department_id,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/categories/view", { replace: true });
      })
      .catch((err) => console.log(err));
  };

  if (!category) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>
        {mode === "update" ? `Update Category` : `Create Category`}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Category Name
          </label>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "name",
              styles.formInput,
              "category_name",
              "text",
              category.category_name,
              "Your category name"
            )}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <textarea
            rows={4}
            onChange={handleOnChangeTextArea}
            name="description"
            className={styles.description}
            id="description"
            value={category.description}
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="department" className={styles.label}>
            Department
          </label>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "department",
              styles.formInput,
              "department_id",
              "number",
              category.department_id,
              "Department ID",
              "",
              true
            )}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="staff" className={styles.label}>
            Staff ID
          </label>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "staff",
              styles.formInput,
              "staff_id",
              "number",
              category.staff_id,
              "Staff ID",
              "",
              true
            )}
          />
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

export default CategoryForm;
