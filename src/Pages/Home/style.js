import styled from "styled-components";

export const HomeContainer = styled.div`
  padding: var(--padding);
`;

const Book = styled.div``;

const Container = styled.div`
  background: #e2e2e2;
  width: 100%;
`;

const ProductPage = styled.div`
  padding: 32px 52px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  max-width: 1360px;
  margin: 0 auto;
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
const ProductCard = styled.div`
  background: #ffffff;

  .img {
    width: 100%;
    height: 45vh;
    background-image: url(${({ url }) => url});
    background-size: cover;
    background-repeat: no-repeat;
  }

  @media (max-width: 500px) {
    .img {
      height: 70vh;
    }
  }
`;
const CardText = styled.div`
  padding: 20px 16px 16px;
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
      font-size: 20px;
    }
    @media (max-width: 800px) {
      font-size: 17px;
    }
    @media (max-width: 530px) {
      font-size: 25px;
      line-height: 16px;
    }
  }
  p {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    color: rgba(0, 0, 0, 0.5);
    padding: 8px 0 4px;
    @media (max-width: 930px) {
      font-size: 13px;
      line-height: 19px;
    }
    @media (max-width: 800px) {
      font-size: 10px;
      line-height: 15px;
    }
    @media (max-width: 530px) {
      font-size: 8px;
      line-height: 12px;
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
export { Container, ProductPage, ProductCard, CardText };

export { Book };
