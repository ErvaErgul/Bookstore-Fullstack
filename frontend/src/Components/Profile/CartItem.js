import sampleBookPicture from "../../Assets/_sampleBookPicture.png"

import { useRef, useState } from "react"

import useZustand from "../../Hooks/useZustand"

import { Image } from "primereact/image"
import { Toast } from "primereact/toast"
import { Button } from "primereact/button"

const CartItem = ({ cartItem }) => {

  const toast = useRef(null)

  const [removeButtonLoading, setRemoveButtonLoading] = useState(false)

  const removeFromCart = useZustand(state => state.removeFromCart)

  const remove = async () => {
    setRemoveButtonLoading(true)
    const response = await removeFromCart(cartItem.book.id)
    if (response === "success") {
      toast.current.show({ severity: "success", summary: "Removed from cart" })
    } else {
      toast.current.show({ severity: "error", summary: "Failed to remove from cart", detail: response })
    }
    setRemoveButtonLoading(false)
  }

  return (
    <div className="flex bg-primary-reverse z-0">

      <Toast ref={toast} />

      <Image alt="sampleBookPicture" src={sampleBookPicture} className="align-self-center" style={{ width: "10%" }} />

      <div className="flex" style={{ width: "90%" }}>
        <div>
          <span className="text-primary">{cartItem.amount} </span> x <span className="text-primary">{cartItem.book.name}</span> by <span className="text-primary">{cartItem.book.author}</span>
          <br />
          <span className="text-primary">{cartItem.book.price}$ </span> each
        </div>

        <Button className="p-button-rounded p-button-sm ml-auto align-self-center mr-1 mb-1" icon="pi pi-minus" loading={removeButtonLoading} onClick={() => remove()} />
      </div>

    </div>
  )
}
export default CartItem