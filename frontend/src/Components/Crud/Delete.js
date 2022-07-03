import { useRef, useState } from "react"

import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { classNames } from "primereact/utils"

import useZustand from "../../Hooks/useZustand"

import { Toast } from "primereact/toast"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"

const Delete = () => {

  const toast = useRef(null)

  const [loading, setLoading] = useState(false)

  const schema = yup.object().shape({
    bookId: yup.string().required("Please enter book Id")
  })

  const defaultValues = {
    bookId: ""
  }

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues
  })

  const deleteBook = useZustand(state => state.deleteBook)
  const loadBooks = useZustand(state => state.loadBooks)

  const submitForm = async (data) => {
    setLoading(true)
    setTimeout(async () => {
      const response = await deleteBook(data.bookId)
      if (response.status === "Success") {
        toast.current.show({ severity: "success", summary: "Delete Successful", detail: response.detail })
        setLoading(false)
        loadBooks()
        reset()
      } else {
        setLoading(false)
        toast.current.show({ severity: "error", summary: "Delete Unsuccessful", detail: response.detail })
      }
    }, 250)
  }

  return (
    <form className="crudTab card px-1 fadein animation-duration-300" style={{ gap: "1px" }} onSubmit={handleSubmit(submitForm)}>
      <Toast ref={toast} />

      <h2 className="text-primary text-center mb-1">Delete</h2>

      <>
        <Controller name="bookId" control={control} render={({ field, fieldState }) => (
          <InputText {...field} placeholder="id of book" keyfilter="pint"
            className={classNames("p-1", { "p-invalid": fieldState.error })} />)} />
        <p className="text-xs">{errors?.bookId?.message}</p>
      </>

      <Button type="submit" label="Delete" loading={loading} className="p-button-rounded mx-auto mt-1 px-5 py-1" />
    </form>
  )

}

export default Delete 