import { useEffect, useState } from "react";
import Form from "./Form";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";
import Spinner from "./Spinner";
import Post from "./Post";
const Main = ({ user }) => {
  const [tweets, setTweets] = useState(null);
  // Tweets Collection
  const tweetsCol = collection(db, "tweets");
  useEffect(() => {
    const q = query(tweetsCol, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, snapshot => {
      const tempArr = [];
      snapshot.forEach(doc => {
        tempArr.push({ id: doc.id, ...doc.data() });
      });
      // add data to state
      setTweets(tempArr);
    });
    return () => unsub();
  }, []);
  return (
    <main className="border border-gray-700 overflow-y-auto ">
      <header className="font-bold p-4 border-b-[1px] border-gray-700 ">
        Main Page
      </header>
      <Form user={user} />
      {!tweets ? (
        <Spinner style={"w-6 h-6 mx-auto my-10"} />
      ) : (
        tweets.map(tweet => <Post key={tweet.id} tweet={tweet} />)
      )}
    </main>
  );
};

export default Main;
