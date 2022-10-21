import "./SinglePostContainer.css";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";

const SinglePostContainer = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const { user } = useContext(Context);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [singlePost, setSinglePost] = useState({});
  const publicFolder = "http://localhost:8000/imageStorage/";

  useEffect(() => {
    const getPost = async () => {
      const response = await axios.get("/posts/" + path);
      setSinglePost(response.data);
      setTitle(response.data.title);
      setDesc(response.data.desc);
    };
    getPost();
  }, [path]);

  const handleDeletePost = async () => {
    try {
      await axios.delete("/posts/" + path, { username: user.username });
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put("/posts/" + path, {
        username: user.username,
        title,
        desc,
      });
      // window.location.reload();
      setUpdateMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="single-post-container">
      <article className="single-post-wrapper">
        {singlePost.photo && (
          <img src={publicFolder + singlePost.photo} alt="User avatar upload" />
        )}
        {updateMode ? (
          <input
            className="singlePost-title-input"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        ) : (
          <h1>{title}</h1>
        )}
        {singlePost.username === user?.username && (
          <div className="single-icon-container">
            <span
              className="fa-solid fa-pen-to-square single-icon"
              onClick={() => {
                setUpdateMode(true);
              }}
            ></span>
            <span
              className="fa-solid fa-trash single-icon"
              onClick={handleDeletePost}
            ></span>
          </div>
        )}
        <div className="inner-singlepost-info">
          <h5>
            Author:
            <Link to={`/?user=${singlePost.username}`} className="link">
              <strong>{singlePost.username}</strong>
            </Link>
          </h5>
          <p>{new Date(singlePost.createdAt).toDateString()}</p>
        </div>

        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        ) : (
          <p className="single-post-desc">{desc}</p>
        )}
        {updateMode && (
          <button className="update-btn" onClick={handleUpdate}>
            Update
          </button>
        )}
      </article>
    </section>
  );
};

export default SinglePostContainer;
