import axios from "axios";
import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import avt1 from "./../../../assets/avt1.jpg";
import styles from "./UserForm.module.css";
import Input from "../../../component/input/Input";
import Button from "../../../component/button/Button";
import Spinner from "../../../component/spinner/Spinner";

function UserForm({ mode }) {
  const navigate = useNavigate();
  const { usernameParam } = useParams();
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [user, setUser] = useState(null);

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
        .get(`http://103.107.182.190/service1/user/${usernameParam}`)
        .then((response) => {
          setUser({
            username: response.data.data.username,
            first_name: response.data.data.first_name,
            last_name: response.data.data.last_name,
            full_name: response.data.data.full_name,
            department_id: response.data.data.department_id,
            role_id: response.data.data.role_id,
            phone: response.data.data.phone.toString(),
            avatar: "",
          });
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
    accept
  ) => {
    return {
      id: id,
      className: className,
      name: nameAtt,
      type: type,
      value: value,
      placeholder: placeholder,
      accept: accept,
    };
  };

  const handleOnChange = (target) => {
    if (target.name === "avatar") {
      return setUser({ ...user, [target.name]: target.files[0] });
    }
    setUser({ ...user, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (mode === "update") {
      formData.append("username", user.username);
      formData.append("full_name", user.full_name);
      formData.append("last_name", user.last_name);
      formData.append("first_name", user.first_name);
      formData.append("phone", user.phone);
      formData.append("role_id", +user.role_id);
      formData.append("department_id", +user.department_id);
      formData.append("avatar", user.avatar);
      return axios
        .put(`http://103.107.182.190/service1/user`, formData)
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
  } else {
  }

  return (
    <div>
      <h2>{mode === "update" ? `Update User` : `Create User`}</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>
            Username:
          </label>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "username",
              "",
              "username",
              "text",
              user.username,
              "Your username"
            )}
          />
        </div>
        {mode === "create" && (
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password:
            </label>
            <Input
              onChange={handleOnChange}
              config={configInput(
                "password",
                "",
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
            First Name:
          </label>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "firstName",
              "",
              "first_name",
              "text",
              user.first_name,
              "Your First Name"
            )}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="lastName" className={styles.label}>
            Last Name:
          </label>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "lastName",
              "",
              "last_name",
              "text",
              user.last_name,
              "Your First Name"
            )}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="fullName" className={styles.label}>
            Full Name:
          </label>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "fullName",
              "",
              "full_name",
              "text",
              user.full_name,
              "Your Full Name"
            )}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="role" className={styles.label}>
            Role:
          </label>
          <select
            name="role_id"
            defaultValue={user.role_id === "" ? "" : user.role_id}
            id="role"
            onChange={(e) => handleOnChange(e.target)}
            required
          >
            <option value="" disabled hidden>
              Choose your role...
            </option>
            <option value="1">Quality Assurance Coordinator</option>
            <option value="2">Quality Assurance Manager</option>
            <option value="3">Staff</option>
            <option value="4">Admin</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="department" className={styles.label}>
            Department:
          </label>
          <select
            name="department_id"
            defaultValue={user.department_id === "" ? "" : user.department_id}
            id="department"
            onChange={(e) => handleOnChange(e.target)}
            required
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
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.label}>
            Phone:
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
          <label htmlFor="avatar" className={styles.label}>
            Avatar:
          </label>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "avatar",
              "",
              "avatar",
              "file",
              "",
              "",
              "image/*"
            )}
          />
        </div>
        <div>
          <h1>Preview Avatar</h1>
          <img
            src={user.avatar === "" ? avt1 : user.avatar}
            alt="preview avatar"
          />
        </div>
        <Button
          type={"submit"}
          buttonSize={"btnLarge"}
          buttonStype={"btnPrimarySolid"}
        >
          Confirm
        </Button>
      </form>
    </div>
  );
}

export default UserForm;
