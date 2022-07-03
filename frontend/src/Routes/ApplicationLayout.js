import { Outlet } from "react-router-dom"

import LoadingImage from "../Components/LoadingImage"
import Sidebar from "../Pages/Sidebar"

const ApplicationLayout = () => {

  return (
    <>
      <LoadingImage />
      <Sidebar />
      <Outlet />
    </>
  )

}

export default ApplicationLayout