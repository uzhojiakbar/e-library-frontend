import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { ButtonLink } from "../ui/button-link";
import { BookInformation, Container, Images } from "./style";

const Book = ({ id, books, setBook }) => {
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || {});
  const { idB } = useParams();
  const [picid, setPicId] = useState(0);
  const [BookCurrent, setBookInfo] = useState(false);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const getCategories = async (update = 0) => {
    if (categories.length === 0 || update === 1) {
      try {
        const CollenctionRef = collection(db, "category");
        const data = await getDocs(CollenctionRef);
        const getData = data.docs.map((v) => ({ id: v.id, ...v.data() }));
        setCategories(getData);
        console.log("Categoriya yuklandi!");
      } catch (error) {
        console.error(error);
        console.log("Categoriya yuklanmadi!");
      }
    }
  };

  const getBook = async () => {
    if (!BookCurrent.name) {
      try {
        const response = await fetch(`http://localhost:3000/book/${id || idB}`);
        if (!response.ok) {
          throw new Error("Server xatosi");
        }
        const result = await response.json();
        setBookInfo(result);
      } catch (error) {
        console.error("Xatolik:", error);
      }
    }
  };

  getCategories();
  getBook();

  const AcceptBook = async () => {
    try {
      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hidden: false }),
      });
      if (!response.ok) {
        throw new Error("Server xatosi");
      }
      console.log("Kitob yangilandi");
    } catch (error) {
      console.error(error.message);
    }
    await navigate("/");
    document.location.reload();
  };

  const getCategory = (id1) => {
    let a = categories.filter((v) => v.id === id1);
    return a[0]?.name;
  };

  const getPic = (name) => {
    return `http://localhost:3000/files/${name.slice(6)}`;
  };

  const onDownloadFile = (src, name) => {
    fetch(`http://localhost:3000/${src}`)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.download = `${src}`;
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      });
  };

  return BookCurrent ? (
    <Container>
      <Images>
        <div className="thumb">
          {BookCurrent?.pics.map((v2, i) => (
            <div key={i} className="carusel-img">
              <img
                onClick={() => setPicId(i)}
                src={getPic(v2)}
                alt="loading..."
              />
            </div>
          ))}
        </div>
        <div className="currentPic">
          <img src={getPic(BookCurrent.pics[picid])} alt="loading...." />
        </div>
      </Images>
      <BookInformation>
        <div className="first">
          <div className="title">{BookCurrent?.name}</div>
          <div className="author">Muallif: {BookCurrent?.muallif}</div>
          <div className="year">Chiqgan yili: {BookCurrent?.year}</div>
          <div className="publisher">Nashriyot: {BookCurrent?.nashriyot}</div>
          <div className="category">
            Kategoriya: {getCategory(BookCurrent?.ctg)}
          </div>
          <div className="desc">{BookCurrent?.desc}</div>
          <div className="buttons">
            <ButtonLink
              href={getPic(BookCurrent.path)}
              className="view-button"
              target="_blank"
            >
              Kitobni ko'rish
            </ButtonLink>
            {(user?.type === "nazoratchi" || user?.type === "admin") &&
            BookCurrent?.hidden ? (
              <ButtonLink onClick={AcceptBook} className="approve-button">
                Ruhsat berish
              </ButtonLink>
            ) : (
              <ButtonLink
                onClick={() => onDownloadFile(BookCurrent.path)}
                className="download-button"
                target="_blank"
              >
                Kitobni yuklash
              </ButtonLink>
            )}
          </div>
        </div>
      </BookInformation>
    </Container>
  ) : (
    <div>Yuklanmoqda...</div>
  );
};

export default Book;
