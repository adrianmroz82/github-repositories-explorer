import { useForm } from "react-hook-form";
import { TextField, Button, CircularProgress } from "@mui/material";

import { useUserSearchContext } from "@/hooks/useUserSearchContext";

type FormData = {
  username: string;
};

export function UserSearchForm() {
  const { handleSearch, isLoading } = useUserSearchContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    handleSearch(data.username);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register("username", { required: "Username is required" })}
        label="Search GitHub Users"
        variant="outlined"
        fullWidth
        margin="normal"
        error={!!errors.username}
        helperText={errors.username ? errors.username.message : ""}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isLoading}
        sx={{ marginTop: "1rem" }}>
        {isLoading ? <CircularProgress size={24} /> : "Search"}
      </Button>
    </form>
  );
}
