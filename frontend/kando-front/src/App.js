import React from "react"
import {connect} from "react-redux"
import Box from "@material-ui/core/Box"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Navbar from "./components/navbar"
import LogIn from "./components/login"
import SignUp from "./components/signup" 
import LogOut from "./components/logout"
import AuthRoute from "./components/authRoute"
import {localLogIn} from "./store/user"
import kanbanCreator from "./components/kanbanCreator"
import Dashboard from "./components/dashboard"
import { Typography } from "@material-ui/core"


class App extends React.Component{
  componentDidMount(){
    if(localStorage.getItem("token")) {this.props.localLogIn(localStorage.getItem("token"))}
  }
  render(){
    return (
      <Router>
        <Box mb={3}>
          <Navbar/>
        </Box>
        <Switch>
          <Route path="/login" component={LogIn} />
          <Route path="/signup" component={SignUp} />
          <AuthRoute path="/logout" component={LogOut} />
          <AuthRoute path="/dashboard" component={Dashboard} />
          <AuthRoute path="/createKanban" component={kanbanCreator} /> 
          <Route exact path="/">
            <Typography variant="h2" align="center">LOGIN OR SIGNUP TO CONTINUE.</Typography>
          </Route>
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  state : state
})

const mapDispatchToProps = dispatch => ({
  localLogIn: (token) => dispatch(localLogIn(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)