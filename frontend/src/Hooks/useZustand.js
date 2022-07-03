import create from "zustand"
import axios from "axios"

const sampleCrudOperation1 = {
  type: "Create",
  status: "Success",
  detail: "This is a sample operation that describes a successful operation."
}

const sampleCrudOperation2 = {
  type: "Delete",
  status: "Failure",
  detail: "This is a sample operation that describes why an operation was unsuccessful."
}

const useZustand = create((set, get) => ({

  /* Global State */

  appLoading: false,
  setAppLoading: (booleanValue) => { set({ isAppLoading: booleanValue }) },

  /* Global State */




  /* Book Related */

  books: [],

  loadBooks: async () => {
    set({ appLoading: true })
    const response = await axios.get("books")
    set({ books: response.data })
    set({ appLoading: false })
  },

  loadStoreBooks: async (queryDetails) => {
    set({ appLoading: true })
    try {
      const response = await axios.get("books/" + queryDetails)
      set({ books: response.data })
      set({ appLoading: false })
    } catch (error) {
      set({ books: [] })
      set({ appLoading: false })
    }
  },

  crudOperationHistory: [sampleCrudOperation1, sampleCrudOperation2, sampleCrudOperation1, sampleCrudOperation2, sampleCrudOperation1, sampleCrudOperation2, sampleCrudOperation1, sampleCrudOperation2, sampleCrudOperation1, sampleCrudOperation2, sampleCrudOperation1, sampleCrudOperation2, sampleCrudOperation1, sampleCrudOperation2, sampleCrudOperation2, sampleCrudOperation2, sampleCrudOperation2, sampleCrudOperation1, sampleCrudOperation1, sampleCrudOperation2],

  createBook: async (bookDTO) => {
    const crudOperation = { type: "Create", status: "", detail: "" }
    try {
      const response = await axios.post("books", bookDTO)
      if (response.status === 201) {
        crudOperation.status = "Success"
        crudOperation.detail = response.data
      }
    } catch (error) {
      crudOperation.status = "Fail"
      crudOperation.detail = error.response.data
    } finally {
      set(state => ({ crudOperationHistory: [...state.crudOperationHistory, crudOperation] }))
      return crudOperation
    }
  },

  findBook: async (queryDetails) => {
    const crudOperation = { type: "Read", status: "" }
    try {
      const response = await axios.get("books/" + queryDetails.queryType + "=" + queryDetails.queryParameter)
      if (response.status === 200) {
        crudOperation.status = "Success"
        set({ books: response.data })
      }
    } catch (error) {
      crudOperation.status = "Fail"
      crudOperation.detail = error.response.data
    } finally {
      set(state => ({ crudOperationHistory: [...state.crudOperationHistory, crudOperation] }))
      return crudOperation
    }
  },

  updateBook: async (updateDetails) => {
    const crudOperation = { type: "Update", status: "", detail: "" }
    try {
      const response = await axios.put("books/" + updateDetails.bookId + "/" + updateDetails.attributeToUpdate + "=" + updateDetails.newValue)
      if (response.status === 200) {
        crudOperation.status = "Success"
        crudOperation.detail = response.data
      }
    } catch (error) {
      crudOperation.status = "Fail"
      crudOperation.detail = error.response.data
    } finally {
      set(state => ({ crudOperationHistory: [...state.crudOperationHistory, crudOperation] }))
      return crudOperation
    }
  },

  deleteBook: async (bookId) => {
    const crudOperation = { type: "Delete", status: "", detail: "" }
    try {
      const response = await axios.delete("books/" + bookId)
      if (response.status === 200) {
        crudOperation.status = "Success"
        crudOperation.detail = response.data
      }
    } catch (error) {
      if (error.response.status === 500) {
        crudOperation.status = "Fail"
        crudOperation.detail = "Can not delete book because it is in someones cart"
      } else {
        crudOperation.status = "Fail"
        crudOperation.detail = error.response.data
      }
    } finally {
      set(state => ({ crudOperationHistory: [...state.crudOperationHistory, crudOperation] }))
      return crudOperation
    }
  },

  /* Book Related */



  /* User Related */

  userAuthenticated: false,
  userUsername: null,
  userAuthority: null,
  userCartItems: [],

  register: async (registerDTO) => {
    try {
      const response = await axios.post("users", registerDTO)
      if (response.status === 201) {
        return "success"
      }
    } catch (error) {
      return error.response.data
    }
  },

  login: async (loginDTO) => {
    try {
      const response = await axios.post("authentication/login", loginDTO)
      if (response.status === 200) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt
        set({ userAuthenticated: true })
        set({ userUsername: response.data.username })
        set({ userAuthority: response.data.authority })
        set({ userCartItems: response.data.cartItems })
        return "success"
      }
    } catch (error) {
      return error.response.data
    }
  },

  logout: async () => {
    set({ appLoading: true })
    try {
      const response = await axios.delete("authentication/logout")
      if (response.status === 204) {
        axios.defaults.headers.common["Authorization"] = ""
        set({ userAuthenticated: false })
        set({ userUsername: null })
        set({ userAuthority: null })
        set({ userCartItems: [] })
      }
    } catch (error) {
      console.log(error.response.data)
    } finally {
      set({ appLoading: false })
    }
  },

  refreshJwt: async () => {
    try {
      const response = await axios.put("authentication/refreshJwt")
      if (response.status === 200) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt
        set({ userAuthenticated: true })
        set({ userUsername: response.data.username })
        set({ userAuthority: response.data.authority })
        set({ userCartItems: response.data.cartItems })
      }
    } catch (error) {
      console.log(error.response.data)
    }
  },

  addToCart: async ({ bookId, inputAmount }) => {
    const username = get().userUsername
    try {
      let amount = 1
      if (inputAmount != null) {
        amount = inputAmount;
      }
      const response = await axios.post(username + "/cart/" + bookId + "/x" + amount)
      if (response.status === 200) {
        set({ userCartItems: response.data })
        return "success"
      }
    } catch (error) {
      return error.response.data
    }
  },

  removeFromCart: async (bookId) => {
    const username = get().userUsername
    try {
      const response = await axios.delete(username + "/cart/" + bookId)
      if (response.status === 200) {
        set({ userCartItems: response.data })
        return "success"
      }
    } catch (error) {
      return error.response.data
    }
  },

  clearCart: async () => {
    const username = get().userUsername
    try {
      const response = await axios.delete(username + "/cart")
      if (response.status === 200) {
        set({ userCartItems: [] })
        return "success"
      }
    } catch (error) {
      return error.response.data
    }
  },

  checkAmountOfAGivenBookInCart: (bookId) => {
    const userCartItems = get().userCartItems
    let amount = 0
    if (userCartItems.length > 0) {
      userCartItems.forEach(cartItem => {
        if (cartItem.book.id === bookId) {
          amount = cartItem.amount
        }
      })
    }
    return amount
  },

  cartTotal: 0,

  getCartTotal: async () => {
    const username = get().userUsername
    try {
      const response = await axios.get(username + "/cart/total")
      set({ cartTotal: response.data })
      return response.data
    } catch (error) {
      set({ cartTotal: "bug" })
    }
  }

  /* User Related */

}))

export default useZustand