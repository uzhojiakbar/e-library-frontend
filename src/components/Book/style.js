import styled from "styled-components";
import { media } from "../../mock/media";

const Container = styled.div`
  padding: 40px;
  padding-left: 10%;
  display: flex;
  align-items: center;
  gap: 40px;
  height: fit-content;
  max-width: 1920px;
  width: 100%;
  margin: 10px auto;

  ${media.tablet} {
    flex-direction: column;
    overflow: auto;
    align-items: center;
  }
  ${media.tabletMax} {
    padding: 20px;
    max-height: 90vh;
  }
  ${media.mobileL} {
    padding-top: 5px;
  }
  ${media.mobileS} {
    padding: 10px;
    padding-top: 0;
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
      width:  350px;
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

  ${media.mobileS} {
    img{
      width:  100px;
      height: 80px;
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
    padding: 15px 25px;
    height: 50px;
    font-size: 18px;
    color: #ececec;
    text-decoration: none;
    border: 2px solid transparent;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }
    &:active {
      opacity: 0.95;
    }
  }
  .buttons {
    display: flex;
    gap: 10px;
  }
`;

export { Container, Images, BookInformation };
