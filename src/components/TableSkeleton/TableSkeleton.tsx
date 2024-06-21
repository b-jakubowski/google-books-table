import { Grid, Paper, Skeleton } from '@mui/material'

export const TableSkeleton = () => (
  <Paper sx={{ marginTop: 3, padding: 1 }}>
    <Grid container spacing={1.5}>
      {[...Array(10)].map((_, index) => (
        <Grid item xs={12} key={index}>
          <Skeleton variant="rectangular" height={50} />
        </Grid>
      ))}
    </Grid>
  </Paper>
)
