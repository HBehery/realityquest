import React from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  return (
    <div className="navbar dark:text-white dark:focus:text-white transition-colors  rounded-3xl">
      {/* border-2 dark:border-gray-600/40 */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52  dark:bg-medium text-dark dark:text-white"
          >
            <li>
              <Link className="dark:focus:text-white" href="/login">
                Hmm
              </Link>
            </li>
            <li>
              <a>Missions</a>
              <ul className="p-2">
                <li>
                  <Link className="dark:focus:text-white" href="/mission1">
                    M1
                  </Link>
                </li>
                <li>
                  <Link className="dark:focus:text-white" href="/mission2">
                    M2
                  </Link>
                </li>
                <li>
                  <Link className="dark:focus:text-white" href="/mission3">
                    M3
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link className="dark:focus:text-white" href="/leaderboard">
                Leaderboard
              </Link>
            </li>
          </ul>
        </div>
        <Link href="/login" className="btn btn-ghost text-xl">
          MAC Reality Quest
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link className="dark:focus:text-white" href="/login">
              Hmm
            </Link>
          </li>
          <li>
            <details>
              <summary>Missions</summary>
              <ul className="p-2  dark:bg-medium">
                <li>
                  <Link className="dark:focus:text-white" href="/mission1">
                    M1
                  </Link>
                </li>
                <li>
                  <Link className="dark:focus:text-white" href="/mission2">
                    M2
                  </Link>
                </li>
                <li>
                  <Link className="dark:focus:text-white" href="/mission3">
                    M3
                  </Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <Link className="dark:focus:text-white" href="/leaderboard">
              Leaderboard
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end flex flex-row space-x-4 items-center">
          <ThemeToggle />
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://i.imgur.com/AJ3InNO.png"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className=" mt-24 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 dark:bg-medium"
          >
            <li>
              <Link
                className="dark:focus:text-white justify-between"
                href="/login"
              >
                Profile
                {/* <span className="badge">New</span> */}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;