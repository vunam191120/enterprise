import React, { useEffect, useState } from "react";
import { NavLink, Route, Routes, useParams, Outlet } from "react-router-dom";
import { BsGrid3X3 } from "react-icons/bs";
import { FaRegLightbulb, FaRegComments } from "react-icons/fa";
import {
  AiOutlineFile,
  AiFillFile,
  AiTwotoneLike,
  AiTwotoneDislike,
} from "react-icons/ai";
import { BiDislike, BiLike } from "react-icons/bi";
import { HiDownload } from "react-icons/hi";

import axiosClient from "../../../apis/axios.config";
import Spinner from "../../../component/spinner/Spinner";
import styles from "./IdeaDetail.module.css";
import Preview from "../../../component/preview/Preview";
import Comment from "../../../component/comment/Comment";
import Others from "../../../component/others/Others";
import Popup from "../../../component/popup/Popup";
import Button from "../../../component/button/Button";
import clsx from "clsx";
// import { IMG_EXTENSIONS } from "../../../constants/";

const navs = [
  { name: "documents", icon: <BsGrid3X3 /> },
  { name: "comments", icon: <FaRegComments /> },
  { name: "others", icon: <FaRegLightbulb /> },
];

const IMG_EXTENSIONS = [
  "jpg",
  "jpeg",
  "jfif",
  "pjpeg",
  "pjp",
  "png",
  "svg",
  "gif",
];

function IdeaDetail() {
  const { ideaId } = useParams();
  const [commentId, setCommentId] = useState(null);
  const [commentContent, setCommentContent] = useState(null);
  const [idea, setIdea] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [onFocusLike, setOnFocusLike] = useState(false);
  const [onFocusDisLike, setOnFocusDisLike] = useState(false);
  const [countLike, setCountLike] = useState();
  const [countDisLike, setCountDisLike] = useState();

  function checkCount(idea) {
    // Check count like
    idea.count.length === 1
      ? setCountLike(idea.count[0].count)
      : setCountLike(0);
    // Check count dislike
    idea.count.length === 2
      ? setCountDisLike(idea.count[1].count)
      : setCountDisLike(0);
  }

  async function getIdeaComment() {
    let res = await axiosClient.get(
      `http://103.107.182.190/service1/comment/${ideaId}`
    );
    setComments(res.data.data);
  }

  useEffect(() => {
    async function getIdea() {
      let res = await axiosClient.get(
        `http://103.107.182.190/service1/idea/${ideaId}`
      );
      setIdea(res.data.data);
      checkCount(res.data.data);
    }

    getIdea();
    getIdeaComment();
  }, []);

  const handleClickClose = () => setIsOpen(false);

  const onClickDownload = (docId) => {
    axiosClient
      .get(`http://103.107.182.190/service1/download/${docId}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
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

  const handleClickDeleteComment = (commentId, commentContent) => {
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

  const renderPreview = (doc, index, docs, onClickDownload) => (
    <div
      className={styles.item}
      key={index}
      onClick={() => onClickDownload(doc.document_id)}
    >
      {IMG_EXTENSIONS.includes(doc.file_type) ? (
        <img
          className={styles.imgThumbnail}
          src={`http://103.107.182.190/documents/${doc.document}`}
          alt="Document"
        />
      ) : (
        <AiFillFile className={styles.iconThumbnail} />
      )}
      <div className={styles.fileNameContainer}>
        <AiOutlineFile className={styles.icon} />
        <span className={styles.fileNameContent}>{doc.document}</span>
      </div>
    </div>
  );

  async function vote(action) {
    const res = await axiosClient.post("http://103.107.182.190/service1/vote", {
      idea_id: idea.idea_id,
      vote: action,
    });
    console.log(res.data);
  }

  const handleClickLike = () => {
    if (onFocusLike) {
      setOnFocusLike(false);
      setCountLike(countLike - 1);
    } else {
      setOnFocusLike(true);
      vote(1);
      setCountLike(countLike + 1);
      if (onFocusDisLike) {
        setOnFocusDisLike(false);
        setCountLike(countLike + 1);
        setCountDisLike(countDisLike - 1);
      }
    }
  };

  const handleClickDisLike = () => {
    if (onFocusDisLike) {
      setOnFocusDisLike(false);
      setCountDisLike(countDisLike - 1);
    } else {
      setOnFocusDisLike(true);
      vote(0);
      setCountDisLike(countDisLike + 1);
      if (onFocusLike) {
        setOnFocusLike(false);
        setCountDisLike(countDisLike + 1);
        setCountLike(countLike - 1);
      }
    }
  };

  const handleClickDownloadAll = () => {};

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
              src={`http://103.107.182.190/${idea.avatar}`}
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
          <div className={styles.flex}>
            <div className={styles.actionContainer}>
              <div
                className={clsx(
                  styles.actionItem,
                  idea.status && styles.active
                )}
              >
                <div
                  className={styles.actionBtn}
                  onClick={(e) => {
                    if (idea.status === "final_closure") {
                      return e.preventDefault();
                    }
                    handleClickLike();
                  }}
                >
                  {onFocusLike ? (
                    <AiTwotoneLike className={styles.actionIcon} />
                  ) : (
                    <BiLike className={styles.actionIcon} />
                  )}
                  <span>Like</span>
                </div>
                <span>{countLike}</span>
              </div>
              <div
                className={clsx(
                  styles.actionItem,
                  idea.status && styles.active
                )}
              >
                <div
                  className={styles.actionBtn}
                  onClick={(e) => {
                    if (idea.status === "final_closure") {
                      return e.preventDefault();
                    }
                    handleClickDisLike();
                  }}
                >
                  {onFocusDisLike ? (
                    <AiTwotoneDislike className={styles.actionIcon} />
                  ) : (
                    <BiDislike className={styles.actionIcon} />
                  )}
                  <span>Dislike</span>
                </div>
                <span>{countDisLike}</span>
              </div>
            </div>
            <Button
              className={styles.downloadBtn}
              type={"button"}
              buttonSize={"btnMedium"}
              buttonStyle={"btnPurpleSolid"}
              onClick={handleClickDownloadAll}
            >
              <HiDownload className={styles.downloadIcon} />
              Export All
            </Button>
          </div>
          <div className={styles.nav}>
            {navs.map((nav, index) => (
              <NavLink
                to={`${nav.name}`}
                onClick={(e) => {
                  if (index === 1 && idea.status === "final_closure") {
                    e.preventDefault();
                  }
                }}
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
