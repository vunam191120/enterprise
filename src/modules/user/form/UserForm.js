import axios from "axios";
import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AiOutlineUpload } from "react-icons/ai";

import defaultAvt from "./../../../assets/user/avatar/defaultUserImage.png";
import styles from "./UserForm.module.css";
import Input from "../../../component/input/Input";
import Button from "../../../component/button/Button";
import Spinner from "../../../component/spinner/Spinner";
import Select from "../../../component/select/Select";

function UserForm({ mode }) {
  const navigate = useNavigate();
  const { username } = useParams();
  const [departments, setDepartments] = useState([]);
  const [user, setUser] = useState(null);
  const [preview, setPreview] = useState();

  //   Initial State
  //   const [username, setUsername] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [firstName, setFirstName] = useState("");
  //   const [lastName, setLastName] = useState("");
  //   const [phone, setPhone] = useState("");
  //   const [avatar, setAvatar] = useState("");

  useEffect(() => {
    // Call Department
    axios
      .get("http://103.107.182.190/service1/department")
      .then((response) => {
        setDepartments(response.data.data);
      })
      .catch((err) => console.log(err));
    if (mode === "update") {
      axios
        .get(`http://103.107.182.190/service1/user/${username}`)
        .then((response) => {
          setUser({
            ...response.data.data,
            phone: response.data.data.phone.toString(),
          });
          setPreview(`http://103.107.182.190/${response.data.data.avatar}`);
        });
    } else if (mode === "create") {
      setUser({
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        full_name: "",
        department_id: "",
        role_id: "",
        phone: "",
        avatar: "",
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
    disabled,
    hidden
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
      hidden: hidden,
    };
  };

  const handleOnChange = (target) => {
    if (target.name === "avatar") {
      // Change preview avatar by using FileReader
      const reader = new FileReader();
      reader.readAsDataURL(target.files[0]);
      reader.onload = (event) => {
        setPreview(event.target.result);
      };
      return setUser({ ...user, [target.name]: target.files[0] });
    }
    setUser({ ...user, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (mode === "update") {
      formData.append("full_name", user.full_name);
      formData.append("last_name", user.last_name);
      formData.append("first_name", user.first_name);
      formData.append("phone", user.phone);
      formData.append("role_id", +user.role_id);
      formData.append("department_id", +user.department_id);
      formData.append("avatar", user.avatar);

      return axios
        .put(`http://103.107.182.190/service1/user/${user.user_id}`, formData)
        .then((response) => {
          console.log(response.data);
          // navigate("/users/view");
          navigate(-1);
        })
        .catch((err) => console.log(err));
    }

    formData.append("username", user.username);
    formData.append("password", user.password);
    formData.append("full_name", user.full_name);
    formData.append("last_name", user.last_name);
    formData.append("first_name", user.first_name);
    formData.append("phone", user.phone);
    formData.append("role_id", +user.role_id);
    formData.append("department_id", +user.department_id);
    formData.append("avatar", user.avatar);

    return axios
      .post(`http://103.107.182.190/service1/user`, formData)
      .then((response) => {
        console.log(response.data);
        // navigate("/users/view");
        navigate(-1);
      })
      .catch((err) => console.log(err));
  };

  if (!user) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>
        {mode === "update" ? `Update User` : `Create User`}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>
            Username
          </label>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "username",
              styles.formInput,
              "username",
              "text",
              user.username,
              "Your username",
              "",
              mode === "update" ? true : false
            )}
          />
        </div>
        {mode === "create" && (
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <Input
              onChange={handleOnChange}
              config={configInput(
                "password",
                styles.formInput,
                "password",
                "password",
                user.password,
                "Your password"
              )}
            />
          </div>
        )}
        <div className={styles.formGroup}>
          <label htmlFor="firstName" className={styles.label}>
            First Name
          </label>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "firstName",
              styles.formInput,
              "first_name",
              "text",
              user.first_name,
              "Your First Name"
            )}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="lastName" className={styles.label}>
            Last Name
          </label>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "lastName",
              styles.formInput,
              "last_name",
              "text",
              user.last_name,
              "Your First Name"
            )}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="fullName" className={styles.label}>
            Full Name
          </label>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "fullName",
              styles.formInput,
              "full_name",
              "text",
              user.full_name,
              "Your Full Name"
            )}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="role" className={styles.label}>
            Role
          </label>
          <Select
            name="role_id"
            defaultValue={user.role_id === "" ? "" : user.role_id}
            id="role"
            onChange={(e) => handleOnChange(e.target)}
          >
            <option value="" disabled hidden>
              Choose your role...
            </option>
            <option value="1">Quality Assurance Coordinator</option>
            <option value="2">Quality Assurance Manager</option>
            <option value="3">Staff</option>
            <option value="4">Admin</option>
          </Select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="department" className={styles.label}>
            Department
          </label>
          <Select
            name="department_id"
            defaultValue={user.department_id !== "" ? user.department_id : ""}
            id="department"
            onChange={(e) => handleOnChange(e.target)}
          >
            <option value="" disabled hidden>
              Choose your department...
            </option>
            {departments.map((department, index) => (
              <option
                key={`${department.name} ${index}`}
                value={department.department_id}
              >
                {department.department_name}
              </option>
            ))}
          </Select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.label}>
            Phone
          </label>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "phone",
              "",
              "phone",
              "text",
              user.phone,
              "Your Phone"
            )}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Avatar</label>
          <div className={styles.preview}>
            <img
              className={styles.imgPreview}
              src={user.avatar === "" ? defaultAvt : preview}
              alt="preview avatar"
            />
            <label htmlFor="avatar" className={styles.uploadBtn}>
              <AiOutlineUpload />
              Upload
            </label>
          </div>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "avatar",
              styles.avatarInput,
              "avatar",
              "file",
              undefined,
              "",
              "image/*"
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

export default UserForm;
