import { Plus, Share2 } from "lucide-react";
import Button from "./ui/button";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ContentCardProps } from "./ContentCard";
import { getContent } from "../services/contentServices";
import ShareBrain from "./ShareBrain";
import AddContentModal from "./AddContentModal";
import { AIChatSidebar } from "./AIChatSidebar";

export default function Navbar({ text }: { text: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ["all-notes"],
    queryFn: async () => {
      const data: ContentCardProps[] = await getContent({});
      return data;
    },
  });

  return (
    <>
      <div className="flex flex-row justify-between items-center w-full">
        <h1 className="text-2xl font-semibold text-gray-900">{text}</h1>
        <div className="flex items-center gap-3">
          <AIChatSidebar />
          <Button
            text="Share Brain"
            variant="secondary"
            startIcon={<Share2 size={17} />}
            onClick={() => setIsShareModalOpen(true)}
          />
          <Button
            onClick={() => setIsModalOpen(true)}
            text="Add Content"
            startIcon={<Plus size={18} />}
          />
        </div>
      </div>
      <ShareBrain
        open={isShareModalOpen}
        onOpenChange={setIsShareModalOpen}
        itemCount={data?.length || 0}
      />
      <AddContentModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
