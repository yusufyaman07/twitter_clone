import { BiDoorOpen } from "react-icons/bi";
import { navSections } from "../constants";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
//
const Nav = ({ user }) => {
  return (
    <div className="flex flex-col justify-between items-end px-2 py-4">
      {/* Links */}
      <div>
        <img className="w-14 h-14 mb-4" src="/x-logo.webp" alt="x-logo" />
        <div>
          {navSections.map(item => (
            <div
              key={item.title}
              className="flex justify-center md:justify-normal items-center gap-3 text-2xl md:text-xl p-3 cursor-pointer transition rounded-lg hover:bg-[#505050b7]"
            >
              {item.icon}
              <span className="max-md:hidden whitespace-nowrap">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* User İnfo */}
      <div>
        {!user ? (
          <div className="w-12 h-12 bg-gray-300 rounded-full animate-bounce    "></div>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="flex gap-2 items-center">
              <img
                className="w-12 h-12 rounded-full"
                src={user?.photoURL}
                alt="user-logo"
              />
              <p className="max-md:hidden">{user.displayName} </p>
            </div>
            <button
              onClick={() => signOut(auth)}
              className="flex justify-center gap-2 p-1 items-center bg-gray-700 rounded text-2xl md:text-[15px] transition hover:bg-gray-800 "
            >
              <BiDoorOpen />
              <span className="max-md:hidden">Log out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
