import React, { useState } from "react";
import clsx from "clsx";
import styles from "./LoginForm.module.css";
import axios from "axios";
import slider from "./../../assets/loginBg.png";
import Input from "../../component/input/Input";
import Button from "../../component/button/Button";

export default function LoginForm() {
  const [account, setAccount] = useState({ username: "", password: "" });
  const [remember, setRemember] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Account: ", account);
    axios
      .post("http://103.107.182.190/service1/login", account)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  const configInput = (id, className, nameAtt, type, value, placeholder) => {
    return {
      id: id,
      className: className,
      name: nameAtt,
      type: type,
      value: value,
      placeholder: placeholder,
    };
  };

  const handleOnChange = (newData) => {
    setAccount({ ...account, [newData.name]: newData.value });
  };

  const handleCheckbox = (newData) => {
    setRemember(newData);
  };

  return (
    <section className={clsx(styles.container)}>
      <div className={clsx(styles.content)}>
        <div className={clsx(styles.left, "row")}>
          <div className={clsx("col lg9")}>
            <h3 className={clsx(styles.title)}>
              Login to <strong>Colorlib</strong>
            </h3>
            <p className={clsx(styles.text)}>
              Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur
              adipisicing.
            </p>
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
                    account.username,
                    "your-email@gmail.com"
                  )}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="username" className={styles.label}>
                  Password:
                </label>
                <Input
                  onChange={handleOnChange}
                  config={configInput(
                    "password",
                    "",
                    "password",
                    "password",
                    account.password,
                    "Your password"
                  )}
                />
              </div>
              <div className={clsx(styles.flexJusBet)}>
                {/* <Input
                  onChange={handleCheckbox}
                  config={configInput(
                    "remember",
                    "remember",
                    "checkbox",
                    remember,
                    null,
                    remember
                  )}
                /> */}
                {/* <Button type={"text"} text={"Forgot password?"} /> */}
              </div>
              <Button
                type={"submit"}
                buttonSize={"btnExLarge"}
                buttonStyle={"btnYellowSolid"}
              >
                Log In
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className={clsx(styles.content)}>
        {/* Slider */}
        <img
          src={slider}
          alt="Slider login"
          className={clsx(styles.imgRight)}
        />
      </div>
    </section>
  );
}
