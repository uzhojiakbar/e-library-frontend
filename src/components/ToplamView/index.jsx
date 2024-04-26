import React from "react";
import { useParams } from "react-router-dom";

const ToplamView = () => {
  const { toplam } = useParams();
  return <div>{toplam || "not"}</div>;
};

export default ToplamView;
