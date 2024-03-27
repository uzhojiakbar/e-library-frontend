import React, { useState } from "react";
import {
  InputLogin,
  LoginContainer,
  LoginPage,
  LoginPageForm,
  LoginPageHeader,
  LoginPageSignInFast,
  LoginPageStyle,
  LoginWithPopupButton,
  Nav,
} from "./style";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { GoogleProvider, auth } from "../../config/firebase";

import LogoGoogle from "../../assets/icon/google-logo.svg";
import { useNavigate } from "react-router-dom";

import avatar from "../../assets/img/profil.svg";
import Title from "../../components/Title";

const Login = ({ isLogin, setIsLogin }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [issLogin, setissLogin] = useState(localStorage.getItem("login"));

  const SignIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      localStorage.setItem("login", email);
      setissLogin(localStorage.setItem("login", email));
    } catch (error) {
      console.error(error);
    }
    document.location.reload();
  };
  const SignInwithGoogle = async () => {
    try {
      await signInWithPopup(auth, GoogleProvider);
      localStorage.setItem("login", auth.currentUser?.email);
      setissLogin(localStorage.setItem("login", localStorage.getItem("login")));
      document.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const LogOut = async () => {
    try {
      await signOut(auth);
      localStorage.setItem("login", false);
      setissLogin(localStorage.setItem("login", false));
    } catch (error) {
      console.error(error);
    }
    document.location.reload();
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
  return (
    <>
      <LoginContainer onClick={() => navigate("/")}></LoginContainer>
      {issLogin !== "false" ? (
        <LoginPage login="true">
          <Title title={"Hisob malumotlari"} />
          <Nav>
            <img src={auth.currentUser?.photoURL || avatar} alt="ReLoad site" />
            <Nav.ProfileInfo>
              <p className="name">Murodillayev Hojiakbar</p>
              <p className="job-email">Oddiy Foydaluvchi</p>
              <p className="job-email">{auth.currentUser?.email}</p>
            </Nav.ProfileInfo>
          </Nav>
          <div></div>
          <div onClick={LogOut} className="log-out">
            Chiqish
          </div>
        </LoginPage>
      ) : (
        <LoginPage>
          <LoginPageStyle>
            <LoginPageHeader>
              <Title nav={"/"} title={"Ro'yxatdan o'tish Kirish"} />
            </LoginPageHeader>
            <LoginPageForm onSubmit={(e) => onSubmit(e)}>
              <InputLogin
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.ru"
                type="email"
              />
              <InputLogin
                onChange={(e) => setPass(e.target.value)}
                placeholder="Password"
                type="password"
              />
              <button onClick={SignIn}>Kirish</button>
            </LoginPageForm>
            <LoginPageSignInFast>
              <LoginWithPopupButton
                className="google"
                onClick={SignInwithGoogle}
              >
                <div className="img">
                  <img src={LogoGoogle} alt="google" />
                </div>
                <div className="txt">Google orqali kirish</div>
              </LoginWithPopupButton>
            </LoginPageSignInFast>
          </LoginPageStyle>
        </LoginPage>
      )}
    </>
  );
};

export default Login;
