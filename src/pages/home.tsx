import { useState } from "react";
import ContentCard, { ContentCardProps } from "../components/ContentCard";
import { useQuery } from "@tanstack/react-query";
import { getContent } from "../services/contentServices";
import AddContentModal from "../components/AddContentModal";
import ShareBrain from "../components/ShareBrain";
import Navbar from "../components/Navbar";

export default function Home() {
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
      <div className="sticky top-0 z-10 bg-[#FAFAFA] px-8 py-6">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <Navbar text="All Notes" />
        </div>
      </div>

      <ShareBrain
        open={isShareModalOpen}
        onOpenChange={setIsShareModalOpen}
        itemCount={data?.length || 0}
      />

      <AddContentModal open={isModalOpen} onOpenChange={setIsModalOpen} />

      <div className="grid grid-cols-1 gap-4 px-8 pb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data && data.map((item) => <ContentCard key={item.id} {...item} />)}
      </div>
    </>
  );
}
