import Container from '@material-ui/core/Container';
import React from "react"
import { connect } from "react-redux"
import { loadKanbans, loadTasks } from "../store/api"
import Kanban from "./kanban"
import { Button, GridList, GridListTile, Typography, withStyles } from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import KanbanCreator from "./kanbanCreator";

const styles = (theme) => ({
    container : {
        display: 'grid',
        // flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        // border: "3px solid black",
        // borderRadius: "10px",
        padding: "10px",
    },
    gridListContainer: {
        height: "65vh",
        border: "3px solid black",
        // borderBottom: "0px",
        borderRadius: "10px 10px 0px 0px",
        overflow: "hidden",
        padding: "10px"
    },
    gridList: {
        flexWrap: 'nowrap',
        height: "100%",
        width: "100%"
    },
    gridTile: {
        width: "100% !important",  // for smol
        
        [theme.breakpoints.up('md')]: {     // for big
            width: "50% !important"
        },
        "&:first-child:nth-last-child(1)": {    // fill all when big and just 1 child
            width: "100% !important"
        },
        height: "90% !important",
        // justifySelf: "center",
        alignSelf: "center",
        border: "3px solid black",
        borderRadius: "10px",
        marginRight: "10px",
        padding: "10px !important",
        backgroundColor: "#eceff1"
    },
    button: {
        border: "3px solid black",
        borderTop: "0px",
        borderRadius: "0px 0px 10px 10px"
    }
})

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
        const classes = this.props.classes
        if (this.props.kanbans){
            return(
                <Container className={classes.container}>
                    <div className={classes.gridListContainer}>
                        { Object.keys(this.props.kanbans).length > 0 
                        ?
                        <GridList
                            className={classes.gridList}
                        >
                            {this.props.kanbans.map(kanban => (
                            <GridListTile
                                    key={kanban.id}
                                    className={classes.gridTile}
                                >
                                    <Kanban key={kanban.id} name={kanban.name} id={kanban.id} 
                                        style={{height: "500px"}}
                                    />    
                            </GridListTile>
                            )
                            )}
                        </GridList>
                        : 
                        <Typography
                            variant="h3"
                        >
                            No Kanbans found, create one to start!
                        </Typography>
                        }
                    </div>
                    {!this.state.showCreator ?
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={this.handleSwitchingCreator}
                            className={classes.button}
                        >
                            <AddCircleOutlineIcon />
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

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(Dashboard)
)