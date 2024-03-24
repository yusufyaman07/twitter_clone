import Nav from "../components/Nav";
import Main from "../components/Main";
import Aside from "../components/Aside";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

const HomePage = () => {
  const [user, setUser] = useState();
  // Subscribe user information
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    // Tracking ends if the user leaves the page.
    return () => unsub();
  }, []);
  return (
    <div className="feed h-screen bg-black overflow-hidden">
      <Nav user={user} />
      <Main user={user} />
      <Aside />
    </div>
  );
};

export default HomePage;
