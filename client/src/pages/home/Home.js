import "./Home.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../../components/hero/Hero";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("/posts" + search);
      setPosts(response.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <main className="home">
      <Hero />
      <section className="home-content">
        <Posts posts={posts} />
        <Sidebar />
      </section>
    </main>
  );
};

export default Home;
