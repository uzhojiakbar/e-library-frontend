import React, { useState } from "react";
import {
  Container,
  HomeContainer,
} from "./style";
import Admin from "../Rolls/Admin";
import Nazoratchi from "../Rolls/Nazoratchi";
import User from "../Rolls/User";

const Home = ({ setCurrentBooks, categories, setCategories, FilerCategories, books = [], setBook }) => {
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || {});
  return (
    books.length ? <HomeContainer>
      {user?.type === "admin" ? <Admin FilerCategories={FilerCategories} categories={categories} setCategories={setCategories} /> : ""}
      <Container>
        {user?.type === "nazoratchi" ? (
          <Nazoratchi books={books} />
        ) : (
          ""
        )}
        {user?.type === "user" || user?.type === undefined ? (
          <User books={books} />
        ) : (
          ""
        )}
      </Container>
    </HomeContainer >
      : <HomeContainer>
        <p>loading</p>
      </HomeContainer>
  );
};

export default Home;
