
import React, { useEffect, useState } from "react";
import "./Menu.css";

const CATEGORIES = [
  "All",
  "Starters",
  "Main Course",
  "Signature",
  "Dessert",
  "Drinks",
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get menu data from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/menu")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch menu");
        }

        return response.json();
      })
      .then((data) => {
        setMenuItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Unable to load menu");
        setLoading(false);
      });
  }, []);

  // Filter menu items
  const itemsToShow =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <div className="menu-wrapper">

      {/* HERO */}
      <header
        className="menu-hero"
        style={{
          backgroundImage:
            "linear-gradient(rgba(23,23,23,0.75), rgba(23,23,23,0.85)), url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80')",
        }}
      >
        <p className="menu-hero-eyebrow">Welcome to</p>

        <h1 className="menu-hero-title">
          Fresh Feast
        </h1>

        <p className="menu-hero-subtitle">
          Simple, seasonal, thoughtfully made food
        </p>
      </header>

      {/* CATEGORIES */}
      <nav className="menu-categories">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            className={`menu-category-btn ${
              activeCategory === category ? "active" : ""
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </nav>

      {/* MENU */}
      <section className="menu-items">

        {loading && (
          <p>Loading menu...</p>
        )}

        {error && (
          <p>{error}</p>
        )}

        {!loading &&
          !error &&
          itemsToShow.map((item) => (
            <div
              className="menu-card"
              key={item.id}
            >

              <div className="menu-card-image-wrap">

                <img
                  src={item.image}
                  alt={item.name}
                  className="menu-card-image"
                  loading="lazy"
                />

                {activeCategory === "All" && (
                  <span className="menu-card-tag">
                    {item.category}
                  </span>
                )}

              </div>

              <div className="menu-card-body">

                <div className="menu-card-top">

                  <h3 className="menu-card-name">
                    {item.name}
                  </h3>

                  <span className="menu-card-price">
                    ${item.price}
                  </span>

                </div>

                <p className="menu-card-desc">
                  {item.description}
                </p>

              </div>

            </div>
          ))}

      </section>

      {/* FOOTER */}
      <footer className="menu-footer">

        <h2 className="menu-footer-title">
          Fresh Feast
        </h2>

        <p className="menu-footer-text">
          123 Market Street, Downtown &nbsp;|&nbsp; Open Daily 11am – 10pm
        </p>

        <p className="menu-footer-text">
          (555) 123-4567 &nbsp;|&nbsp; hello@freshfeast.com
        </p>

        <div className="menu-footer-divider" />

        <p className="menu-footer-copy">
          &copy; {new Date().getFullYear()} Fresh Feast.
          All rights reserved.
        </p>

      </footer>

    </div>
  );
}