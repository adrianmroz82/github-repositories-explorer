import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent } from "@testing-library/react";

import { UserAccordion } from "@/components/UserAccordion";
import { User } from "@/model/user.model";
import { Repository } from "@/model/repository.model";

const mockUseUserRepositoriesQuery = vi.fn();
vi.mock("@/hooks/useUserRepositoriesQuery", () => ({
  useUserRepositoriesQuery: () => mockUseUserRepositoriesQuery(),
}));

const accordionId = "accordion";
const accordionSummaryId = "accordion-summary";
const accordionDetailsId = "accordion-details";
const circularProgressId = "circular-progress";
const listId = "repository-list";
const listItemId = "repository-list-item";
const noReposId = "no-repositories";

vi.mock("@mui/material", () => ({
  Accordion: vi.fn(({ children, expanded }) => (
    <div data-testid={accordionId} data-expanded={expanded}>
      {children}
    </div>
  )),
  AccordionSummary: vi.fn(({ children }) => <div data-testid={accordionSummaryId}>{children}</div>),
  AccordionDetails: vi.fn(({ children }) => <div data-testid={accordionDetailsId}>{children}</div>),
  CircularProgress: vi.fn(() => <div data-testid={circularProgressId} />),
  Typography: vi.fn(({ children }) => <div>{children}</div>),
  List: vi.fn(({ children }) => <div data-testid={listId}>{children}</div>),
  ListItem: vi.fn(({ children }) => <div data-testid={listItemId}>{children}</div>),
}));

const mockUserLogin = "test-user";
const mockUser: Pick<User, "login"> = {
  login: mockUserLogin,
};

const repository_1 = "repo-1";
const repository_2 = "repo-2";
const mockRepositories: Pick<Repository, "id" | "name">[] = [
  { id: 1, name: repository_1 },
  { id: 2, name: repository_2 },
];

describe("UserAccordion", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render loading state", () => {
    // given
    mockUseUserRepositoriesQuery.mockReturnValue({
      data: null,
      isFetching: true,
    });

    // when
    const { getByTestId, queryByTestId } = render(
      <UserAccordion user={mockUser as User} expanded={mockUserLogin} handleAccordionChange={vi.fn()} />
    );

    // then
    expect(getByTestId(circularProgressId)).toBeInTheDocument();
    expect(queryByTestId(listId)).not.toBeInTheDocument();
    expect(queryByTestId(noReposId)).not.toBeInTheDocument();
  });

  it("should render 'No repositories found' when no repositories are returned", () => {
    // given
    mockUseUserRepositoriesQuery.mockReturnValue({
      data: [],
      isFetching: false,
    });

    // when
    const { getByText, queryByTestId } = render(
      <UserAccordion user={mockUser as User} expanded={mockUserLogin} handleAccordionChange={vi.fn()} />
    );

    // then
    expect(getByText("No repositories found.")).toBeInTheDocument();
    expect(queryByTestId(circularProgressId)).not.toBeInTheDocument();
    expect(queryByTestId(listId)).not.toBeInTheDocument();
  });

  it("should render list of repositories", () => {
    // given
    mockUseUserRepositoriesQuery.mockReturnValue({
      data: mockRepositories,
      isFetching: false,
    });

    // when
    const { getByTestId, getAllByTestId } = render(
      <UserAccordion user={mockUser as User} expanded={mockUserLogin} handleAccordionChange={vi.fn()} />
    );

    // then
    expect(getByTestId(listId)).toBeInTheDocument();
    expect(getAllByTestId(listItemId).length).toBe(mockRepositories.length);
    expect(getAllByTestId(listItemId)[0].textContent).toBe(repository_1);
    expect(getAllByTestId(listItemId)[1].textContent).toBe(repository_2);
  });

  it("should call handleAccordionChange when clicked", () => {
    // given
    const mockHandleAccordionChange = vi.fn();
    const { getByTestId } = render(
      <UserAccordion user={mockUser} expanded={false} handleAccordionChange={mockHandleAccordionChange} />
    );

    // when
    fireEvent.click(getByTestId(accordionSummaryId));

    // then
    expect(mockHandleAccordionChange).toHaveBeenCalledWith(mockUserLogin);
  });
});
