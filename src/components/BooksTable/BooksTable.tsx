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

type BooksTableProps = {
  books?: BookVolume[]
  isPending: boolean
  isError: boolean
}

export const BooksTable: FC<BooksTableProps> = ({
  books,
  isError,
  isPending,
}) => {
  if (isPending) {
    return <TableSkeleton />
  }

  if (isError) {
    return (
      <Typography variant="subtitle1" gutterBottom>
        Search error
      </Typography>
    )
  }

  if (!books)
    return <Typography sx={{ marginTop: 3 }}>No books found</Typography>

  const renderTableRow = (book: BookVolume) => {
    const authors = book.volumeInfo?.authors
      ? book.volumeInfo?.authors.join(', ')
      : '-'

    return (
      <TableRow
        hover
        key={book.id}
        onClick={() => console.log('+++++++++++ book id', book.id)}
      >
        <TableCell component="th" scope="row">
          {book.id}
        </TableCell>
        <TableCell align="left">
          <Typography fontWeight={500}>{book.volumeInfo.title}</Typography>
        </TableCell>
        <TableCell align="left">{authors}</TableCell>
        <TableCell align="left">{book.volumeInfo.pageCount}</TableCell>
        <TableCell align="left">{`${book.volumeInfo.publishedDate}`}</TableCell>
      </TableRow>
    )
  }

  return (
    <TableContainer component={Paper} sx={{ marginTop: 3 }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="left">title</TableCell>
            <TableCell align="left">author</TableCell>
            <TableCell align="left">pages</TableCell>
            <TableCell align="left">published date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{books.map(renderTableRow)}</TableBody>
      </Table>
    </TableContainer>
  )
}
