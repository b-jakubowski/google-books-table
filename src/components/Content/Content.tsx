import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { BookListTable, Search, TableBreadcumbs } from '../'
import { BookVolume } from '../../types'
import { Box, Breadcrumbs, Container, Typography } from '@mui/material'
import { BookDetailsTable } from '../BookDetailsTable/BookDetailsTable'
import { useSearchParams } from 'react-router-dom'

const volumeDetailsURL = `https://www.googleapis.com/books/v1/volumes/`
const volumeListURL = `https://www.googleapis.com/books/v1/volumes?
&langRestrict=en
&maxResults=10
&orderBy=relevance
&filter=paid-ebooks
&printType=books
&q=`

const fetchVolumeList = (searchQuery: string | null) =>
  fetch(`${volumeListURL}${searchQuery}`).then((res) => res.json())

const fetchVolumeDetails = (volumeId: string | null) =>
  fetch(`${volumeDetailsURL}${volumeId}`).then((res) => res.json())

export const Content = () => {
  const [bookDetailsTitle, setBookDetailsTitle] = useState<string | null>(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const searchParam = searchParams.get('search')
  const detailsParam = searchParams.get('details')

  const {
    isPending,
    fetchStatus,
    error,
    data: bookList,
  } = useQuery<{
    items: BookVolume[]
  }>({
    queryKey: ['bookVolumesSearch', searchParam],
    queryFn: () => fetchVolumeList(searchParam),
    enabled: !!searchParam,
  })

  const {
    isPending: isBookDetailsPending,
    error: bookDetailsError,
    data: bookDetails,
  } = useQuery<BookVolume>({
    queryKey: ['bookDetails', detailsParam],
    queryFn: () => fetchVolumeDetails(detailsParam),
    enabled: !!detailsParam,
  })

  return (
    <Container maxWidth="xl">
      <Box paddingX={5}>
        <Search
          onSearchClick={(seachQuery) => {
            setSearchParams((prev) => {
              prev.set('search', seachQuery)
              return prev
            })
          }}
        />
        <TableBreadcumbs bookTitle={bookDetailsTitle} />
        {detailsParam ? (
          <BookDetailsTable
            bookDetails={bookDetails}
            isPending={isBookDetailsPending}
            isError={!!bookDetailsError}
          />
        ) : (
          <BookListTable
            bookList={bookList?.items}
            isError={!!error}
            isPending={isPending && fetchStatus !== 'idle'}
            onRowClick={(id, bookTitle) => {
              setBookDetailsTitle(bookTitle)

              setSearchParams((prev) => {
                prev.set('details', id)
                return prev
              })
            }}
          />
        )}
      </Box>
    </Container>
  )
}
