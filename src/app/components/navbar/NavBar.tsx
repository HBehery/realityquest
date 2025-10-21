"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Logout from "./Logout";
import escapeArenaLogo from "../../../../public/escape_logo.svg";
import { RxAvatar } from "react-icons/rx";

const NavBar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (!detailsRef.current || !isOpen) return;

      const target = event.target as Node;
      if (!detailsRef.current.contains(target)) {
        detailsRef.current.open = false;
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isOpen]);

  const handleToggle = (e: React.SyntheticEvent<HTMLDetailsElement, Event>) => {
    const details = e.currentTarget;

    setTimeout(() => {
      if (details) {
        const isCurrentlyOpen = details.open;
        setIsOpen(isCurrentlyOpen);
      }
    }, 0);
  };

  const toggleDropdown = () => {
    if (detailsRef.current) {
      const newState = !detailsRef.current.open;
      detailsRef.current.open = newState;
      setIsOpen(newState);
    }
  };

  return (
    <div className="backdrop-blur-lg bg-white dark:bg-black/10  navbar  dark:text-white dark:focus:text-white transition-colors sm:px-6 px-2">
      <div className="navbar-start">
        <Link href="/" className="font-normal">
          <div className="btn btn-ghost btn-square">
            <Image priority src={escapeArenaLogo} alt="Logo" width={50} />
          </div>
        </Link>
      </div>
      <div className="navbar-center md:flex hidden">
        <ul className="menu menu-horizontal px-1 items-center justify-center flex">
          <li>
            <details ref={detailsRef} onToggle={handleToggle}>
              <summary
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown();
                }}
              >
                Missions
              </summary>
              <ul className="p-2  bg-sky-400 dark:bg-neutral-600">
                <li>
                  <Link
                    className="dark:focus:text-white focus:text-white text-white"
                    href="/mission/1"
                  >
                    Day 1
                  </Link>
                </li>
                <li>
                  <Link
                    className="dark:focus:text-white focus:text-white text-white"
                    href="/mission/2"
                  >
                    Day 2
                  </Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <Link
              className="dark:focus:text-white focus:text-black dark:text-white"
              href="/leaderboard"
            >
              Leaderboard
            </Link>
          </li>
          <li>
            <Link
              className="dark:focus:text-white focus:text-black dark:text-white "
              href="/toolbox"
            >
              Toolbox
            </Link>
          </li>
          <li>
            <Link
              className="dark:focus:text-white focus:text-black dark:text-white "
              href="/rules"
            >
              Rules
            </Link>
          </li>
          <li>
            <Link
              className="dark:focus:text-white focus:text-black dark:text-white"
              href="/contact"
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end space-x-2 sm:space-x-4">
        <div className="dropdown dropdown-end flex flex-row  items-center">
          <ThemeToggle />
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="rounded-full w-6 h-6 overflow-hidden">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              ) : (
                <RxAvatar size={25} />
              )}
            </div>
          </div>
          <ul
            tabIndex={0}
            className=" mt-24 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-52  bg-sky-400 dark:bg-neutral-600"
          >
            {!session && (
              <li>
                <Link
                  className="dark:focus:text-white focus:text-white text-white  justify-between "
                  href="/login"
                >
                  Login
                </Link>
              </li>
            )}
            {!!session && (
              <>
                <li>
                  <Link
                    className="dark:focus:text-white focus:text-white text-white"
                    href="/profile"
                  >
                    Profile
                  </Link>
                </li>
                <li className="text-white">
                  <Logout />
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="md:hidden inline pr-3 pt-1">
          <button
            onClick={toggleMenu}
            className="text-gray-800 dark:text-white focus:outline-none hover:text-neutral-500 cursor-pointer"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } transition-all block absolute top-16 right-0 w-[50%] bg-gray-300 dark:bg-neutral-900 shadow-lg rounded-lg`}
      >
        <div className="bg-gray-100 dark:bg-neutral-800 rounded-lg m-2 transition-colors">
          <div className="py-3" />
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 px-4 mb-2">
            Missions
          </h3>
          {/* <div className="border-b border-gray-300 dark:border-gray-700 w-[70%]" /> */}
          <ul className="space-y-1 px-4">
            <li>
              <Link
                className="block px-4 py-2 w-full text-center bg-gray-200 dark:bg-neutral-900 hover:bg-red-800/30 dark:hover:bg-red-900/20 rounded-md transition-colors"
                href="/mission/1"
              >
                Day 1
              </Link>
            </li>
            <li>
              <Link
                className="block px-4 py-2 w-full text-center bg-gray-200 dark:bg-neutral-900 hover:bg-red-800/30 dark:hover:bg-red-900/20 rounded-md transition-colors"
                href="/mission/2"
              >
                Day 2
              </Link>
            </li>
          </ul>
          <div className="border-b border-gray-300 dark:border-gray-700 w-[70%] mx-auto mt-6 mb-4" />

          <ul className="space-y-1 px-4 py-2">
            <li className="w-full">
              <Link
                className="block px-4 py-2 bg-gray-200 dark:bg-neutral-900 hover:bg-red-800/30 dark:hover:bg-red-900/20 rounded-md transition-colors font-medium"
                href="/leaderboard"
              >
                Leaderboard
              </Link>
            </li>
            <li className="w-full">
              <Link
                className="block px-4 py-2 bg-gray-200 dark:bg-neutral-900 hover:bg-red-800/30 dark:hover:bg-red-900/20 rounded-md transition-colors font-medium"
                href="/toolbox"
              >
                Toolbox
              </Link>
            </li>
            <li className="w-full">
              <Link
                className="block px-4 py-2 bg-gray-200 dark:bg-neutral-900 hover:bg-red-800/30 dark:hover:bg-red-900/20 rounded-md transition-colors font-medium"
                href="/rules"
              >
                Rules
              </Link>
            </li>
            <li className="w-full">
              <Link
                className="block px-4 py-2 bg-gray-200 dark:bg-neutral-900 hover:bg-red-800/30 dark:hover:bg-red-900/20 rounded-md transition-colors font-medium"
                href="/contact"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
