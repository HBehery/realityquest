import React from "react";
import LeaderBoardTable from "../components/Leaderboard";

const LeaderboardPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">
        Leaderboard - 72 Total Teams
      </h1>
      <div className="flex justify-center text-center mb-4">
        <p className="text-md text-center w-[90%] sm:w-[70%] lg:w-[40%] text-gray-500">
          Note that only teams that have completed the missions will be
          displayed on the leaderboard.
        </p>
      </div>
      <div className="flex flex-row gap-8 justify-center items-center flex-wrap">
        <LeaderBoardTable mission={1} title={"Phelec"} />
        <LeaderBoardTable mission={2} title={"Catastrophe"} />
      </div>
    </div>
  );
};

export default LeaderboardPage;
