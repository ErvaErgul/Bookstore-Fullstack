import { useState } from "react"

import RegisterForm from "../Components/Authentication/RegisterForm"
import LoginForm from "../Components/Authentication/LoginForm"

const Authentication = () => {

  const [registerFormActive, setRegisterFormActive] = useState(true)

  return (
    <div id="applicationPage">
      {registerFormActive ?
        <RegisterForm setRegisterFormActive={setRegisterFormActive} />
        :
        <LoginForm setRegisterFormActive={setRegisterFormActive} />
      }
    </div>
  )
}
export default Authentication