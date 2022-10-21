import "./Settings.css";
import React, { useContext, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import { Context } from "../../context/Context";

const Settings = () => {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [updated, setUpdated] = useState(false);
  const publicFolder = "http://localhost:8000/imageStorage/";

  const handleUserInfoUpdate = async (e) => {
    e.preventDefault();
    dispatch({ type: " UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      updatedUser.profilePicture = fileName;
      try {
        await axios.post("/upload/", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const response = await axios.put("/users/" + user._id, updatedUser);
      setUpdated(true);
      dispatch({ type: " UPDATE_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: " UPDATE_FAILURE" });
      console.log(error);
    }
  };

  return (
    <main className="settings">
      <section className="settings-container">
        <article className="settings-article">
          <h4>Update your account</h4>
          <h4>Delete your account</h4>
        </article>
        <form className="settings-form" onSubmit={handleUserInfoUpdate}>
          <label>Profile Picture</label>
          <article>
            <img
              className="profile-picture"
              src={
                file
                  ? URL.createObjectURL(file)
                  : publicFolder + user.profilePicture
              }
              alt="Profile Avatar"
            />
            <label htmlFor="file-input">
              <span className="fa-regular fa-pen-to-square settings-icon"></span>
            </label>
            <input
              type="file"
              id="file-input"
              style={{ display: "none" }}
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </article>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit"> Update</button>
          {updated && (
            <span
              style={{
                color: "greenyellow",
                textAlign: "center",
                margin: "1em",
              }}
            >
              Successfully Updated Your Profile!
            </span>
          )}
        </form>
      </section>
      <Sidebar />
    </main>
  );
};

export default Settings;
