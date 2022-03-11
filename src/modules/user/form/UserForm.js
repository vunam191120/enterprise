import axios from "axios";
import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import avt1 from "./../../../assets/avt1.jpg";
import avt2 from "./../../../assets/teej1.jpeg";
import styles from "./UserForm.module.css";
import Input from "../../../component/input/Input";
import Button from "../../../component/button/Button";
import Spinner from "../../../component/spinner/Spinner";

function UserForm({ mode }) {
  const navigate = useNavigate();
  const { usernameParam } = useParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  //   Initial State
  //   const [username, setUsername] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [firstName, setFirstName] = useState("");
  //   const [lastName, setLastName] = useState("");
  //   const [phone, setPhone] = useState("");
  //   const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (mode === "update") {
      axios
        .get(`http://103.107.182.190/service1/user/${usernameParam}`)
        .then((response) => {
          setUser({
            username: response.data.data.username,
            first_name: response.data.data.first_name,
            last_name: response.data.data.last_name,
            full_name: response.data.data.full_name,
            role_id: response.data.data.role_id,
            phone: response.data.data.phone.toString(),
            // avatar: response.data.data.avatar,
            avatar: "",
          });
        });
    } else if (mode === "create") {
      setUser({
        username: "",
        first_name: "",
        last_name: "",
        full_name: "",
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

  const handleOnChange = (newData) => {
    setUser({ ...user, [newData.name]: newData.value });
  };

  const handleOnImageChange = (target) => {
    // let fileName = target.value
    //   .substr(target.value.lastIndexOf("\\") + 1)
    //   .split(".")[0];
    // let extensionName = target.value.split(".")[1];
    // let avatar = `./../../../assets/${fileName}.${extensionName}`;
    // console.log(avatar);

    let files = target.files;

    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (e) => {
      setUser({ ...user, [target.name]: e.target.result });
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "update") {
      return axios
        .put("http://103.107.182.190/service1/user", user)
        .then((response) => console.log(response.data))
        .catch((err) => console.log(err));
    }
    return axios
      .post("http://103.107.182.190/service1/user", user)
      .then((response) => response.data)
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
          {/* <Input
            onChange={handleOnChange}
            config={configInput(
              "role",
              "",
              "role_id",
              "number",
              user.role_id,
              "Your Role"
            )}
          /> */}
          <select
            name="role_id"
            defaultValue={user.role_id === "" ? "default" : user.role_id}
            id="role"
            onChange={(e) => handleOnChange(e.target)}
          >
            <option value="default" disabled hidden>
              Choose your role...
            </option>
            <option value="1">Quality Assurance Coordinator</option>
            <option value="2">Quality Assurance Manager</option>
            <option value="3">Staff</option>
            <option value="4">Admin</option>
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
            onChange={handleOnImageChange}
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
