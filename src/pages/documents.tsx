import { useQuery } from "@tanstack/react-query";
import ContentCard, { ContentCardProps } from "../components/ContentCard";
import { getContent } from "../services/contentServices";
import Navbar from "../components/Navbar";

export const Documents = () => {
  const { data } = useQuery({
    queryKey: ["all-notes"],
    queryFn: async () => {
      const data: ContentCardProps[] = await getContent({ type: "document" });
      return data;
    },
  });

  return (
    <>
      <div className="sticky top-0 z-10 bg-[#FAFAFA] px-8 py-6">
        <Navbar text="All Documents" />
      </div>
      <div className="grid grid-cols-1 gap-4 px-8 pb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data && data.map((item) => <ContentCard key={item.id} {...item} />)}
      </div>
    </>
  );
};
