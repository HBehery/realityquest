"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import MissionForm from "@/app/components/missions/MissionForm";
import { motion } from "framer-motion";

const MissionPage = ({ params: { number: missionNum } }: any) => {
  const { data: session, status } = useSession() as any;
  const [isLoading, setIsLoading] = useState(true);
  const [countdownString, setCountdownString] = useState<string | null>(null);

  const initialDate = new Date("2025-05-17T16:00:00Z");
  const countdownDate = new Date(
    initialDate.getTime() + missionNum * 24 * 60 * 60 * 1000
  ).getTime();

  useEffect(() => {
    if (status !== "loading") {
      setIsLoading(false);
    }
  }, [status]);

  useEffect(() => {
    const calculateAndSetCountdown = () => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      if (distance < 0) {
        setCountdownString("ended");
        return true;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdownString(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      return false;
    };

    const hasEndedInitially = calculateAndSetCountdown();

    let intervalId: NodeJS.Timeout | undefined;
    if (!hasEndedInitially) {
      intervalId = setInterval(() => {
        if (calculateAndSetCountdown()) {
          if (intervalId) clearInterval(intervalId);
        }
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [countdownDate, missionNum]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full overflow-x-hidden overflow-y-auto grid place-items-center dark:text-white text-dark pb-32">
        <p>Loading...</p>{" "}
      </div>
    );
  }

  const curr_time = new Date().getTime();
  const start_time = countdownDate;

  // if missionNum is greater than or equal to 3, dont return anything
  if (missionNum >= 3) {
    return (
      <div className="min-h-screen w-full overflow-x-hidden overflow-y-auto grid place-items-center dark:text-white text-dark pb-32">
        <p>Mission #{missionNum} does not exist.</p>
      </div>
    );
  }

  if (curr_time < start_time) {
    if (countdownString === null) {
      return (
        <div className="min-h-screen w-full overflow-x-hidden overflow-y-auto grid place-items-center dark:text-white text-dark pb-32">
          <p>Loading countdown...</p>
        </div>
      );
    }
    if (countdownString === "ended") {
      // Countdown has finished
      return (
        <div className="min-h-screen w-full overflow-x-hidden overflow-y-auto grid place-items-center dark:text-white text-dark pb-32">
          <div className="text-center">
            <p className="text-2xl mb-4 font-bold max-[350px]:pb-16 max-[350px]:pt-16">
              Coming Soon...
            </p>
            <div className="text-lg text-gray-500">
              The countdown has ended. Refresh the page to begin.
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="min-h-screen w-full overflow-x-hidden overflow-y-auto grid place-items-center dark:text-white text-dark pb-32 no-x-scroll">
        <motion.div
          className="absolute -inset-[0px] opacity-30 blur-[100px] z-1"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, #60a5fa 0%, transparent 50%), radial-gradient(circle at 80% 80%, #952727 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, #60a5fa 0%, transparent 50%), radial-gradient(circle at 20% 80%, #952727 0%, transparent 50%)",
              "radial-gradient(circle at 50% 50%, #60a5fa 0%, transparent 50%), radial-gradient(circle at 70% 30%, #952727 0%, transparent 50%)",
              "radial-gradient(circle at 20% 20%, #60a5fa 0%, transparent 50%), radial-gradient(circle at 80% 80%, #952727 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute -inset-[0px] opacity-30 dark:opacity-100 blur-[300px] z-1"
          animate={{
            background: [
              "radial-gradient(circle at 30% 40%, #13154f 0%, transparent 40%), radial-gradient(circle at 60% 60%, #13154f 0%, transparent 40%)",
              "radial-gradient(circle at 60% 30%, #13154f 0%, transparent 40%), radial-gradient(circle at 30% 70%, #13154f 0%, transparent 40%)",
              "radial-gradient(circle at 40% 60%, #13154f 0%, transparent 40%), radial-gradient(circle at 70% 40%, #13154f 0%, transparent 40%)",
              "radial-gradient(circle at 30% 40%, #13154f 0%, transparent 40%), radial-gradient(circle at 60% 60%, #13154f 0%, transparent 40%)",
            ],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "linear",
          }}
        />

        <div className="text-center z-10">
          <p className="text-2xl mb-4 font-bold max-[350px]:pb-16 max-[350px]:pt-16">
            Coming Soon...
          </p>
          <div className="flex max-[350px]:flex-col justify-center gap-4 mb-4">
            {countdownString.split(" ").map((unit, index) => {
              const [value, label] = unit.split(/([a-z]+)/);
              return (
                <div
                  key={index}
                  className="flex flex-col items-center bg-gray-200/60 dark:bg-neutral-900 rounded-lg p-3 min-w-[70px] shadow-md"
                >
                  <span className="font-bold text-2xl dark:text-[#952727] text-[#b53131] ">
                    {value}
                  </span>
                  <span className="text-xs text-neutral-900 dark:text-gray-300">
                    {label === "d"
                      ? "DAYS"
                      : label === "h"
                      ? "HOURS"
                      : label === "m"
                      ? "MINUTES"
                      : "SECONDS"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    // Countdown period is over
    if (!session) {
      // User is not logged in
      return (
        <div className="min-h-screen w-full overflow-x-hidden overflow-y-auto grid place-items-center dark:text-white text-dark pb-32 no-x-scroll">
          <motion.div
            className="absolute -inset-[0px] opacity-30 blur-[100px] z-1"
            animate={{
              background: [
                "radial-gradient(circle at 20% 20%, #60a5fa 0%, transparent 50%), radial-gradient(circle at 80% 80%, #952727 0%, transparent 50%)",
                "radial-gradient(circle at 80% 20%, #60a5fa 0%, transparent 50%), radial-gradient(circle at 20% 80%, #952727 0%, transparent 50%)",
                "radial-gradient(circle at 50% 50%, #60a5fa 0%, transparent 50%), radial-gradient(circle at 70% 30%, #952727 0%, transparent 50%)",
                "radial-gradient(circle at 20% 20%, #60a5fa 0%, transparent 50%), radial-gradient(circle at 80% 80%, #952727 0%, transparent 50%)",
              ],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "linear",
            }}
          />

          <motion.div
            className="absolute -inset-[0px] opacity-30 dark:opacity-100 blur-[300px] z-1"
            animate={{
              background: [
                "radial-gradient(circle at 30% 40%, #13154f 0%, transparent 40%), radial-gradient(circle at 60% 60%, #13154f 0%, transparent 40%)",
                "radial-gradient(circle at 60% 30%, #13154f 0%, transparent 40%), radial-gradient(circle at 30% 70%, #13154f 0%, transparent 40%)",
                "radial-gradient(circle at 40% 60%, #13154f 0%, transparent 40%), radial-gradient(circle at 70% 40%, #13154f 0%, transparent 40%)",
                "radial-gradient(circle at 30% 40%, #13154f 0%, transparent 40%), radial-gradient(circle at 60% 60%, #13154f 0%, transparent 40%)",
              ],
            }}
            transition={{
              duration: 30,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
          <p className="z-10 font-bold">Please log in to access this page.</p>
        </div>
      );
    }
    return (
      <div className="min-h-screen w-full overflow-x-hidden overflow-y-auto flex items-center justify-center p-4">
        <MissionForm mission={Number(missionNum)} />
      </div>
    );
  }
};
export default MissionPage;
