import { useState } from "react"

import useZustand from "../../Hooks/useZustand"

import { Menubar } from "primereact/menubar"
import { InputText } from "primereact/inputtext"

const StoreNavigation = () => {

  console.log("StoreNavigation")

  const [searchParameter, setSearchParameter] = useState("")

  const loadStoreBooks = useZustand(state => state.loadStoreBooks)

  const menubarItems = [
    {
      label: "Featured",
      icon: "pi pi-star",
      command: () => loadStoreBooks("")
    },
    {
      label: "Genre",
      icon: "pi pi-book",
      items: [
        {
          label: "Novel",
          command: () => loadStoreBooks("type=novel")
        },
        {
          label: "Drama",
          command: () => loadStoreBooks("type=drama")
        },
        {
          label: "Action",
          command: () => loadStoreBooks("type=action")
        },
        {
          label: "Horror",
          command: () => loadStoreBooks("type=horror")
        }
      ]
    },
    {
      label: "Author",
      icon: "pi pi-user",
      items: [
        {
          label: "Tolstoy",
          command: () => loadStoreBooks("author=tolstoy")
        },
        {
          label: "William Shakespeare",
          command: () => loadStoreBooks("author=shakespeare")
        }
      ]
    },
    {
      label: "Top Sellers",
      icon: "pi pi-chart-bar",
      items: [
        {
          label: "Weekly",
          className: "p-disabled"
        },
        {
          label: "Monthly",
          className: "p-disabled"
        }
      ]
    }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    loadStoreBooks("name=" + searchParameter)
  }

  return (
    <form className="container flex justify-content-center" style={{ minWidth: "240px", width: "100%", height: "fit-content" }} onSubmit={handleSubmit}>

      <Menubar model={menubarItems}
        start={
          <InputText placeholder="Search" type="text" value={searchParameter} onChange={(e) => setSearchParameter(e.target.value)} />
        }
      />

    </form>
  )

}

export default StoreNavigation