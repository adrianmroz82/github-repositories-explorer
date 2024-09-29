import { searchUsers } from "@/api/github-api";
import { User } from "@/model/user.model";
import { useQuery } from "react-query";

export function useSearchUsersQuery(username: string) {
  return useQuery<User[]>(["searchUsers"], () => searchUsers(username), { enabled: !!username });
}
