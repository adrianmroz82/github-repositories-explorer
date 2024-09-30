import { Box, CircularProgress, Container, Typography } from "@mui/material";

import { UserList } from "@/components/UserList";
import { UserSearchForm } from "@/components/UserSearchForm";
import { useUserSearchContext } from "@/hooks/useUserSearchContext";

export function App() {
  const { isLoading } = useUserSearchContext();

  return (
    <Container data-testid="app-container" maxWidth="sm">
      <Box
        data-testid="app-box"
        display="flex"
        flexDirection="column"
        alignItems="center"
        paddingTop={16}
        minHeight="100vh"
        textAlign="center">
        <Typography data-testid="app-user-search-typography" variant="h4" gutterBottom>
          GitHub User Search
        </Typography>
        <UserSearchForm />
        {isLoading ? <CircularProgress data-testid="app-circular-progress" sx={{ marginTop: 4 }} /> : <UserList />}
      </Box>
    </Container>
  );
}
