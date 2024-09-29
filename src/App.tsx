import React, { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { User } from "@/model/user.model";
import { UserAccordion } from "@/components/UserAccordion";
import { UserSearchForm } from "@/components/UserSearchForm";
import { useSearchUsersQuery } from "@/hooks/useSearchUsersQuery";

export const App = () => {
  const [username, setUsername] = useState("");
  const [expanded, setExpanded] = useState<string | false>(false);

  const { data: users, isFetching: isSearchingUsers } = useSearchUsersQuery(username);

  const handleSearch = (username: string) => {
    setUsername(username);
  };

  const handleAccordionChange = (userLogin: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? userLogin : false);
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        textAlign="center">
        <Typography variant="h4" gutterBottom>
          GitHub User Search
        </Typography>
        <UserSearchForm onSearch={handleSearch} isLoading={isSearchingUsers} />

        {users && (
          <Box width="100%" mt={4}>
            {users.map((user: User) => (
              <UserAccordion
                key={user.id}
                user={user}
                expanded={expanded}
                handleAccordionChange={handleAccordionChange}
              />
            ))}
          </Box>
        )}

        {/* {users && <UserList users={users} expanded={expanded} handleAccordionChange={handleAccordionChange} />} */}
      </Box>
    </Container>
  );
};
