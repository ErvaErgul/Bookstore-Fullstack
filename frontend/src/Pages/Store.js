import useZustand from "../Hooks/useZustand"

import BookCard from "../Components/Store/BookCard"
import { useEffect } from "react"
import StoreNavigation from "../Components/Store/StoreNavigation"

const Store = () => {

  const books = useZustand(state => state.books)
  const loadBooks = useZustand(state => state.loadBooks)

  useEffect(() => {
    loadBooks()
    //eslint-disable-next-line
  }, [])

  return (
    <div className="flex-wrap justify-content-evenly align-content-start p-2" style={{ rowGap: "1rem" }} id="applicationPage">

      <StoreNavigation />

      {
        books.map((element, index) => {
          return (
            <BookCard key={index} book={element} />
          )
        })
      }

    </div>
  )

}

export default Store