import { doc, updateDoc } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { BiSolidSave } from "react-icons/bi";
import { BsTrashFill } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";
import { IoMdReturnLeft } from "react-icons/io";
import { db } from "../../firebase/config";

const EditMode = ({ tweet, close }) => {
  // delete picture
  const [isDelete, setIsDelete] = useState(false);
  // input's ref
  const inputRef = useRef();
  // save
  const handleSave = async () => {
    const newText = inputRef.current.value;
    // get dıcuments ref
    const tweetRef = doc(db, "tweets", tweet.id);
    // update document
    if (isDelete) {
      await updateDoc(tweetRef, {
        textContent: newText,
        imageContent: null,
        isEdited: true,
      });
    } else {
      await updateDoc(tweetRef, {
        textContent: newText,
        isEdited: true,
      });
    }

    close();
  };
  return (
    <div>
      <div>
        <input
          defaultValue={tweet.textContent}
          ref={inputRef}
          className="rounded p-1 px-2 text-black"
          type="text"
        />
        <button
          onClick={handleSave}
          className="mx-5 p-2 text-green-400 rounded-full shadow hover:shadow-green-400"
        >
          <BiSolidSave />
        </button>
        <button
          onClick={close}
          className="mx-5 p-2 text-red-400 rounded-full shadow hover:shadow-red-400"
        >
          <ImCancelCircle />
        </button>
        {tweet.imageContent && (
          <div className="relative">
            <img
              className={`${
                isDelete ? "blur" : ""
              } my-2 rounded-lg w-full object-cover max-h-[400px]`}
              src={tweet.imageContent}
              alt=""
            />
            <button
              onClick={() => {
                setIsDelete(!isDelete);
              }}
              className="absolute top-0 right-0 text-xl p-2 bg-white text-red-600 transition hover:scale-90 rounded-full"
            >
              {" "}
              {isDelete ? <IoMdReturnLeft /> : <BsTrashFill />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditMode;
