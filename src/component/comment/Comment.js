import React from "react";

import styles from "./Comment.module.css";

function Comment({ data }) {
  const calculateTime = (oldDate) => {
    let date1 = new Date();
    let date2 = new Date(oldDate);
    let distanceTime = ((date1 - date2) / (1000 * 3600 * 24)).toFixed(1);
    console.log(distanceTime);
    if (distanceTime <= 0.9) {
      return `${(24 * distanceTime).toFixed(0)} hours ago`;
    }
    return `${distanceTime.toFixed()} days ago`;
  };

  return (
    <div className={styles.container}>
      {data.map((comment, index) => (
        <div key={index} className={styles.item}>
          <div className={styles.imgContainer}>
            <img
              src={`http://103.107.182.190/${comment.user.avatar}`}
              alt="Avatar User Comment"
            />
          </div>
          <div className={styles.content}>
            <h4 className={styles.name}>{comment.user.full_name}</h4>
            <p className={styles.commentContent}>{comment.comment}</p>
            <p className={styles.date}>{calculateTime(comment.created_date)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comment;
