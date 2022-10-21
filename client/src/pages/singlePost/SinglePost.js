import "./SinglePost.css";
import React from "react";
import SinglePostContainer from "../../components/singlePostContainer/SinglePostContainer";
import SideBar from "../../components/sidebar/Sidebar";

const SinglePost = () => {
  return (
    <main className="single-post">
      <SinglePostContainer />
      <SideBar />
    </main>
  );
};

export default SinglePost;
