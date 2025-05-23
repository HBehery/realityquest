"use client";

import React, { useEffect, useState } from "react";

interface User {
  username: string;
  timecompleted: string | null;
  hintsused: number;
  finaltime: string | null;
}

interface LeaderBoardProps {
  mission: number;
  title: string;
}

const LeaderBoardTable: React.FC<LeaderBoardProps> = ({ mission, title }) => {
  const [leaderboard, setLeaderboard] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const isLeaderboardAvailable = () => {
    const now = new Date();
    const releaseDate = new Date(`2025-05-${17 + mission}T18:45:00Z`);
    return now >= releaseDate;
  };

  const leaderboardAvailable = isLeaderboardAvailable();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      if (!leaderboardAvailable) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/leaderboard", {
          method: "POST",
          body: JSON.stringify({ mission: mission }),
        });
        const data = await response.json();

        setLeaderboard(data.result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [mission, leaderboardAvailable]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) {
      return "Not completed";
    }
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/New_York",
    };
    return date.toLocaleDateString("en-US", options);
  };

  if (loading) {
    return (
      <div className="flex flex-col text-center mt-11 dark:text-white items-center">
        Loading...
      </div>
    );
  }

  if (!leaderboardAvailable) {
    return (
      <div className="flex flex-col text-center justify-center dark:text-white items-center pt-12 px-4 w-full">
        <h1 className="text-xl mb-6 font-bold">{`Day ${mission}: Mission ${title}`}</h1>
        <div className="p-8 bg-white dark:bg-neutral-700 rounded-lg shadow-md">
          <p className="text-lg font-medium">
            The leaderboard for this mission will be released after 2:45PM EST
            on May {17 + mission}, 2025.
          </p>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Check back later to see the rankings!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col text-center justify-center dark:text-white items-center pt-12 px-4 w-full">
      <h1 className="text-xl mb-6 font-bold">{`Day ${mission}: Mission ${title}`}</h1>
      <div className="w-full sm:w-[90%] md:w-[80%] xl:w-[60%] overflow-x-auto">
        <div className="min-w-fit bg-white dark:bg-gray-100 p-1 rounded-lg">
          <table className="min-w-full text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-neutral-700 transition-all rounded-lg border-spacing-0 overflow-hidden">
            <thead>
              <tr>
                <th className="py-2 px-3">#</th>
                <th className="py-2 px-3">Player</th>
                <th className="py-2 px-3">Completion</th>
                <th className="py-2 px-3">Hints Used</th>
                <th className="py-2 px-10">Final Time</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user: User, index: number) => (
                <tr
                  key={user.username}
                  className={`border-t ${
                    index === 0
                      ? "bg-[#e6daa1] dark:bg-[#a89d72] font-bold"
                      : index === 1
                      ? "bg-stone-400/70 font-bold"
                      : index === 2
                      ? "bg-amber-900/30 font-bold"
                      : ""
                  }`}
                >
                  <td className="py-2">{index + 1}</td>
                  <td className="py-2">{user.username}</td>
                  <td className="py-2">{formatDate(user.timecompleted)}</td>
                  <td className="py-2">
                    {user.hintsused >= 8 ? 8 : user.hintsused}
                  </td>
                  <td className="py-2">{formatDate(user.finaltime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoardTable;
