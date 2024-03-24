import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import moment from "moment";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import Dropdown from "./Dropdown";
import { useState } from "react";
import EditMode from "./EditMode";

const Post = ({ tweet }) => {
  // isEditmode
  const [isEditmode, setIsEditMode] = useState(false);
  //
  // Does the active user have a like?
  const isLiked = tweet.likes.includes(auth.currentUser.uid);
  // add correct time
  const date = moment(tweet?.createdAt?.toDate()).fromNow();
  // add like count
  //Add user's like to tweet's like array
  const handleLike = async () => {
    const ref = doc(db, "tweets", tweet.id);
    await updateDoc(ref, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid)
        : arrayUnion(auth.currentUser.uid),
    });
  };
  // delete tweet
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete the tweet?")) {
      const tweetRef = doc(db, "tweets", tweet.id);
      await deleteDoc(tweetRef);
    }
  };

  return (
    <div className="relative flex gap-3 py-6 px-3  border-b-[1px] border-gray-700 ">
      <img
        className="w-12 h-12 rounded-full"
        src={tweet.user.photo}
        alt="user-pp"
      />
      <div className="w-full">
        {/* Top */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 whitespace-nowrap">
            <p className="font-bold">{tweet.user.name} </p>
            <p className="text-gray-400">{tweet.user.name} </p>
            <p className="text-gray-400">{date} </p>
            {tweet.isEdited && (
              <p className="text-gray-400 text-[10px]">Edited </p>
            )}
          </div>
          {tweet.user.id === auth.currentUser.uid && (
            <Dropdown
              handleDelete={handleDelete}
              setIsEditMode={setIsEditMode}
            />
          )}
        </div>
        {/* Middle */}
        <div className="my-4">
          {isEditmode && (
            <EditMode
              tweet={tweet}
              close={() => {
                setIsEditMode(false);
              }}
            />
          )}
          {tweet.textContent && !isEditmode && <p>{tweet.textContent} </p>}
          {tweet.imageContent && !isEditmode && (
            <img
              className="my-2 rounded-lg w-full object-cover min-h-[100px] max-h-[400px]"
              src={tweet.imageContent}
            />
          )}
        </div>
        {/* Bottom */}
        <div className="flex justify-between h-[50px]  ">
          <div className="grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#00b7ff69] ">
            <BiMessageRounded />
          </div>
          <div className="grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#00ff4436] ">
            <FaRetweet />
          </div>
          <div
            onClick={handleLike}
            className="flex justify-center items-center gap-2 py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#e857d969] "
          >
            {isLiked ? <FcLike /> : <AiOutlineHeart />}
            <span>{tweet.likes.length > 0 && tweet.likes.length} </span>
          </div>
          <div className="grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#7e7e7ea8] ">
            <FiShare2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
