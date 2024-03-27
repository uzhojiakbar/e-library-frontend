import React from "react";
import { ButtonLogo, ButtonStyle, ButtonText } from "./style";
import { NavLink } from "react-router-dom";

const CircleButton = ({
  text = "Kirish1",
  icon = "fa-regular fa-user",
  link = "/login",
  isLogin,
}) => {
  console.log(isLogin);
  return (
    <ButtonStyle>
      <NavLink
        to={document.location.pathname === "link" ? 0 : link}
        className={({ isActive }) => (isActive ? "active link" : "link")}
      >
        <ButtonLogo>
          <i className={icon}></i>
        </ButtonLogo>
        <ButtonText>{text}</ButtonText>
      </NavLink>
    </ButtonStyle>
  );
};

export default CircleButton;
