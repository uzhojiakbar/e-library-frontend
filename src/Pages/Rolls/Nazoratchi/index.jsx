import React from "react";
import { CardText, ProductCard, ProductPage } from "../../Home/style";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "../../../components/ui/drawer";
import Book from "../../../components/Book";

const Nazoratchi = ({ books = [] }) => {
  return (
    <>
      <h1>Nazorat qilishingiz kerak bolgan kitoblar:</h1>
      <ProductPage>
        {books.map(
          (v) =>
            v.hidden && (
              <Drawer key={v.id}>
                <DrawerTrigger asChild>
                  <ProductCard
                    url={`https://firebasestorage.googleapis.com/v0/b/ochiqkutubxona-d034a.appspot.com/o/pics%2F${v.pics[0].slice(
                      5
                    )}?alt=media&token=27b56b0f-821a-45ae-9ccb-f282a53987fd`}
                    key={v.id}
                  >
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
      </ProductPage>
      <h1>Tekshirilgan kitoblar:</h1>
      <ProductPage>
        {books.map(
          (v) =>
            !v.hidden && (
              <Drawer key={v.id}>
                <DrawerTrigger asChild>
                  <ProductCard
                    url={`https://firebasestorage.googleapis.com/v0/b/ochiqkutubxona-d034a.appspot.com/o/pics%2F${v.pics[0].slice(
                      5
                    )}?alt=media&token=27b56b0f-821a-45ae-9ccb-f282a53987fd`}
                    key={v.id}
                  >
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
      </ProductPage>
    </>
  );
};

export default Nazoratchi;
