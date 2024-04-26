import styled from "styled-components";

export const HomeContainer = styled.div`
  padding: var(--padding);
`;

const Container = styled.div`
  background: #e2e2e2;
  width: 100%;
`;

const ProductPage = styled.div`
  margin: 0 auto;
  gap: 20px;

  display: flex;
  flex-direction: column;

  padding: 20px;
`;
const ProductCard = styled.div`
  background: #ffffff;
  cursor: pointer;

  .img {
    width: 100%;
    height: 300px;
    background-image: url(${({ url }) => url});
    background-size: cover;
    background-repeat: no-repeat;
  }
`;
const CardText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 25px 16px 16px;
  @media (max-width: 450px) {
    padding: 7px;
  }
  h2 {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 23px;
    color: #001869;
    opacity: 0.8;
    @media (max-width: 930px) {
      font-size: 30px;
      padding-top: 10px;
      line-height: 30px;
    }
    @media (max-width: 800px) {
      font-size: 30px;
      line-height: 30px;
    }
    @media (max-width: 530px) {
      font-size: 22px;
      line-height: 16px;
    }
  }
  p {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.5);
    padding: 8px 0 4px;
    @media (max-width: 930px) {
      font-size: 18px;
    }
    @media (max-width: 800px) {
      font-size: 20px;
    }
    @media (max-width: 530px) {
      line-height: 20px;
    }
  }
  .card-flex {
    display: flex;
    align-items: center;
    gap: 50px;
    @media (max-width: 450px) {
      gap: 0;
      justify-content: space-between;
    }
    img {
      width: 35%;
    }
    span {
      font-style: normal;
      font-weight: 400;
      font-size: 10px;
      line-height: 15px;
      color: #5288c1;
      @media (max-width: 450px) {
        font-size: 8px;
      }
    }
  }
  h3 {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #000000;
    padding-top: 37px;
    @media (max-width: 800px) {
      font-size: 14px;
      line-height: 15px;
    }
    @media (max-width: 450px) {
      font-size: 10px;
      padding-top: 20px;
    }
  }
`;

const Books = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;

  padding: 20px 0;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);

    padding: 16px 24px;
  }
`;

const ChangeView = styled.div`
  background-color: #001869;
  margin: 10px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 10px 5px;
  gap: 5px;

  .active {
    color: #001869;
    background-color: white;
  }

  .seperator {
    height: 90%;
    width: 3px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 5px;
  }
`;
const View = styled.div`
  padding: 4px 10px;
  color: white;
  font-family: Poppins;
  font-weight: 500;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.9);

    color: #001869;
  }
`;

export {
  Container,
  Books,
  View,
  ChangeView,
  ProductPage,
  ProductCard,
  CardText,
};
