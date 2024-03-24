import { BsCardImage } from "react-icons/bs";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import { useState } from "react";
import Spinner from "./Spinner";

const Form = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);

  // get reference from tweets collection
  const tweetsCol = collection(db, "tweets");

  // if the file is an image, upload the image to storage
  // return the url of the image to where the function was called
  const uploadImage = async file => {
    // 1) stop the function if the file is not an image
    if (!file || !file.type.startsWith("image")) return null;

    // 2) create a reference to where the file will be loaded
    const fileRef = ref(storage, v4() + file.name);

    // 3) upload the file to the location where we created the reference
    await uploadBytes(fileRef, file);

    // 4) access the url of the uploaded file
    return await getDownloadURL(fileRef);
  };

  // submit the form
  const handleSubmit = async e => {
    e.preventDefault();
    // Access data from inputs
    const textContent = e.target[0].value;
    const imageContent = e.target[1].files[0];

    // give a warning if there is no text or image content
    if (!textContent && !imageContent)
      return toast.info("Please enter content");

    setIsLoading(true);

    // upload Image
    const url = await uploadImage(imageContent);

    //add new document to tweets collection
    await addDoc(tweetsCol, {
      textContent,
      imageContent: url,
      createdAt: serverTimestamp(),
      user: {
        id: user.uid,
        name: user.displayName,
        photo: user.photoURL,
      },
      likes: [],
      isEdited: false,
    });

    // reset  form
    e.target.reset();

    // end upload
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 p-4 border-b-[1px] border-gray-700"
    >
      <img
        className="rounded-full h-[35px] md:h-[45px] mt-1"
        src={user?.photoURL}
        alt="profile-pic"
      />

      <div className="w-full">
        <input
          type="text"
          className="w-full bg-transparent my-2 outline-none md:text-lg"
          placeholder="What's going on ?"
        />

        <div className="flex justify-between items-center">
          <label
            htmlFor="image-input"
            className="hover:bg-gray-800 text-lg transition p-4 cursor-pointer rounded-full"
          >
            <BsCardImage />
          </label>

          <input className="hidden" id="image-input" type="file" />

          <button
            disabled={isLoading}
            className="bg-blue-600 flex items-center justify-center px-4 py-2 min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-800"
          >
            {isLoading ? <Spinner /> : "Tweet"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
