import sampleBookPicture from "../../Assets/_sampleBookPicture.png"

import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import useZustand from "../../Hooks/useZustand"

import { Toast } from "primereact/toast"
import { Image } from "primereact/image"
import { Button } from "primereact/button"
import { Badge } from "primereact/badge"
import { Dialog } from "primereact/dialog"

const sampleDetailedBookInformation = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Sed vitae justo ut nulla ultrices tristique.Etiam euismod risus orci, quis fermentum risus fermentum aliquet.Quisque arcu lectus, dignissim eget tortor ac, vehicula dignissim purus.Vestibulum lacinia feugiat consectetur.Vivamus sed lectus sapien.Interdum et malesuada fames ac ante ipsum primis in faucibus.Duis elementum a dolor ac maximus.Vivamus euismod sapien eu turpis convallis interdum.Quisque vestibulum sit amet est vel pharetra.In lorem neque, tincidunt sit amet metus a, lacinia placerat mauris.Donec sapien lacus, aliquam in risus at, auctor pretium felis.Curabitur in erat ac lorem consequat tincidunt id eu elit.Sed tincidunt felis quis nulla semper egestas ut et justo.Morbi suscipit, metus eu auctor aliquam, sapien risus scelerisque felis, aliquet tincidunt mauris nulla eget ex.Nullam lorem est, auctor vitae fringilla ac, varius vel magna."

const BookCard = ({ book }) => {

  const toast = useRef(null)

  const [addButtonLoading, setAddButtonLoading] = useState(false)
  const [removeButtonLoading, setRemoveButtonLoading] = useState(false)
  const [dialogActive, setDialogActive] = useState(false)

  const navigate = useNavigate()

  const userAuthenticated = useZustand(state => state.userAuthenticated)
  const addToCart = useZustand(state => state.addToCart)
  const removeFromCart = useZustand(state => state.removeFromCart)
  const checkAmountInCart = useZustand(state => state.checkAmountOfAGivenBookInCart)

  const amountInCart = checkAmountInCart(book.id)

  const add = async () => {
    if (!userAuthenticated) {
      navigate("/authentication")
    }
    setAddButtonLoading(true)
    const response = await addToCart({ bookId: book.id, amount: 1 })
    if (response === "success") {
      toast.current.show({ life: "1000", severity: "success", summary: "Added to cart", detail: "Added " + book.name + " to cart" })
    } else {
      toast.current.show({ life: "1000", severity: "error", summary: "Failed to add to cart", detail: response })
    }
    setAddButtonLoading(false)
  }

  const remove = async () => {
    setRemoveButtonLoading(true)
    const response = await removeFromCart(book.id)
    if (response === "success") {
      toast.current.show({ life: "1000", severity: "info", summary: "Removed from cart", detail: "Removed " + book.name + " from cart" })
    } else {
      toast.current.show({ life: "1000", severity: "error", summary: "Failed to remove from cart", detail: response })
    }
    setRemoveButtonLoading(false)
  }

  return (
    <div className="card smoothBorder flex" style={{ minWidth: "240px", flexBasis: "max(420px,32%)" }}>

      <Toast ref={toast} />

      <Image alt="sampleBookImage" src={sampleBookPicture} className="align-self-center" style={{ minWidth: "150px", width: "40%" }} />

      <div className="flex flex-column" style={{ width: "60%", gap: "1px" }}>
        <Button icon="pi pi-info-circle" onClick={() => setDialogActive(true)} className="align-self-end mr-2 mt-2 p-0" style={{ borderTopRightRadius: "0.5rem" }} />

        <p className="text-primary">Name</p>{book.name}
        <p className="text-primary">Author</p>{book.author}
        <p className="text-primary">Type</p>{book.type}
        <p className="text-primary">Price</p>{book.price}$

        <Button label="Add" icon="pi pi-shopping-cart" loading={addButtonLoading} className="p-button-sm align-self-end mr-1 mt-2 overflow-visible" style={{ borderBottomRightRadius: "0.5rem", borderTopLeftRadius: "0.5rem" }} onClick={() => add()} >
          {amountInCart > 0 && <Badge value={amountInCart} className="bg-primary-reverse left-0 top-0" style={{ transform: "translate(-40%,-50%)" }} />}
        </Button>

        {amountInCart > 0 ?
          <Button label="Remove" icon="pi pi-shopping-cart" loading={removeButtonLoading} className="p-button-sm align-self-end mr-2 mb-2" style={{ borderBottomRightRadius: "0.5rem", borderTopLeftRadius: "0.5rem" }} onClick={() => remove()} />
          :
          <p className="line-height-4" style={{ minHeight: "calc(2rem + 10px)" }}></p>
        }
      </div>

      <Dialog header={book.name} visible={dialogActive} onHide={() => setDialogActive(false)} dismissableMask resizable={false} draggable={false} style={{ maxWidth: "max(50%,360px)" }} >
        {sampleDetailedBookInformation}
      </Dialog>

    </div>

  )

}

export default BookCard