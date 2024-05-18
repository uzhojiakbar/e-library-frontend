import { Button, Card, Checkbox, Form, Input, List, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { BookOutlined } from "@ant-design/icons";
import { Toplam, ToplamCard } from "../ToplamAdmin/style";
import { useMediaQuery } from "@uidotdev/usehooks";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

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

  const [loading, setLoading] = useState();

  const nav = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/books")
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

  const handleSubmit = async () => {
    try {
      await setLoading(1);
      await fetch(`http://localhost:4000/toplam/${toplamId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: fanName, books }),
      }).catch((error) => {
        console.error("Xatolik:", error);
      });

      setBooks([]);
      setFanName("");

      await getToplam(1);
      notify("ok", "Fan qoshildi!");
      await handleClose();
      await setLoading(0);
    } catch (error) {
      console.log("err", "Fan qoshilmadi, qandaydur xatolik!");
      notify("err", "Fan qoshilmadi, qandaydur xatolik!");
    }
  };

  const getToplam = async (update = 0) => {
    if (!currentToplam?.name || update) {
      try {
        await fetch(`http://localhost:4000/toplam/${toplamId}`)
          .then((response) => response.json())
          .then((result) => {
            setCurrentToplam(result);
          })
          .catch((error) => console.error("Xatolik:", error));
      } catch (error) {}
    }
  };

  const notify = (type = "ok", text) => {
    if (type === "ok") {
      toast.success(text || "Tayyor");
    } else if (type === "err") {
      toast.error(text || "Xato");
    } else if (type === "wait") {
      toast.loading(text || "Kuting...");
    }
  };

  const handleDelete = async (kafedraId, fanId) => {
    try {
      await setLoading(1);
      await fetch(`http://localhost:4000/toplam/${kafedraId}/${fanId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fanId }),
      });
      await getToplam(1);
      await setLoading(0);
      notify("ok", "Belgilangan Fan o'chirildi!");
    } catch (error) {
      console.error("Fanni ochirishda xatolik:", error);
      notify("err", "Fanni ochirishda xatolik!");
    }
  };

  getToplam();

  const onTab1Change = (key) => {
    setActiveTabKey(key);
  };

  const tabList = currentToplam?.fanlar.map((v) => {
    return {
      key: v?.id,
      tab: v?.name,
    };
  });

  const contentList = {};

  currentToplam?.fanlar.forEach((fan, i) => {
    contentList[`${fan?.id}`] = (
      <>
        <div
          key={i}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {fan?.books?.map(
            (v) =>
              v?.id && (
                <NavLink
                  key={v?.id}
                  style={{ textDecoration: "none" }}
                  to={`/book/${v?.id}`}
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
                      <div style={{ fontSize: "18px" }}>{v?.name}</div>
                    </div>
                    <div style={{ padding: "10px", minHeight: "100px" }}>
                      {v?.desc}
                    </div>
                  </div>
                </NavLink>
              )
          )}
        </div>
        {JSON.parse(localStorage.getItem("user"))?.type === "admin" ||
        JSON.parse(localStorage.getItem("user"))?.type === "kafedra" ? (
          <div
            style={{
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            <Button danger onClick={() => handleDelete(toplamId, activeTabKey)}>
              Fanni Ochirish
            </Button>
          </div>
        ) : (
          ""
        )}
      </>
    );
  });

  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const handleClose = () => {
    setBooks([]);
    setFanName("");
    setOpenModal(!openModal);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  const handleCancelEdit = () => {
    setOpenModalEdit(!openModalEdit);
  };

  const IsMobile = useMediaQuery("(max-width : 605px)");

  const FanNotFound = () => {
    return (
      <h1 className="text-2xl font-semibold  text-center p-[50px]">
        Hozircha fanlar yoq....
      </h1>
    );
  };

  const DeleteKafedra = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:4000/toplam/${toplamId}`);
      await notify("ok", "Kafedra ochirildi!");
      await nav("/admin/kafedra");
      // await document.location.reload();
    } catch (error) {
      notify("err", "Kafedra ochirilmadi!");
    }
    setLoading(false);
  };

  const EditFan = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/toplam/${toplamId}`,
        updatedData
      );
      await handleCancelEdit();
      await getToplam(1);
      console.log("Updated data:", response.data);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const [updatedData, setUpdatedData] = useState({
    name: currentToplam?.name,
    desc: currentToplam?.desc,
  });

  const handleFanInfoChange = (event) => {
    const { name, value } = event.target;
    setUpdatedData({
      ...updatedData,
      [name]: value,
    });

    console.log(updatedData);
  };

  return (
    <div
      className={` ${
        IsMobile ? "pt-[20px]" : "p-[50px]"
      } flex flex-col gap-[20px]`}
    >
      {currentToplam?.name ? (
        <div>
          {/* Kafedra nomi */}
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
                    </div>
                  }
                  description={
                    <div>
                      <h1 className="text-[18px]">{currentToplam?.desc}</h1>
                      {JSON.parse(localStorage.getItem("user"))?.type ===
                        "admin" ||
                      JSON.parse(localStorage.getItem("user"))?.type ===
                        "kafedra" ? (
                        <div className="flex gap-[20px] mt-[20px] overflow-auto">
                          <Button
                            style={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "center",
                            }}
                            onClick={handleClose}
                          >
                            <div className="fa-solid text-[16px] fa-plus text-black"></div>
                            <div>Fan qoshish</div>
                          </Button>
                          <Button
                            style={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "center",
                            }}
                            onClick={handleCancelEdit}
                          >
                            <div className="fa-solid text-[16px] fa-edit text-black"></div>
                            <div>Tahrirlash</div>
                          </Button>
                          <Button
                            style={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "center",
                            }}
                            onClick={handleClose}
                          >
                            <div className="fa-solid text-[16px] fa-file-excel text-[green]"></div>
                            <div>Exsel ga olish</div>
                          </Button>
                          <Button
                            style={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "center",
                            }}
                            onClick={DeleteKafedra}
                          >
                            <div className="fa-solid text-[16px] fa-trash text-[red]"></div>
                            <div>Kafedrani ochirish</div>
                          </Button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  }
                />
              </List.Item>
            </Card>
          </List>

          {/* Fanlar */}

          <Card
            type="inner"
            title={"Fanlar"}
            style={{ margin: "10px", cursor: "pointer" }}
            tabList={tabList}
            activeTabKey={activeTabKey}
            onTabChange={onTab1Change}
          >
            {currentToplam?.fanlar.length ? (
              contentList[activeTabKey]
            ) : (
              <FanNotFound />
            )}
          </Card>

          {/* Fan qoshish */}
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
                  {
                    required: true,
                    message: "Iltimos, fan nomini kiriting!",
                  },
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
                          <Card key={v.id}>
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

            {loading ? (
              <div className="loaderWindow">
                <div className="loader"></div>
              </div>
            ) : (
              <></>
            )}
          </Modal>

          {/* Fan Tahrirlash */}
          <Modal
            title={`${currentToplam?.name}: tahrirlash `}
            open={openModalEdit}
            onCancel={handleCancelEdit}
            footer={""}
          >
            <Form
              onSubmit={EditFan}
              name="addFanForm"
              initialValues={{
                remember: true,
                name: currentToplam?.name,
                desc: currentToplam?.desc,
              }}
            >
              <Form.Item
                label="Fan nomi"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Iltimos, fan nomini kiriting!",
                  },
                ]}
              >
                <Input
                  showCount
                  maxLength={64}
                  name={"name"}
                  onChange={handleFanInfoChange}
                />
              </Form.Item>

              <Form.Item
                label="Fan Haqida malumot"
                name="desc"
                rules={[
                  {
                    required: true,
                    message: "Iltimos, biror nima kiriting!",
                  },
                ]}
              >
                <Input
                  showCount
                  maxLength={1024}
                  name={"desc"}
                  onChange={handleFanInfoChange}
                />
              </Form.Item>

              <Form.Item>
                <Button onClick={EditFan} type="primary" htmlType="submit">
                  Saqlash
                </Button>
              </Form.Item>
            </Form>

            {loading ? (
              <div className="loaderWindow">
                <div className="loader"></div>
              </div>
            ) : (
              <></>
            )}
          </Modal>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold text-center">
            Qandaydur Xatolik yoki Toplam topilmadi
          </h1>
        </div>
      )}

      {loading ? (
        <div className="loaderWindow">
          <div className="loader"></div>
        </div>
      ) : (
        <></>
      )}

      <Toaster />
    </div>
  );
};
export default ToplamView;
