import useScreenSize from "../../Hooks/useScreenSize"
import DropdownNavigation from "./DropdownNavigation"
import NavigationButtons from "./NavigationButtons"

const Navigation = () => {

  const activeScreenSize = useScreenSize()

  return (
    <>
      {activeScreenSize === "small" ?
        <DropdownNavigation />
        :
        <NavigationButtons activeScreenSize={activeScreenSize} />
      }
    </>
  )

}

export default Navigation