 import React, { useState } from "react";
import {
    Route,
    Routes,
  Link,
} from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faScrewdriverWrench,
  faRectangleList,
  faShoppingCart,
  faUserTie,
  faRightLeft,
  faBars,
  faXmark
} from "@fortawesome/free-solid-svg-icons";

import "../App.css";

 function DrawerMenu() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
<div className="menu-container">
      <div className="menu-button">
        <button className="openMenu" onClick={toggleDrawer}>
          <FontAwesomeIcon
            icon={faBars}
            size="2xl"
            style={{ color: "#000000" }}
          />
        </button>
      </div>

      <nav className={`drawer ${isDrawerOpen ? "drawer-open" : ""}`}>
        <button className="closeMenu" onClick={toggleDrawer}>
          <FontAwesomeIcon
            icon={faXmark}
            size="lg"
            style={{
              color: "#000000",
            }}
          />
        </button>
        {/* Other menu items */}

        <div className="icons">
          <Link
            to="/equipment-types"
            style={{
              textDecoration: "none",
              padding: "5px",
              color: "#000000",
            }}
          >
            <FontAwesomeIcon
              icon={faScrewdriverWrench}
              style={{ color: "#000000", padding: "5px" }}
            />
            Equipment Types
          </Link>
        </div>

        <div className="icons">
          <Link
            to="/equipment-listings"
            style={{
              textDecoration: "none",
              padding: "5px",
              color: "#000000",
            }}
          >
            <FontAwesomeIcon
              icon={faRectangleList}
              style={{ color: "#000000", padding: "5px" }}
            />
            Equipment Listings
          </Link>
        </div>

        <div className="icons">
          <Link
            to="/customer-orders"
            style={{
              textDecoration: "none",
              padding: "5px",
              color: "#000000",
            }}
          >
            <FontAwesomeIcon
              icon={faShoppingCart}
              style={{ color: "#000000", padding: "5px" }}
            />
            Customer Orders
          </Link>
        </div>

        <div className="icons">
          <Link
            to="/customer-list"
            style={{
              textDecoration: "none",
              padding: "5px",
              color: "#000000",
            }}
          >
            <FontAwesomeIcon
              icon={faUser}
              style={{ color: "#000000", padding: "5px" }}
            />
            Customer List
          </Link>
        </div>

        <div className="icons">
          <Link
            to="/sales-reps"
            style={{
              textDecoration: "none",
              padding: "5px",
              color: "#000000",
            }}
          >
            <FontAwesomeIcon
              icon={faUserTie}
              style={{ color: "#000000", padding: "5px" }}
            />
            Sales Reps
          </Link>
        </div>

        <div className="icons">
          <Link
            to="/transactions"
            style={{
              textDecoration: "none",
              padding: "5px",
              color: "#000000",
            }}
          >
            <FontAwesomeIcon
              icon={faRightLeft}
              style={{ color: "#000000", padding: "5px" }}
            />
            Transactions
          </Link>
        </div>
      </nav>
      </div>
)
        };

export default DrawerMenu;