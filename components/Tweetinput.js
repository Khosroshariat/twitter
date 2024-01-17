import { db, storage } from "@/firebase";
import { openLoginModal } from "@/redux/modalSlice";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const Tweetinput = () => {
  const user = useSelector((state) => state.user);

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const pickFile = useRef(null);
  const dispatch = useDispatch()

  async function sendTweet() {
    if (!user.username) {
      dispatch(openLoginModal());
      return;
    }

    setLoading(true);

    console.log("User:", user);

    const docRef = await addDoc(collection(db, "posts"), {
      username: user.username,
      name: user.name,
      photo: user.photoUrl,
      uid: user.uid,
      timestamp: serverTimestamp(),
      likes: [],
      tweet: text,
    });

    console.log("Document Reference:", docRef);

    if (image) {
      const imageRef = ref(storage, `tweetImages/${docRef.id}`);

      console.log("Storage Reference:", imageRef);

      const uploadImages = await uploadString(imageRef, image, "data_url");

      console.log("Upload Result:", uploadImages);

      const downloadUrl = await getDownloadURL(imageRef);

      console.log("Download URL:", downloadUrl);

      await updateDoc(doc(db, "posts", docRef.id), {
        image: downloadUrl,
      });
    }

    setText("");
    setImage(null);
    setLoading(false);
  }

  function addImageToTweet(e) {
    const imgReader = new FileReader();
    if (e.target.files[0]) {
      imgReader.readAsDataURL(e.target.files[0]);
    }

    imgReader.addEventListener("load", (e) => {
      setImage(e.target.result);
    });
  }

  return (
    <div className="flex space-x-3 p-3 border-b border-gray-700">
      {/* here we are getting source of image from firebase */}
      <img
        src={user.photoUrl || "/assets/twitter-logo.png"}
        className="w-12 h-12 rounded-full object-cover"
      />


      {loading ? ( <h1 className="text-2xl text-blue-400">Uploading post ...</h1>
      ) : 
        (<div className="w-full">
          <textarea
            className="bg-transparent resize-none outline-none w-full
            min-h-[50px] text-lg"
            placeholder="What's on your mind?"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />

          {image && (
            <div className="mb-4 relative">
              <div
                onClick={() => setImage(null)}
                className="absolute top-1 left-1 bg-slate-700 rounded-full
            w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-slate-800"
              >
                <XIcon className="w-5 hover:text-blue-600" />
              </div>
              <img
                className="max-h-[200px] object-cover rounded-2xl"
                src={image}
                alt=""
              />
            </div>
          )}

          <div className="flex justify-between border-t border-gray-700 p-4">
            {/* ICONS DIV */}
            <div className="flex">
              <div
                onClick={() => pickFile.current.click()}
                className="iconsAnimation"
              >
                <PhotographIcon className="h-[22px] text-[#1d9bf0]" />
              </div>

              <input
                ref={pickFile}
                onChange={addImageToTweet}
                className="hidden"
                type="file"
              />

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
              onClick={sendTweet}
              disabled={!text && !image}
            >
              Tweet
            </button>
          </div>
        </div>)
      }
    </div>
  );
};

export default Tweetinput;
