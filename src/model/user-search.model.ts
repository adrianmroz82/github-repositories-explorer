import { SyntheticEvent } from "react";

import { User } from "@/model/user.model";

export interface UserSearchContextProps {
  username: string;
  users: User[];
  expanded: string | false;
  isLoading: boolean;
  hasSearched: boolean;
  handleSearch: (username: string) => void;
  handleAccordionChange: (userLogin: string) => (_: SyntheticEvent, isExpanded: boolean) => void;
}
