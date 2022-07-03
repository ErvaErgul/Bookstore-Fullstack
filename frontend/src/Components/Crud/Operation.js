import { useRef } from "react"

import { classNames } from "primereact/utils"

import { Button } from "primereact/button"
import { OverlayPanel } from "primereact/overlaypanel"

const Operation = ({ index, operation }) => {

  const overlayPanelRef = useRef(null)

  return (
    <>
      <Button aria-haspopup aria-controls="overlayPanel" style={{ order: `-${index}`, width: "23px", height: "16px" }}
        className={classNames("flex-none p-0 fadeinleft animation-duration-300",
          { "p-button-success": operation.status === "Success" },
          { "p-button-danger": operation.status !== "Success" })}
        onClick={(e) => overlayPanelRef.current.toggle(e)}
        {...(operation.status === "Success" ? { icon: "pi pi-check" } : { icon: "pi pi-times" })}
      />

      <OverlayPanel ref={overlayPanelRef} id="overlayPanel">
        {operation.status === "Success" ?
          <>
            {operation.type} operation was <span className="text-primary">successful.</span>
            <br />
            {operation.type !== "Read" && <>
              Summary: <span className="text-primary font-italic"> {operation.detail} </span>
            </>
            }
          </>
          :
          <>
            {operation.type} operation was <span className="text-pink-300">unsuccessful.</span>
            <br />
            Summary: <span className="text-pink-300 font-italic"> {operation.detail} </span>
          </>
        }
      </OverlayPanel>
    </>
  )

}

export default Operation