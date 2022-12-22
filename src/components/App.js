import React from "react"
import Signup from "./Signup"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import dashboard1 from "../components/UI/dashboard1"



function App() {
  return (
    <div className="iscls">
      <>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={dashboard1} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
            </Switch>
          </AuthProvider>
        </Router>
      </>
    </div>
  )
}

export default App
