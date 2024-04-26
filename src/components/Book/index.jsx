import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookInformation, Container, Images } from "./style";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
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

  const getBook = () => {
    if (!BookCurrent) {
      books.filter((v) => (v.id === id ? setBookInfo(v) : ""));
    }
  };

  getBook();

  const AcceptBook = async () => {
    const BookDoc = doc(db, "files", id);
    await updateDoc(BookDoc, { hidden: false });
    await navigate("/");
    document.location.reload();
  };

  const getCategory = (id1) => {
    let a = categories.filter((v) => v.id === id1);
    return a[0]?.name;
  };

  return BookCurrent ? (
    <Container>
      <Images>
        <div className="thumb">
          {BookCurrent?.pics.map((v2, i) => (
            <div key={i} className="carusel-img">
              <img
                onClick={() => setPicId(i)}
                src={`https://firebasestorage.googleapis.com/v0/b/ochiqkutubxona-d034a.appspot.com/o/pics%2F${v2.slice(
                  5
                )}?alt=media&token=27b56b0f-821a-45ae-9ccb-f282a53987fd`}
                alt="loading..."
              />
            </div>
          ))}
        </div>
        <div className="currentPic">
          <img
            src={`https://firebasestorage.googleapis.com/v0/b/ochiqkutubxona-d034a.appspot.com/o/pics%2F${BookCurrent.pics[
              picid
            ].slice(5)}?alt=media&token=27b56b0f-821a-45ae-9ccb-f282a53987fd`}
            alt=""
          />
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
              href={`https://firebasestorage.googleapis.com/v0/b/ochiqkutubxona-d034a.appspot.com/o/files%2F${BookCurrent.path.slice(
                6
              )}?alt=media&token=864fc05d-344c-4dd6-81f7-243b5451021b`}
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
              ""
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
