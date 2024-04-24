import styled from "styled-components";

const media = {
  laptop: "@media (max-width: 1240px)",
  tablet: "@media (max-width: 768px)",
  mobileM: "@media (max-width: 400px)",
  mobileS: "@media (max-width: 320px)",
};

const LoginPage = styled.div`
  min-height: ${({ login, mobile }) =>
    mobile === "mobile" ? "70vh" : login === "true" ? "320px" : "600px"};
  background: rgb(255, 255, 255);
  border-radius: 16px;
  padding: 25px 20px;
  z-index: 10;
  overflow: auto;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: justify;
  justify-content: space-between;

  ${media.tablet} {
    padding: 20px 15px;
  }
  ${media.mobileM} {
    padding: 12px 15px;
    margin: 0 auto;
  }
  ${media.mobileS} {
  }
`;

const LoginPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  justify-content: space-around;

  width: 100%;
  min-width: 300px;
  max-width: 400px;
  height: 400px;
  margin: 0 auto;

  padding: var(--padding);
`;

const LogOutButton = styled.div`
  cursor: pointer;
  margin-top: 25px;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  color: #ffffff;

  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;

  height: 60px;
  background: #001869;
  border-radius: 8px;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 1;
  }
`;

const LoginPageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  .title {
    text-align: center;
    font-size: 28px;
    font-weight: 900;
  }
`;
const LoginPageForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  gap: 20px;
  > button {
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 22px;
    cursor: pointer;
    border-bottom: 1px solid transparent;

    &:hover {
      border-bottom: 1px solid black;
    }
  }
`;

const InputLogin = styled.input`
  padding: 10px 5px;
  width: 220px;

  background-color: transparent;
  border: 1px solid black;
  border-radius: 7px;
  font-size: 17px;

  font-family: Poppins;
  outline: 1px solid transparent;

  &::placeholder {
    color: rgba(0, 0, 0, 0.7);

    font-family: monospace;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
  }

  &:focus {
    outline: 1px solid black;
  }
`;

const LoginPageSignInFast = styled.div`
  border-top: 1px solid black;

  margin-top: -20px;
  padding-top: 20px;
`;

const LoginWithPopupButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 220px;

  padding: 5px 10px;
  /* border: 1px solid black; */
  background-color: transparent;
  border-radius: 7px;

  cursor: pointer;
  user-select: none;
  outline: none;
  .img {
    width: 30px;
    img {
      width: 100%;
    }
  }
  .txt {
    color: #3c4043;
    font-size: 17px;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);

    /* .txt {
      color: #dfdfdf;
    } */
    transform: rotate(-5deg);
  }
  &:active {
    transform: scale(1.01);
    transform: rotate(-5deg);
  }

  &:focus {
    outline: 2px solid black;
  }
`;

const Nav = styled.div`
  margin: 5px 0;
  display: flex;
  align-items: center;

  gap: 10px;
  padding: 2px;
  > img {
    width: 25%;
    height: max-content;
    margin-right: 10px;

    border-radius: 10%;
    cursor: pointer;

    &:hover {
      border-radius: 50%;
    }
  }
  ${media.tablet} {
    height: 120px;
    gap: 2px;
    img {
      width: 30%;
    }
  }
  ${media.mobileM} {
    gap: 7px;
  }
`;

Nav.ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  .name {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    color: #001869;
  }
  .job-email {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #000000;
  }
  ${media.tablet} {
    .name {
      font-size: 18px;
      color: #001869;
    }
    .job-email {
      font-size: 15px;
      color: #000000;
    }
  }
  ${media.mobileM} {
    .name {
      font-size: 16px;
    }
    .job-email {
      font-size: 14px;
    }
  }
`;

export {
  Nav,
  LoginPage,
  LoginPageStyle,
  LoginPageHeader,
  LoginPageForm,
  LoginPageSignInFast,
  LoginWithPopupButton,
  InputLogin,
  LogOutButton,
};
