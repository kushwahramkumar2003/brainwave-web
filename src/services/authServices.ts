import { axiosClient } from ".";

export async function signup({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const res = await axiosClient.post("/signup", { username, password });
  return res.data;
}
export async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const res = await axiosClient.post("/signin", { username, password });
  return res.data;
}
