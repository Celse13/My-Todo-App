import { FaUserCircle, FaSignOutAlt, FaHome, FaTasks, FaCheckCircle, FaBars } from "react-icons/fa";

const Aside = ({ isAsideVisible, toggleAside }:{ isAsideVisible:any; toggleAside:any }) => {
  return (
      <>
        <button
            className={`hamburger-button p-2 ${isAsideVisible ? 'bg-gray-700 text-white' : 'text-gray-700 hover:text-gray-900'} fixed top-2 left-2 z-50`}
            onClick={toggleAside}
        >
          <FaBars className="text-2xl"/>
        </button>
        {isAsideVisible && (
            <aside className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg z-40 flex flex-col">
              <div className="flex flex-col p-4 space-y-4 mt-12 flex-grow mb-16"> {/* Added mb-16 */}
                <button className="flex items-center p-2 hover:bg-gray-700 rounded">
                  <FaHome className="mr-2"/> Home
                </button>
                <button className="flex items-center p-2 hover:bg-gray-700 rounded">
                  <FaTasks className="mr-2"/> In progress
                </button>
                <button className="flex items-center p-2 hover:bg-gray-700 rounded">
                  <FaCheckCircle className="mr-2"/> Completed
                </button>
              </div>
              <div className="p-4 mb-10">
                <button className="flex items-center p-2 hover:bg-gray-700 rounded">
                  <FaSignOutAlt className="mr-2"/> Logout
                </button>
              </div>
            </aside>
        )}
      </>
  );
};

export default Aside;
