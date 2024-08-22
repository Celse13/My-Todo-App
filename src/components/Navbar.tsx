import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { googleSignOut } from "@/actions/authActions";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSignOut = () => {
    googleSignOut();
    console.log("User signed out");
  };

  return (
      <div className="flex items-center sticky top-0 z-40 md:rounded-b-lg border justify-between 2xl:w-xl xl:w-lg md:w-[90%] w-full mx-auto h-16 md:px-8 px-5 md:py-3 bg-light">
        <div>
          <Link href={"/todos"}>
            <h3 className="md:text-3xl text-2xl">
              Todo-
              <span className="text-[#0352fc] font-[700] drop-shadow">
              app
            </span>
            </h3>
          </Link>
        </div>

        <div className="ml-auto relative">
          <FaUserCircle
              className="text-4xl mb-2 cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
          />
          {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                <button
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </div>
          )}
        </div>
      </div>
  );
};

export default Navbar;
