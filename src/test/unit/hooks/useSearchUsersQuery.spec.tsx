import { beforeEach, describe, expect, it, vi } from "vitest";
import { useSearchUsersQuery } from "@/hooks/useSearchUsersQuery";
import { searchUsers } from "@/api/github-api";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactNode } from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { User } from "@/model/user.model";

vi.mock("@/api/github-api", () => ({
  searchUsers: vi.fn(),
}));

const queryClient = new QueryClient();

describe("useSearchUsersQuery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("should not call searchUsers if username is empty", () => {
    // given
    // when
    const { result } = renderHook(() => useSearchUsersQuery(""), {
      wrapper,
    });

    // then
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(searchUsers).not.toHaveBeenCalled();
  });

  it("should call searchUsers and return data when username is provided", async () => {
    // given
    const mockUsername = "testUser";
    const mockUsers: Pick<User, "id" | "login">[] = [{ id: 1, login: mockUsername }];

    searchUsers.mockResolvedValueOnce(mockUsers);

    // when
    const { result } = renderHook(() => useSearchUsersQuery(mockUsername), {
      wrapper,
    });

    // then
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(searchUsers).toHaveBeenCalledWith(mockUsername);
      expect(result.current.data).toEqual(mockUsers);
    });
  });
});
