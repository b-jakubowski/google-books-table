import { CssBaseline } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Content, ErrorPage } from './pages'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Content />,
      errorElement: <ErrorPage />,
    },
  ],
  { basename: '/google-books-table/' }
)

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
