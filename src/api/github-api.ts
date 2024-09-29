import axios from "axios";

import { Repository } from "@/model/repository.model";
import { User } from "@/model/user.model";

const BASE_URL = "https://api.github.com";
const ITEMS_PER_PAGE = 5;

interface SearchUsersResponse {
  items: User[];
}

export async function searchUsers(query: string): Promise<User[]> {
  if (!query) {
    throw new Error("Query must not be empty");
  }

  const response = await axios.get<SearchUsersResponse>(`${BASE_URL}/search/users`, {
    params: { q: query, per_page: ITEMS_PER_PAGE },
  });

  return response.data.items;
}

export async function getUserRepositories(username: string): Promise<Repository[]> {
  const response = await axios.get<Repository[]>(`${BASE_URL}/users/${username}/repos`);

  return response.data;
}
