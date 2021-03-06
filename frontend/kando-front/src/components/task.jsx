import { Container, Button, MenuItem, Select, Typography, TextField, Grid, withStyles } from "@material-ui/core"
import React from "react"
import { connect } from "react-redux"
import { deleteTask, updateTask } from "../store/api"
import DeleteIcon from '@material-ui/icons/Delete';


const styles = (theme) => ({
    container: {
        border: "1px solid black",
        borderRadius: "10px",
        marginBottom: "10px",
        padding: "10px",
        backgroundColor: "#fff"
    }
})

class Task extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            selected: this.props.kanbanId,
            editableTaskName: false,
            task: {
                id: this.props.id,
                name: this.props.name,
                kanban: this.props.kanbanId
            }
        }
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleNameSubmit = this.handleNameSubmit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }


    handleSelectChange(e){
        this.setState({...this.state, selected: e.target.value, task: {...this.task, kanban: e.target.value}})

        // this is bad...
        this.props.updateTask(
            {
                id: this.props.id,
                name: this.props.name,
                kanban: this.props.kanbanId
            },
            {
                id: this.props.id,
                name: this.props.name,
                kanban: e.target.value
            }
        )
    }

    handleNameChange(e){
        this.setState({...this.state, task:{...this.state.task, name: e.target.value}})
    }

    handleNameSubmit(e){
        this.setState({...this.state, editableTaskName: false})
        this.props.updateTask({
            id: this.props.id,
            name: this.props.name,
            kanban: this.props.kanbanId
        }, {
            id: this.props.id,
            name: this.state.task.name,
            kanban: this.state.task.kanban
        })
    }

    handleDelete(e){
        this.props.deleteTask(this.props.id)
    }

    render(){
        const classes = this.props.classes
        return(
            <Container className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={5}
                    >
                        {!this.state.editableTaskName ? 
                            <div
                                style={{
                                    whiteSpace: "pre-wrap", 
                                    overflowX: "scroll",
                                    "scrollbar-width": "thin"
                                }}
                            >
                                <Typography 
                                    display="inline" 
                                    onClick={() => this.setState({...this.state, editableTaskName: true})}
                                    
                                    >{this.props.name}
                                </Typography>
                            </div>
                            :
                            <form onSubmit={this.handleNameSubmit}>
                                <TextField
                                    fullWidth
                                    autoFocus
                                    required={true}
                                    id="standard-required"
                                    value={this.state.task.name}
                                    onChange={this.handleNameChange}
                                />
                            </form>
                        }
                    </Grid>
                    <Grid item xs={3}>
                        <Select
                            fullWidth
                            value={this.state.selected}
                            // key={this.props.id}
                            // displayEmpty
                            onChange={this.handleSelectChange}
                        >
                            {/* <MenuItem>Test1</MenuItem>
                            <MenuItem>Test</MenuItem> */}
                            {this.props.kanbans.map(kanban => {
                                return <MenuItem key={kanban.id} value={kanban.id}>{kanban.name}</MenuItem>
                            })}
                        </Select>
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="secondary"
                            onClick={this.handleDelete}
                        >
                            <DeleteIcon />
                        </Button>
                    </Grid>
                </Grid>
                
            </Container>
        )
    }

}


const mapStateToProps = state => ({
    kanbans: state.kanbans,
})

const mapDispatchToProps = dispatch => ({
    deleteTask: (id) => {dispatch(deleteTask(id))},
    updateTask: (prevTask, task) => {dispatch(updateTask(prevTask, task))}
})

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(Task)
)