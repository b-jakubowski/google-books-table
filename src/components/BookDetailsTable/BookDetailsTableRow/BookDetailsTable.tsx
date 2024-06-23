import { FC } from 'react'
import { Button, TableCell, TableRow, Typography } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { BookVolume } from '../../../types'

type BooksTableProps = {
  bookDetails: BookVolume
}

export const BookDetailsTableRow: FC<BooksTableProps> = ({ bookDetails }) => {
  const { volumeInfo, saleInfo } = bookDetails

  const authors = volumeInfo?.authors ? volumeInfo?.authors.join(', ') : '-'
  const categories = volumeInfo?.categories
    ? volumeInfo?.categories.join(', ')
    : '-'

  return (
    <TableRow style={{ verticalAlign: 'top' }}>
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
      <TableCell>{categories}</TableCell>
      <TableCell width={25}>
        <Button
          variant="outlined"
          target="_blank"
          startIcon={<AddShoppingCartIcon />}
          href={saleInfo.buyLink}
        >
          {`${saleInfo.listPrice.amount} ${saleInfo.listPrice.currencyCode}`}
        </Button>
      </TableCell>
    </TableRow>
  )
}
