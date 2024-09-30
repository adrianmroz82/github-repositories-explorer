import { beforeEach, describe, expect, it, vi } from "vitest";
import { useUserRepositoriesQuery } from "@/hooks/useUserRepositoriesQuery";
import { getUserRepositories } from "@/api/github-api";
import { QueryClient, QueryClientProvider } from "react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { ReactNode } from "react";
import { Repository } from "@/model/repository.model";

vi.mock("@/api/github-api", () => ({
  getUserRepositories: vi.fn(),
}));

const queryClient = new QueryClient();

describe("useUserRepositoriesQuery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("should not call getUserRepositories if isEnabled is false", () => {
    // given
    // when
    const { result } = renderHook(() => useUserRepositoriesQuery("testUser", false), {
      wrapper,
    });

    // then
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(getUserRepositories).not.toHaveBeenCalled();
  });

  it("should call getUserRepositories and return data when isEnabled is true", async () => {
    // given
    const mockUserLogin = "testUser";
    const mockRepositories: Pick<Repository, "id" | "name">[] = [{ id: 1, name: "testRepo" }];

    getUserRepositories.mockResolvedValueOnce(mockRepositories);

    // when
    const { result } = renderHook(() => useUserRepositoriesQuery(mockUserLogin, true), {
      wrapper,
    });

    // then
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(getUserRepositories).toHaveBeenCalledWith(mockUserLogin);
      expect(result.current.data).toEqual(mockRepositories);
    });
  });
});
