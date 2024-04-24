import React, { useState } from "react";
import { db, storage } from "../../config/firebase";

import { ref, uploadBytes } from "firebase/storage";
import {
  AuthError,
  ButtonUpload,
  FileUploadMain,
  FileUploaderCon,
  PictureStyle,
  UploadFileInfo,
  UploadPicture,
} from "./style";

import NotFound from "../../assets/icon/NotFound.svg";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { Modal } from "antd";

const FileUpload = ({ categories, FilerCategories }) => {
  const [file, setFile] = useState([]);
  const [isLogin] = useState(localStorage.getItem("login"));
  const [close, setClose] = useState(1);

  const [err, setErr] = useState([]);

  console.log(err);

  const [FileObj, setFileObj] = useState({
    name: "",
    path: "",
    year: "",
    muallif: "",
    nashriyot: "",
    ctg: "",
    desc: "",
    pics: [],
  });

  const [Picture, setPicture] = useState({
    pic1: "",
    pic2: "",
    pic3: "",
  });

  const [uploadPrcnt, setUploadPrcnt] = useState([]);

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
    const Pic1Locaton = `pics/${Picture?.pic1?.name}`;
    const Pic2Locaton = `pics/${Picture?.pic2?.name}`;
    const Pic3Locaton = `pics/${Picture?.pic3?.name}`;
    const fileRef = ref(storage, fileLocaton);
    const Pic1Ref = ref(storage, Pic1Locaton);
    const Pic2Ref = ref(storage, Pic2Locaton);
    const Pic3Ref = ref(storage, Pic3Locaton);

    try {
      await setUploadPrcnt(["Fayl yuklanmoqda", 0]);
      await uploadBytes(fileRef, file[0]);
      await setUploadPrcnt(["Birinchi surat yuklanmoqda", 20]);
      await uploadBytes(Pic1Ref, Picture?.pic1);
      await setUploadPrcnt(["Ikkinchi surat yuklanoqda", 40]);
      await uploadBytes(Pic2Ref, Picture?.pic2);
      await setUploadPrcnt(["Uchinchi surat yuklanoqda", 60]);
      await uploadBytes(Pic3Ref, Picture?.pic3);
      await setUploadPrcnt(["Kitob nazoratchiga yuborilmoqda", 80]);
      await CreateDoc({
        ...FileObj,
        path: fileLocaton,
        hidden: true,
        pics: [
          `pics/${Picture?.pic1?.name || ""}`,
          `pics/${Picture?.pic2?.name || ""}`,
          `pics/${Picture?.pic3?.name || ""}`,
        ],
      });
      await setUploadPrcnt(["Tayyor", 100]);
      await onClose();
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

  const handleCancel = () => {
    nav("/");
  };

  return isLogin !== "false" ? (
    <Modal width={1000} open={close} onCancel={handleCancel} footer={[]}>
      <FileUploadMain>
        <div className="header">
          {uploadPrcnt[0] ? (
            <div>{`${uploadPrcnt[0]}, ${uploadPrcnt[1]}%`}</div>
          ) : (
            <div>Kitob Yuklash</div>
          )}
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
                accept="image/*"
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
                  accept="image/*"
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
                  accept="image/*"
                  id="pic3"
                />
              </label>
            </div>
          </UploadPicture>
          <UploadFileInfo className="section">
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
              placeholder="Kitob nomini"
              type="text"
            />
            <input
              onChange={(e) =>
                setFileObj({ ...FileObj, muallif: e.target.value })
              }
              className="Info-input"
              placeholder="Kitob mualifi"
              type="text"
            />
            <input
              onChange={(e) =>
                setFileObj({ ...FileObj, year: +e.target.value })
              }
              className="Info-input"
              placeholder="Kitob chiqgan yili"
              type="number"
            />
            <input
              onChange={(e) =>
                setFileObj({ ...FileObj, nashriyot: e.target.value })
              }
              className="Info-input"
              placeholder="Nashriyot"
              type="text"
            />
            <select
              onChange={(e) => setFileObj({ ...FileObj, ctg: e.target.value })}
              className="Info-input"
              name=""
              id=""
            >
              <option value="">Kategoriya kiriting</option>
              {categories.map((v) => {
                return <option value={v.id}>{v.name}</option>;
              })}
            </select>

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
    </Modal>
  ) : (
    <AuthError>
      <img src={NotFound} alt="" />
      <div className="main">
        <div className="title">Ro'yxatdan o'ting</div>
        <div className="info">
          Kitoblarni yuklash va ballarni to'plash uchun platformamizdan
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
