import React, { useState } from "react";

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
import { Modal } from "antd";

const FileUpload = ({ categories, FilerCategories }) => {
  const [file, setFile] = useState([]);
  const [isLogin] = useState(localStorage.getItem("login"));
  const [close] = useState(1);

  const [FileObj, setFileObj] = useState({
    name: "",
    path: "",
    year: "",
    muallif: "",
    nashriyot: "",
    ctg: "",
    desc: "",
    tili: "",
    pics: [],
  });

  const [Picture, setPicture] = useState({
    pic1: "",
    pic2: "",
    pic3: "",
  });

  const [uploadPrcnt, setUploadPrcnt] = useState([]);

  const nav = useNavigate();

  const CreateDoc = async (doc) => {
    try {
      await fetch("http://localhost:4000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doc),
      })
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.error("Xatolik:", error));
    } catch (error) {
      console.log(error);
    }
  };

  const FileUpload = async () => {
    if (!file.length) {
      console.log("Oldin file tanlang");
      return false;
    } else if (file[0].size > 31_800_000) {
      console.log("Fayl hajmi 30 mb dan katta");
      return false;
    }

    const fileLocaton = `files/books/${file[0].name}`;
    const Pic1Locaton = `files/pics/${Picture?.pic1?.name}`;
    const Pic2Locaton = `files/pics/${Picture?.pic2?.name}`;
    const Pic3Locaton = `files/pics/${Picture?.pic3?.name}`;

    const formData = new FormData();
    const PicData1 = new FormData();
    const PicData2 = new FormData();
    const PicData3 = new FormData();

    try {
      await formData.append("file", file[0]);
      await PicData1.append("image", Picture.pic1);
      await PicData2.append("image", Picture.pic2);
      await PicData3.append("image", Picture.pic3);

      await setUploadPrcnt(["Fayl yuklanmoqda", 0]);

      fetch("http://localhost:4000/uploadFile", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.error("Xatolik:", error));

      await setUploadPrcnt(["Birinchi surat yuklanmoqda", 20]);
      fetch("http://localhost:4000/uploadPic", {
        method: "POST",
        body: PicData1,
      })
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.error("Xatolik:", error));

      await setUploadPrcnt(["Ikkinchi surat yuklanmoqda", 40]);
      fetch("http://localhost:4000/uploadPic", {
        method: "POST",
        body: PicData2,
      })
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.error("Xatolik:", error));

      await setUploadPrcnt(["Uchinchi surat yuklanmoqda", 60]);
      fetch("http://localhost:4000/uploadPic", {
        method: "POST",
        body: PicData3,
      })
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.error("Xatolik:", error));

      await setUploadPrcnt(["Nazoratchiga yuborilmoqda", 80]);

      await CreateDoc({
        ...FileObj,
        path: fileLocaton,
        hidden: true,
        pics: [Pic1Locaton || "", Pic2Locaton || "", Pic3Locaton || ""],
      });
      await setUploadPrcnt(["Tayyor", 100]);
      handleCancel();
      document.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    nav("/");
  };

  console.log(
    !(isLogin === "false" || isLogin === undefined || isLogin === null)
  );
  return !(isLogin === "false" || isLogin === undefined || isLogin === null) ? (
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
              onChange={(e) => setFileObj({ ...FileObj, tili: e.target.value })}
              className="Info-input"
              placeholder="Adabiyot tili"
              type="text"
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
                return (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                );
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
            onClick={handleCancel}
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
