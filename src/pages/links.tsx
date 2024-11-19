import { useQuery } from "@tanstack/react-query";
import ContentCard, { ContentCardProps } from "../components/ContentCard";
import { getContent } from "../services/contentServices";
import Button from "../components/ui/button";
import { Plus, Share2 } from "lucide-react";

export const Links = () => {
  const { data } = useQuery({
    queryKey: ["all-notes"],
    queryFn: async () => {
      const data: ContentCardProps[] = await getContent({ type: "link" });
      return data;
    },
  });

  return (
    <>
      <div className="sticky top-0 z-10 bg-[#FAFAFA] px-8 py-6">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-2xl font-semibold text-gray-900">All Links</h1>
          <div className="flex items-center gap-3">
            <Button
              text="Share Brain"
              variant="secondary"
              startIcon={<Share2 size={17} />}
            />
            <Button text="Add Content" startIcon={<Plus size={18} />} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 px-8 pb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data && data.map((item) => <ContentCard key={item.id} {...item} />)}
      </div>
    </>
  );
};
