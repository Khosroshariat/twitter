import React, { useEffect, useState } from "react";
import Tweetinput from "./Tweetinput";
import { Tweet } from "./Tweet";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { singOutUser } from "@/redux/userSlice";
import { closeLoginModal, closeSignupModal } from "@/redux/modalSlice";

export const Postfeed = () => {
  const [tweets, setTweets] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTweets(snapshot.docs);
    });

    return unsubscribe;
  }, []);

  async function handleSignout() {
    await signOut(auth);

    dispatch(singOutUser());

    dispatch(closeSignupModal())
    dispatch(closeLoginModal())
  }

  return (
    <div
      className="sm:ml-16 xl:ml-[350px] max-w-2xl flex-grow border-gray-700
    border-x
    "
    >
      <div
        className="px-3 py-2 text-lg sm:text-xl font-bold border-b border-gray-700
        sticky top-0 z-50 flex justify-between"
      >
        Home
        <div className="cursor-pointer bg-[#1d9bf0] px-2 py-1 rounded-2xl font-bold font-mono text-md text-center hover:bg-opacity-80"
        onClick={handleSignout}>Logout</div>
      </div>
      <Tweetinput />

      {tweets.map((tweet) => (
        <Tweet href={tweet.id} id={tweet.id} data={tweet.data()} />
      ))}
    </div>
  );
};
