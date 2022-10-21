import "./Posts.css";
import React from "react";
import Post from "../post/Post";

const Posts = ({ posts }) => {
  return (
    <section className="posts-container">
      {posts.map((post) => (
        <Post post={post} key={post._id} />
      ))}
    </section>
  );
};

export default Posts;
