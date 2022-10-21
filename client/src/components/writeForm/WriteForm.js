import "./WriteForm.css";
import React, { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";

const WriteForm = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { user } = useContext(Context);

  const handleNewPost = async (e) => {
    e.preventDefault();
    const newPost = { title, desc, username: user.username };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.photo = fileName;
      try {
        await axios.post("/upload/", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      await axios.post("/posts/", newPost);
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="write-container">
      {file && (
        <img src={URL.createObjectURL(file)} alt="new avatar upload display" />
      )}
      <form className="write-form" onSubmit={handleNewPost}>
        <article className="file-title form-group">
          <label htmlFor="uploadAvatar">
            <span className="fa-solid fa-upload write-icon"></span>
          </label>
          <input
            type="file"
            id="uploadAvatar"
            style={{ display: "none" }}
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <input
            type="text"
            placeholder="Title..."
            autoCapitalize={true}
            className="write-input"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </article>
        <article className="body form-group">
          <textarea
            type="text"
            placeholder="Body of your blog..."
            className="write-input"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          ></textarea>
        </article>
        <button className="write-form-btn" type="submit">
          Publish
        </button>
      </form>
    </section>
  );
};

export default WriteForm;
