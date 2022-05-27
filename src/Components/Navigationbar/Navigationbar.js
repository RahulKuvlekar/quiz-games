import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigationbar.css";
import { menus } from "./menus";

const Navigationbar = () => {
  return (
    <header className="navigation-bar">
      <div className="nav-logo-title">
        <Link className="link-no-style" to="/">
          QuizGames
        </Link>
      </div>
      <ul className="nav-pill nav-menu">
        {menus &&
          menus.map(({ name, pathname }) => (
            <li className="list-inline-item" key={`navigationbar-menu-${name}`}>
              <NavLink
                to={pathname}
                className={({ isActive }) => (isActive ? "nav-active" : "")}
              >
                {name}
              </NavLink>
            </li>
          ))}
        {/* If Login Avatar displays */}
        {/* <li>
          <img
            src="/Images/avatar.png"
            className="avatar avatar-md"
            alt="loginAvatar"
          />
        </li> */}
      </ul>
    </header>
  );
};

export default Navigationbar;
