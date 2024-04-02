import React from "react";
import { ButtonLogo, ButtonStyle, ButtonText } from "./style";
import { NavLink } from "react-router-dom";

const CircleButton = ({
  text = "Kirish1",
  icon = "fa-regular fa-user",
  link = "/login",
  nonActive = true,
  click,
}) => {
  return (
    <ButtonStyle onClick={click}>
      <NavLink
        to={document.location.pathname === "link" ? false : link}
        className={({ isActive }) =>
          isActive && nonActive ? "active link" : "link"
        }
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
