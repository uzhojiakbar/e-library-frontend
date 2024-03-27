import React from "react";
import { ButtonsNav, NavbarSt } from "./style";
import Title from "../Title";
import Search from "../Search";
import CircleButton from "../Generic/CircleButton";
import { NavbarMock } from "../../mock/pages";

const Navbar = ({ isLogin, setIsLogin }) => {
  return (
    <NavbarSt>
      <div className="malumot">
        <Title />
        <Search />
        <ButtonsNav>
          <CircleButton
            link={"login"}
            text={"Profil"}
            icon={"fa-regular fa-user"}
          />
          {NavbarMock.map((v) => {
            return (
              <CircleButton
                key={v.id}
                link={v.path}
                text={v.title}
                icon={v.iconAwesome}
              />
            );
          })}
        </ButtonsNav>
      </div>
    </NavbarSt>
  );
};

export default Navbar;
