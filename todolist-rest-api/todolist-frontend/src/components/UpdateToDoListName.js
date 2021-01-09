import React, { Component } from 'react';
import { Form, FormGroup, Input, Button} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import AppNavBar from './AppNavBar';
import axios from 'axios';

class UpdateToDoListName extends Component {

    emptyToDoList = {
        id: '',
        name: ''
    };

    constructor(props){
        super(props);
        this.state = { 
            toDoListGroup:[],
            toDoList : this.emptyToDoList, 
            error : undefined 
          };
        this.handleUpdateToDoListNameSubmit = this.handleUpdateToDoListNameSubmit.bind(this);
        this.handleErrorUpdateToDoListNameSubmit = this.handleErrorUpdateToDoListNameSubmit.bind(this);
    }

    async componentDidMount(){
        await axios.get(`/todolist/${this.props.match.params.id}`).then(response => {
            const toDoList = response.data;
            this.setState({toDoList});
          })

        axios.get(`/todolist/all`).then(response => {
        const toDoListGroup = response.data;
        this.setState({toDoListGroup});
        })
    }

    handleErrorUpdateToDoListNameSubmit(newToDoListName){
        if(!newToDoListName){
            return "Enter a valid to do list name!"
        }
        const existingToDoListGroup = this.state.toDoListGroup;
        const number = existingToDoListGroup.map(todolist => todolist.name).indexOf(newToDoListName);

        if(number > -1){
        return "This todolist is already exist!";
        }
    }

    async handleUpdateToDoListNameSubmit(e){
        e.preventDefault();
        const newName = e.target.elements.toDoListNameInput.value.trim();
        const error = this.handleErrorUpdateToDoListNameSubmit(newName);

        if(error){
            this.setState({error})
        }
        
        if(!error){
            let updatedToDoList = {...this.state.toDoList}
            updatedToDoList.name = newName;

            await axios.put(`/todolist/`, updatedToDoList)
                .then(res => {
                    this.setState({toDoList : res.data})
                })
                
            this.props.history.push('/')
        }
    }

    render(){
        return (
            <div>
                <AppNavBar/>
                <div className="container text-center">
                <h1 className="m-3">{this.state.toDoList.name}</h1>
                    <Form inline 
                    className="justify-content-center m-2"
                    onSubmit={this.handleUpdateToDoListNameSubmit}
                    >
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input
                            type="text" 
                            name="toDoListNameInput"
                        />
                    </FormGroup>
                    <Button color="primary">Update ToDoList Name</Button>
                    </Form>
                    <p className="text-danger">{this.state.error}</p>
                </div>                          
            </div>
        )
    }
    
}

export default withRouter(UpdateToDoListName);
