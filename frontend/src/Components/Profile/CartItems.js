import { useEffect, useRef, useState } from "react"

import useZustand from "../../Hooks/useZustand"

import CartItem from "./CartItem"

import { Toast } from "primereact/toast"
import { Button } from "primereact/button"

const CartItems = () => {

  const toast = useRef(null)

  const [clearButtonLoading, setClearButtonLoading] = useState(false)

  const userCartItems = useZustand(state => state.userCartItems)
  const cartTotal = useZustand(state => state.cartTotal)
  const getCartTotal = useZustand(state => state.getCartTotal)
  const clearCart = useZustand(state => state.clearCart)

  useEffect(() => {
    getCartTotal()
    //eslint-disable-next-line
  }, [userCartItems])

  const clear = async () => {
    setClearButtonLoading(true)
    const response = await clearCart()
    if (response === "success") {
      setClearButtonLoading(false)
      toast.current.show({ severity: "info", summary: "Cart cleared" })
    } else {
      setClearButtonLoading(false)
      toast.current.show({ severity: "error", summary: "Failed to clear cart", detail: response })
    }
  }

  return (
    <div className="flex flex-column mx-auto mt-5 min240max960 card text-sm" style={{ gap: "2px" }}>

      <Toast ref={toast} />

      {userCartItems.length > 0 &&
        <div className="flex ml-1 align-items-center">
          <h3>Total:</h3> <h2 className="text-primary"> {cartTotal}$</h2>
          <Button label="Clear Cart" icon="pi pi-trash" loading={clearButtonLoading} className="p-button-sm ml-auto" onClick={() => clear()} />
        </div>
      }

      {
        userCartItems.map((element, index) => {
          return (
            <CartItem key={index} cartItem={element} />
          )
        })
      }

    </div>
  )
}
export default CartItems