import { useRef } from "react"

import { useLocation, useNavigate } from "react-router-dom"

import { classNames } from "primereact/utils"

import useZustand from "../../Hooks/useZustand"

import { Button } from "primereact/button"
import { Menu } from "primereact/menu"

const DropdownNavigation = () => {

  const dropdownNavigationMenu = useRef(null)

  const location = useLocation()
  const navigate = useNavigate()

  const userAuthority = useZustand(state => state.userAuthority)

  const customerMenuItems = [
    { label: "Store", icon: "pi pi-book", className: (location.pathname === "/" ? "border-primary border-left-2" : ""), command: () => navigate("/") },
    { label: "About", icon: "pi pi-info-circle", className: (location.pathname === "/about" ? "border-primary border-left-2" : ""), command: () => navigate("/about") }
  ]

  const adminMenuItems = [
    { label: "Store", icon: "pi pi-book", className: (location.pathname === "/" ? "border-primary border-left-2" : ""), command: () => navigate("/") },
    { label: "Crud", icon: "pi pi-database", className: (location.pathname === "/crud" ? "border-primary border-left-2" : ""), command: () => navigate("/crud") },
    { label: "About", icon: "pi pi-info-circle", className: (location.pathname === "/about" ? "border-primary border-left-2" : ""), command: () => navigate("/about") }
  ]

  return (
    <>
      <Button icon="pi pi-bars" aria-haspopup aria-controls="dropdownNavigationMenu"
        className={classNames("p-button-rounded flex-order-1", { "bg-primary-reverse": (location.pathname === "/" || location.pathname === "/about" || location.pathname === "/crud") })}
        onClick={(event) => dropdownNavigationMenu.current.toggle(event)}
      />

      <Menu model={userAuthority === "admin" ? adminMenuItems : customerMenuItems} popup ref={dropdownNavigationMenu} id="dropdownNavigationMenu" />
    </>
  )

}

export default DropdownNavigation