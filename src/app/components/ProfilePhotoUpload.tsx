"use client";

import { useState } from "react";
import Image from "next/image";
import { RxAvatar } from "react-icons/rx";
import { useSession } from "next-auth/react";

interface ProfilePhotoUploadProps {
  currentPhoto?: string | null;
  username: string;
}

export default function ProfilePhotoUpload({
  currentPhoto,
  username,
}: ProfilePhotoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(currentPhoto);
  const [isHovered, setIsHovered] = useState(false);
  const { update } = useSession();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File too large (max 5MB)");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload-avatar", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const { url } = await response.json();
      setPhotoUrl(url);

      await update();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload photo. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    if (!confirm("Are you sure you want to remove your profile photo?")) {
      return;
    }

    setRemoving(true);

    try {
      const response = await fetch("/api/remove-avatar", {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Remove failed");
      }

      setPhotoUrl(null);

      await update();
    } catch (error) {
      console.error("Remove failed:", error);
      alert("Failed to remove photo. Please try again.");
    } finally {
      setRemoving(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-gray-300 dark:border-gray-600 shadow-lg">
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt="Profile"
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-neutral-700 flex items-center justify-center">
              <RxAvatar size={160} className="text-gray-400" />
            </div>
          )}

          {isHovered && (
            <label className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer transition-all">
              <div className="text-white text-center px-4">
                <div className="text-sm font-medium">
                  {uploading ? "Uploading..." : "Change Photo"}
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                disabled={uploading || removing}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Remove button */}
        {photoUrl && (
          <button
            onClick={handleRemove}
            disabled={removing || uploading}
            className="absolute -bottom-2 -right-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white rounded-full p-1 shadow-lg transition-colors"
            title="Remove photo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold dark:text-white">
          Hello, {username}!
        </h2>
      </div>
    </div>
  );
}
