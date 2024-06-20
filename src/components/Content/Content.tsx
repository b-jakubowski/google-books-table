import { useState } from 'react'
import { Search } from '../'
import { useQuery } from '@tanstack/react-query'
import { Typography } from '@mui/material'

const fetchVolumes = (searchQuery: string) =>
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`).then(
    (res) => res.json()
  )

export const Content = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const { isPending, error, data, fetchStatus } = useQuery({
    queryKey: ['repoData', searchQuery],
    queryFn: () => fetchVolumes(searchQuery),
    enabled: !!searchQuery,
  })

  if (isPending && fetchStatus !== 'idle')
    return (
      <Typography variant="subtitle1" gutterBottom>
        Loading...
      </Typography>
    )

  if (error) {
    return (
      <Typography variant="subtitle1" gutterBottom>
        Search error
      </Typography>
    )
  }

  console.log('+++++++++++++', data)

  return <Search onSearchClick={setSearchQuery} />
}
