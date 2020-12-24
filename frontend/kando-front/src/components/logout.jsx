import React from "react"
import { connect } from "react-redux"
import {Redirect} from "react-router-dom"
import { logOutAction } from "../store/user"

class LogOut extends React.Component {
    componentDidMount(){
        this.props.logOut()
        localStorage.removeItem("token")
    }

    render(){
        return (
            <Redirect to="/login/"/>
        )
    }
}


const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    logOut: () => {dispatch(logOutAction())}
})

export default connect(mapStateToProps, mapDispatchToProps)(LogOut)