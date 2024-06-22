import { Breadcrumbs, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { SearchParamKey } from '../../types'

export const TableBreadcumbs = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const searchParam = searchParams.get(SearchParamKey.SEARCH)
  const detailsParam = searchParams.get(SearchParamKey.DETAILS)
  const detailsTitleParam = searchParams.get(SearchParamKey.DETAILS_TITLE)

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ marginY: 5 }}>
      <Typography
        sx={{ cursor: 'pointer' }}
        onClick={() =>
          setSearchParams((prev) => {
            prev.delete(SearchParamKey.SEARCH)
            prev.delete(SearchParamKey.DETAILS)
            prev.delete(SearchParamKey.DETAILS_TITLE)
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
              prev.delete(SearchParamKey.DETAILS)
              prev.delete(SearchParamKey.DETAILS_TITLE)
              return prev
            })
          }
        >
          Search: "{searchParam}"
        </Typography>
      )}

      {detailsParam && (
        <Typography color="text.primary">{detailsTitleParam}</Typography>
      )}
    </Breadcrumbs>
  )
}
