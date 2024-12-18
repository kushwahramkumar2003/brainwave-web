import { useMutation } from "@tanstack/react-query";
import { Youtube, FileText, Twitter, Link2, Download } from "lucide-react";
import { useState } from "react";
import { Tweet } from "react-tweet";
import { importContentFromBrain } from "../services/contentServices";

export interface SharedContentCardProps {
  id: string;
  type: "youtube" | "tweet" | "document" | "link";
  title: string | string[];
  tags: string[];
  createdAt?: string;
  link: string;
}

export function SharedContentCard({
  type,
  title,
  tags = [],
  createdAt,
  link,
  id,
}: SharedContentCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  let videoId = "";
  let tweetId = "";
  if (type === "youtube") {
    videoId = new URL(link).searchParams.get("v") || "";
  }
  if (type === "tweet") {
    tweetId = new URL(link).pathname.split("/").pop() || "";
  }

  const getIcon = () => {
    switch (type?.toLowerCase()) {
      case "youtube":
        return <Youtube className="h-4 w-4" />;
      case "tweet":
        return <Twitter className="h-4 w-4" />;
      case "link":
        return <Link2 className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `Added on ${date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })}`;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return await importContentFromBrain(id);
    },
    onSuccess: () => {
      console.log("Content imported successfully");
    },
    onError: (error) => {
      console.error("Error importing content:", error);
    },
  });

  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">{getIcon()}</span>
          <h2 className="text-sm font-medium text-gray-900 line-clamp-1">
            {Array.isArray(title) ? title[0] : title}
          </h2>
        </div>
        <div className="relative">
          <button
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={() => mutate()}
            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
            aria-label="Import to your brain"
          >
            {isPending ? (
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V2.5"
                ></path>
              </svg>
            ) : (
              <Download className="h-5 w-5" />
            )}
          </button>
          {showTooltip && (
            <div className="absolute right-0 top-full mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg z-10">
              Import to your brain
            </div>
          )}
        </div>
      </div>

      {type === "youtube" && (
        <div
          className="mb-3 aspect-video overflow-hidden rounded-lg bg-gray-100 hover:cursor-pointer"
          onClick={() => window.open(link, "_blank")}
        >
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt="Video thumbnail"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      {type === "tweet" && <Tweet id={tweetId} />}

      {type !== "youtube" && type !== "tweet" && Array.isArray(title) && (
        <div
          className="mb-3 space-y-1 hover:cursor-pointer"
          onClick={() => window.open(link, "_blank")}
        >
          {title.slice(0, 3).map((item, index) => (
            <p key={index} className="text-sm text-gray-600 line-clamp-1">
              {item}
            </p>
          ))}
        </div>
      )}

      <div className="mb-2 flex flex-wrap gap-1.5">
        {tags.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="inline-flex rounded-full bg-[#F4F4FF] px-2.5 py-1 text-xs font-medium text-[#6366F1] transition-colors hover:bg-[#E0E0FF]"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="text-xs text-gray-500">{formatDate(createdAt)}</div>
    </div>
  );
}
