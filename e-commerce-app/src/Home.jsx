// src/components/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">

      {/* PARALLAX HERO */}
      <section className="parallax-hero">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1>Welcome to FoodZone</h1>
          <p>Delicious food delivered to your doorstep 🍽️</p>
          <Link to="/veg" className="hero-btn">Explore Menu</Link>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <div className="categories">
        <h2 className="section-title">Explore Our Menu</h2>

        <div className="cards-grid">
          {[
            { src: "/images/veg.jpg", title: "Veg Items", link: "/veg", color: "success" },
            { src: "/images/nonveg.jpg", title: "Non-Veg Items", link: "/nonveg", color: "danger" },
            { src: "/images/sweets.jpg", title: "Sweets", link: "/sweets", color: "warning" },
            { src: "/images/break.jpg", title: "Breakfast", link: "/breakfast", color: "info" },
            { src: "/images/snacks.jpg", title: "Snacks", link: "/snacks", color: "primary" },
            { src: "/images/drinks.jpg", title: "Drinks", link: "/drinks", color: "warning" },
            { src: "/images/fastfood.jpg", title: "Fast Food Corner", link: "/fastfood", color: "info" },
            { src: "/images/desserts.jpg", title: "Desserts", link: "/desserts", color: "primary" },
            { src: "/images/soups.jpg", title: "Soups", link: "/soups", color: "success" },
            { src: "/images/bakery.jpg", title: "Bakery", link: "/bakery", color: "danger" }
          ].map((item, index) => (
            <div className="card menu-card" key={index}>
              <img src={item.src} alt={item.title} />
              <h5>{item.title}</h5>
              <Link to={item.link} className={`btn btn-${item.color} w-100`}>
                View {item.title}
              </Link>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Home;
