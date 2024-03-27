import styled from "styled-components";
import { media } from "../../mock/media";

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row-reverse;
  gap: 10px;

  cursor: pointer;
  padding: 10px;
  user-select: none;
`;

const TitleText = styled.div`
  font-size: 18px;
  text-transform: capitalize;
  width: 170px;
  text-align: left;
  font-weight: 900;
  ${media.laptop} {
    font-size: 16px;
  }
  ${media.tablet} {
    font-size: 14px;
    width: 130px;
  }
`;

const TitleLogo = styled.div`
  color: rgb(0, 24, 105);
  font-size: 40px;
  ${media.laptop} {
    font-size: 36px;
  }
`;

export { TitleContainer, TitleText, TitleLogo };
