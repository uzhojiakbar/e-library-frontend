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
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { GoogleProvider, auth } from "../../config/firebase";

import LogoGoogle from "../../assets/icon/google-logo.svg";

import avatar from "../../assets/img/profil.svg";
import Title from "../../components/Title";

import { db } from "../../config/firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";

const Login = ({ setLoginMenu }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [issLogin] = useState(localStorage.getItem("login"));

  const [reg, setReg] = useState(true);
  const [regError, setRegError] = useState("");

  const [user, setUser] = useState({
    date: 2007,
    coins: 100,
    email: "uzhojiakbar3@gmail.com",
    name: "Murodillayev Hojiakbar",
    type: "user",
    password: "",
    rePassword: "",
  });

  // *GET USER
  const [users, setUsers] = useState([]);
  const [curuser, setCuruser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const [close, setClose] = useState(0);

  const usersCollection = collection(db, "users");

  console.log(issLogin);

  const optimazation = (user) => {
    if (user.email === email) {
      setCuruser({ ...user, pass: "Ruxsat yoq" });
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  const getUsers = async () => {
    try {
      const data = await getDocs(usersCollection);
      const getData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(getData);
      await getData.map((v) => optimazation(v));
    } catch (error) {
      console.log(error);
    }
  };

  const SignIn = async () => {
    try {
      await getUsers();
      await signInWithEmailAndPassword(auth, email, pass);
      localStorage.setItem("login", email);
      localStorage.setItem("type", curuser?.type || "user");
      await getUsers();
      notify('ok')
      document.location.reload();
    } catch (error) {
      console.error(error);
      if (error.code === "auth/invalid-credential") {
        notify('err', "Login yoki Parol xato")
      } else if (error.code === "auth/invalid-email") {
        notify('err', "Email Xato")
      } else {
        notify('err', "Qandaydur xato")
      }
    }
  };

  const SignUp = async (mail, password) => {
    try {
      await createUserWithEmailAndPassword(auth, mail, password);
      localStorage.setItem("login", mail);
    } catch (error) {
      setRegError("Qandaydur xatolik ketdi!");
      console.error(error);
    }
    document.location.reload();
  };
  const SignInwithGoogle = async () => {
    try {
      await getUsers();
      const filterEmail = await users.map((v) => v.email);

      await signInWithPopup(auth, GoogleProvider);
      await CreateUser({
        coins: 100,
        date: "undefined",
        email: auth.currentUser?.email,
        name: auth.currentUser?.displayName,
        pass: `undefined`,
        type: "user",
      });
      localStorage.setItem("login", auth.currentUser?.email);
      notify('ok')
      document.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const LogOut = async () => {
    try {
      await signOut(auth);
      localStorage.setItem("login", false);
      localStorage.setItem("type", "user");
      localStorage.setItem("user", "false");
      notify('ok')
      document.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const CreateUser = async (user) => {
    try {

      await addDoc(usersCollection, user);
      await setCuruser({ ...user, pass: "Ruxsat yoq" });
      await localStorage.setItem(
        "user",
        JSON.stringify({ ...user, pass: "Ruxsat yoq" })
      );
    } catch (error) {
      setRegError("Qandaydur xatolik");
      console.log(error);
    }
  };

  const notify = (type = 'ok', text) => {
    if (type === 'ok') {
      toast.success(text || 'Tayyor')
    } else if (type === 'err') {
      toast.error(text || 'Xato');
    } else if (type === 'wait') {
      toast.loading(text || 'Kuting...');
    }
  }


  const RegNewUser = async () => {
    await getUsers();
    const filterEmail = users.map((v) => v.email);
    const Date1 = new Date();
    const year = Date1.getFullYear();

    if (user.email && user.date && user.name && user.password) {
      if (!filterEmail.includes(user.email)) {
        if (user.password.length >= 5) {
          if (user.password === user.rePassword) {
            if (user.date < year && user.date > 0) {
              let userDemo = {
                coins: 100,
                date: user.date,
                email: user.email,
                name: user.name,
                pass: `najsnajnJNAISQOIWJQIONSOA7${user.password}`,
                type: "user",
              };
              await CreateUser(userDemo);
              await SignUp(user.email, user.password);
              notify('ok')
            } else {
              notify('err', `Tugilgan yilingiz ${year} dan katta`)
            }
          } else {
            notify('err', 'Parollar Mos emas!')
          }
        } else {
          notify('err', 'Parol juda qisqa, minimal 6 ta belgi bolsin!')

        }
      } else {
        notify('err', 'Email oldin kiritilgan!')
      }
    } else {
      notify('err', 'Barcha maydonlarni to`ldiring')
    }
  };

  const onClosePage = () => {
    setClose(1);
    setTimeout(() => {
      setLoginMenu(false);
    }, 100);
  };

  return (
    <>
      <LoginContainer close={close} onClick={onClosePage}></LoginContainer>
      {issLogin !== "false" && issLogin !== null ?
        (
          <LoginPage login="true">
            <Title title={"Hisob malumotlari"} />
            <Nav>
              <img src={auth.currentUser?.photoURL || avatar} alt="ReLoad site" />
              <Nav.ProfileInfo>
                <p className="name">{curuser.name || "nomalum"}</p>
                <p className="job-email">
                  {curuser?.type === "user"
                    ? "Foydalanuvchi"
                    : curuser?.type === "admin"
                      ? "admin"
                      : curuser?.type === "nazoratchi"
                        ? "Nazoratchi"
                        : "Nomalum"}
                </p>
                <p className="job-email">{curuser.email || "Nomalum"}</p>
              </Nav.ProfileInfo>
            </Nav>
            <div></div>
            <div onClick={LogOut} className="log-out">
              Chiqish
            </div>
          </LoginPage>
        ) : reg ? (
          // *LOGIN
          <LoginPage>
            <LoginPageStyle>
              <LoginPageHeader>
                <Title nav={"/"} title={"Hisobga Kirish"} />
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
              <p>
                Hisobingiz yo'qmi?
                <span onClick={() => setReg(!reg)}> Ro'yxatdan o'tish</span>
              </p>
            </LoginPageStyle>
          </LoginPage>
        ) : (
          // *ROYXATDAN OTISH
          <LoginPage>
            <LoginPageStyle>
              <LoginPageHeader>
                <Title nav={"/"} title={"Ro'yxatdan o'tish "} />
              </LoginPageHeader>
              <LoginPageForm onSubmit={(e) => onSubmit(e)}>
                <InputLogin
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  placeholder="F.I.SH ni kiriting"
                  type="text"
                />
                <InputLogin
                  onChange={(e) => setUser({ ...user, date: e.target.value })}
                  placeholder="Tug'ilgan yilingizni kiriting"
                  type="number"
                />
                <InputLogin
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="Elektron pochtangizni kiriting"
                  type="email"
                />
                <InputLogin
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  placeholder="Parol oylab toping"
                  type="password"
                />
                <InputLogin
                  onChange={(e) =>
                    setUser({ ...user, rePassword: e.target.value })
                  }
                  placeholder="Parolni takrorlang"
                  type="password"
                />

                <button onClick={RegNewUser}>Royxatdan otish</button>

                {regError.length ? <p>{regError}</p> : ""}

                <p>
                  Hisobgiz Bormi? <span onClick={() => setReg(!reg)}>Kirish</span>
                </p>
              </LoginPageForm>
              {/* <LoginPageSignInFast>
              <LoginWithPopupButton
                className="google"
                onClick={SignInwithGoogle}
              >
                <div className="img">
                  <img src={LogoGoogle} alt="google" />
                </div>
                <div className="txt">Google orqali kirish</div>
              </LoginWithPopupButton>
            </LoginPageSignInFast> */}
            </LoginPageStyle>
          </LoginPage>
        )}
      <Toaster />
    </>
  );
};

export default Login;
