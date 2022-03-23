import React, { useEffect, useState } from "react";
import { NavLink, Route, Routes, useParams, Outlet } from "react-router-dom";
import { BsGrid3X3 } from "react-icons/bs";
import { FaRegLightbulb, FaRegComments } from "react-icons/fa";
import { AiOutlineFile } from "react-icons/ai";

import axiosClient from "../../../apis/axios.config";
import Spinner from "../../../component/spinner/Spinner";
import styles from "./IdeaDetail.module.css";
import Preview from "../../../component/preview/Preview";
import Comment from "../../../component/comment/Comment";
import Others from "../../../component/others/Others";
import Popup from "../../../component/popup/Popup";

const navs = [
  { name: "documents", icon: <BsGrid3X3 /> },
  { name: "comments", icon: <FaRegComments /> },
  { name: "others", icon: <FaRegLightbulb /> },
];

function IdeaDetail() {
  const { ideaId } = useParams();
  const [commentId, setCommentId] = useState(null);
  const [commentContent, setCommentContent] = useState(null);
  const [idea, setIdea] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState([]);

  async function getIdea() {
    let res = await axiosClient.get(
      `http://103.107.182.190/service1/idea/${ideaId}`
    );
    setIdea(res.data.data);
  }

  async function getIdeaComment() {
    let res = await axiosClient.get(
      `http://103.107.182.190/service1/comment/${ideaId}`
    );
    setComments(res.data.data);
  }

  useEffect(() => {
    getIdea();
    getIdeaComment();
  }, []);

  const handleClickClose = () => setIsOpen(false);

  const onClickDownload = () => {
    console.log("Clicked Item");
  };

  const onClickDelete = (deleteCommentId, deleteComentContent) => {
    setIsOpen(true);
    setCommentId(deleteCommentId);
    setCommentContent(deleteComentContent);
  };

  const handleSubmitComment = (comment, statusSwitch) => {
    axiosClient
      .post(`http://103.107.182.190/service1/comment`, {
        idea_id: idea.idea_id,
        anonymous: statusSwitch,
        comment: comment,
      })
      .then((response) => {
        getIdeaComment();
      })
      .catch((err) => console.log(err));
  };

  const handleClickDeleteComment = (commentId, commentContent, ideaId) => {
    axiosClient
      .delete(`http://103.107.182.190/service1/comment/${commentId}`, {
        comment: commentContent,
      })
      .then((res) => {
        console.log(res.data);
        getIdeaComment();
      })
      .catch((err) => console.log(err));
  };

  const renderPreview = (doc, index, onClickDownload) => (
    <div className={styles.item} key={index} onClick={() => onClickDownload()}>
      <img
        className={styles.thumbnail}
        src="https://i.pinimg.com/originals/aa/13/db/aa13dbd443f78ba5b2a08feedba95dfd.jpg"
        alt="Document"
      />
      <div className={styles.fileNameContainer}>
        <AiOutlineFile className={styles.icon} />
        <span className={styles.fileNameContent}>{doc.document}</span>
      </div>
    </div>
  );

  if (idea === null) {
    return (
      <div>
        <Spinner />
        <p>Loading ...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Idea Detail</h2>
      <div className={styles.ideaContainer}>
        <div className={styles.header}>
          <div className={styles.imgContainer}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo8u47GCetG3Cu5fX5R4MBBPl3WK12OhWUlQ&usqp=CAU"
              alt="avtar idea"
            />
          </div>
          <div className={styles.heading}>
            <h3>Title: {idea.title}</h3>
            <h4>Created by: {idea.full_name}</h4>
            <p>Category: {idea.category_name}</p>
            <p>Department: {idea.department_name}</p>
            <p>Term: {idea.term_name}</p>
          </div>
        </div>
        <div className={styles.body}>
          <p className={styles.description}>Description: {idea.description}</p>
          <div className={styles.nav}>
            {navs.map((nav, index) => (
              <NavLink
                to={`${nav.name}`}
                key={index}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.active}`
                    : `${styles.navLink}`
                }
              >
                {nav.icon}
                <span>{`${nav.name.charAt(0).toUpperCase()}${nav.name.slice(
                  1
                )}`}</span>
              </NavLink>
            ))}
          </div>
          <div>
            <Routes>
              <Route
                path="documents"
                element={
                  <Preview
                    onClickItem={onClickDownload}
                    data={idea.documents}
                    renderBody={renderPreview}
                  />
                }
              />
              <Route
                path="comments"
                element={
                  <>
                    <Comment
                      onClickDeleteButton={onClickDelete}
                      handleOnSubmit={handleSubmitComment}
                      data={comments}
                    />
                    <Popup
                      isOpen={isOpen}
                      title="Confirm Information"
                      message="Are you sure to delete this comment?"
                      onClose={handleClickClose}
                      onConfirm={() =>
                        handleClickDeleteComment(
                          commentId,
                          commentContent,
                          ideaId
                        )
                      }
                    />
                  </>
                }
              />
              <Route path="others" element={<Others />} />
            </Routes>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default IdeaDetail;
