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
import { FetchStatus } from '@tanstack/react-query'
import { TableSkeleton } from '../'
import { BookVolume } from '../../types'
import { BookListTableRow } from './BookListTableRow/BookListTableRow'

type BookListTableProps = {
  bookList?: BookVolume[]
  isPending: boolean
  isError: boolean
  searchStatus: FetchStatus
  onRowClick: (id: string, title: string) => void
}

export const BookListTable: FC<BookListTableProps> = ({
  bookList,
  isError,
  isPending,
  searchStatus,
  onRowClick,
}) => {
  if (searchStatus === 'idle' && !bookList) {
    return (
      <Typography variant="subtitle1" gutterBottom>
        Please type a book title in input above
      </Typography>
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
          {bookList.map((book) => (
            <BookListTableRow
              key={book.id}
              book={book}
              onRowClick={onRowClick}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
