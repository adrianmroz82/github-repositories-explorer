import { getUserRepositories } from "@/api/github-api";
import { Repository } from "@/model/repository.model";
import { useQuery } from "react-query";

export const useUserRepositoriesQuery = (userLogin: string, isEnabled: boolean) => {
  return useQuery<Repository[]>(["getUserRepositories", userLogin], () => getUserRepositories(userLogin), {
    enabled: isEnabled,
  });
};
