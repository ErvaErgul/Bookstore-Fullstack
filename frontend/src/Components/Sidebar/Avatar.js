import { useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { classNames } from "primereact/utils"

import useZustand from "../../Hooks/useZustand"

import { Button } from "primereact/button"
import { Badge } from "primereact/badge"
import { Menu } from "primereact/menu"

const Avatar = () => {

  const avatarMenuRef = useRef(null)

  const location = useLocation()
  const navigate = useNavigate()

  const userUsername = useZustand(state => state.userUsername)
  const userAuthenticated = useZustand(state => state.userAuthenticated)
  const numberOfItemsInCart = useZustand(state => state.userCartItems).length
  const logout = useZustand(state => state.logout)

  const authenticatedMenuItems = [
    { label: userUsername, className: "capitalize pointer-events-none" },
    { label: "Profile", icon: "pi pi-user", className: (location.pathname === "/profile" ? "border-primary border-left-2" : ""), command: () => navigate("/profile") },
    { label: "Log Out", icon: "pi pi-power-off", command: () => logout() & navigate("/") }
  ]

  const unauthenticatedMenuItems = [
    { label: "Sign in", icon: "pi pi-user", className: (location.pathname === "/authentication" ? "border-primary border-left-2" : ""), command: () => navigate("/authentication") },
  ]

  return (
    <>
      <Button label="" icon="pi pi-user" aria-haspopup aria-controls="avatarMenu"
        className={classNames("sidebarAvatar p-button-rounded flex-order-1 align-self-center overflow-visible ", { "bg-primary-reverse": (location.pathname === "/profile" || location.pathname === "/authentication") })}
        onClick={(event) => avatarMenuRef.current.toggle(event)} >
        {userAuthenticated && numberOfItemsInCart > 0 &&
          <Badge className="bg-primary-reverse right-0 top-0" value={numberOfItemsInCart} style={{ transform: "translate(25%,-25%)" }} />
        }
      </Button>

      <Menu model={userAuthenticated ? authenticatedMenuItems : unauthenticatedMenuItems} popup ref={avatarMenuRef} id="avatarMenu" />
    </>
  )

}

export default Avatar