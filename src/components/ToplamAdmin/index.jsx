import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, Input, List, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ButtonUpload } from "src/Pages/FIleUpload/style";
import { NavLink } from "react-router-dom";

const ToplamAdmin = ({  notify, toplam, type = "admin" }) => {
  const [openModal, setOpenModal] = useState(false);
  const [allToplam, setAllToplam] = useState(toplam);
  const [loading, setLoading] = useState(true);

  const [zero, setZero] = useState(1);

  const getToplams = async (update) => {
    if (allToplam.length === 0 || update === 1) {
      try {
        await fetch("http://localhost:4000/toplam")
          .then((response) => response.json())
          .then((result) => {
            setAllToplam(result);
            console.log(result);
          })
          .catch((error) => console.error("Xatolik:", error));
      } catch (error) {}
    }
  };

  useEffect(() => {
    return () => {
      if (zero) {
        getToplams(1);
        setZero(0);
        setLoading(0)
      }
    };
  });

  const [name, setname] = useState("");
  const [desc, setDesc] = useState("");

  const handleClose = () => setOpenModal(!openModal);

  const handleCancel = () => {
    setOpenModal(false);
  };

  const UploadToplam = async () => {
    const doc = {
      name: name || "nomalum",
      desc: desc || "nomalum",
      fanlar: [],
    };

    try {
      await fetch("http://localhost:4000/toplam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doc),
      })
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          notify("ok", "Kafedra qoshildi!");
          setname("");
          setDesc("");
          handleCancel();
          getToplams(1);
        })
        .catch((error) => console.error(error));
    } catch (error) {
      notify("err", "Kafedra qoshilmadi!");
    }
  };

  return (
    <div className="w-[100%]">
      <div className="pl-[10px]">
        {type === "admin" ? (
          <Button
            onClick={handleClose}
            className="text-[22px] button text-white"
            type="submit"
          >
            Kafedra qoshish
          </Button>
        ) : (
          <></>
        )}

        <Modal
          title="Kafedra qoshish"
          open={openModal}
          onCancel={handleCancel}
          footer={[
            <div className="buttons w-[100%] flex justify-between">
              <ButtonUpload
                onClick={handleCancel}
                type="reset"
                color="red"
                className="button"
              >
                Bekor qilish
              </ButtonUpload>
              <ButtonUpload
                onClick={UploadToplam}
                type="close"
                color="green"
                className="button "
              >
                Kafedra yuklash
              </ButtonUpload>
            </div>,
          ]}
        >
          <div className="flex flex-col gap-[20px] pt-[20px] pb-[20px]">
            <Input
              showCount
              maxLength={64}
              type="text"
              placeholder="Toplam nomini kiriting"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
            <TextArea
              showCount
              value={desc}
              maxLength={1024}
              autoSize={{
                minRows: 2,
                maxRows: 12,
              }}
              placeholder="Toplam haqida malumot kiriting"
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
        </Modal>
      </div>
      <div>
        <List
          itemLayout="vertical"
          dataSource={allToplam}
          renderItem={(item, index) => (
            <NavLink to={`/toplam/${item.id}`}>
              <Card
                style={{ margin: "10px", cursor: "pointer", width: "100%" }}
              >
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
      </div>
      {loading ? (
              <div className="loaderWindow">
                <div className="loader"></div>
              </div>
            ) : (
              <></>
            )}
    </div>
  );
};

export default ToplamAdmin;
