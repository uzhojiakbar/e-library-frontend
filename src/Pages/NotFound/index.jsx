import React from "react";
import { AuthError } from "../FIleUpload/style";
import NotFoundImg from "../../assets/icon/NotFound.svg";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const nav = useNavigate();

  return (
    <AuthError>
      <img src={NotFoundImg} alt="" />
      <div className="main">
        <div className="title">Sahifa mavjud emas</div>
        <div className="info">
          Bu sahifa mavjud emas yoki dasturchilar bu sahifa ustida
          ishlashayapdi...
        </div>
      </div>
      <div className="btn" onClick={() => nav("/")}>
        Bosh sahifa
      </div>
    </AuthError>
  );
};

export default NotFound;
