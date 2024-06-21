export type BookVolume = {
  id: string
  kind: string
  selfLink: string
  volumeInfo: {
    title: string
    authors: string[]
    publishedDate: string
    pageCount: number
    saleInfo: {
      listPrice: {
        amount: number
        currencyCode: string
      }
    }
  }
}
