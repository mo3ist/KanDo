import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Box from "@material-ui/core/Box"
import {makeStyles} from "@material-ui/core/styles"

import {connect} from "react-redux"
import {signUpAction} from "../store/api"
import { Redirect } from "react-router-dom";

class SignUp extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: "",
            username: "",
            password: ""
        }

        this.classes = this.useStyles
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    useStyles = makeStyles( theme => ({
        form: {
          marginTop: theme.spacing(1)
        },
        submit: {
          marginTop: theme.spacing(2)
        },
      }))
    
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.signUp(this.state)
    }

    handleChange = (e) => {
        this.setState({...this.state, [e.target.name]: e.target.value})
    }


    componentDidUpdate(prev, current){
        if(this.props.user.logged_in){
            localStorage.setItem("token", this.props.user.token)
        }
    }
    
    render() {
        return (
            <Container maxWidth="xs" >
                { this.props.user.logged_in && <Redirect to="/dashboard" /> }
                <Box border={1} borderRadius={5} p={2}>
                    <Typography component="h1" variant="h5">
                    Sign Up
                    </Typography>
                    <form className={this.classes.form} method="POST" onSubmit={this.handleSubmit}>
                    <TextField 
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Name"
                        name="name"
                        autoFocus
                        onChange={this.handleChange}
                    />
                    <TextField 
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        name="username"
                        onChange={this.handleChange}
                    />
                    <TextField 
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        label="Password"
                        name="password"
                        onChange={this.handleChange}                    
                    />
                    <Button
                        variant="outlined"
                        margin="normal"
                        type="submit"
                        fullWidth
                        className={this.classes.submit}
                        onClick={this.handleSubmit}
                    >
                        Sign Up
                    </Button>
                    </form> 
                </Box>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    signUp: (cred) => {dispatch(signUpAction(cred))}
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
