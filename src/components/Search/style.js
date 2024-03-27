import styled from "styled-components";
import { media } from "../../mock/media";

const SearchDesign = styled.div`
  position: relative;

  width: 30%;
  min-width: 200px;

  color: rgb(0, 24, 105);

  border-radius: 23px;
  border: 1px solid rgb(228, 228, 228);
  background: rgba(82, 136, 193, 0.1);

  ${media.mobileL} {
    width: 90%;
    margin: 0 auto;
    order: 1;
  }
`;
const SearchInput = styled.input`
  padding: 10px 45px 10px 10px;

  width: 100%;
  height: 100%;

  font-family: Manrope;
  font-style: normal;
  font-weight: 700;

  letter-spacing: 1.2px;
  word-spacing: 5px;

  color: rgb(0, 24, 105);

  background-color: transparent;
  border-radius: 23px;
  border: 1px solid rgb(228, 228, 228);

  outline: none;

  ${media.mobileL} {
    padding: 10px 10px 10px 45px;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 20px;
  top: 12px;

  cursor: pointer;

  .fa-x {
    font-size: 14px;
  }

  ${media.mobileL} {
    right: 93%;
    top: 10px;
  }
  ${media.mobileM} {
    right: 91%;
    top: 10px;
  }
`;

export { SearchDesign, SearchInput, SearchIcon };
