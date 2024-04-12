import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/knowhub.png";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { Outlet } from "react-router-dom";

const StudentLayout = ({ children }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    dispatch(logout());
    navigate("/");
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenIcon, setIsOpenIcon] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const toggleIcon = () => {
    setIsOpenIcon(!isOpenIcon);
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div>
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start rtl:justify-end">
                <button
                  onClick={toggleSidebar}
                  className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="logo-sidebar"
                  type="button"
                >
                  <span className="sr-only">Open sidebar</span>
                  <MenuIcon />
                </button>
                <a href="#" className="flex ms-2 md:me-24">
                  <img src={logo} className="h-8 me-3" alt="FlowBite Logo" />
                  <span className="self-center text-xl font-bold sm:text-2xl whitespace-nowrap dark:text-white">
                    Knowledge <span className="text-yellow-400">Hub</span>
                  </span>
                </a>
              </div>
              <div className="flex items-center">
                <div className="flex items-center ms-3 relative">
                  <button
                    onClick={toggleIcon}
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded={isOpenIcon ? "true" : "false"}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src={currentUser.profilePic}
                      alt="user photo"
                    />
                  </button>
                  {isOpenIcon && (
                    <div className="z-50 absolute mt-48 -ml-36 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600">
                      <div className="px-4 py-3" role="none">
                        <p
                          className="text-sm text-gray-900 dark:text-white"
                          role="none"
                        >
                          {currentUser.fullname}
                        </p>
                        <p
                          className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                          role="none"
                        >
                          {currentUser.email}
                        </p>
                      </div>
                      <ul className="py-1" role="none">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          <li>
                            <SettingsIcon /> Settings
                          </li>
                        </Link>
                      
                        <li>
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem"
                          >
                            <LogoutIcon /> Sign out
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>

        <aside
          id="logo-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <Link
                to="/student"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={toggleSidebar}
              >
                <li>
                  <DashboardIcon />
                  <span className="ms-3">Dashboard</span>
                </li>
              </Link>

              <Link
                to="/student/booked-sessions"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={toggleSidebar}
              >
                <li>
                  <OfflinePinIcon />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Booked Sessions
                  </span>
                </li>
              </Link>

              

              <Link
                to="/student/pending-requests"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={toggleSidebar}
              >
                <li>
                  <PendingIcon />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Pending Requests
                  </span>
                </li>
              </Link>

            <Link
                to="/student/rejected-sessions"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={toggleSidebar}
              >
                <li>
                  <CancelIcon />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Rejected Slots
                  </span>
                </li>
              </Link>
            </ul>
          </div>
        </aside>

        <div className="md:ml-64 mt-24">{children}</div>
        <Outlet />
      </div>
    </>
  );
};

export default StudentLayout;
