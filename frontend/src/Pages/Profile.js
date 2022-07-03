import useZustand from "../Hooks/useZustand"

import CartItems from "../Components/Profile/CartItems"

const Profile = () => {

  const userUsername = useZustand(state => state.userUsername)

  return (
    <div className="flex-column" id="applicationPage">

      <h1 className="capitalize mx-auto">Welcome, {userUsername}</h1>
      <CartItems />

    </div>
  )

}

export default Profile