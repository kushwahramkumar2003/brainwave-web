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
export async function deleteContent(data: { contentId: string }) {
  console.log("data", data);
  const res = await axiosClient.delete(`/content`, { data });
  return res.data.content;
}

export async function getSharedBrain(brainId: string) {
  const res = await axiosClient.get(`brain/${brainId}`);
  return res.data;
}
export async function importContentFromBrain(contentId: string) {
  const res = await axiosClient.post(`brain/content/import`, {
    contentId,
  });
  return res.data;
}
