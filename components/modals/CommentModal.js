import { db } from "@/firebase";
import { closeCommentModal } from "@/redux/modalSlice";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import Modal from "@mui/material/Modal";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CommentModal() {
  const isOpen = useSelector((state) => state.modals.commentModalOpen);
  const tweetDetails = useSelector(state => state.modals.commentTweetDetails)
  const userImg = useSelector(state => state.user.photoUrl)
  const user = useSelector(state => state.user)

  const dispatch = useDispatch();

  const [comment, setComment]= useState("");

  const router = useRouter()

  async function sendComment() {
    const docRef = doc(db, "posts", tweetDetails.id)
    const commentDetails = {
      username: user.username,
      name: user.name,
      photoUrl: user.photoUrl,
      comment: comment,
    }
    await updateDoc(docRef, {
     comment: arrayUnion(commentDetails)
    })

    dispatch(closeCommentModal())
    router.push("/" + tweetDetails.id)
  }

  return (
    <>
      <Modal
        className="flex justify-center items-center"
        open={isOpen}
        onClose={() => dispatch(closeCommentModal())}
      >
        <div
          className="w-full h-full relative
        rounded-lg bg-black text-white border border-gray-500
        sm:w-[600px] sm:h-[400px] sm:p-10 pt-20 px-4 "
        >
            <div className="w-[2px] h-[75px] absolute bg-gray-500 ml-5 mt-12"></div>

            <div className="absolute top-3 left-3 cursor-pointer"
            onClick={() => dispatch(closeCommentModal())}>
                <XIcon className="h-[22px] " />
            </div>
          <div>
            <div className="flex space-x-3">
              <img
                className=" w-11 h-11 rounded-full object-cover "
                src={tweetDetails.photoUrl || "/assets/kylie.png"}
                alt=""
              />

              <div>
                <div className="flex space-x-1.5">
                  <h1 className="font-bold">{tweetDetails.name}</h1>
                  <h1 className="text-gray-500">@{tweetDetails.username}</h1>
                </div>
                <p className="mt-1">{tweetDetails.tweet}</p>
                <h1 className="text-gray-500 font-[15px] mt-2">
                  Replying to <span className="text-[#1b9bf0]">@{tweetDetails.username}</span>
                </h1>
              </div>
            </div>
          </div>

          <div className="mt-11">
            <div className="flex space-x-3">
              <img
                className=" w-11 h-11 rounded-full object-cover "
                src={userImg}
                alt=""
              />

              <div className="w-full">
                <textarea
                  placeholder="Tweet your reply..."
                  className="w-full bg-transparent resize-none p-4 text-lg 
                  outline-none"
                  onChange={e => setComment(e.target.value)}
                  
                />

                <div className="flex justify-between border-t border-gray-700 pt-4">
                  <div className="flex">
                    <div className="iconsAnimation">
                      <PhotographIcon className="h-[22px] text-[#1d9bf0]" />
                    </div>
                    <div className="iconsAnimation">
                      <ChartBarIcon className="h-[22px] text-[#1d9bf0]" />
                    </div>
                    <div className="iconsAnimation">
                      <EmojiHappyIcon className="h-[22px] text-[#1d9bf0]" />
                    </div>
                    <div className="iconsAnimation">
                      <CalendarIcon className="h-[22px] text-[#1d9bf0]" />
                    </div>
                    <div className="iconsAnimation">
                      <LocationMarkerIcon className="h-[22px] text-[#1d9bf0]" />
                    </div>
                  </div>
                  <button
                    className="bg-[#1d9bf0] px-4 py-1.5 rounded-full
                    disabled:opacity-50"
                    disabled={!comment}
                    onClick={sendComment}

                  >
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
