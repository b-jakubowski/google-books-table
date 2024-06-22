import { Grid, Paper, Skeleton } from '@mui/material'
import { FC } from 'react'

type TableSkeletonProps = {
  numberOfRows: number
}

export const TableSkeleton: FC<TableSkeletonProps> = ({ numberOfRows }) => (
  <Paper sx={{ marginTop: 3, padding: 1 }}>
    <Grid container spacing={1.5}>
      {[...Array(numberOfRows)].map((_, index) => (
        <Grid item xs={12} key={index}>
          <Skeleton variant="rectangular" height={50} />
        </Grid>
      ))}
    </Grid>
  </Paper>
)
