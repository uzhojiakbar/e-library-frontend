import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookInformation, Container, Images } from "./style";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { ButtonLink } from "../ui/button-link";

const Book = ({ id, books, setBook }) => {
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || {});

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

  getCategories();

  const getBook = async () => {
    if (!BookCurrent.name) {
      try {
        await fetch(`http://localhost:3030/book/${id}`)
          .then((response) => response.json())
          .then((result) => {
            setBookInfo(result);
          })
          .catch((error) => console.error("Xatolik:", error));
      } catch (error) {}
    }
  };

  getBook();

  const AcceptBook = async () => {
    try {
      const response = await fetch(`http://localhost:3030/books/${id}`, {
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
    return `http://localhost:3030/files/${name.slice(6)}`;
  };

  const onDownloadFile = (src, name) => {
    console.log(src);
    fetch(`http://localhost:3030/${src}`)
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
          <div className="text-[20px]">
            {" "}
            <span>Muallif:</span> {BookCurrent?.muallif}
          </div>
          <div className="text-[20px]">
            {" "}
            <span>chiqgan yili:</span> {BookCurrent?.year}
          </div>
          <div className="text-[20px]">
            {" "}
            <span>Nashriyot:</span> {BookCurrent?.nashriyot}
          </div>
          <div className="text-[20px]">
            {" "}
            <span>kategoriya:</span> {getCategory(BookCurrent?.ctg)}
          </div>
          <div className="desc">{BookCurrent?.desc}</div>
          <div className="flex gap-[20px]">
            <ButtonLink
              href={getPic(BookCurrent.path)}
              className="bg-slate-700 hover:bg-slate-600 button"
              target="_blank"
            >
              Kitobni korish
            </ButtonLink>

            {(user?.type === "nazoratchi" || user?.type === "admin") &&
            BookCurrent?.hidden ? (
              <ButtonLink
                onClick={AcceptBook}
                className="bg-slate-700 hover:bg-slate-600 button"
              >
                Ruhsat berish
              </ButtonLink>
            ) : (
              <ButtonLink
                onClick={() => onDownloadFile(BookCurrent.path)}
                className="bg-slate-700 hover:bg-slate-600 button"
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
    <div>loading</div>
  );
};

export default Book;
