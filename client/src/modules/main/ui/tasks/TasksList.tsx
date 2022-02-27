import React, { FormEvent, useEffect, useState } from 'react';
import dayjs from 'dayjs';

import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  Typography,
  Stack,
} from '@mui/material';
import { Delete } from '@mui/icons-material';

import { tasksApi } from 'client/modules/main/api/task';
import { Task } from 'client/modules/main/type/task';

export const TasksList = () => {
  const { getAllTasks, createWeeklyTask, deleteWeeklyTask } = tasksApi();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const dataOnSuccess = async () => {
      const { data } = await getAllTasks();
      data.sort((first, second) => {
        return Number(second.start) - Number(first.start);
      });
      setTasks(data);
    };
    dataOnSuccess();
  }, []);

  const handleCreateTaskSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createWeeklyTask();
  };

  const handleDeleteClick = async (id: string) => {
    await deleteWeeklyTask(id);
    const newWeeklyTasks = tasks.filter((task) => task._id !== id);
    setTasks(newWeeklyTasks);
  };

  return (
    <>
      <Card
        sx={{
          width: '100%',
          maxWidth: '600px',
          m: 'auto',
          mb: 2,
        }}
      >
        <CardContent
          sx={{
            py: 4,
            px: 5,
            pb: 4,
            '&:last-child': {
              pb: 4,
            },
          }}
        >
          <Box
            component="form"
            onSubmit={handleCreateTaskSubmit}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: {
                xs: 'flex-end',
                md: 'space-between',
              },
              flexWrap: 'wrap',
              gap: 4,
            }}
          >
            <Button type="submit" variant="contained">
              Create Weekly Task
            </Button>
          </Box>
        </CardContent>
      </Card>
      {tasks.map(({ _id, start, end, users }) => {
        return (
          <Card
            key={_id}
            sx={{
              width: '100%',
              maxWidth: '600px',
              m: 'auto',
              mb: 2,
            }}
          >
            <CardContent
              sx={{
                py: 4,
                px: 5,
                '&:last-child': {
                  pb: 4,
                },
              }}
            >
              <Stack direction="row" alignItems="center">
                <Typography component="span" variant="subtitle1" sx={{ mr: 3 }}>
                  Start: {dayjs(start).format('DD/MM/YYYY')}
                </Typography>
                <Typography component="span" variant="subtitle1" sx={{ mr: 'auto' }}>
                  End: {dayjs(end).format('DD/MM/YYYY')}
                </Typography>
                <IconButton onClick={() => handleDeleteClick(_id)} edge="end" aria-label="delete">
                  <Delete sx={{ color: 'error.main' }} />
                </IconButton>
              </Stack>

              <List disablePadding>
                {users.map(({ name, area }) => {
                  return <ListItem key={name}>{`${name}: ${area}`}</ListItem>;
                })}
              </List>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};
