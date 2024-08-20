import { FaUserCircle } from "react-icons/fa";

import Link from "next/link";
const Navbar = () => {
  return (
    <div className="flex-row items-center sticky top-0 z-40 md:rounded-b-lg border justify-between 2xl:w-xl xl:w-lg md:w-[90%] w-full mx-auto h-16 md:flex md:px-8 px-5 md:py-3 bg-light">
      <div>

        <Link href={"/todos"}>
          <h3 className="md:text-3xl text-2xl">
            Todo-
            <span className="text-[#0352fc] font-[700] drop-shadow">
            app
          </span>{" "}
          </h3>
        </Link>
      </div>

      <FaUserCircle className="text-4xl mb-2" />

    </div>
  );
};

export default Navbar;
