import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { BookListTable, Search } from '../'
import { BookVolume } from '../../types'
import { Box, Container } from '@mui/material'
import { BookDetailsTable } from '../BookDetailsTable/BookDetailsTable'

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
  const [searchQuery, setSearchQuery] = useState<string | null>(null)
  const [bookDetailsId, setBookDetailsId] = useState<string | null>(null)

  const { isPending, fetchStatus, error, data } = useQuery<{
    items: BookVolume[]
  }>({
    queryKey: ['bookVolumesSearch', searchQuery],
    queryFn: () => fetchVolumeList(searchQuery),
    enabled: !!searchQuery,
  })

  const {
    isPending: isBookDetailsPending,
    error: bookDetailsError,
    data: bookDetails,
  } = useQuery<BookVolume>({
    queryKey: ['bookDetails', bookDetailsId],
    queryFn: () => fetchVolumeDetails(bookDetailsId),
    enabled: !!bookDetailsId,
  })

  const books = data?.items

  return (
    <Container maxWidth="xl">
      <Box sx={{ height: '100vh', padding: 5 }}>
        <Search onSearchClick={setSearchQuery} />
        {bookDetailsId ? (
          <BookDetailsTable
            bookDetails={bookDetails}
            isPending={isBookDetailsPending}
            isError={!!bookDetailsError}
          />
        ) : (
          <BookListTable
            bookList={books}
            isError={!!error}
            isPending={isPending && fetchStatus !== 'idle'}
            onRowClick={setBookDetailsId}
          />
        )}
      </Box>
    </Container>
  )
}
