import { collection, count, getAggregateFromServer } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

const Aside = () => {
  const tweetsCol = collection(db, "tweets");
  //
  const [data, setData] = useState();
  useEffect(() => {
    getAggregateFromServer(tweetsCol, {
      tweetsCount: count(),
    }).then(res => setData(res.data()));
  }, []);
  return (
    <div className="max-lg:hidden py-3 px-2">
      <h1>
        Total Number of Posts:
        <span className="text-blue-600">{data?.tweetsCount}</span>
      </h1>
    </div>
  );
};

export default Aside;
