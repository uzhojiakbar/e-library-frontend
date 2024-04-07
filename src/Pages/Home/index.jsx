import React, { useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import {
  CardText,
  Container,
  HomeContainer,
  ProductCard,
  ProductPage,
} from "./style";
import { db } from "../../config/firebase";
import { NavLink } from "react-router-dom";
import Admin from "../../components/Admin";

const Home = ({ setCurrentBooks }) => {
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || {});

  const [books, setBook] = useState([]);

  const BookCollection = collection(db, "files");

  const getBooks = async () => {
    if (books.length === 0) {
      try {
        const data = await getDocs(BookCollection);
        const getData = data.docs.map((v) => ({ id: v.id, ...v.data() }));
        setBook(getData);
        setCurrentBooks(getData);
      } catch (error) {}
    }
  };

  getBooks();

  return (
    <HomeContainer>
      {user?.type === "admin" ? <Admin /> : ""}
      <Container>
        {user?.type === "nazoratchi" ? (
          <>
            <h1>Nazorat qilishingiz kerak bolgan kitoblar:</h1>
            <ProductPage>
              {books.map(
                (v) =>
                  v.hidden && (
                    <ProductCard
                      url={`https://firebasestorage.googleapis.com/v0/b/ochiqkutubxona-d034a.appspot.com/o/pics%2F${v.pics[0].slice(
                        5
                      )}?alt=media&token=27b56b0f-821a-45ae-9ccb-f282a53987fd`}
                      key={v.id}
                    >
                      <NavLink to={`/book/${v.id}`}>
                        <div className="img"></div>
                      </NavLink>
                      <CardText>
                        <h2>{v.name}</h2>
                        <p>{v.desc}</p>
                      </CardText>
                    </ProductCard>
                  )
              )}
            </ProductPage>
          </>
        ) : (
          ""
        )}
        {user?.type === "user" || user?.type === undefined ? (
          <ProductPage>
            {books.map(
              (v) =>
                !v.hidden && (
                  <ProductCard
                    url={`https://firebasestorage.googleapis.com/v0/b/ochiqkutubxona-d034a.appspot.com/o/pics%2F${v.pics[0].slice(
                      5
                    )}?alt=media&token=27b56b0f-821a-45ae-9ccb-f282a53987fd`}
                    key={v.id}
                  >
                    <NavLink to={`/book/${v.id}`}>
                      <div className="img"></div>
                    </NavLink>
                    <CardText>
                      <h2>{v.name}</h2>
                      <p>{v.desc}</p>
                    </CardText>
                  </ProductCard>
                )
            )}
          </ProductPage>
        ) : (
          ""
        )}
      </Container>
    </HomeContainer>
  );
};

export default Home;
