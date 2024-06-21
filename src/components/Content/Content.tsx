import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { BooksTable, Search } from '../'
import { BookVolume } from '../../types'
import { Box, Container } from '@mui/material'

const volumesURL = `https://www.googleapis.com/books/v1/volumes?
&langRestrict=en
&maxResults=10
&orderBy=relevance
&filter=paid-ebooks
&printType=books
&q=`

const fetchVolumes = (searchQuery: string) =>
  fetch(`${volumesURL}${searchQuery}`).then((res) => res.json())

export const Content = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const { isPending, fetchStatus, error, data } = useQuery<{
    items: BookVolume[]
  }>({
    queryKey: ['repoData', searchQuery],
    queryFn: () => fetchVolumes(searchQuery),
    enabled: !!searchQuery,
  })

  const books = data?.items

  return (
    <Container maxWidth="xl">
      <Box sx={{ height: '100vh', padding: 5 }}>
        <Search onSearchClick={setSearchQuery} />
        <BooksTable
          books={books}
          isError={!!error}
          isPending={isPending && fetchStatus !== 'idle'}
        />
      </Box>
    </Container>
  )
}
