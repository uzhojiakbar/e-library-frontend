import { Button, Card, Checkbox, Form, Input, List, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { BookOutlined } from "@ant-design/icons";
import { Toplam, ToplamCard } from "../ToplamAdmin/style";

const ToplamView = () => {
  const { toplamId } = useParams();

  const [currentToplam, setCurrentToplam] = useState({
    fanlar: [{ books: [] }],
  });
  const [activeTabKey, setActiveTabKey] = useState("tab1");
  const [fanName, setFanName] = useState("");
  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:3030/books")
      .then((response) => response.json())
      .then((data) => {
        setAllBooks(data);
      })
      .catch((error) => {
        console.error("Xatolik:", error);
      });
  }, []);

  const handleChange = (event) => {
    setFanName(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;
    if (checked) {
      setBooks([...books, parseInt(value)]);
    } else {
      setBooks(books.filter((id) => id !== parseInt(value)));
    }
  };

  const handleSubmit = () => {
    fetch(`http://localhost:3030/kafedra/${toplamId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: fanName, books }),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        setFanName("");
        setBooks([]);
      })
      .catch((error) => {
        console.error("Xatolik:", error);
      });
  };

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

  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => setOpenModal(!openModal);

  const handleCancel = () => {
    setOpenModal(false);
  };

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
                    <div
                      onClick={handleClose}
                      className="fa-solid fa-edit text-black"
                    ></div>
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

      <Modal
        title="Fan qoshish"
        open={openModal}
        onCancel={handleCancel}
        footer={[<></>]}
      >
        <Form
          onSubmit={handleSubmit}
          name="addFanForm"
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="Fan nomi"
            name="fanName"
            onChange={handleChange}
            rules={[
              { required: true, message: "Iltimos, fan nomini kiriting!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Card title="Kitoblarni tanlang" type="inner">
            <div className="flex flex-col gap-[15px]">
              <Input
                showCount
                type="text"
                placeholder="Kitob qidirish"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Toplam>
                {allBooks.map((v) => {
                  return (
                    v.name.toLowerCase().includes(search.toLowerCase()) && (
                      <Card>
                        <ToplamCard>
                          <Checkbox
                            value={v.id}
                            checked={books.includes(v.id)}
                            onChange={handleCheckboxChange}
                          >
                            <div className="inner">
                              <div>{v.name}</div>
                              <div>{v.muallif}</div>
                              <div>{v.year}</div>
                            </div>
                          </Checkbox>
                        </ToplamCard>
                      </Card>
                    )
                  );
                })}
              </Toplam>
            </div>
          </Card>
          <Form.Item>
            <Button onClick={handleSubmit} type="primary" htmlType="submit">
              Saqlash
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ToplamView;
