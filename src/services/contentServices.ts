import { axiosClient } from ".";
import { ContentCardProps } from "../components/ContentCard";

interface getContentProps {
  type?: "youtube" | "document" | "tweet" | "link" | "video" | "";
}
interface addContentProps {
  type?: "youtube" | "document" | "tweet" | "link" | "video" | "";
  link: string;
  title: string;
  tags: string[];
}

export async function getContent({
  type = "",
}: getContentProps): Promise<ContentCardProps[]> {
  const res = await axiosClient.get(`/content?type=${type}`);
  return res.data.content;
}

export async function addContent(data: addContentProps) {
  const res = await axiosClient.post(`/content`, data);
  return res.data.content;
}
