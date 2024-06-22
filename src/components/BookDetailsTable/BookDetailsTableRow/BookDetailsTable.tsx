import { FC } from 'react'
import { Link, TableCell, TableRow, Typography } from '@mui/material'
import { BookVolume } from '../../../types'

type BooksTableProps = {
  bookDetails: BookVolume
}

export const BookDetailsTableRow: FC<BooksTableProps> = ({ bookDetails }) => {
  const { volumeInfo, saleInfo } = bookDetails

  const categories = volumeInfo?.categories
    ? volumeInfo?.categories.join(', ')
    : '-'
  const authors = volumeInfo?.authors ? volumeInfo?.authors.join(', ') : '-'

  return (
    <TableRow>
      <TableCell>
        <Typography fontWeight={600}>{volumeInfo.title}</Typography>
        <Typography>{`${authors}`}</Typography>
      </TableCell>
      <TableCell>
        <img
          src={volumeInfo?.imageLinks?.smallThumbnail}
          alt={volumeInfo.title}
        />
      </TableCell>
      <TableCell>
        <span
          dangerouslySetInnerHTML={{
            __html: volumeInfo.description,
          }}
        />
      </TableCell>
      <TableCell size="small">{categories}</TableCell>
      <TableCell>
        <Link href={saleInfo.buyLink}>
          buy for{' '}
          {`${saleInfo.listPrice.amount} ${saleInfo.listPrice.currencyCode}`}
        </Link>
      </TableCell>
    </TableRow>
  )
}
