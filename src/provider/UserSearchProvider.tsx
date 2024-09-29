import { ReactNode, SyntheticEvent, useEffect, useState } from "react";

import { UserSearchContext } from "@/context/userSearch.context";
import { useSearchUsersQuery } from "@/hooks/useSearchUsersQuery";

interface Props {
  children: ReactNode;
}

export function UserSearchProvider({ children }: Props) {
  const [username, setUsername] = useState("");
  const [expanded, setExpanded] = useState<string | false>(false);
  const [hasSearched, setHasSearched] = useState(false);

  const { data: users = [], isFetching: isLoading, refetch } = useSearchUsersQuery(username);

  useEffect(() => {
    if (username) {
      refetch();
    }
  }, [username, refetch]);

  const handleSearch = (username: string) => {
    setUsername(username);
    setHasSearched(true);
  };

  const handleAccordionChange = (userLogin: string) => (_: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? userLogin : false);
  };

  return (
    <UserSearchContext.Provider
      value={{ username, users, expanded, isLoading, hasSearched, handleSearch, handleAccordionChange }}>
      {children}
    </UserSearchContext.Provider>
  );
}
