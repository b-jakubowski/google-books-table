import { Box, Container } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { BookListTable, BookDetailsTable, Search, TableBreadcumbs } from '../'
import { useFetchBooks } from './useFetchBooks'
import { SearchParamKey } from '../../types'

export const Content = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchParam = searchParams.get(SearchParamKey.SEARCH)
  const detailsParam = searchParams.get(SearchParamKey.DETAILS)

  const {
    isBookDetailsPending,
    bookDetailsError,
    bookDetails,
    isBookListPending,
    isBookListError,
    bookList,
  } = useFetchBooks(searchParam, detailsParam)

  const setParams = (key: string, value: string) => {
    setSearchParams((prev) => {
      prev.set(key, value)
      return prev
    })
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ px: { xs: 1, md: 5, lg: 6 } }}>
        <Search
          onSearchClick={(seachQuery) =>
            setParams(SearchParamKey.SEARCH, seachQuery)
          }
        />
        <TableBreadcumbs />
        {detailsParam ? (
          <BookDetailsTable
            bookDetails={bookDetails}
            isPending={isBookDetailsPending}
            isError={!!bookDetailsError}
          />
        ) : (
          <BookListTable
            bookList={bookList?.items}
            searchInitialized={!!searchParam}
            isError={!!isBookListError}
            isPending={isBookListPending}
            onRowClick={(id, bookTitle) => {
              setParams(SearchParamKey.DETAILS_TITLE, bookTitle)
              setParams(SearchParamKey.DETAILS, id)
            }}
          />
        )}
      </Box>
    </Container>
  )
}
