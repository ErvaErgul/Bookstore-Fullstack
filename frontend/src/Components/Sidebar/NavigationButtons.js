import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { classNames } from "primereact/utils"

import useZustand from "../../Hooks/useZustand"

import { Button } from "primereact/button"

const NavigationButtons = ({ activeScreenSize }) => {

  const [sidebarMinimized, setSidebarMinimized] = useState(window.innerWidth < 1025)

  const location = useLocation()
  const navigate = useNavigate()

  const userAuthority = useZustand(state => state.userAuthority)

  return (
    <>
      {activeScreenSize === "big" &&
        <Button
          className={classNames("p-button-text flex-order-0 w-full", { "": true })}
          onClick={() => setSidebarMinimized(!sidebarMinimized)}
          {...(sidebarMinimized ? { icon: "pi pi-angle-right" } : { icon: "pi pi-angle-left" })}
        />

      }
      <Button icon="pi pi-book"
        className={classNames("flex-order-2", { "bg-primary-reverse": location.pathname === "/" }, { "align-self-center": sidebarMinimized })}
        onClick={() => navigate("/")}
        {...((!sidebarMinimized && activeScreenSize === "big") && { label: "Store" })}
      />

      {userAuthority === "admin" &&
        <Button icon="pi pi-database"
          className={classNames("flex-order-2", { "bg-primary-reverse": location.pathname === "/crud" }, { "align-self-center": sidebarMinimized })}
          onClick={() => navigate("/crud")}
          {...((!sidebarMinimized && activeScreenSize === "big") && { label: "Crud" })}
        />
      }

      <Button icon="pi pi-info-circle"
        className={classNames("sidebarAboutButton flex-order-2", { "bg-primary-reverse": location.pathname === "/about" }, { "align-self-center": sidebarMinimized })}
        onClick={() => navigate("/about")}
        {...((!sidebarMinimized && activeScreenSize === "big") && { label: "About" })}
      />
    </>
  )

}

export default NavigationButtons