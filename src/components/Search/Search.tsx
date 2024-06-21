import { Box, Button, TextField } from '@mui/material'
import { FC, useState } from 'react'

export type SearchProps = {
  onSearchClick: (value: string) => void
}

export const Search: FC<SearchProps> = ({ onSearchClick }) => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <Box sx={{ display: 'flex', marginTop: 10 }}>
      <TextField
        label="Search for books"
        variant="outlined"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
      <Button
        sx={{ marginLeft: 2 }}
        variant="outlined"
        onClick={() => onSearchClick(searchValue)}
      >
        Search
      </Button>
    </Box>
  )
}
