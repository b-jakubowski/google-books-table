import { Breadcrumbs, Typography } from '@mui/material'
import { FC } from 'react'
import { useSearchParams } from 'react-router-dom'

type TableBreadcumbsProps = {
  bookTitle: string | null
}

export const TableBreadcumbs: FC<TableBreadcumbsProps> = ({ bookTitle }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const searchParam = searchParams.get('search')
  const detailsParam = searchParams.get('details')

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ marginY: 5 }}>
      <Typography
        sx={{ cursor: 'pointer' }}
        onClick={() =>
          setSearchParams((prev) => {
            prev.delete('details')
            prev.delete('search')
            return prev
          })
        }
      >
        Home
      </Typography>
      {searchParam && (
        <Typography
          sx={{ cursor: 'pointer' }}
          onClick={() =>
            setSearchParams((prev) => {
              prev.delete('details')
              return prev
            })
          }
        >
          Search: "{searchParam}"
        </Typography>
      )}
      {detailsParam && (
        <Typography color="text.primary">{bookTitle}</Typography>
      )}
    </Breadcrumbs>
  )
}
