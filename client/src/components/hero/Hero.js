import "./Hero.css";
import React from "react";

const Hero = () => {
  return (
    <section className="hero">
      <article className="hero-titles">
        <span>Cargasm </span>
        <span>Blog</span>
      </article>
      <img
        className="hero-image"
        src="https://images.caricos.com/m/mercedes-benz/2017_mercedes-amg_c63_cabrio/images/2560x1440/2017_mercedes-amg_c63_cabrio_113_2560x1440.jpg"
        alt="Welcome Blog avatar"
      />
    </section>
  );
};

export default Hero;
