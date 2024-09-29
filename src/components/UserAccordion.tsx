import { SyntheticEvent } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  CircularProgress,
  List,
  ListItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useUserRepositoriesQuery } from "@/hooks/useUserRepositoriesQuery";
import { User } from "@/model/user.model";
import { Repository } from "@/model/repository.model";

interface Props {
  user: User;
  expanded: string | false;
  handleAccordionChange: (userLogin: string) => (_: SyntheticEvent, isExpanded: boolean) => void;
}

export function UserAccordion({ user, expanded, handleAccordionChange }: Props) {
  const { data: repositories, isFetching } = useUserRepositoriesQuery(user.login, expanded === user.login);

  function renderContent() {
    if (isFetching) {
      return <CircularProgress />;
    }

    if (!repositories || repositories.length === 0) {
      return <Typography>No repositories found.</Typography>;
    }

    return (
      <List>
        {repositories.map(({ id, name }: Repository) => (
          <ListItem key={id}>{name}</ListItem>
        ))}
      </List>
    );
  }

  return (
    <Accordion expanded={expanded === user.login} onChange={handleAccordionChange(user.login)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{user.login}</Typography>
      </AccordionSummary>
      <AccordionDetails>{renderContent()}</AccordionDetails>
    </Accordion>
  );
}
