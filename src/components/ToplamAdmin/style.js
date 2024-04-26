import styled from "styled-components";

export const Toplam = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;
  width: 100%;

  max-height: 300px;
  overflow: auto;
  padding: 0 5px;
`;

Toplam.Card = styled.div``;
export const ToplamCard = styled.div`
  display: flex;

  width: 100%;
  user-select: none;

  .inner {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 20px;

    font-size: 14px;

    > div {
      text-align: center;
    }
  }
`;
