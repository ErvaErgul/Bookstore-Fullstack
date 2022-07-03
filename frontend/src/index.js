import React from "react"
import ReactDOM from "react-dom/client"

import axios from "axios"

import App from "./App"

import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"

import "./Assets/theme.css"
import "./Assets/themeChanges.css"
import "./Assets/index.css"
import "./Assets/utility.css"

axios.defaults.baseURL = "http://localhost:8080/"
axios.defaults.withCredentials = true

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <App />
)