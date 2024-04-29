import { Card, Drawer, List } from "antd";
import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { DrawerContent, DrawerTrigger } from "../ui/drawer";
import { CardText } from "src/Pages/Home/style";
import { Book } from "lucide-react";
import { BookOutlined } from "@ant-design/icons";
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

  const [currentToplam, setCurrentToplam] = useState({
    fanlar: [{ books: [] }],
  });
  const [activeTabKey, setActiveTabKey] = useState("tab1");

  const getToplam = async () => {
    if (!currentToplam.name) {
      try {
        await fetch(`http://localhost:3030/kafedra/${toplamId}`)
          .then((response) => response.json())
          .then((result) => {
            setCurrentToplam(result);
          })
          .catch((error) => console.error("Xatolik:", error));
      } catch (error) {}
    }
  };

  getToplam();

  const onTab1Change = (key) => {
    setActiveTabKey(key);
  };

  const tabList = currentToplam.fanlar.map((v) => {
    return {
      key: v.id,
      tab: v.name,
    };
  });

  const contentList = {};

  currentToplam.fanlar.forEach((fan) => {
    contentList[`${fan.id}`] = (
      <div
        key={fan.id}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {fan.books.map((v) => (
          <NavLink
            key={v.id}
            style={{ textDecoration: "none" }}
            to={`/book/${v.id}`}
          >
            <div
              style={{
                width: "300px",
                margin: "10px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s",
                overflow: "hidden",
                ":hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <div
                style={{
                  padding: "10px",
                  backgroundColor: "#f9f9f9",
                  borderBottom: "1px solid #ddd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  gap: "10px",
                }}
              >
                <div style={{ fontSize: "24px", color: "#1890ff" }}>
                  <BookOutlined />
                </div>
                <div style={{ fontSize: "18px" }}>{v.name}</div>
              </div>
              <div style={{ padding: "10px", minHeight: "100px" }}>
                {v.desc}
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    );
  });

  return (
    <div className="p-[50px] flex flex-col gap-[20px]">
      <List itemLayout="vertical">
        <Card style={{ margin: "10px", cursor: "pointer" }}>
          <List.Item>
            <List.Item.Meta
              avatar={
                <i className="fa-solid fa-book text-[30px] text-[#001869]"></i>
              }
              title={
                <div className="flex w-[100%] items-center gap-[15px] ">
                  <div>{currentToplam?.name}</div>
                  {JSON.parse(localStorage.getItem("user")).type === "admin" ||
                  JSON.parse(localStorage.getItem("user")).type ===
                    "kafedra" ? (
                    <div className="fa-solid fa-edit text-black"></div>
                  ) : (
                    ""
                  )}
                </div>
              }
              description={
                <h1 className="text-[18px]">{currentToplam?.desc}</h1>
              }
            />
          </List.Item>
        </Card>
      </List>

      <Card
        type="inner"
        title={"Fanlar"}
        style={{ margin: "10px", cursor: "pointer" }}
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={onTab1Change}
      >
        {contentList[activeTabKey]}
      </Card>
    </div>
  );
};

export default ToplamView;
