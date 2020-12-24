import Container from '@material-ui/core/Container';
import React from "react"
import { connect } from "react-redux"
import { loadKanbans, loadTasks } from "../store/api"
import Kanban from "./kanban"
import { Box, Button } from "@material-ui/core";
import KanbanCreator from "./kanbanCreator";

class Dashboard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showCreator: false
        }
        this.handleSwitchingCreator = this.handleSwitchingCreator.bind(this)
    }

    componentDidMount(){
        this.props.loadKanbans()        
    }


    handleSwitchingCreator(e){
        this.setState({...this.state, showCreator: !this.state.showCreator})
    }

    render(){
        if (this.props.kanbans){
            return(
                <Container>
                    {this.props.kanbans.map(kanban => (
                        <Box key={kanban.id} my={3} p={3} border={1} borderRadius={5}>
                            <Kanban key={kanban.id} name={kanban.name} id={kanban.id} />    
                        </Box>
                        )
                    )}
                    {!this.state.showCreator ?
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={this.handleSwitchingCreator}
                        >
                            Create Kanban
                        </Button>
                    :
                        <KanbanCreator onCancel={this.handleSwitchingCreator}/>

                    }
                </Container>
            )
        }
        else {
            return (
                <KanbanCreator />
            )
        }
    }
} 

const mapStateToProps = state => ({
    kanbans: state.kanbans,
    tasks: state.tasks
})

const mapDispatchToProps = dispatch => ({
    loadKanbans: () => {dispatch(loadKanbans())},
    loadTasks: (kanbanId) => {dispatch(loadTasks(kanbanId))}

})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)