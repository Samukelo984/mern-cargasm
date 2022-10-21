import "./Sidebar.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Sidebar = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios.get("/categories/");
      setCategory(response.data);
    };
    getCategories();
  }, []);

  return (
    <section className="sidebar">
      <article className="sidebar-item">
        <h2>ABOUT CARS</h2>
        <img
          src="https://www.supercars.net/blog/wp-content/uploads/2020/07/717662-scaled.jpg"
          alt="Sidebar avatar"
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
          minus? Esse et nihil consequuntur culpa harum accusamus ad atque
          saepe!
        </p>
      </article>
      <article className="sidebar-item">
        <h2>CATEGORIES</h2>
        <ul>
          {category.map((c) => (
            <Link to={`/?categories=${c.name}`} className="link">
              <li key={c._id}>{c.name}</li>
            </Link>
          ))}
        </ul>
      </article>
      <article className="sidebar-item">
        <h2>FOLLOW US</h2>
        <div className="sidebar-socials">
          <span className="fa-brands fa-square-facebook"></span>
          <span className="fa-brands fa-square-instagram"></span>
          <span className="fa-brands fa-square-twitter"></span>
          <span className="fa-brands fa-square-pinterest"></span>
        </div>
      </article>
    </section>
  );
};

export default Sidebar;
