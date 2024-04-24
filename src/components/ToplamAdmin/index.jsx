import React, { useState } from "react";
import { Button } from "../ui/button";
import { Avatar, Card, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import Meta from "antd/es/card/Meta";

const ToplamAdmin = ({ books }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => setOpenModal(!openModal);

  const handleCancel = () => {
    setOpenModal(false);
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
        footer={[<button>qoshish</button>]}
      >
        <div className="flex flex-col gap-[20px] pt-[20px] pb-[20px]">
          <Input
            showCount
            maxLength={64}
            type="text"
            placeholder="Toplam nomini kiriting"
          />
          <TextArea
            showCount
            maxLength={1024}
            autoSize={{
              minRows: 2,
              maxRows: 12,
            }}
            placeholder="Toplam haqida malumot kiriting"
          />
          <div className="flex gap-[20px]">
            <Card
              style={{
                width: 200,
              }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
            >
              <Meta
                avatar={
                  <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                }
                title="Card title"
                description="This is the description"
              />
            </Card>
            <Card
              style={{
                width: 200,
              }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
            >
              <Meta
                avatar={
                  <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                }
                title="Card title"
                description="This is the description"
              />
            </Card>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ToplamAdmin;
