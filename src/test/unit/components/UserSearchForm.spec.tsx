import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserSearchForm } from "@/components/UserSearchForm";
import { FormEvent } from "react";

const mockUseUserSearchContext = vi.fn();
vi.mock("@/hooks/useUserSearchContext", () => ({
  useUserSearchContext: () => mockUseUserSearchContext(),
}));

const textFieldId = "mui-text-field";
const buttonId = "mui-button";
const circularProgressId = "mui-circular-progress";

vi.mock("@mui/material", () => ({
  TextField: vi.fn(({ label, error, helperText, ...props }) => (
    <div data-testid={textFieldId}>
      <label>
        {label}
        <input aria-invalid={error ? "true" : "false"} {...props} />
      </label>
      {error && <span>{helperText}</span>}
    </div>
  )),
  Button: vi.fn(({ children, ...props }) => (
    <button data-testid={buttonId} {...props}>
      {children}
    </button>
  )),
  CircularProgress: vi.fn(() => <div data-testid={circularProgressId} />),
}));

const createUseFormMock = (overrideValues = {}) => ({
  register: vi.fn(),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSubmit: (fn: (values: any) => void) => (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fn(overrideValues);
  },
  formState: {
    errors: {},
  },
});

const mockUseForm = vi.fn();
vi.mock("react-hook-form", () => ({
  useForm: () => mockUseForm(),
}));

describe("UserSearchForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call handleSearch with the username when the form is submitted", async () => {
    // given
    const handleSearchMock = vi.fn();
    mockUseUserSearchContext.mockReturnValue({
      handleSearch: handleSearchMock,
      isLoading: false,
    });

    vi.mocked(mockUseForm).mockReturnValue(createUseFormMock({ username: "testUser" }));

    // when
    const { getByTestId, getByLabelText } = render(<UserSearchForm />);

    fireEvent.input(getByLabelText("Search GitHub Users"), {
      target: { value: "testUser" },
    });
    fireEvent.click(getByTestId(buttonId));

    // then
    expect(handleSearchMock).toHaveBeenCalledWith("testUser");
  });

  it("should disable the button and show a loading spinner when isLoading is true", () => {
    // given
    mockUseUserSearchContext.mockReturnValue({
      handleSearch: vi.fn(),
      isLoading: true,
    });

    // when
    const { getByTestId } = render(<UserSearchForm />);

    // then
    expect(getByTestId(buttonId)).toBeDisabled();
    expect(getByTestId(circularProgressId)).toBeInTheDocument();
  });

  it("should show a validation error message when the username field is empty", async () => {
    // given
    const handleSearchMock = vi.fn();
    mockUseUserSearchContext.mockReturnValue({
      handleSearch: handleSearchMock,
      isLoading: false,
    });

    vi.mocked(mockUseForm).mockReturnValue({
      ...createUseFormMock(),
      formState: {
        errors: {
          username: { message: "Username is required" },
        },
      },
    });

    // when
    const { findByText, getByTestId } = render(<UserSearchForm />);

    fireEvent.click(screen.getByTestId(buttonId)); // Click the button without entering a username

    // then
    expect(await findByText("Username is required")).toBeInTheDocument();
    expect(getByTestId(textFieldId).querySelector("input")).toHaveAttribute("aria-invalid", "true"); // Check if the input is marked as invalid
  });
});
