import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <Link class="navbar-brand" href="#">
        Navbar
      </Link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <NavLink class="nav-link" href="#">
              Home <span class="sr-only">(current)</span>
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink class="nav-link" href="#">
              Features
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink class="nav-link" href="#">
              Pricing
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink
              class="nav-link disabled"
              href="#"
              tabindex="-1"
              aria-disabled="true"
            >
              Disabled
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
