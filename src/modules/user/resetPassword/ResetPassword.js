import React, { useState } from "react";
import { ImStack } from "react-icons/im";
import Button from "../../../component/button/Button";
import Input from "../../../component/input/Input";
import Spinner from "../../../component/spinner/Spinner";

import styles from "./ResetPassword.module.css";

function ResetPassword() {
  const [user, setUser] = useState({ password: "", confirmPassword: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      console.log("Doesnt match");
    }
    console.log(user.password, user.confirmPassword);
  };

  const handleOnChange = (newData) => {
    setUser({ ...user, [newData.name]: newData.value });
  };

  const configInput = (name, className, type, value, placeholder) => {
    return {
      name: name,
      className: className,
      type: type,
      value: value,
      placeholder: placeholder,
    };
  };

  if (!user) {
    return (
      <div>
        <Spinner />
        <p>Loading ...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form onSubmit={handleSubmit}>
          <div className={styles.logo}>
            <ImStack style={{ fontSize: "26px" }} />
            <span className={styles.logoText}>Purple</span>
          </div>
          <p className={styles.text}>
            Reset password is easy. It only takes a few steps
          </p>
          <div className={styles.formGroup}>
            <Input
              onChange={handleOnChange}
              config={configInput(
                "password",
                styles.formInput,
                "password",
                user.password,
                "Type your password"
              )}
            />
          </div>
          <div className={styles.formGroup}>
            <Input
              onChange={handleOnChange}
              config={configInput(
                "confirmPassword",
                styles.formInput,
                "password",
                user.confirmPassword,
                "Confirm your password"
              )}
            />
          </div>
          <Button
            type="submit"
            buttonSize="btnExLarge"
            buttonStyle="btnPurpleSolid"
            className={styles.confirmBtn}
          >
            Confirm
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
