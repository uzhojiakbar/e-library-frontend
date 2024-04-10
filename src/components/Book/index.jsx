import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BookInformation, Container, Images } from "./style";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

const Book = ({ books, setBook }) => {
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || {});

  const { id } = useParams();

  const [picid, setPicId] = useState(0);

  const [BookCurrent, setBookInfo] = useState(false);
  const navigate = useNavigate();

  const getBook = () => {
    if (!BookCurrent) {
      books.filter((v) => v.id === id ? setBookInfo(v) : '')

    }
  };

  getBook();

  const AcceptBook = async () => {
    const BookDoc = doc(db, "files", id);
    await updateDoc(BookDoc, { hidden: false });
    await navigate("/");
  };

  return (
    BookCurrent ? (
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
            <div className="desc">{BookCurrent?.desc}</div>
            <a
              href={`https://firebasestorage.googleapis.com/v0/b/ochiqkutubxona-d034a.appspot.com/o/files%2F${BookCurrent.path.slice(
                6
              )}?alt=media&token=864fc05d-344c-4dd6-81f7-243b5451021b`}
              className="button"
            >
              Kitobni korish
            </a>
            {user?.type === "nazoratchi" ? (
              <button onClick={AcceptBook} className="button">
                Ruhsat berish
              </button>
            ) : (
              ""
            )}
          </div>
        </BookInformation>
      </Container>
    )
      :
      <div>loading</div>
  );
};

export default Book;
