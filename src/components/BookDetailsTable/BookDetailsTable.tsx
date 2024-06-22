import { FC } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { TableSkeleton } from '../'
import { BookVolume } from '../../types'
import { BookDetailsTableRow } from './BookDetailsTableRow/BookDetailsTable'

type BooksTableProps = {
  bookDetails?: BookVolume
  isPending: boolean
  isError: boolean
}

export const BookDetailsTable: FC<BooksTableProps> = ({
  bookDetails,
  isError,
  isPending,
}) => {
  if (isPending) {
    return <TableSkeleton numberOfRows={1} />
  }

  if (isError) {
    return (
      <Typography variant="subtitle1" gutterBottom>
        Search error
      </Typography>
    )
  }

  if (!bookDetails)
    return <Typography sx={{ marginTop: 3 }}>No books found</Typography>

  return (
    <TableContainer component={Paper} sx={{ marginTop: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>title / author</TableCell>
            <TableCell>image</TableCell>
            <TableCell>description</TableCell>
            <TableCell>categories</TableCell>
            <TableCell>buy</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <BookDetailsTableRow bookDetails={bookDetails} />
        </TableBody>
      </Table>
    </TableContainer>
  )
}
