import React, { useState } from "react";
import { auth, GoogleProvider} from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup,signOut} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  console.log(auth?.currentUser?.email);

  const signIn = async() =>{
    try{
      await createUserWithEmailAndPassword(auth,email,password)
    }catch(err){
      console.error(err)
    }
  }

  const signInWithGoogle = async() => {
    try{
      await signInWithPopup(auth,GoogleProvider)
    }catch(err){
      console.error(err)
    }
  }

  const logout = async() => {
    try{
      await signOut(auth)
    }catch(err){
      console.error(err)
    }
  }
  return (
    <div>
      <input type="text" onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
      <input type="text" onChange={(e)=>setPassword(e.target.value)} placeholder="password" />

      <button onClick={signIn}>Sign in</button>

      <br />
      <button onClick={signInWithGoogle}>Sign in  With Google</button>

      <br />
      <button onClick={logout}>Log Out</button>
    </div>
  );
};

export default Auth;
