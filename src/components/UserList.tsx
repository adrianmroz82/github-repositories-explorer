import { Box, Typography } from "@mui/material";

import { UserAccordion } from "@/components/UserAccordion";
import { useUserSearchContext } from "@/hooks/useUserSearchContext";

export function UserList() {
  const { users, expanded, handleAccordionChange, hasSearched } = useUserSearchContext();

  const noUsersFound = hasSearched && users.length === 0;

  if (noUsersFound) {
    return (
      <Typography variant="body1" color="text.secondary" align="center">
        No users found.
      </Typography>
    );
  }

  return (
    <Box width="100%" mt={4}>
      {users.map((user) => (
        <UserAccordion key={user.id} user={user} expanded={expanded} handleAccordionChange={handleAccordionChange} />
      ))}
    </Box>
  );
}
