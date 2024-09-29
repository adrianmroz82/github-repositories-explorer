import { Box, Typography } from "@mui/material";
import { User } from "@/model/user.model";
import { UserAccordion } from "@/components/UserAccordion";

interface UserListProps {
  users: User[];
  expanded: string | false;
  handleAccordionChange: (userLogin: string) => (_: React.SyntheticEvent, isExpanded: boolean) => void;
}

export function UserList({ users, expanded, handleAccordionChange }: UserListProps) {
  if (users.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary" align="center">
        No users found.
      </Typography>
    );
  }

  return (
    <Box width="100%" mt={4}>
      {users.map((user: User) => (
        <UserAccordion key={user.id} user={user} expanded={expanded} handleAccordionChange={handleAccordionChange} />
      ))}
    </Box>
  );
}
