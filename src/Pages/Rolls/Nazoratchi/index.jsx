import React from "react";
import { Books, CardText, ProductCard, ProductPage } from "../../Home/style";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "../../../components/ui/drawer";
import Book from "../../../components/Book";

const Nazoratchi = ({ books = [], q = "" }) => {
  const getPic = (name) => {
    return `http://localhost:3000/files/${name.slice(6)}`;
  };

  return (
    <div className="p-10">
      <h1>Nazorat qilishingiz kerak bolgan kitoblar:</h1>
      <ProductPage>
        <Books>
          {books.map(
            (v) =>
              v.hidden &&
              v.name.toLowerCase().includes(q) && (
                <Drawer key={v.id}>
                  <DrawerTrigger asChild>
                    <ProductCard url={getPic(v.pics[0])}>
                      <div className="img">
                        <img
                          className="w-[100%] h-[300px]"
                          src={getPic(v.pics[0])}
                          alt=""
                        />
                      </div>
                      <CardText>
                        <h2>{v.name}</h2>
                        <p>{v.desc}</p>
                      </CardText>
                    </ProductCard>
                  </DrawerTrigger>
                  <DrawerContent>
                    <Book id={v.id} books={books} />
                  </DrawerContent>
                </Drawer>
              )
          )}
        </Books>
      </ProductPage>
      <h1>Tekshirilgan kitoblar:</h1>
      <ProductPage>
        <Books>
          {books.map(
            (v) =>
              !v.hidden &&
              v.name.toLowerCase().includes(q) && (
                <Drawer key={v.id}>
                  <DrawerTrigger asChild>
                    <ProductCard url={getPic(v.pics[0])}>
                      <div className="img"></div>
                      <CardText>
                        <h2>{v.name}</h2>
                        <p>{v.desc}</p>
                      </CardText>
                    </ProductCard>
                  </DrawerTrigger>
                  <DrawerContent>
                    <Book id={v.id} books={books} />
                  </DrawerContent>
                </Drawer>
              )
          )}
        </Books>
      </ProductPage>
    </div>
  );
};

export default Nazoratchi;
