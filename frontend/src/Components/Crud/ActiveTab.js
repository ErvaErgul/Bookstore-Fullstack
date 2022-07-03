import { useState } from "react"

import { classNames } from "primereact/utils"

import Create from "./Create"
import Read from "./Read"
import Update from "./Update"
import Delete from "./Delete"

import { Button } from "primereact/button"

const ActiveTab = () => {

  const [activeTab, setActiveTab] = useState("create")

  return (
    <>
      <div className="flex flex-order-0 w-full mx-auto" style={{ minWidth: "240px", maxWidth: "960px", gap: "2px" }}>
        <Button label="Create" onClick={() => setActiveTab("create")}
          className={classNames("flex-1", { "bg-primary-reverse": activeTab === "create" })}
        />
        <Button label="Read" onClick={() => setActiveTab("read")}
          className={classNames("flex-1", { "bg-primary-reverse": activeTab === "read" })}
        />
        <Button label="Update" onClick={() => setActiveTab("update")}
          className={classNames("flex-1", { "bg-primary-reverse": activeTab === "update" })}
        />
        <Button label="Delete" onClick={() => setActiveTab("delete")}
          className={classNames("flex-1", { "bg-primary-reverse": activeTab === "delete" })}
        />
      </div>

      {activeTab === "create" && <Create />}
      {activeTab === "read" && <Read />}
      {activeTab === "update" && <Update />}
      {activeTab === "delete" && <Delete />}
    </>
  )
}
export default ActiveTab