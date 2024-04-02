import React, { useState } from "react";
import { db, storage } from "../../config/firebase";

import { ref, uploadBytes } from "firebase/storage";
import {
  AuthError,
  ButtonUpload,
  FileUploadContainer,
  FileUploadMain,
  FileUploaderCon,
  PictureStyle,
  UploadFileInfo,
  UploadPicture,
} from "./style";

import NotFound from "../../assets/icon/NotFound.svg";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";

const FileUpload = () => {
  const [file, setFile] = useState([]);
  const [isLogin] = useState(localStorage.getItem("login"));
  const [close, setClose] = useState(0);

  const [err, setErr] = useState([]);

  const [FileObj, setFileObj] = useState({
    name: "",
    desc: "",
    path: "",
  });

  const [Picture, setPicture] = useState({
    pic1: "",
    pic2: "",
    pic3: "",
  });

  if (Picture.pic1) {
    console.log(URL.createObjectURL(Picture.pic1));
  }

  const nav = useNavigate();

  const FilesCollection = collection(db, "files");

  const CreateDoc = async (doc) => {
    try {
      await addDoc(FilesCollection, doc);
    } catch (error) {
      console.log(error);
    }
  };

  const FileUpload = async () => {
    setErr("");
    if (!file.length) {
      setErr("Oldin file tanlang");
      return false;
    } else if (file[0].size > 31_800_000) {
      setErr("Fayl hajmi 30 mb dan katta");
      return false;
    }

    const fileLocaton = `files/${file[0].name}`;
    const fileRef = ref(storage, fileLocaton);

    try {
      await uploadBytes(fileRef, file[0]);
      await CreateDoc({ ...FileObj, path: fileLocaton, hidden: true });
    } catch (err) {
      console.error(err);
    }
  };

  const onClose = () => {
    setClose(1);
    setFile([]);
    setTimeout(() => {
      nav("/");
    }, 300);
  };

  return isLogin !== "false" ? (
    <FileUploadContainer close={close}>
      <FileUploadMain>
        <div className="header">
          <div>Kitob Yuklash</div>
          <div onClick={onClose} className="close">
            x
          </div>
        </div>
        <FileUploaderCon>
          <UploadPicture className="section">
            <label htmlFor="pic1" className="first pic">
              {Picture.pic1 ? (
                <PictureStyle
                  back={URL.createObjectURL(Picture.pic1)}
                ></PictureStyle>
              ) : (
                <div className="PicNotFound">
                  <i className="fa-solid fa-image"></i>
                  <p>Surat yuklash uchun bosing</p>
                </div>
              )}
              <input
                className="pictureInput"
                onChange={(e) =>
                  setPicture({ ...Picture, pic1: e.target.files[0] })
                }
                type="file"
                accept="images"
                id="pic1"
              />
            </label>
            <div className="second">
              <label className="pic" htmlFor="pic2">
                {Picture.pic2 ? (
                  <PictureStyle
                    back={URL.createObjectURL(Picture.pic2)}
                  ></PictureStyle>
                ) : (
                  <div className="PicNotFound">
                    <i className="fa-solid fa-image"></i>
                  </div>
                )}

                <input
                  className="pictureInput"
                  onChange={(e) =>
                    setPicture({ ...Picture, pic2: e.target.files[0] })
                  }
                  type="file"
                  accept="images"
                  id="pic2"
                />
              </label>
              <label className="pic" htmlFor="pic3">
                {Picture.pic3 ? (
                  <PictureStyle
                    back={URL.createObjectURL(Picture.pic3)}
                  ></PictureStyle>
                ) : (
                  <div className="PicNotFound">
                    <i className="fa-solid fa-image"></i>
                  </div>
                )}

                <input
                  className="pictureInput"
                  onChange={(e) =>
                    setPicture({ ...Picture, pic3: e.target.files[0] })
                  }
                  type="file"
                  accept="images"
                  id="pic3"
                />
              </label>
            </div>
          </UploadPicture>
          <UploadFileInfo className="section">
            <div className="warning">{err}</div>
            {/* INPUT FILE */}
            <label
              htmlFor="books"
              className="drop-container"
              id="dropcontainer"
            >
              <span className="drop-title">Faylni bu yerga tashlang</span>
              yoki
              <input
                onChange={(e) => setFile(e.target.files)}
                type="file"
                id="books"
                accept=".pdf, .docx, .doc"
                required
              />
            </label>
            {/* INPUT FILE NAME */}

            <input
              onChange={(e) => setFileObj({ ...FileObj, name: e.target.value })}
              className="Info-input"
              placeholder="Kitob nomini yozing..."
              type="text"
            />
            {/* INPUT FILE DESCRIPTION */}

            <textarea
              onChange={(e) => setFileObj({ ...FileObj, desc: e.target.value })}
              className="Info-input desc"
              placeholder="Kitob haqida yozing..."
              cols="30"
              rows="10"
            ></textarea>
          </UploadFileInfo>
        </FileUploaderCon>
        <div className="buttons">
          <ButtonUpload
            type="reset"
            color="red"
            className="button "
            onClick={onClose}
          >
            Bekor qilish
          </ButtonUpload>
          <ButtonUpload
            type="close"
            color="green"
            className="button "
            onClick={FileUpload}
          >
            Fayl yuklash
          </ButtonUpload>
        </div>
      </FileUploadMain>
    </FileUploadContainer>
  ) : (
    <AuthError>
      <img src={NotFound} alt="" />
      <div className="main">
        <div className="title">Ro'yxatdan o'ting</div>
        <div className="info">
          Kitoblarni yuklash va ballarni to'plash uchun platformamizdagi
          ro'yxatdan o'ting
        </div>
      </div>
      <div className="btn" onClick={() => nav("/")}>
        Bosh sahifa
      </div>
    </AuthError>
  );
};

export default FileUpload;
