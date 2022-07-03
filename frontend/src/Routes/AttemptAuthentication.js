import { useState, useEffect } from "react"

import { Outlet } from "react-router-dom"

import useZustand from "../Hooks/useZustand"

const AttemptAuthentication = () => {

  const [attemptingAuthentication, setAttemptingAuthentication] = useState(true)

  const refreshJwt = useZustand(state => state.refreshJwt)

  useEffect(() => {
    const attemptAuthentication = async () => {
      await refreshJwt()
      setAttemptingAuthentication(false)
    }
    attemptAuthentication()
    //eslint-disable-next-line
  }, [])

  return (
    <>
      {attemptingAuthentication ? <i className="loadingImage pi pi-spin pi-spinner"></i> : <Outlet />}
    </>
  )

}

export default AttemptAuthentication