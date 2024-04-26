import React, { useState } from "react";
import {
  Books,
  CardText,
  ChangeView,
  ProductCard,
  ProductPage,
  View,
} from "../../Home/style";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "../../../components/ui/drawer";

import Book from "../../../components/Book";
import { Card, List } from "antd";
import { NavLink } from "react-router-dom";
const User = ({ books = [], q = "", toplam }) => {
  const [view, setView] = useState("book");
  //* book,toplam

  return (
    <div>
      <ChangeView>
        <View
          className={`${view === "book" ? "active" : ""}`}
          onClick={() => setView("book")}
        >
          Kitoblar
        </View>
        <View
          className={`${view === "toplam" ? "active" : ""}`}
          onClick={() => setView("toplam")}
        >
          To'plamlar
        </View>
        <div className="seperator"></div>
      </ChangeView>
      {view === "book" ? (
        <ProductPage>
          <Books>
            {books.map(
              (v) =>
                !v.hidden &&
                v.name.toLowerCase().includes(q) && (
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
          </Books>
        </ProductPage>
      ) : (
        ""
      )}
      {view === "toplam" ? (
        <List
          itemLayout="vertical"
          dataSource={toplam}
          renderItem={(item, index) => (
            <NavLink to={`/toplam/${item.id}`}>
              <Card style={{ margin: "10px", cursor: "pointer" }}>
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <i className="fa-solid fa-book text-[30px] text-[#001869]"></i>
                    }
                    title={<div>{item.name}</div>}
                    description={<h1 className="text-[18px]">{item.desc}</h1>}
                  />
                </List.Item>
              </Card>
            </NavLink>
          )}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default User;
