import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { UserList } from "@/components/UserList";
import { UserAccordion } from "@/components/UserAccordion";
import { User } from "@/model/user.model";

const userAccordionId = "user-accordion";
vi.mock("@/components/UserAccordion", () => ({
  UserAccordion: vi.fn(({ user }) => <div data-testid={userAccordionId}>{user.login}</div>),
}));

const mockUseUserSearchContext = vi.fn();
vi.mock("@/hooks/useUserSearchContext", () => ({
  useUserSearchContext: () => mockUseUserSearchContext(),
}));

const boxId = "mui-box";
const noUsersFoundtypographyId = "mui-typography";

vi.mock("@mui/material", () => ({
  Box: vi.fn(({ children }) => <div data-testid={boxId}>{children}</div>),
  Typography: vi.fn(({ children, variant, color, align }) => (
    <div data-testid={noUsersFoundtypographyId} data-variant={variant} data-color={color} data-align={align}>
      {children}
    </div>
  )),
}));

describe("UserList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render 'No users found' message when no users are returned after search", () => {
    // given
    mockUseUserSearchContext.mockReturnValue({
      users: [],
      hasSearched: true,
      expanded: null,
      handleAccordionChange: vi.fn(),
    });

    // when
    const { getByTestId, queryByTestId } = render(<UserList />);

    // then
    expect(getByTestId(noUsersFoundtypographyId)).toHaveTextContent("No users found.");
    expect(queryByTestId(userAccordionId)).not.toBeInTheDocument();
  });

  it("should not render 'No users found' message when no search has been made", () => {
    // given
    mockUseUserSearchContext.mockReturnValue({
      users: [],
      hasSearched: false, // no search made
      expanded: null,
      handleAccordionChange: vi.fn(),
    });

    // when
    const { queryByText, queryByTestId } = render(<UserList />);

    // then
    expect(queryByText("No users found.")).not.toBeInTheDocument();
    expect(queryByTestId(userAccordionId)).not.toBeInTheDocument();
  });

  it("should render a list of users when users are found", () => {
    // given
    const mockUsers: Pick<User, "id" | "login">[] = [
      { id: 1, login: "user1" },
      { id: 2, login: "user2" },
    ];
    mockUseUserSearchContext.mockReturnValue({
      users: mockUsers,
      hasSearched: true,
      expanded: "user1",
      handleAccordionChange: vi.fn(),
    });

    // when
    const { getAllByTestId } = render(<UserList />);

    // then
    const userAccordions = getAllByTestId(userAccordionId);
    expect(userAccordions.length).toBe(2); // Should render two accordions
    expect(userAccordions[0].textContent).toBe("user1");
    expect(userAccordions[1].textContent).toBe("user2");
  });

  it("should pass the correct props to UserAccordion", () => {
    // given
    const mockUsers: Pick<User, "id" | "login">[] = [{ id: 1, login: "user1" }];
    const mockHandleAccordionChange = vi.fn();
    mockUseUserSearchContext.mockReturnValue({
      users: mockUsers,
      hasSearched: true,
      expanded: "user1",
      handleAccordionChange: mockHandleAccordionChange,
    });

    // when
    render(<UserList />);

    // then
    expect(vi.mocked(UserAccordion).mock.calls[0][0]).toEqual({
      user: mockUsers[0],
      expanded: "user1",
      handleAccordionChange: mockHandleAccordionChange,
    });
  });
});
