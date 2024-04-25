import { media } from "src/mock/media";
import styled from "styled-components";

const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 90%;

  padding: 10px 0;
  padding-top: 90px;

  align-items: flex-start;
  gap: 20px;

  .button {
    color: white;
    font-size: 20px;
  }

  .nav{
    position: fixed;
    top: 90px;
    left: 0;
    width: 99vw;
    height: 60px;
    background: rgb(0, 24, 105);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: auto;


    .items{
      max-width: 1440px;
      width: 100%;
      margin: 0 auto;

      display: flex;
      align-items: center;
      gap: 40px;
      padding: 5px 10px;
      color: white;

     
    }

    .child{
      color: rgb(255, 255, 255);
      font-family: Poppins;
      font-size: 16px;
      font-weight: 400;
      line-height: 15px;
      letter-spacing: 0%;
      text-align: left;
      padding: 10px 10px;

      cursor: pointer;
    }

    .child:hover{
      background-color: rgb(255, 255, 255);
      color: rgb(0, 24, 105);
    }
    
    ${media.mobileL}{
      top: 150px;
    }
    
    ${media.mobileM}{
      top: 150px;
      width: 100%;
    }


  }

  .rowtitle {
    font-weight: 900;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    width: 1040px;
    z-index: 5;
    background-color: #F5F5F5;
  }

  .row * {
    padding: 0 5px;
    text-align: center;
  }

  .row:hover {
      background-color: #F5F5F5;
  }

  .row:hover * {
      background-color: #F5F5F5;
  }

  .row{
    grid-gap: 5px;
    display: grid;
    gap: 5px;
    grid-template-columns: 200px 270px 200px 200px 100px;
    padding: 15px 0;
    cursor: pointer;
  }

  .leftfixed {
    width: 200px;
    overflow: auto;
    position: sticky;
    left: 0px;
    top: 0;
    background-color: white;
  }

  .rightfixed {
      position: sticky;
      right: 0;
      top: 0;
      background-color: white;
  }

  .main {
    width: 90vw;
    max-width: 1000px;
    background-color: white;

    transition: .2s;
    overflow: auto;

    border-radius: 15px;

    min-height: 200px;
    height: 500px;

    resize: both;
}
`;

export { AdminContainer };
