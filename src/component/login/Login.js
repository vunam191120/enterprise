import React, { useState } from "react";
import clsx from "clsx";
import styles from "./Login.module.css";
import slider from "./../../assets/loginBg.png";
import Input from "../input/Input";
import Button from "../button/Button";

export default function Login() {
  const [account, setAccount] = useState({ username: "", password: "" });
  const [remember, setRemember] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(account);
  };

  const configInput = (
    id,
    nameAtt,
    type,
    text,
    value,
    placeholder,
    checked
  ) => {
    return {
      id: id,
      name: nameAtt,
      type: type,
      text: text,
      value: value,
      placeholder: placeholder,
      checked: checked,
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
              <Input
                onChange={handleOnChange}
                config={configInput(
                  "username",
                  "username",
                  "text",
                  "Username:",
                  account.username,
                  "your-email@gmail.com"
                )}
              />
              <Input
                onChange={handleOnChange}
                config={configInput(
                  "password",
                  "password",
                  "password",
                  "Password:",
                  account.password,
                  "Your password"
                )}
              />
              <div className={clsx(styles.flexJusBet)}>
                <Input
                  onChange={handleCheckbox}
                  config={configInput(
                    "remember",
                    "remember",
                    "checkbox",
                    "Remember me",
                    remember,
                    null,
                    remember
                  )}
                />
                {/* <Button type={"text"} text={"Forgot password?"} /> */}
              </div>
              <Button
                type={"submit"}
                text={"Log In"}
                buttonSize={"btnExLarge"}
                buttonStype={"btnYellowSolid"}
              />
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
