import { UserSearchContextProps } from "@/model/user-search.model";
import { createContext } from "react";

export const UserSearchContext = createContext<UserSearchContextProps | undefined>(undefined);
