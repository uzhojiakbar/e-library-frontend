import styled from "styled-components";
import { media } from "../../mock/media";

const Container = styled.div`
  padding: 40px;
  display: flex;
  gap: 40px;
  height: 500px;

  ${media.tablet} {
    flex-direction: column;
    align-items: flex-start;
  }

  ${media.mobileL} {
    padding: 5px;
  }
`;
const Images = styled.div`
  display: flex;
  gap: 20px;

  img {
    width: 120px;
    height: 120px;
    cursor: pointer;
    border: 3px solid transparent;
    transition: border 0.15s ease-in;
    &:hover {
      border: 3px solid #333;
    }
  }

  .thumb {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .currentPic img {
    width: 400px;
    height: 400px;
  }

  ${media.tabletMax} {
    .currentPic img {
      width: 350px;
      height: 350px;
    }

    img {
      width: 100px;
      height: 100px;
    }
  }

  ${media.mobileL} {
    flex-direction: column-reverse;
    align-items: center;

    .thumb {
      flex-direction: row;
    }
  }
`;

const BookInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  gap: 25px;

  .first {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }

  .title {
    font-style: normal;
    font-family: Poppins;
    font-weight: 500;
    font-size: 32px;
    line-height: 48px;
    color: rgb(0, 0, 0);
  }

  .desc {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    color: rgb(82, 136, 193);
  }

  .button {
    background-color: rgb(82, 136, 193);
    padding: 10px 15px;
    font-size: 18px;
    color: #ececec;
    text-decoration: none;
    border: 2px solid transparent;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #ececec;
      border: 2px solid rgb(82, 136, 193);
      color: rgb(82, 136, 193);
    }
  }
  .buttons {
    display: flex;
    gap: 10px;
  }
`;

export { Container, Images, BookInformation };
