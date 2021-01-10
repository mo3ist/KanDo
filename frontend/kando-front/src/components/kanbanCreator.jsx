import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Box from "@material-ui/core/Box"
import {connect} from "react-redux"
import { ButtonGroup, withStyles } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { createKanban } from "../store/api";

const styles = () => ({
    container: {
        border: "3px solid black",
        borderTop: "0px",
        borderRadius: "0px 0px 10px 10px",
        padding: "20px"
    }
})

class KanbanCreator extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: "",
        }

        this.classes = this.useStyles
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        this.setState({...this.state, [e.target.name]: e.target.value})
    }

    handleSubmit (){
        if (this.state.name) {this.props.createKanban(this.state.name)}
        this.props.onCancel()
    }

    render(){
        const classes = this.props.classes
        return (
            <Container className={classes.container}>
                {this.state.exit && <Redirect to="/dashboard" />}
                <Box>
                    <Typography>Create Kanban</Typography>
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Name"
                            name="name"
                            onChange={this.handleChange}
                            autoFocus
                        />
                        <ButtonGroup
                            fullWidth    
                        >
                            <Button
                                variant="outlined"
                                onClick={this.handleSubmit}
                            >
                                Save
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={this.props.onCancel}
                            >
                                Cancel
                            </Button>
                        </ButtonGroup>
                        </form> 

                </Box>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    createKanban: (name) => {dispatch(createKanban(name))}
})

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(KanbanCreator)
)