import React from "react";
import toast, { Toaster } from "react-hot-toast";
import ToplamAdmin from "src/components/ToplamAdmin";

const Kafedra = ({ toplam, books }) => {
  const notify = (type = "ok", text) => {
    if (type === "ok") {
      toast.success(text || "Tayyor");
    } else if (type === "err") {
      toast.error(text || "Xato");
    } else if (type === "wait") {
      toast.loading(text || "Kuting...");
    }
  };

  return (
    <div className="p-[20px]">
      <ToplamAdmin
        type="kafedra"
        toplam={toplam}
        notify={notify}
        books={books}
      />
      <Toaster />
    </div>
  );
};

export default Kafedra;
