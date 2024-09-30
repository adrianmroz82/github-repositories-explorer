import { Box, CircularProgress, Container, Typography } from "@mui/material";

import { UserList } from "@/components/UserList";
import { UserSearchForm } from "@/components/UserSearchForm";
import { useUserSearchContext } from "@/hooks/useUserSearchContext";

export function App() {
  const { isLoading } = useUserSearchContext();

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        paddingTop={16}
        minHeight="100vh"
        textAlign="center">
        <Typography variant="h4" gutterBottom>
          GitHub User Search
        </Typography>
        <UserSearchForm />
        {isLoading ? <CircularProgress sx={{ marginTop: 4 }} /> : <UserList />}
      </Box>
    </Container>
  );
}
