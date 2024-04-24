import React, { useState } from "react";
import { Button } from "../ui/button";
import { Modal } from "antd";

const ToplamAdmin = () => {
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

      <Modal title="Basic Modal" open={openModal} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export default ToplamAdmin;
