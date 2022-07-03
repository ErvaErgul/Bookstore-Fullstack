import { useRef, useState } from "react"

import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { classNames } from "primereact/utils"

import useZustand from "../../Hooks/useZustand"

import { Toast } from "primereact/toast"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Dropdown } from "primereact/dropdown"

const queryTypes = ["name", "author", "type"]

const Read = () => {

  const toast = useRef(null)

  const [loading, setLoading] = useState(false)

  const schema = yup.object().shape({
    queryType: yup.string().required("Please select an attribute to search by"),
    queryParameter: yup.string().required("Search parameter must be specified")
  })

  const defaultValues = {
    queryType: "",
    queryParameter: ""
  }

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues
  })

  const findBook = useZustand(state => state.findBook)

  const submitForm = async (data) => {
    setLoading(true)
    setTimeout(async () => {
      const response = await findBook(data)
      if (response.status === "Success") {
        toast.current.show({ severity: "success", summary: "Query Successful" })
        setLoading(false)
        reset()
      } else {
        setLoading(false)
        toast.current.show({ severity: "error", summary: "Query Unsuccessful", detail: response.detail })
      }

    }, 250)
  }

  return (
    <form className="crudTab card px-1  fadein animation-duration-300" style={{ gap: "1px" }} onSubmit={handleSubmit(submitForm)}>
      <Toast ref={toast} />

      <h2 className="text-primary text-center mb-1">Read</h2>

      <>
        <Controller name="queryParameter" control={control} render={({ field, fieldState }) => (
          <InputText {...field} placeholder="search parameter" autoComplete="off"
            className={classNames("p-1", { "p-invalid": fieldState.error })} />)} />
        <p className="overflow-text text-xs">{errors?.queryParameter?.message}</p>
      </>

      <>
        <Controller name="queryType" control={control} render={({ field, fieldState }) => (
          <Dropdown {...field} options={queryTypes} placeholder="search by"
            className={classNames("w-6 mx-auto", { "p-invalid": fieldState.error })} />)} />
        <p className="align-self-center text-xs">{errors?.queryType?.message}</p>
      </>

      <Button type="submit" label="Read" loading={loading} className="p-button-rounded mx-auto my-1 px-5 py-1" />
    </form>
  )

}

export default Read 