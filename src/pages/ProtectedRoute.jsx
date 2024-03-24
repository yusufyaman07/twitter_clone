import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../firebase/config";

const ProtectedRoute = () => {
  // Does your user have authorization?
  const [isLoginUser, setIsLoginUser] = useState(null);

  useEffect(() => {
    //monitor the user's session in real time
    // update state on any change
    const unsub = onAuthStateChanged(auth, user => {
      if (user) {
        setIsLoginUser(true);
      } else {
        setIsLoginUser(false);
      }
    });

    // remove tracker if user leaves your page
    return () => unsub();
  }, []);

  // redirect to login if not authorized:
  if (isLoginUser === false) return <Navigate to={"/"} />;

  /* outlet: determines where the subroute will be placed on the screen */
  // show page if authorized:
  return <Outlet />;
};

export default ProtectedRoute;
