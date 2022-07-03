import { Outlet, Navigate } from "react-router-dom"

import useZustand from "../Hooks/useZustand"

const Redirect = ({ redirectCondition }) => {

  console.log("Redirect")

  const userAuthenticated = useZustand(state => state.userAuthenticated)
  const userAuthority = useZustand(state => state.userAuthority)

  switch (redirectCondition) {
    case "authenticationUnnecessary":
      return <>{userAuthenticated ? <Navigate to="/" /> : <Outlet />}</>
    case "authenticationNecessary":
      return <>{userAuthenticated ? <Outlet /> : <Navigate to="/authentication" />}</>
    case "adminOnly":
      return <>{userAuthority === "admin" ? <Outlet /> : <Navigate to="/" />}</>
    default:
      return <>{<Navigate to="/notfound" />}</>
  }

}

export default Redirect