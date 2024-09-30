import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";

import { App } from "@/App";

const userListId = "user-list";
vi.mock("@/components/UserList", () => ({
  UserList: vi.fn(() => <div data-testid={userListId} />),
}));

const userSearchFormId = "user-search-form";
vi.mock("@/components/UserSearchForm", () => ({
  UserSearchForm: vi.fn(() => <div data-testid={userSearchFormId} />),
}));

const mockUseUserSearchContext = vi.fn();
vi.mock("@/hooks/useUserSearchContext", () => ({
  useUserSearchContext: () => mockUseUserSearchContext(),
}));

const boxId = "app-box";
const containerId = "app-container";
const typographyId = "app-user-search-typography";
const circularProgressId = "app-circular-progress";

vi.mock("@mui/material", () => ({
  Box: vi.fn(({ children }) => <div data-testid={boxId}>{children}</div>),
  Container: vi.fn(({ children }) => <div data-testid={containerId}>{children}</div>),
  Typography: vi.fn(({ children }) => <div data-testid={typographyId}>{children}</div>),
  CircularProgress: vi.fn(() => <div data-testid={circularProgressId} />),
}));

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render loading state", () => {
    // given
    mockUseUserSearchContext.mockReturnValue({
      isLoading: true,
    });

    // when
    const { getByTestId, queryByTestId } = render(<App />);

    // then
    expect(getByTestId(circularProgressId)).toBeInTheDocument();
    expect(getByTestId(boxId)).toBeInTheDocument();
    expect(getByTestId(typographyId)).toBeInTheDocument();
    expect(getByTestId(userSearchFormId)).toBeInTheDocument();
    expect(getByTestId(containerId)).toBeInTheDocument();

    expect(queryByTestId(userListId)).not.toBeInTheDocument();
  });

  it("should render user list when data is loaded", () => {
    // given
    mockUseUserSearchContext.mockReturnValue({
      isLoading: false,
    });

    // when
    const { getByTestId, queryByTestId } = render(<App />);

    // then
    expect(getByTestId(userListId)).toBeInTheDocument();
    expect(getByTestId(boxId)).toBeInTheDocument();
    expect(getByTestId(typographyId)).toBeInTheDocument();
    expect(getByTestId(userSearchFormId)).toBeInTheDocument();
    expect(getByTestId(containerId)).toBeInTheDocument();

    expect(queryByTestId(circularProgressId)).not.toBeInTheDocument();
  });
});
