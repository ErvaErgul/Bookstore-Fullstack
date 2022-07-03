import { useState, useEffect } from "react"

const mQuery = matchMedia("only screen and (min-width:1025px)") /* Big Screens */
const mQuery1 = matchMedia("only screen and (max-width:1024px) and (min-width:577px)") /* Medium Screens */
const mQuery2 = matchMedia("only screen and (max-width:576px)") /* Small Screens */

const checkCurrentScreen = () => {
  if (mQuery.matches) return "big"
  if (mQuery1.matches) return "medium"
  if (mQuery2.matches) return "small"
}

const useScreenSize = () => {

  const [activeScreenSize, setActiveScreenSize] = useState(checkCurrentScreen())

  useEffect(() => {
    const handleResize = () => {
      const currentScreenSize = checkCurrentScreen()
      if (currentScreenSize !== activeScreenSize) {
        setActiveScreenSize(currentScreenSize)
      }
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [activeScreenSize])

  return activeScreenSize

}

export default useScreenSize