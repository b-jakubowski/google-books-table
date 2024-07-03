import { Alert, AlertTitle, Box, Button, Container } from '@mui/material'

export const ErrorPage = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ px: { xs: 1, md: 5, lg: 6 } }}>
        <Alert severity="warning" sx={{ marginTop: 15 }}>
          <AlertTitle>Warning</AlertTitle>
          Sorry, an unexpected error has occurred.
        </Alert>
      </Box>
      <Button variant="outlined" href="/" sx={{ marginTop: 15, marginLeft: 6 }}>
        Go back to home page
      </Button>
    </Container>
  )
}
