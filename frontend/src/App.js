import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import ApplicationLayout from "./Routes/ApplicationLayout"
import AttemptAuthentication from "./Routes/AttemptAuthentication"
import Redirect from "./Routes/Redirect"

import About from "./Pages/About"
import Authentication from "./Pages/Authentication"
import Crud from "./Pages/Crud"
import NotFound from "./Pages/NotFound"
import Profile from "./Pages/Profile"
import Store from "./Pages/Store"

import useZustand from "./Hooks/useZustand"

const App = () => {

  console.log("App")

  const refreshJwt = useZustand(state => state.refreshJwt)

  useEffect(() => {
    const refreshJwtPeriodically = setInterval(() => {
      refreshJwt()
    }, 3590000)
    return () => clearInterval(refreshJwtPeriodically)
    // eslint-disable-next-line
  }, [])

  return (
    <Router>
      <Routes>
        <Route element={<AttemptAuthentication />}>
          <Route element={<ApplicationLayout />}>


            <Route element={<Redirect redirectCondition={"authenticationUnnecessary"} />}>
              <Route path="/authentication" element={<Authentication />} />
            </Route>

            <Route element={<Redirect redirectCondition={"authenticationNecessary"} />}>
              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route element={<Redirect redirectCondition={"adminOnly"} />}>
              <Route path="/crud" element={<Crud />} />
            </Route>

            <Route path="/" element={<Store />} />
            <Route path="/about" element={<About />} />

            <Route path="*" element={<NotFound />} />


          </Route>
        </Route>
      </Routes>
    </Router>
  )

}

export default App