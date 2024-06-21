import { CssBaseline } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Content } from './components'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <Content />
    </QueryClientProvider>
  )
}

export default App
