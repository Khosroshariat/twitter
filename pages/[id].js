import { Sidebar } from "@/components/Sidebar";
import Trending from "@/components/Trending";
import { db } from "@/firebase";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import Moment from "react-moment";
import { useSelector } from "react-redux";

export async function getServerSideProps(context) {
  const id = context.query.id;
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();

  const formatedData = {
    username: data.username,
    name: data.name,
    photoUrl: data.photo,
    text: data.tweet,
    comments: data.comment || null,
    timestamp: JSON.stringify(data.timestamp.toDate()),
    image: data.image || null,
  };

  return {
    props: {
      tweetData: formatedData,
    },
  };
}

export default function CommentsPage({ tweetData }) {
  const user = useSelector((state) => state.user);

  return (
    <>
      <div
        className="bg-black min-h-screen text-[#e7e9ea] max-w-[1400px] mx-auto
    flex"
      >
        <Sidebar />

        <div
          className="sm:ml-16 xl:ml-[350px] max-w-2xl flex-grow border-gray-700
    border-x
    "
        >
          <div
            className="px-3 py-2 text-lg sm:text-xl font-bold border-b border-gray-700
        sticky top-0 z-50 flex space-x-2"
          >
            <Link href={"/"}>
              <ArrowLeftIcon className="w-7" />
            </Link>
            <h1>Tweet</h1>
          </div>

          <div className=" border-b border-gray-700">
            <div className="flex space-x-3 p-3">
              <img
                src={tweetData.photoUrl}
                className="w-11 h-11 rounded-full object-cover"
              />

              <div>
                <div className="flex items-center space-x-2 text-gray-500 mb-1">
                  <h1 className="text-white font-bold">{tweetData.name}</h1>
                  <span>@{tweetData.username}</span>
                  <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                  <Moment fromNow>{JSON.parse(tweetData.timestamp)}</Moment>
                </div>

                <span className="text-xl font-semibold">{tweetData.text}</span>

                {tweetData.image && <img className="max-h-[500px] rounded-md border-[7px] border-gray-400 mt-4 object-cover" src={tweetData.image} />}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center p-2 border-b border-gray-700">
            <div className="flex justify-center items-center space-x-2 p-1">
              <img
                className=" w-11 h-11 rounded-full object-cover mt-2 "
                src={user.photoUrl}
              />
              <h1 className="text-2xl text-gray-500">Tweet your reply</h1>
            </div>

            <button
              disabled
              className="bg-[#1d9bf0] px-4 py-2 rounded-full
                    disabled:opacity-50"
            >
              Tweet
            </button>
          </div>

          {tweetData.comments?.map(comment => (
            <>
            <div className=" border-b border-gray-700">
            <div className="flex space-x-3 p-3">
              <img
                src={comment.photoUrl}
                className="w-11 h-11 rounded-full object-cover"
              />

              <div>
                <div className="flex items-center space-x-2 text-gray-500 mb-1">
                  <h1 className="text-white font-bold">{comment.name}</h1>
                  <span>@{comment.username}</span>
                  <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                </div>

                <span>{comment.comment}</span>

                
              </div>
            </div>
          </div>
         </>
          ))}

        </div>
        <Trending />
      </div>
    </>
  );
}
