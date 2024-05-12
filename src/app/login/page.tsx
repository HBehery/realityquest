"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const router = useRouter();

  return (
    <div className="grid place-items-center h-full">
      <div className="flex flex-1 flex-col justify-center pb-16 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
          <svg
            fill="#6366f1"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 332.441 332.44"
            xmlSpace="preserve"
            stroke="#6366f1"
            width="90"
            height="90"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke="#CCCCCC"
              stroke-width="0.664882"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g>
                {" "}
                <g>
                  {" "}
                  <g id="Layer_5_34_">
                    {" "}
                    <g>
                      {" "}
                      <g>
                        {" "}
                        <path d="M260.777,217.262l-49.705,49.705c-0.658,0.658-0.658,1.738,0,2.398l14.825,14.824c0.658,0.656,1.738,0.656,2.396,0 l7.603-7.604c0.657-0.656,1.735-0.656,2.395,0.002l40.512,40.508c20.321,20.324,21.556,19.092,36.378,4.271 c14.821-14.822,16.057-16.057-4.269-36.379l-40.51-40.512c-0.658-0.656-0.661-1.732-0.003-2.393l7.601-7.602 c0.661-0.66,0.657-1.736,0-2.396l-14.824-14.828C262.513,216.604,261.436,216.604,260.777,217.262z M298.662,290.619 l-14.239,14.242c-1.842,1.84-4.826,1.84-6.666,0c-1.841-1.844-1.841-4.826,0-6.668l14.24-14.24c1.842-1.84,4.825-1.842,6.666,0 C300.503,285.793,300.503,288.778,298.662,290.619z M278.169,270.127l-14.24,14.242c-1.84,1.84-4.824,1.84-6.665,0 c-1.84-1.84-1.841-4.826-0.001-6.666l14.242-14.24c1.84-1.842,4.824-1.842,6.664-0.002 C280.012,265.303,280.012,268.287,278.169,270.127z"></path>{" "}
                        <g>
                          {" "}
                          <path d="M205.74,189.598c-10.196,8.846-19.131,16.229-28.599,23.863c-0.467,0.377-1.216,1.322-0.272,2.021 c16.28,12.842,28.107,21.561,33.939,25.824c2.174,1.594,3.363,2.434,4.822,0.977c4.895-4.896,14.315-14.318,19.578-19.58 c1.463-1.461,1.084-2.674-0.316-4.188c-4.26-4.602-14.407-15.562-26.838-28.982 C207.724,189.174,207.05,188.471,205.74,189.598z"></path>{" "}
                          <path d="M125.765,170.701c10.861-11.724,20.655-22.288,31.522-33.999c0.535-0.711,0.053-1.865-0.364-2.314 c-8.375-9.016-15.716-16.908-20.923-22.48C110.686,84.803,45.448,2.472,45.448,2.472s-4.549-6.025-6.226,0.736 c-2.779,11.213-7.844,37.059,4.221,72.381c9.189,26.9,43.862,63.051,79.581,94.941 C123.553,171.004,124.738,171.576,125.765,170.701z"></path>{" "}
                        </g>{" "}
                      </g>{" "}
                      <g>
                        {" "}
                        <path d="M293.214,3.209c-1.677-6.762-6.227-0.736-6.227-0.736s-65.236,82.33-90.552,109.436 c-22.774,24.381-86.349,93.055-98.892,106.606c-1.401,1.516-1.778,2.729-0.317,4.188c5.262,5.262,14.685,14.684,19.579,19.58 c1.458,1.457,2.65,0.617,4.823-0.977c22.286-16.305,148.499-110.501,167.362-165.719 C301.058,40.268,295.994,14.422,293.214,3.209z"></path>{" "}
                        <path d="M69.266,217.262L54.439,232.09c-0.658,0.658-0.659,1.734,0,2.396l7.601,7.602c0.659,0.658,0.656,1.734-0.002,2.394 l-40.509,40.511c-20.324,20.324-19.09,21.557-4.268,36.379c14.822,14.821,16.054,16.055,36.378-4.271l40.509-40.508 c0.659-0.658,1.737-0.658,2.395-0.002l7.602,7.604c0.657,0.656,1.737,0.656,2.396,0l14.826-14.824 c0.659-0.66,0.658-1.74,0-2.398l-49.706-49.705C71.004,216.604,69.924,216.604,69.266,217.262z M33.775,283.953 c1.841-1.842,4.826-1.84,6.667,0l14.241,14.24c1.84,1.842,1.84,4.824,0,6.668c-1.841,1.84-4.826,1.84-6.666,0l-14.241-14.242 C31.936,288.778,31.935,285.793,33.775,283.953z M54.268,263.461c1.84-1.84,4.826-1.84,6.667,0.002l14.241,14.24 c1.841,1.84,1.84,4.826,0,6.666c-1.84,1.84-4.825,1.84-6.666,0l-14.241-14.242C52.427,268.287,52.426,265.303,54.268,263.461z"></path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>{" "}
              </g>{" "}
            </g>
          </svg>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-dark dark:text-white">
            Sign in to your Team Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6  text-dark dark:text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6  text-dark dark:text-white"
                >
                  Password
                </label>
                <div className="text-sm">
                  <div
                    onClick={() => router.push("/forgot-password")}
                    className="cursor-pointer font-semibold text-indigo-400 hover:text-indigo-300"
                  >
                    Forgot password?
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={() => null}
                disabled={!email || !password}
                className="disabled:opacity-40 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign in
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-400">
            Haven&apos;t made a team account?{" "}
            <button
              onClick={() => router.push("signup")}
              className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
