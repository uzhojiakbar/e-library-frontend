import React from "react";
// import { getDocs, collection } from "firebase/firestore";
import { HomeContainer } from "./style";

const Home = () => {
  return (
    <HomeContainer>
      <div style={{ display: "none" }}>
        {/* {users.map((v) => (
          <h1>{v.name}</h1>
        ))} */}
      </div>
    </HomeContainer>
  );
};

export default Home;

// const [currentUser] = useState(localStorage.getItem("login"));

// const usersCollection = collection(db, "users");
// const getUsers = async () => {
//   try {
//     const data = await getDocs(usersCollection);
//     const getData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     setUsers(getData);
//   } catch (error) {
//     console.log(error);
//   }
// };

// useEffect(() => {
//   getUsers();
//   // if (currentUser) {
//   // }
// });
