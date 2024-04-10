import React, { useState } from "react";
import {
  Container,
  HomeContainer,
  ProductPage,
} from "./style";
import Admin from "../Rolls/Admin";
import Nazoratchi from "../Rolls/Nazoratchi";
import User from "../Rolls/User";
import { Skeleton } from "src/components/ui/skeleton";


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
        <ProductPage>
          {
            [1, 2, 3, 4, 5, 6, 7, 8].map(() => {
              return <div className="flex flex-col space-y-3 pt-18">
                <Skeleton className="h-[250px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            })
          }
        </ProductPage>
      </HomeContainer>
  );
};

export default Home;
