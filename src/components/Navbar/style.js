import styled from "styled-components";
import { media } from "../../mock/media";

const NavbarSt = styled.div`
  padding: var(--padding);

  width: 100%;

  min-height: 80px;
  min-width: var(--min-width);

  background-color: white;

  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 2;

  .malumot {
    display: flex;
    justify-content: space-between;
    align-items: center;

    gap: 10px;

    flex-wrap: wrap;

    max-width: 1440px;
    margin: 0 auto;
  }

  ${media.mobileL} {
    padding: var(--padding-media);
  }
`;

const ButtonsNav = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;

  ${media.mobileL} {
    gap: 5px;
  }
`;

export { NavbarSt, ButtonsNav };
