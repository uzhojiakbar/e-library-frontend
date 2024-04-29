import React, { useState } from "react";
import { Books, Container, HomeContainer, ProductPage } from "./style";
import Admin from "../Rolls/Admin";
import Nazoratchi from "../Rolls/Nazoratchi";
import User from "../Rolls/User";
import { Skeleton } from "src/components/ui/skeleton";
import { useParams } from "react-router-dom";

const Home = ({
  setCurrentBooks,
  categories,
  setCategories,
  FilerCategories,
  books = [],
  setBook,
  users,
  toplam,
}) => {
  const query = useParams();
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || {});
  return books.length ? (
    <HomeContainer>
      {user?.type === "admin" ? (
        <Admin
          FilerCategories={FilerCategories}
          categories={categories}
          users={users}
          setCategories={setCategories}
          books={books}
          toplam={toplam}
          q={query.q}
        />
      ) : (
        ""
      )}
      <Container>
        {user?.type === "nazoratchi" ? (
          <Nazoratchi q={query.q} books={books} />
        ) : (
          ""
        )}
        {user?.type === "user" || user?.type === undefined ? (
          <User toplam={toplam} q={query.q} books={books} />
        ) : (
          ""
        )}
      </Container>
    </HomeContainer>
  ) : (
    <HomeContainer>
      <ProductPage>
        <Books>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((v) => {
            return (
              <div key={v} className="flex flex-col space-y-3 pt-18">
                <Skeleton className="h-[250px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            );
          })}
        </Books>
      </ProductPage>
    </HomeContainer>
  );
};

export default Home;
