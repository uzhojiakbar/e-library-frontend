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

  const GetPic = (name) => {
    return `http://localhost:4000/files/${name.slice(6)}`;
  };

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
                      <ProductCard url={GetPic(v.pics[0])}>
                        <div className="img">
                          {/* <img src={GetPic(v.pics[0])} alt="" /> */}
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
      ) : (
        ""
      )}
      {view === "toplam" ? (
        <List
          itemLayout="vertical"
          dataSource={toplam}
          renderItem={(item, index) => (
            <NavLink key={item.id} to={`/toplam/${item.id}`}>
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
