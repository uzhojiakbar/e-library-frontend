import { Card, List } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
// import {
//   Books,
//   CardText,
//   ProductCard,
//   ProductPage,
// } from "src/Pages/Home/style";
// import { DrawerContent, DrawerTrigger } from "../ui/drawer";
// import Book from "../Book";

const ToplamView = ({ toplam, books }) => {
  const { toplamId } = useParams();

  const [currentToplam, setCurrentToplam] = useState(false);
  const [booksInToplam, setBooksInToplam] = useState();

  const getToplam = async () => {
    if (!currentToplam) {
      await toplam.map((v) => {
        if (v.id === toplamId) {
          setCurrentToplam(v);
          setBooksInToplam(v.books);
          return v;
        } else {
          return "0";
        }
      });
    }
  };

  getToplam();
  console.log(booksInToplam, "1");

  return (
    <div className="p-[50px] flex flex-col gap-[20px]">
      <List itemLayout="vertical">
        <Card style={{ margin: "10px", cursor: "pointer" }}>
          <List.Item>
            <List.Item.Meta
              avatar={
                <i className="fa-solid fa-book text-[30px] text-[#001869]"></i>
              }
              title={<div>{currentToplam.name}</div>}
              description={
                <h1 className="text-[18px]">{currentToplam.desc}</h1>
              }
            />
          </List.Item>
        </Card>
      </List>

      {currentToplam?.books?.map((v) => {
        return <h1>{v.name}</h1>;
      })}

      {/* {currentToplam?.books?.map((v) => (
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
      ))} */}
    </div>
  );
};

export default ToplamView;
