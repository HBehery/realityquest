"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import localFont from "next/font/local";
import HintButton from "./HintButton";
import VideoFrame from "./MissionVideo";

const poseyFont = localFont({
  src: "../../../../public/fonts/posey-textured.ttf",
});

interface MissionData {
  title: string;
  video: string;
  answer: string[];
  hint1: string;
  hint2: string;
  hint3: string;
}

export const missionData: { [key: number]: MissionData } = {
  1: {
    title: "Mission Phelec",
    video:
      "https://drive.google.com/file/d/1wm6T6ly9WgkM07GDKF56iz-Ls8l_0kUf/preview",
    answer: ["Yusuf ibn Tashfin"],
    hint1: "What is ixnay? Ixnay = Ixnaq",
    hint2: "Learn how to change a hexadecimal to text",
    hint3: "Eich is a homophone of Letter",
  },
  2: {
    title: "Mission Catastrophe",
    video:
      "https://drive.google.com/file/d/1TpfSMfQ1Hnz05uFT0G6IbmTQ3uxY1sVy/preview",
    answer: ["Mehmed II"],
    hint1: "What is a spectogram?",
    hint2: "Return to the old portals/doors from yesterday",
    hint3: "What is a website made of? code",
  },
};

const MissionForm = ({ mission }: { mission: number }) => {
  const { data: session, update } = useSession() as any;

  const [submission, setSubmission] = useState("");

  const [submitMessage, setSubmitMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);

  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHintCounter, setShowHintCounter] = useState(0);
  const [timeCompleted, setTimeCompleted] = useState<string | null>(null);

  const [countdownString, setCountdownString] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const initialDate = new Date("2025-05-17T19:30:00Z");
  const countdownDate = new Date(
    initialDate.getTime() + mission * 24 * 60 * 60 * 1000
  ).getTime();

  useEffect(() => {
    const calculateAndSetCountdown = () => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      if (distance <= 0) {
        // When countdown ends, set to "0d 0h 0m 0s" instead of "ended"
        setCountdownString("0d 0h 0m 0s");
        return true; // Return true to clear interval
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

    // Initial calculation
    const hasEndedInitially = calculateAndSetCountdown();

    // Only set up interval if countdown hasn't ended
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
  }, [countdownDate]);

  useEffect(() => {
    const fetchMissionData = async () => {
      const response = await fetch("/api/auth/retrieveMission", {
        method: "POST",
        body: JSON.stringify({
          user_id: session.user.id,
          mission: mission,
        }),
      });

      const data = await response.json();
      setTimeCompleted(data.result.time_completed);
      setHintsUsed(data.result.hints_used);
    };

    fetchMissionData();
  }, [mission, session.user.id]);

  const handleSubmit = async () => {
    setIsCorrect(false);

    const completed = await fetch("/api/auth/retrieveMission", {
      method: "POST",
      body: JSON.stringify({
        user_id: session.user.id,
        mission: mission,
      }),
    });

    const completedData = await completed.json();
    if (completedData.result.time_completed !== null) {
      setSubmitMessage("You have already completed this mission.");
      return;
    }

    if (!missionData[mission].answer.includes(submission)) {
      setSubmitMessage("Incorrect.");
      return;
    }

    const response = await fetch("/api/auth/updateMission", {
      method: "POST",
      body: JSON.stringify({
        user_id: session.user.id,
        mission: mission,
      }),
    });

    if (response.status === 200) {
      const data = await response.json();

      const endDate = new Date("2025-05-17T19:30:00Z");
      const missionEndDate = new Date(
        endDate.getTime() + mission * 24 * 60 * 60 * 1000
      );

      const completionDate = new Date(data.result.time_completed);

      setTimeCompleted(data.result.time_completed);
      setIsCorrect(true);

      if (completionDate > missionEndDate) {
        setSubmitMessage(
          "Correct, well done! As the competition for this day is closed, your time will not be counted on the leaderboard."
        );
      } else {
        setSubmitMessage(
          "Correct! Check the leaderboards to view your ranking."
        );
      }

      return;
    }

    setSubmitMessage("An error has occurred. Please try again.");
  };

  return (
    <div className="size-full justify-center text-center py-12 flex flex-col items-center min-h-full">
      <div className="flex flex-col items-center text-center sm:w-3/4 w-full md:max-w-lg px-4">
        <VideoFrame videoLink={missionData[mission].video} mission={mission} />

        {mission == 2 && (
          <div className={`dark:text-white text-black text-lg py-4 font-bold`}>
            {`Video Corrected:`}{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
              href="https://drive.google.com/file/d/1TpfSMfQ1Hnz05uFT0G6IbmTQ3uxY1sVy/preview"
            >
              Mirror Link
            </a>
          </div>
        )}

        <div
          className={`dark:text-white text-black text-3xl py-8 font-bold font-serif ${poseyFont.className}`}
        >
          {missionData[mission].title}
        </div>

        <div className={`dark:text-white text-black text-lg py-4 font-bold`}>
          Time Limit
        </div>

        <div className="flex  justify-center gap-4 mb-8">
          {countdownString &&
            countdownString.split(" ").map((unit, index) => {
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
        <input
          name="missionAnswer"
          onChange={(e) => setSubmission(e.target.value)}
          className="block px-3 sm:w-full w-3/4 rounded-md border-0 bg-black/5 dark:bg-white/5 py-1.5 text-black dark:text-white shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
        />
        {submitMessage && isCorrect && (
          <p className="text-green-500 pt-3 sm:w-full w-3/4">{submitMessage}</p>
        )}
        {submitMessage && !isCorrect && (
          <p className="text-red-500 pt-3 sm:w-full w-3/4">{submitMessage}</p>
        )}
        <div className=" flex flex-col text-center items-center gap-y-5 sm:w-full w-3/4 py-4">
          <button
            onClick={handleSubmit}
            disabled={!submission}
            className="disabled:opacity-40 flex w-full justify-center rounded-md bg-sky-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Submit (Use Wikipedia Spelling)
          </button>
          <HintButton
            hintNum={1}
            mission={mission}
            hintsUsed={hintsUsed}
            setHintsUsed={setHintsUsed}
            showHintCounter={showHintCounter}
            setShowHintCounter={setShowHintCounter}
            timeCompleted={timeCompleted}
          />

          <HintButton
            hintNum={2}
            mission={mission}
            hintsUsed={hintsUsed}
            setHintsUsed={setHintsUsed}
            showHintCounter={showHintCounter}
            setShowHintCounter={setShowHintCounter}
            timeCompleted={timeCompleted}
          />

          <HintButton
            hintNum={3}
            mission={mission}
            hintsUsed={hintsUsed}
            setHintsUsed={setHintsUsed}
            showHintCounter={showHintCounter}
            setShowHintCounter={setShowHintCounter}
            timeCompleted={timeCompleted}
          />
        </div>
      </div>
    </div>
  );
};

export default MissionForm;
