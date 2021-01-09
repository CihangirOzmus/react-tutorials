import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import AppNavBar from "./AppNavBar";
import axios from 'axios';

class ShowToDoListGroup extends Component {

  constructor(props){
    super(props);
    this.state = { 
      toDoListGroup : [], 
      error : undefined, 
    };
    this.handleCreateToDoList = this.handleCreateToDoList.bind(this);
    this.handleRemoveToDoList = this.handleRemoveToDoList.bind(this);
    this.handleErrorForCreate = this.handleErrorForCreate.bind(this);
  }

  componentDidMount(){
    axios.get(`/todolist/all`).then(response => {
      const toDoListGroup = response.data;
      this.setState({toDoListGroup});
    })
  }

  handleErrorForCreate(checkToDoListName){
    if(!checkToDoListName){
      return "Enter valid ToDolist name!";
    }

    const existingToDoListGroup = this.state.toDoListGroup;
    const number = existingToDoListGroup.map(todolist => todolist.name).indexOf(checkToDoListName);

    if(number > -1){
      return "This todolist is already exist!";
    }
  }

  handleCreateToDoList(e){
    e.preventDefault();
    const newToDoList = e.target.elements.toDoListNameInput.value.trim();
    const error = this.handleErrorForCreate(newToDoList);

    this.setState({error});

    if(!error){
      axios.post(`/todolist/`, { name : newToDoList})
      .then(res => {
        this.setState(prevState => {
          return {
            toDoListGroup: prevState.toDoListGroup.concat(res.data)
          }
        })
      });

      e.target.elements.toDoListNameInput.value = '';
    }
    
  }

  handleRemoveToDoList(toDoListId){
    axios.delete(`/todolist/${toDoListId}`)
      .then(response => {
        let updatedToDoListGroup = [...this.state.toDoListGroup].filter(i => i.id !== toDoListId)
        this.setState({toDoListGroup : updatedToDoListGroup})
      })
  }

  render() {
    const toDoListGroup = this.state.toDoListGroup;
    const toDoListTable = toDoListGroup.map((todolist, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index+1}</th>
          <td>{todolist.name}</td>
          <td>
              <Button 
                className="mr-2" 
                color="info" 
                size="sm"
                tag={Link}
                to={"/todolist/" + todolist.id + "/todoitems/"}
                >To Do Items</Button>
              <Button 
                className="mr-2" 
                color="warning" 
                size="sm" 
                tag={Link}
                to={"/todolist/" + todolist.id}
                >Update</Button>
              <Button 
                color="danger" 
                size="sm"
                onClick={() => this.handleRemoveToDoList(todolist.id)}
                >Delete</Button>
          </td>
        </tr>
      )
    })

    return (
      <div>
        <AppNavBar/>
        <div className="container text-center">
        <h1 className="m-3">ToDoList Group</h1>
          <Form inline 
            className="justify-content-center m-2"
            onSubmit={this.handleCreateToDoList}
            >
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="toDoListName" className="mr-sm-2">Name</Label>
              <Input type="text" name="toDoListNameInput" id="toDoListName" />
            </FormGroup>
            <Button color="primary" outline>Create New ToDoList</Button>
          </Form>
          <p id="errorBox" className="text-danger">{this.state.error}</p>
          <Table hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {toDoListTable}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }

}

export default ShowToDoListGroup;
