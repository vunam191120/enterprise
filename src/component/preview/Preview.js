import React from "react";

import styles from "./Preview.module.css";
import Spinner from "../spinner/Spinner";

function Preview({ renderBody, data, onClickItem }) {
  const renderPreviewBody = () => {
    if (data.length === 0 || !data) {
      return (
        <div>
          <td>No data</td>
        </div>
      );
    }
    return data.map((item, index) => renderBody(item, index, onClickItem));
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>{renderPreviewBody()}</div>
    </div>
  );
}

export default Preview;
