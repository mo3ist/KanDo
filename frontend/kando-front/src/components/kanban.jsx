import { Box, Button, Container, Grid, TextField, Typography } from "@material-ui/core"
import React from "react"
import { connect } from "react-redux" 
import { createTask, deleteKanban, loadTasks, updateKanban } from "../store/api"
import Task from "./task"
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

class Kanban extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            editableTaskName: false,
            newTaskName: "",
            kanban:{
                name: this.props.name
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleNameSubmit = this.handleNameSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount(){
        // get the name and the tasks using this.props.id/name
        this.props.loadTasks(this.props.id)
    }

    handleSubmit(e){
        e.preventDefault()
        if (this.state.newTaskName) {
            this.props.createTask(this.state.newTaskName, this.props.id)
            this.setState({...this.state, newTaskName: ""})
        }
    }


    handleChange(e){
        this.setState({...this.state, newTaskName: e.target.value})
    }

    handleDelete(e){
        this.props.deleteKanban(this.props.id)
    }

    handleNameChange(e){
        this.setState({...this.state, kanban:{...this.state.kanban, name: e.target.value}})
    }

    handleNameSubmit(e){
        if (e.key === "Enter" && this.state.kanban.name !== this.props.name){
            this.setState({...this.state, editableTaskName: false})
            this.props.updateKanban({
                id: this.props.id,
                name: this.props.name,
                kanban: this.props.kanbanId
            }, {
                id: this.props.id,
                name: this.state.kanban.name,
            })
        }
    }

    render() {
        if (this.props.tasks[this.props.id]){
            return (
                <Container
                    style={{height: "100%", overflowY: "scroll", "scrollbar-width": "thin"}}
                >
                    <Box mb={3}

                    >
                        <Grid container spacing={3}
                            style={{
                                borderBottom: "2px solid black",
                                borderRadius: "10px"
                            }}
                        >
                            <Grid item xs={8}
                                
                            >
                                {!this.state.editableTaskName ? 
                                <Typography variant="h4" display="inline" onClick={() => this.setState({...this.state, editableTaskName: true})}>{this.props.name}</Typography>
                                :
                                <TextField
                                    autoFocus
                                    fullWidth
                                    value={this.state.kanban.name}
                                    onChange={this.handleNameChange}
                                    onKeyDown={this.handleNameSubmit}
                                />
                                }
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    size="small"
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    onClick={this.handleDelete}
                                >
                                    <DeleteIcon />
                                </Button>
                            </Grid>
                        </Grid> 
                    </Box>
                    {this.props.tasks[this.props.id].map(task => {
                        return (
                            <Task key={task.id} name={task.name} kanbanId={this.props.id} id={task.id} />
                        )
                    })}
                    <form onSubmit={this.handleSubmit}>
                        <TextField 
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Task name"
                            name="taskname"
                            value={this.state.newTaskName}
                            onChange={this.handleChange}
                        />
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={this.handleSubmit}
                        >
                            <AddCircleOutlineIcon />
                        </Button>
                    </form>

                </Container>
            )
        }
        return (
            <h1>NONE</h1>
        )
    }

}
const mapStateToProps = state => ({
    tasks: state.tasks
})

const mapDispatchToProps = dispatch => ({
    loadTasks: (id) => {dispatch(loadTasks(id))},
    createTask: (name, kanbanId) => {dispatch(createTask(name, kanbanId))},
    updateKanban: (prevKanban, kanban) => {dispatch(updateKanban(prevKanban, kanban))},
    deleteKanban: (id) => {dispatch(deleteKanban(id))}
})

export default connect(mapStateToProps, mapDispatchToProps)(Kanban)