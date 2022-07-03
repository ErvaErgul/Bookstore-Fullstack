import { useEffect } from "react"

import { classNames } from "primereact/utils"

import useZustand from "../../Hooks/useZustand"

import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"

const BookTable = () => {

  const books = useZustand(state => state.books)
  const loadBooks = useZustand(state => state.loadBooks)

  useEffect(() => {
    loadBooks()
    //eslint-disable-next-line
  }, [])

  return (
    <>
      <DataTable value={books} responsiveLayout="stack" breakpoint="576px"
        className={classNames("min240max960 datatableFont flex-order-1 mx-auto mt-3 shadow-7", { "": true })} >
        <Column field="id" header="Id" />
        <Column field="name" header="Name" />
        <Column field="author" header="Author" />
        <Column field="type" header="Type" />
        <Column field="price" header="Price" />
        <Column field="stock" header="Stock" />
      </DataTable>
    </>
  )

}

export default BookTable