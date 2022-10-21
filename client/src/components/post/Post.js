import "./Post.css";
import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const publicFolder = "http://localhost:8000/imageStorage/";

  return (
    <section className="post-container">
      {post.photo && <img src={publicFolder + post.photo} alt="Post avatar" />}
      <article className="post-info">
        <div className="post-categories">
          {post.categories.map((category) => (
            <span>{category.name}</span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <h3>{post.title}</h3>
        </Link>
        <hr />
        <span className="post-date">
          {new Date(post.createdAt).toDateString()}
        </span>
      </article>
      <p>{post.desc}</p>
    </section>
  );
};

export default Post;
