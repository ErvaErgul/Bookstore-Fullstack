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
import { Slider } from "primereact/slider"

const attributeTypes = ["price", "stock"]

const Update = () => {

  const toast = useRef(null)

  const [loading, setLoading] = useState(false)

  const schema = yup.object().shape({
    bookId: yup.number().required().typeError("Please enter the id of the book"),
    attributeToUpdate: yup.string().required("Please select an attribute to update"),
    newValue: yup.number().required("New value must be specified").positive("Please specify the new value").typeError("Please enter a valid number"),
  })

  const updateBook = useZustand(state => state.updateBook)
  const loadBooks = useZustand(state => state.loadBooks)

  const defaultValues = {
    bookId: "",
    attributeToUpdate: "",
    newValue: 0
  }

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues
  })

  const submitForm = async (data) => {
    setLoading(true)
    setTimeout(async () => {
      const response = await updateBook(data)
      if (response.status === "Success") {
        toast.current.show({ severity: "success", summary: "Update Successful", detail: response.detail })
        setLoading(false)
        loadBooks()
        reset()
      } else {
        setLoading(false)
        toast.current.show({ severity: "error", summary: "Update Unsuccessful", detail: response.detail })
      }
    }, 250)
  }

  return (
    <form className="crudTab card px-1  fadein animation-duration-300" style={{ gap: "1px" }} onSubmit={handleSubmit(submitForm)}>
      <Toast ref={toast} />

      <h2 className="text-primary text-center mb-1">Update</h2>

      <>
        <Controller name="bookId" control={control} render={({ field, fieldState }) => (
          <InputText {...field} placeholder="id" keyfilter="pint"
            className={classNames("p-1", { "p-invalid": fieldState.error })} />)} />
        <p className="text-xs">{errors?.bookId?.message}</p>
      </>

      <>
        <Controller name="attributeToUpdate" control={control} render={({ field, fieldState }) => (
          <Dropdown {...field} options={attributeTypes} placeholder="attribute to update"
            className={classNames("w-6 mx-auto", { "p-invalid": fieldState.error })} />)} />
        <p className="align-self-center text-xs">{errors?.attributeToUpdate?.message}</p>
      </>

      <>
        <Controller name="newValue" control={control} render={({ field, fieldState }) => (
          <>
            <Slider value={field.value} onChange={(e) => field.onChange(e.value)}
              className={classNames("w-6 mx-auto mt-3", { "p-invalid": fieldState.error })}
            />
            <p className="align-self-center">{field.value}</p>
          </>
        )} />
        <p className="align-self-center text-xs">{errors?.newValue?.message}</p>
      </>

      <Button type="submit" label="Update" loading={loading} className="p-button-rounded mx-auto mt-1 px-5 py-1" />
    </form>
  )

}

export default Update 