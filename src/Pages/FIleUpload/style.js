import styled, { keyframes } from "styled-components";
import { media } from "../../mock/media";

const Open = keyframes`
    0%{
        backdrop-filter: blur(0);
        background-color: rgba(0, 0, 0, 0);

    }
    100%{
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
    }
`;

const CloseKey = keyframes`
    0%{
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
    }
    100%{
        background-color: rgba(0, 0, 0, 0);
        backdrop-filter: blur(0);
    }
`;

const FileUploadContainer = styled.div`
  /* padding: var(--padding); */
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);

  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  animation: ${({ close }) => (close ? CloseKey : Open)} 0.4s 1;
`;

const FileUploadMain = styled.div`
  width: 800px;
  height: 90vh;
  max-height: 700px;

  padding: 20px 40px;

  background-color: white;
  border-radius: 15px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: relative;

  > .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div {
      color: rgb(0, 24, 105);
      font-family: Poppins;
      font-size: 24px;
      font-weight: 600;
      line-height: 36px;
      letter-spacing: 0%;

      text-align: center;
    }

    > .close {
      padding: 5px;
      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 25px;
      cursor: pointer;
      user-select: none;
    }

    position: sticky;
    top: 0;
    left: 0;
    z-index: 99;

    background-color: white;
    ${media.tablet} {
      > div {
        font-size: 20px;
      }
    }
    ${media.mobileL} {
      > div {
        font-size: 18px;
      }
    }
    ${media.mobileM} {
      > div {
        font-size: 14px;
      }
    }
  }

  /* *File Upload */

  .buttons {
    height: 60px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    position: relative;
    bottom: 0;
    left: 0;
    background-color: white;
    padding: 5px 0;
  }

  ${media.tablet} {
    padding: 10px 20px;
  }

  ${media.mobileL} {
    padding: 0 12px;
    padding-bottom: 20px;
    width: 90%;

    > .header {
      padding: 10px 0;
    }
  }
`;

const FileUploaderCon = styled.div`
  display: flex;
  height: 70%;
  gap: 5px;
  justify-content: center;
  overflow: auto;

  .section {
    flex: 1;
  }

  ${media.mobileL} {
    flex-direction: column;
    height: 100%;
  }
`;

const UploadPicture = styled.div`
  display: flex;
  flex-direction: column;

  gap: 5px;

  .pictureInput {
    display: none;
  }

  .PicNotFound {
    background-color: #ececec;
    border: 1px solid gray;
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: gray;
    align-items: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
    text-align: center;

    border-radius: 10px;

    > .fa-image {
      font-size: 200%;
    }

    &:hover {
      background-color: rgba(128, 128, 128, 0.286);
    }
  }

  .first {
    width: 100%;
    height: 60%;
  }

  .second {
    display: flex;
    gap: 5px;
    height: 40%;
    justify-content: space-between;
    .pic {
      width: 50%;
      height: 100%;
    }
  }

  ${media.mobileL} {
    display: flex;
    flex-direction: column;
    width: 100%;

    padding: 5px 0;
    padding-top: 400px;

    > .first {
      width: 100%;
      height: 200px;
    }

    > .second {
      .pic {
        height: 100px;
      }
    }
  }
`;

const PictureStyle = styled.div`
  background-image: url(${({ back }) => back});
  background-size: cover;
  background-repeat: no-repeat;

  border: 1px solid gray;
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: gray;
  align-items: center;
  cursor: pointer;
  text-align: center;
  height: 100%;

  border-radius: 10px;

  ${media.mobileL} {
    height: 100%;
    width: 100%;
  }
`;

const UploadFileInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 5px;

  padding: 5px;
  justify-content: space-between;

  .drop-container {
    width: 100%;
    height: 50%;

    position: relative;
    display: flex;
    gap: 5px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-radius: 10px;
    border: 2px dashed #555;
    color: #444;
    cursor: pointer;
    transition: background 0.2s ease-in-out, border 0.2s ease-in-out;
  }

  .drop-container:hover {
    background: #ececec;
    border-color: #111;
  }

  .drop-container:hover .drop-title {
    color: #222;
  }

  .drop-title {
    color: #444;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    transition: color 0.2s ease-in-out;
  }

  input[type="file"]::file-selector-button {
    margin-right: 20px;
    border: none;
    background: #084cdf;
    padding: 10px 20px;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
  }

  input[type="file"]::file-selector-button:hover {
    background: #0d45a5;
  }

  /* *INFO */

  > .warning {
    text-align: center;
    color: red;

    font-size: 16px;
    font-weight: 900;
    font-family: "Times New Roman", Times, serif;
  }
  .Info-input {
    width: 100%;
    height: 50px;

    resize: none;

    background-image: linear-gradient(#f1f1f1 50%, #ececec 50%);
    background-size: 100% 4rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    line-height: 2rem;
    margin: 0 auto;
    padding: 4px 8px;

    font-family: sans-serif;
    font-size: 18px;

    outline: none;
  }

  .desc {
    height: 25%;
  }

  ${media.mobileL} {
    height: 400px;
  }
`;

const ButtonUpload = styled.button`
  background-color: transparent;
  border: 1px solid ${({ color }) => color};
  color: ${({ color }) => color};
  padding: 10px 15px;
  border-radius: 10px;
  outline: none;
  font-size: Poppins;
  font-size: 18px;

  cursor: pointer;

  &:hover {
    background-color: ${({ color }) => color};
    color: white;
  }
`;

const AuthError = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  height: 350px;
  min-width: 380px;
  margin: 0px auto;
  padding: 30px 0px;

  user-select: none;

  > .main {
    display: flex;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    gap: 10px;

    > .title {
      font-family: Poppins;
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      color: rgb(0, 24, 105);
    }
    > .info {
      font-family: Poppins;
      font-style: normal;
      font-weight: 400;
      width: 90%;
      font-size: 13px;
      line-height: 15px;
      text-align: center;
      color: rgb(113, 113, 113);
    }
  }
  > .btn {
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    width: 127px;
    height: 38px;
    background: rgb(0, 24, 105);
    border-radius: 8px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: rgb(255, 255, 255);

    border: 4px solid transparent;

    cursor: pointer;
    &:hover {
      color: rgb(0, 24, 105);
      background-color: transparent;
      border: 4px solid rgb(0, 24, 105);
    }
  }
`;

export {
  FileUploadContainer,
  AuthError,
  FileUploadMain,
  ButtonUpload,
  FileUploaderCon,
  UploadPicture,
  UploadFileInfo,
  PictureStyle,
};
