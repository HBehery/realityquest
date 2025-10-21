"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import ProfilePhotoUpload from "../components/ProfilePhotoUpload";

const ProfilePage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center dark:text-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center dark:text-white p-4">
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl p-8 max-w-md w-full">
        <ProfilePhotoUpload
          currentPhoto={session.user.image}
          username={session.user.username}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
