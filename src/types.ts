export type BookVolume = {
  id: string
  kind: string
  selfLink: string
  volumeInfo: {
    title: string
    authors: string[]
    publishedDate: string
    description: string
    pageCount: number
    categories: string[]
    averageRating: number
    imageLinks: {
      smallThumbnail: string
    }
  }
  saleInfo: {
    buyLink: string
    listPrice: {
      amount: number
      currencyCode: string
    }
  }
}
