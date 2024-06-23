import { FC } from 'react'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import SearchIcon from '@mui/icons-material/Search'
import { TableSkeleton } from '../'
import { BookVolume } from '../../types'
import { BookListTableRow } from './BookListTableRow/BookListTableRow'

type BookListTableProps = {
  bookList?: BookVolume[]
  isPending: boolean
  isError: boolean
  searchInitialized: boolean
  onRowClick: (id: string, title: string) => void
}

export const BookListTable: FC<BookListTableProps> = ({
  bookList,
  isError,
  isPending,
  searchInitialized,
  onRowClick,
}) => {
  if (!searchInitialized) {
    return (
      <Box display="flex" alignItems="center">
        <InfoIcon fontSize="large" color="info" />
        <Typography variant="subtitle1" ml={1}>
          Please type a book title in input above
        </Typography>
      </Box>
    )
  }

  if (isPending) {
    return <TableSkeleton numberOfRows={10} />
  }

  if (isError) {
    return (
      <Typography variant="subtitle1" gutterBottom>
        Search error
      </Typography>
    )
  }

  if (!bookList) {
    return (
      <Box display="flex" alignItems="center">
        <SearchIcon fontSize="large" color="info" />
        <Typography variant="subtitle1" ml={1}>
          No books found
        </Typography>
      </Box>
    )
  }

  if (!bookList)
    return <Typography sx={{ marginTop: 3 }}>No books found</Typography>

  return (
    <TableContainer component={Paper} sx={{ marginTop: 3 }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>title</TableCell>
            <TableCell>author</TableCell>
            <TableCell>pages</TableCell>
            <TableCell>published date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookList.map((book, index) => (
            <BookListTableRow
              key={book.id}
              index={index + 1}
              book={book}
              onRowClick={onRowClick}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
