import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, Checkbox, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Toplam, ToplamCard } from "./style";
import { ButtonUpload } from "src/Pages/FIleUpload/style";
import { addDoc, collection } from "firebase/firestore";
import { db } from "src/config/firebase";

const ToplamAdmin = ({ books, notify }) => {
  const [openModal, setOpenModal] = useState(false);

  const [bookInner, setBookInner] = useState(books);
  const [name, setname] = useState("");
  const [desc, setDesc] = useState("");

  const [search, setSearch] = useState("");

  const handleClose = () => setOpenModal(!openModal);

  const handleCancel = () => {
    setOpenModal(false);
  };

  const onChecked = (id, status) => {
    let res = bookInner.map((v) => {
      return v.id === id ? { ...v, checked: status } : v;
    });
    setBookInner(res);
  };

  const UploadToplam = async () => {
    console.log("uplaod");

    let resBooks = [];

    await bookInner.map((v) => {
      return v.checked ? resBooks.push(v) : "";
    });

    console.log(resBooks);

    const toplamCollection = collection(db, "toplam");

    const doc = {
      name: name || "nomalum",
      desc: desc || "nomalum",
    };

    console.log({ ...doc, books: resBooks });

    try {
      await addDoc(toplamCollection, { ...doc, books: resBooks });
      setname("");
      setDesc("");
      notify("ok", "Toplam qoshildi!");
      handleCancel();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button onClick={handleClose} className="text-[20] button" type="submit">
        Toplam qoshish
      </Button>

      <Modal
        title="Toplam qoshish"
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
              Toplamni yuklash
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
          <Card title="Kitoblarni tanlang" type="inner">
            <div className="flex flex-col gap-[15px]">
              <Input
                showCount
                type="text"
                placeholder="Kitob qidirish"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Toplam>
                {bookInner.map((v) => {
                  return (
                    v.name.toLowerCase().includes(search.toLowerCase()) && (
                      <Card>
                        <ToplamCard>
                          <Checkbox
                            checked={v?.checked}
                            onChange={(e) => onChecked(v.id, e.target.checked)}
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
        </div>
      </Modal>
    </div>
  );
};

export default ToplamAdmin;
