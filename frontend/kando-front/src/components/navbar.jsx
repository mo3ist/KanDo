import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import { Grid } from "@material-ui/core"

class Navbar extends React.Component{

    render(){
        return (
            <AppBar position="static" color="default">
                {!this.props.user.logged_in && 
                <Toolbar>
                    <Grid container spacing={3}>

                        <Grid item xs={8}>
                            <Typography component="h1" variant="h3">Home</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Button component={ Link } to="/login" color="default" variant="outlined" fullWidth>Login</Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Button component={ Link } to="/signup" color="default" variant="outlined" fullWidth> Signup</Button>
                        </Grid>
                    </Grid>
                </Toolbar>
                }
                {this.props.user.logged_in &&
                <Toolbar>
                    <Grid container spacing={3}>
                        <Grid item xs={10}>
                            <Typography component="h1" variant="h3">Dashboard</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Button component={ Link } to="/logout" color="default" variant="outlined" fullWidth> Logout </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            
                }
            </AppBar>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)