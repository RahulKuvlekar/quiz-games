import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navigationbar.css";
import { menus, mainMenus } from "./menus";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { signOutUser } from "../../Utils/authentication";
import { useToastContext } from "../../Hooks/useToastContext";
import { ADD_TOAST, DANGER, SUCCESS } from "../../Constant/constant";
import { createToast } from "../../Utils/createToast";

const Navigationbar = () => {
  const { user, isAuthenticated } = useAuthContext();
  const { dispatchToast } = useToastContext();
  const navigate = useNavigate();

  const signOutHandler = () => {
    try {
      signOutUser();
      dispatchToast({
        type: ADD_TOAST,
        payload: createToast(
          SUCCESS,
          `${
            user?.displayName !== null ? user?.displayName : ""
          } Logout Successfully 🎉`
        ),
      });
      navigate("/");
    } catch (error) {
      dispatchToast({
        type: ADD_TOAST,
        payload: createToast(DANGER, error.message),
      });
    }
  };

  return (
    <header className="navigation-bar">
      <div className="nav-mainMenu">
        <div className="nav-logo-title">
          <Link className="link-no-style app-name" to="/">
            QuizGames
          </Link>
        </div>
        <ul className="nav-pill nav-btn-icons">
          {mainMenus &&
            mainMenus.map(({ name, pathname }) => (
              <li
                className="list-inline-item"
                key={`navigationbar-mainMenu-${name}`}
              >
                <NavLink
                  to={pathname}
                  className={({ isActive }) => (isActive ? "nav-active" : "")}
                >
                  {name}
                </NavLink>
              </li>
            ))}
        </ul>
      </div>
      <ul className="nav-pill nav-menu">
        {!isAuthenticated &&
          menus &&
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
        {isAuthenticated && (
          <li>
            <img
              src="/Images/avatarDefault.png"
              className="avatar avatar-md"
              alt="loginAvatar"
              onClick={signOutHandler}
            />
          </li>
        )}
      </ul>
    </header>
  );
};

export default Navigationbar;
