import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { useUserSearchContext } from "@/hooks/useUserSearchContext"; // Adjust the import path as needed
import { UserSearchContext } from "@/context/userSearch.context"; // Import the context
import { ContextType, ReactNode } from "react";

const MockProvider = ({ children, value }: { children: ReactNode; value: ContextType<typeof UserSearchContext> }) => {
  return <UserSearchContext.Provider value={value}>{children}</UserSearchContext.Provider>;
};

describe("useUserSearchContext", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockContextValue: any;

  beforeEach(() => {
    mockContextValue = {
      handleSearch: vi.fn(),
      isLoading: false,
    };
  });

  it("should return context value when used within a UserSearchProvider", () => {
    // given
    const contextValueId = "context-value";

    const TestComponent = () => {
      const context = useUserSearchContext();
      return <div data-testid={contextValueId}>{JSON.stringify(context)}</div>;
    };

    // when
    const { getByTestId } = render(
      <MockProvider value={mockContextValue}>
        <TestComponent />
      </MockProvider>
    );

    // then
    expect(getByTestId(contextValueId)).toHaveTextContent(JSON.stringify(mockContextValue));
  });

  it("should throw an error when used outside of a UserSearchProvider", () => {
    // given
    const errorMessage = "useUserSearchContext must be used within a UserSearchProvider";
    const TestComponent = () => {
      useUserSearchContext();
      return null;
    };

    // when
    // then
    expect(() => render(<TestComponent />)).toThrow(errorMessage);
  });
});
