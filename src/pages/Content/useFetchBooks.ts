import { useQuery } from '@tanstack/react-query'
import { BookVolume } from '../../types'

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

export const useFetchBooks = (
  searchParam: string | null,
  detailsParam: string | null
) => {
  const {
    isPending: isBookListPending,
    fetchStatus,
    error: isBookListError,
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

  return {
    isBookDetailsPending,
    bookDetailsError,
    bookDetails,
    searchStatus: fetchStatus,
    isBookListPending: isBookListPending && fetchStatus !== 'idle',
    isBookListError,
    bookList,
  }
}
