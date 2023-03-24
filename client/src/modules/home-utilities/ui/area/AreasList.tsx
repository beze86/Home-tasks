import { useForm, Controller } from 'react-hook-form';

import { Button, Card, CardContent, List, Stack, TextField } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { AreaCreation, AreaId } from 'client/modules/home-utilities/domain/area/area';
import { Api } from 'client/modules/home-utilities/ui';
import { AreasListItem } from 'client/modules/home-utilities/ui/area/AreasListItem';
import { Page } from 'client/shared/layouts';

const STALE_TIME_5_MIN = 300000;

const AREA_LIST_QUERY = ['area', 'area-list'];

const AreasList = () => {
  // const { deleteArea, getAreas } = areasApi();
  const areaListQuery = useQueryClient();

  const { data: areas } = useQuery(AREA_LIST_QUERY, () => Api.getAreas(), {
    suspense: false,
    staleTime: STALE_TIME_5_MIN,
  });

  const {
    handleSubmit,
    control,
    reset: resetForm,
  } = useForm<AreaCreation>({
    defaultValues: {
      area: '',
    },
  });

  const { mutate: mutateCreateArea } = useMutation((data: AreaCreation) => Api.createArea(data), {
    onSuccess: () => {
      resetForm();
      areaListQuery.invalidateQueries(AREA_LIST_QUERY);
    },
  });

  const { mutate: mutateDeleteArea } = useMutation((id: AreaId) => Api.deleteArea(id), {
    onSuccess: () => areaListQuery.invalidateQueries(AREA_LIST_QUERY),
  });

  if (!areas) return null;

  const handleOnClickDeleteArea = (id: AreaId) => {
    mutateDeleteArea(id);
  };

  const handleOnSubmitCreateArea = (data: AreaCreation) => {
    mutateCreateArea({ ...data });
  };

  return (
    <Page>
      <Page.Main>
        <Card sx={{ maxWidth: '600px', marginX: 'auto', marginBottom: 3 }}>
          <CardContent>
            <Stack
              component="form"
              direction="row"
              alignItems="center"
              flexWrap="wrap"
              justifyContent="flex-end"
              gap={4}
              onSubmit={handleSubmit(handleOnSubmitCreateArea)}
            >
              <Controller
                name="area"
                control={control}
                render={({ field }) => {
                  return <TextField {...field} label="Add new area/s" />;
                }}
              />
              <Button type="submit">Add Area</Button>
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: '600px', marginX: 'auto' }}>
          <CardContent>
            <List disablePadding>
              {areas.map(({ area, _id }) => {
                return <AreasListItem key={_id} area={area} onClickDeleteArea={() => handleOnClickDeleteArea(_id)} />;
              })}
            </List>
          </CardContent>
        </Card>
      </Page.Main>
    </Page>
  );
};

export default AreasList;