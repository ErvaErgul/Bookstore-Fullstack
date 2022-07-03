import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { classNames } from "primereact/utils"

import useZustand from "../../Hooks/useZustand"

import { Toast } from "primereact/toast"
import { InputText } from "primereact/inputtext"
import { Password } from "primereact/password"
import { Button } from "primereact/button"

const LoginForm = ({ setRegisterFormActive }) => {

  const toastRef = useRef(null)

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const login = useZustand(state => state.login)

  const schema = yup.object().shape({
    username: yup.string().required("Please enter a username"),
    password: yup.string().required("Please enter a password")
  })

  const defaultValues = {
    username: "",
    password: ""
  }

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues
  })

  const submitForm = async (data) => {
    setLoading(true)
    setTimeout(async () => {
      const response = await login(data)
      if (response === "success") {
        navigate("/")
      } else {
        setLoading(false)
        toastRef.current.show({ severity: "error", summary: "Login Failed", detail: response })
      }
    }, 300)
  }

  return (
    <form className="authenticationForm container card smoothBorder p-2 fadein animation-duration-300" onSubmit={handleSubmit(submitForm)}>
      <Toast ref={toastRef} />

      <h1 className="mb-2 text-primary">Login</h1>

      <>
        <Controller name="username" control={control} render={({ field, fieldState }) => (
          <InputText {...field} placeholder="username" autoComplete="off"
            className={classNames("flex-1", { "p-invalid": fieldState.error })} />)} />
        <p className="text-xs">{errors?.username?.message}</p>
      </>

      <>
        <Controller name="password" control={control} render={({ field, fieldState }) => (
          <Password {...field} feedback={false} placeholder="password" autoComplete="off"
            inputClassName={classNames("flex-1", { "p-invalid": fieldState.error })} />)} />
        <p className="text-xs">{errors?.password?.message}</p>
      </>

      <Button type="submit" label="Submit" loading={loading} className="w-3 mx-auto mt-1 p-1" />

      <Button label="Don't have an account?" className="p-button-link p-1" onClick={() => setRegisterFormActive(true)} />
    </form>
  )

}

export default LoginForm