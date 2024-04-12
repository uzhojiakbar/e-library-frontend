import React, { useState } from "react";
import { ButtonsNav, NavbarSt } from "./style";
import Title from "../Title";
import Search from "../Search";
import CircleButton from "../Generic/CircleButton";
import { NavbarMock } from "../../mock/pages";
import Login from "../../Pages/Login";
import { useLocation } from "react-router-dom";

const Navbar = ({ isLogin, setIsLogin }) => {
  const [LoginMenu, setLoginMenu] = useState(false);
  const history = useLocation();

  return (
    <NavbarSt>
      <div className="malumot">
        <Title />
        <Search />
        <ButtonsNav>
          <CircleButton
            nonActive={false}
            link={history.pathname}
            click={() => setLoginMenu(!LoginMenu)}
            text={"Profil"}
            icon={"fa-regular fa-user"}
          />
          {LoginMenu ? (
            <Login
              setLoginMenu={setLoginMenu}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
            />
          ) : (
            ""
          )}
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
