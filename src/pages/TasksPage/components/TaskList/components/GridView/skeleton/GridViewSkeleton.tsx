import { Grid } from '@mui/material';
import { TaskCardSkeleton } from '../../../../TaskCard';

export const GridViewSkeleton = () => {
  return (
    <Grid container spacing={2}>
      {Array.from({ length: 8 }, (_, i) => i).map((i) => (
        <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <TaskCardSkeleton />
        </Grid>
      ))}
    </Grid>
  );
};
