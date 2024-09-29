import { useForm } from "react-hook-form";
import { TextField, Button, CircularProgress } from "@mui/material";

interface Props {
  onSearch: (username: string) => void;
  isLoading: boolean;
}

interface FormData {
  username: string;
}

export function UserSearchForm({ onSearch, isLoading }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    onSearch(data.username);
  };

  console.log("errors", errors);

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
        fullWidth
        disabled={isLoading}
        sx={{ marginTop: "1rem", backgroundColor: "#5009dc" }}>
        {isLoading ? <CircularProgress size={24} /> : "Search"}
      </Button>
    </form>
  );
}
