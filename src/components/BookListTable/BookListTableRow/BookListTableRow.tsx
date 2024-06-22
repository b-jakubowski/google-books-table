import { FC } from 'react'
import { TableCell, TableRow, Typography } from '@mui/material'
import { BookVolume } from '../../../types'

type BookListTableRowProps = {
  book: BookVolume
  onRowClick: (id: string, title: string) => void
}

export const BookListTableRow: FC<BookListTableRowProps> = ({
  book,
  onRowClick,
}) => {
  const { id, volumeInfo } = book
  const authors = volumeInfo?.authors ? volumeInfo?.authors.join(', ') : '-'

  return (
    <TableRow hover onClick={() => onRowClick(id, volumeInfo.title)}>
      <TableCell>{id}</TableCell>
      <TableCell>
        <Typography fontWeight={500}>{volumeInfo.title}</Typography>
      </TableCell>
      <TableCell>{authors}</TableCell>
      <TableCell>{volumeInfo.pageCount}</TableCell>
      <TableCell>{`${volumeInfo.publishedDate}`}</TableCell>
    </TableRow>
  )
}
