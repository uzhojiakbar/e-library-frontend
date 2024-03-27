import styled from "styled-components";
import { media } from "../../../mock/media";

const ButtonStyle = styled.div`
  .link {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    cursor: pointer;
    gap: 5px;

    width: 60px;
    height: 60px;
    user-select: none;

    background-color: transparent;
    box-sizing: content-box;
    padding: 2px;
    border-radius: 50%;
    text-decoration: none;

    color: #001869;

    ${media.laptop} {
      width: 60px;
      height: 60px;
    }

    ${media.tablet} {
      width: 50px;
      height: 50px;
    }

    ${media.mobileL} {
      width: 40px;
      height: 40px;
    }
  }

  .link:hover {
    box-shadow: 0 5px 10px #001869;
  }
  .active {
    box-shadow: 0 5px 5px #001869;
  }
`;
const ButtonLogo = styled.div`
  font-size: 20px;

  ${media.laptop} {
    font-size: 18px;
  }
`;
const ButtonText = styled.div`
  font-family: Poppins;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  text-decoration: none;

  ${media.tablet} {
    display: none;
  }
`;

export { ButtonStyle, ButtonText, ButtonLogo };
