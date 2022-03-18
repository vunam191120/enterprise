import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

import styles from "./TermForm.module.css";
import Input from "../../../component/input/Input";
import Button from "../../../component/button/Button";
import Spinner from "../../../component/spinner/Spinner";
import Select from "../../../component/select/Select";

function TermForm({ mode }) {
  const navigate = useNavigate();
  const { termID } = useParams();
  const [term, setTerm] = useState(null);
  //   const [managers, setManagers] = useState([]);

  useEffect(() => {
    if (mode === "update") {
      axios
        .get(`http://103.107.182.190/service1/term/${termID}`)
        .then((response) => {
          setTerm({ ...response.data.data });
        })
        .catch((err) => console.log(err));
    } else if (mode === "create") {
      setTerm({
        term_name: "",
        start_date: "",
        end_date: "",
        first_closure_date: "",
        final_closure_date: "",
        status: "",
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
    setTerm({ ...term, [target.name]: target.value });
  };

  const handleDateChange = ({ target }) => {
    setTerm({ ...term, [target.name]: new Date(target.value).toISOString() });
    console.log(
      `Name: ${target.name} - Value: ${target.value} - Term: ${term}`
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "update") {
      return axios
        .put(`http://103.107.182.190/service1/term`, {
          term_id: term.term_id,
          term_name: term.term_name,
          start_date: new Date(term.start_date).toISOString(),
          end_date: new Date(term.end_date).toISOString(),
          first_closure_date: new Date(term.first_closure_date).toISOString(),
          final_closure_date: new Date(term.final_closure_date).toISOString(),
          status: term.status,
        })
        .then((response) => {
          console.log(response.data);
          navigate("/terms/view", { replace: true });
        })
        .catch((err) => console.log(err));
    }

    return axios
      .post(`http://103.107.182.190/service1/term`, {
        term_name: term.term_name,
        start_date: new Date(term.start_date).toISOString(),
        end_date: new Date(term.end_date).toISOString(),
        first_closure_date: new Date(term.first_closure_date).toISOString(),
        final_closure_date: new Date(term.final_closure_date).toISOString(),
        status: term.status,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/terms/view", { replace: true });
      })
      .catch((err) => console.log(err));
  };

  if (!term) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>
        {mode === "update" ? `Update Term` : `Create Term`}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Term Name
          </label>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "name",
              styles.formInput,
              "term_name",
              "text",
              term.term_name,
              "Your term name"
            )}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="startDate" className={styles.label}>
            Start Date
          </label>
          <DatePickerComponent
            id="startDate"
            name="start_date"
            value={term.start_date}
            placeholder="Enter Start Date DD/MM/YYYY"
            onChange={handleDateChange}
            format="dd/MM/yyyy"
            cssClass="cssCustom"
          ></DatePickerComponent>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="endDate" className={styles.label}>
            End Date
          </label>
          <DatePickerComponent
            id="endDate"
            name="end_date"
            value={term.end_date}
            placeholder="Enter End Date DD/MM/YYYY"
            onChange={handleDateChange}
            format="dd/MM/yyyy"
            cssClass="cssCustom"
          ></DatePickerComponent>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="firstClosureDate" className={styles.label}>
            First Closure Date
          </label>
          <DatePickerComponent
            id="firstClosureDate"
            name="first_closure_date"
            value={term.first_closure_date}
            placeholder="Enter First Closure Date DD/MM/YYYY"
            onChange={handleDateChange}
            format="dd/MM/yyyy"
            cssClass="cssCustom"
          ></DatePickerComponent>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="finalClosureDate" className={styles.label}>
            Final Closure Date
          </label>
          <DatePickerComponent
            id="finalClosureDate"
            name="final_closure_date"
            value={term.final_closure_date}
            placeholder="Enter Final Closure Date DD/MM/YYYY"
            onChange={handleDateChange}
            format="dd/MM/yyyy"
            cssClass="cssCustom"
          ></DatePickerComponent>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="status" className={styles.label}>
            Status
          </label>
          <Select
            name="status"
            id="status"
            onChange={handleOnChange}
            defaultValue={term.status !== "" ? term.status : ""}
          >
            <option hidden disabled value="">
              Choose Status ...
            </option>
            <option value="ongoing">On going</option>
            <option value="upcoming">Up coming</option>
          </Select>
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

export default TermForm;
