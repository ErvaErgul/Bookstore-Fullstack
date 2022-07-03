import { useRef, useState } from "react"

import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { classNames } from "primereact/utils"

import useZustand from "../../Hooks/useZustand"

import { Toast } from "primereact/toast"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { InputNumber } from "primereact/inputnumber"
import { Dropdown } from "primereact/dropdown"

const bookTypes = ["Novel", "Fiction", "Horror", "Drama", "Action"]

const Create = () => {

  const toast = useRef(null)

  const [loading, setLoading] = useState(false)

  const schema = yup.object().shape({
    name: yup.string().required("Name must be specified"),
    author: yup.string().required("Author must be specified"),
    type: yup.string().required("Please select a type"),
    price: yup.number().required("Price must be specified").typeError("Please enter a valid number"),
    stock: yup.number().required("Stock must be specified").typeError("Please enter a valid number"),
  })

  const defaultValues = {
    name: "",
    author: "",
    type: "",
    price: null,
    stock: null
  }

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues
  })

  const createBook = useZustand(state => state.createBook)
  const loadBooks = useZustand(state => state.loadBooks)

  const submitForm = async (data) => {
    setLoading(true)
    setTimeout(async () => {
      const response = await createBook(data)
      if (response.status === "Success") {
        toast.current.show({ severity: "success", summary: "Book Created", detail: response.detail })
        setLoading(false)
        loadBooks()
        reset()
      } else {
        setLoading(false)
        toast.current.show({ severity: "error", summary: "Book Creation Failed", detail: response.detail })
      }
    }, 300)
  }

  return (
    <form className="crudTab card px-1 fadein animation-duration-300" style={{ gap: "1px" }} onSubmit={handleSubmit(submitForm)}>
      <Toast ref={toast} />

      <h2 className="text-primary text-center mb-1">Create</h2>

      <>
        <Controller name="name" control={control} render={({ field, fieldState }) => (
          <InputText {...field} placeholder="name" autoComplete="off"
            className={classNames("p-1", { "p-invalid": fieldState.error })} />)} />
        <p className="text-xs">{errors?.name?.message}</p>
      </>

      <>
        <Controller name="author" control={control} render={({ field, fieldState }) => (
          <InputText {...field} placeholder="author" autoComplete="off"
            className={classNames("p-1", { "p-invalid": fieldState.error })} />)} />
        <p className="text-xs">{errors?.author?.message}</p>
      </>

      <>
        <Controller name="price" control={control} render={({ field, fieldState }) => (
          <InputNumber value={field.value} onValueChange={field.onChange} placeholder="price" autoComplete="off" mode="currency" currency="USD" min={0} max={1000} tooltip="Price per book" tooltipOptions={{ position: "top", className: "text-sm" }}
            inputClassName={classNames("flex-1 p-1", { "p-invalid": fieldState.error })} />)} />
        <p className="text-xs">{errors?.price?.message}</p>
      </>

      <>
        <Controller name="stock" control={control} render={({ field, fieldState }) => (
          <InputNumber value={field.value} onValueChange={field.onChange} placeholder="stock" autoComplete="off" min={0} max={1000} tooltip="Available stock" tooltipOptions={{ position: "top", className: "text-sm" }}
            inputClassName={classNames("flex-1 p-1", { "p-invalid": fieldState.error })} />)} />
        <p className="text-xs">{errors?.stock?.message}</p>
      </>

      <>
        <Controller name="type" control={control} render={({ field, fieldState }) => (
          <Dropdown {...field} options={bookTypes} placeholder="type"
            className={classNames("w-6 mx-auto", { "p-invalid": fieldState.error })} />)} />
        <p className="align-self-center text-xs">{errors?.type?.message}</p>
      </>

      <Button type="submit" label="Create" loading={loading} className="p-button-rounded mx-auto my-1 px-5 py-1" />
    </form>
  )

}

export default Create 