import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { HomeContainer } from "./style";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("login"));

  const usersCollection = collection(db, "users");
  const getUsers = async () => {
    try {
      const data = await getDocs(usersCollection);
      const getData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(getData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
    if (currentUser) {
    }
  }, []);

  return <HomeContainer></HomeContainer>;
};

export default Home;
