// src/components/Aside.tsx
import { FaUserCircle, FaSignOutAlt, FaHome, FaTasks, FaCheckCircle, FaBars  } from "react-icons/fa";

const Aside = ({ isAsideVisible, toggleAside }) => {
    return (
        <>
            <button className="hamburger-button" onClick={toggleAside}>
                <FaBars className="text-2xl" />
            </button>
            {isAsideVisible && (
                <aside className="aside flex flex-col items-center">
                    <div className="profile-icon mb-2 mt-4">
                        <FaUserCircle className="text-4xl" />
                    </div>
                    <div className="user-name text-center">
                        Celse Honore
                    </div>
                    <div className="space-y-2 mt-4">
                        <button className="aside-button">
                            <FaHome /> Home
                        </button>
                        <button className="aside-button">
                            <FaTasks /> In progress
                        </button>
                        <button className="aside-button">
                            <FaCheckCircle /> Completed
                        </button>
                        <button className="aside-button">
                            <FaSignOutAlt /> Logout
                        </button>
                    </div>
                </aside>
            )}
        </>
    );
};

export default Aside;
