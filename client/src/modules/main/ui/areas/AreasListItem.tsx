import React from 'react';

import { IconButton, ListItem, Typography } from '@mui/material';
import { Create, Delete } from '@mui/icons-material';

type Props = {
  area: string;
  id: string;
  handleEditClick: (id: string) => void;
  handleDeleteClick: (id: string) => void;
};

export const AreasListItem = ({ area, id, handleEditClick, handleDeleteClick }: Props) => {
  return (
    <ListItem
      disableGutters
      secondaryAction={
        <>
          <IconButton onClick={() => handleEditClick(id)} edge="start" aria-label="edit">
            <Create sx={{ color: 'primary.main' }} />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(id)} edge="end" aria-label="delete">
            <Delete sx={{ color: 'error.main' }} />
          </IconButton>
        </>
      }
    >
      <Typography variant="subtitle1" component="p" sx={{ textTransform: 'capitalize' }}>
        {area}
      </Typography>
    </ListItem>
  );
};
