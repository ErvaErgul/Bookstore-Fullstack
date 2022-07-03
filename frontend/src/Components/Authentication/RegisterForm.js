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

const RegisterForm = ({ setRegisterFormActive }) => {

  const toastRef = useRef(null)

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const register = useZustand(state => state.register)
  const login = useZustand(state => state.login)

  const schema = yup.object().shape({
    username: yup.string().required("Username is a required field"),
    password: yup.string().required("Password is a required field").min(4, "Password must be atleast 4 characters"),
    email: yup.string().required("Email is a required field").email("Please enter a valid email")
  })

  const defaultValues = {
    username: "",
    password: "",
    email: ""
  }

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues
  })

  const submitForm = async (data) => {
    setLoading(true)
    const response = await register(data)
    if (response === "success") {
      toastRef.current.show({ severity: "success", summary: "Registration Successful", detail: "Welcome aboard! Authenticating..." })
      setTimeout(async () => {
        await login({ username: data.username, password: data.password })
        navigate("/")
      }, 500)
    } else {
      setLoading(false)
      toastRef.current.show({ severity: "error", summary: "Registration Failed", detail: response })
    }
  }

  return (
    <form className="authenticationForm container card smoothBorder p-2 fadein animation-duration-300" onSubmit={handleSubmit(submitForm)}>
      <Toast ref={toastRef} />

      <h1 className="mb-2 text-primary">Register</h1>

      <>
        <Controller name="username" control={control} render={({ field, fieldState }) => (
          <InputText {...field} placeholder="username" autoComplete="off"
            className={classNames("flex-1", { "p-invalid": fieldState.error })} />)} />
        <p className="text-xs">{errors?.username?.message}</p>
      </>

      <Controller name="password" control={control} render={({ field, fieldState }) => (
        <Password {...field} feedback={false} placeholder="password" autoComplete="off"
          inputClassName={classNames("flex-1", { "p-invalid": fieldState.error })} />)} />
      <p className="text-xs">{errors?.password?.message}</p>

      <>
        <Controller name="email" control={control} render={({ field, fieldState }) => (
          <InputText {...field} placeholder="email" autoComplete="off"
            className={classNames("flex-1", { "p-invalid": fieldState.error })} />)} />
        <p className="text-xs">{errors?.email?.message}</p>
      </>

      <Button type="submit" label="Submit" loading={loading} className="w-3 mx-auto mt-1 p-1" />

      <Button label="Already have an account?" className="p-button-link p-1" onClick={() => setRegisterFormActive(false)} />
    </form>
  )

}

export default RegisterForm