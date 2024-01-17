import { db } from "@/firebase";
import { openCommentModal, openLoginModal, setCommentTweet } from "@/redux/modalSlice";
import {
  ChartBarIcon,
  ChatIcon,
  HeartIcon,
  TrashIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import { HeartIcon as FilledH } from "@heroicons/react/solid";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";

export const Tweet = ({ data, id }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState("");

  async function deleteTweet(e) {
    e.stopPropagation()

    await deleteDoc(doc(db, "posts", id))

  }

  async function likeComment(e) {
    e.stopPropagation();

    if(!user.username) {
      dispatch(openLoginModal())
      return
    }

    if (likes.includes(user.uid)) {
      await updateDoc(doc(db, "posts", id), {
        likes: arrayRemove(user.uid),
      });
    } else {
      await updateDoc(doc(db, "posts", id), {
        likes: arrayUnion(user.uid),
      });
    }
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "posts", id), (doc) => {
      setLikes(doc.data()?.likes);
      setComments(doc.data()?.comment)
    });
    return unsubscribe;
  }, []);


  return (
    <div
      onClick={() => router.push("/" + id)}
      className=" border-b border-gray-700 cursor-pointer"
    >
      <TweetHeader
        username={data?.username}
        name={data?.name}
        timestamp={data?.timestamp?.toDate()}
        text={data?.tweet}
        photoUrl={data?.photo}
        image={data?.image}
      />
      <div className="flex p-3 ml-16 text-gray-500 space-x-10">

       
        <div className="flex space-x-1"
          onClick={(e) => {
            e.stopPropagation();

            if(!user.username) {
              dispatch(openLoginModal())
              return
            }
            
            dispatch(
              setCommentTweet({
                id: id,
                tweet: data?.tweet,
                photoUrl: data?.photo,
                name: data?.name,
                username: data?.username,
              })
            );
            dispatch(openCommentModal());
          }}
        >
           <ChatIcon className="w-5 cursor-pointer hover:text-green-500" /> 
           {comments?.length > 0 && <span className="text-blue-500">{comments?.length}</span>}
          
        </div>

          <div className="flex space-x-1"
          onClick={likeComment}>
            {likes?.includes(user.uid) ? (
              <FilledH className="w-5 cursor-pointer text-pink-500" />
            ) : (
              <HeartIcon className="w-5 cursor-pointer hover:text-pink-500" />
            )}
          {likes?.length > 0 && <span className="text-blue-500">{likes?.length}</span>}
          </div>

          {user.uid === data?.uid && (
            <div
            onClick={deleteTweet}
            >
              <TrashIcon className="w-5 cursor-pointer hover:text-orange-500" />
            </div>
          )}

        <ChartBarIcon className="w-5 cursor-not-allowed" />
        <UploadIcon className="w-5 cursor-not-allowed" />
      </div>
    </div>
  );
};

export function TweetHeader({ username, name, timestamp, text, photoUrl, image }) {
  return (
    <div className="flex space-x-3 p-3">
      <img src={photoUrl} className="w-11 h-11 rounded-full object-cover" />

      <div>
        <div className="flex items-center space-x-2 text-gray-500 mb-1">
          <h1 className="text-white font-bold">{name}</h1>
          <span>@{username}</span>
          <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
          <Moment fromNow>{timestamp}</Moment>
        </div>

        <span>{text}</span>

        {image && <img className="max-h-[500px] rounded-md border-[7px] border-gray-400 mt-4 object-cover" src={image} />}
      </div>
    </div>
  );
}
