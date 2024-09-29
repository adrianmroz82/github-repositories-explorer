import { useContext } from "react";

import { UserSearchContext } from "@/context/userSearch.context";

export function useUserSearchContext() {
  const context = useContext(UserSearchContext);

  if (!context) {
    throw new Error("useUserSearchContext must be used within a UserSearchProvider");
  }

  return context;
}
