import useZustand from "../Hooks/useZustand"

const LoadingImage = () => {

  const appLoading = useZustand(state => state.isAppLoading)

  return (
    <>
      {appLoading &&
        <i className="loadingImage pi pi-spin pi-spinner"></i>
      }
    </>
  )

}

export default LoadingImage