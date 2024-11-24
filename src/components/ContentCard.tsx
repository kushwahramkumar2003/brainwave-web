import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Share2,
  Trash2,
  Youtube,
  FileText,
  Twitter,
  Link2,
} from "lucide-react";
import { deleteContent } from "../services/contentServices";

export interface ContentCardProps {
  id: string;
  type: "youtube" | "tweet" | "document" | "link";
  title: string | string[];
  tags: string[];
  createdAt?: string;
  link: string;
}

export default function ContentCard({
  type,
  title,
  tags = [],
  createdAt,
  link,
  id,
}: ContentCardProps) {
  let videoId = "";
  if (type === "youtube") {
    videoId = new URL(link).searchParams.get("v") || "";
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
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => {
      await deleteContent({ contentId: id });
      return;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-notes"] });
      // window.location.reload();
    },
  });

  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">{getIcon()}</span>
          <h2 className="text-sm font-medium text-gray-900 line-clamp-1">
            {Array.isArray(title) ? title[0] : title}
          </h2>
        </div>
        <div className="flex -mr-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Share"
          >
            <Share2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => mutate()}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
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

      {type !== "youtube" && Array.isArray(title) && (
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
