import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, Input, Button, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import AppNavBar from './AppNavBar';
import axios from 'axios';

class ShowToDoItemGroup extends Component{
    
    emptyToDoList = {
        id: '',
        name: '',
        toDoItems: []
    };

    dateNow = new Date().toISOString().substring(0,10);

    constructor(props){
        super(props);
        this.state = {
            toDoList : this.emptyToDoList, 
            error : undefined 
        }
        this.handleRemoveToDoItem = this.handleRemoveToDoItem.bind(this);
        this.handleAddToDoItem = this.handleAddToDoItem.bind(this);
        this.handleErrorAddToDoItem = this.handleErrorAddToDoItem.bind(this);
    }

    async componentDidMount(){
        await axios.get(`/todolist/${this.props.match.params.id}`).then(response => {
            const toDoList = response.data;
            this.setState({toDoList});
          })
    }

    handleErrorAddToDoItem(nameInput, date){
        if(!nameInput){
            return "Enter valid ToDoItem name!";
        } else if (!date){
            return "Enter deadline!";
        } else if (this.dateNow > date) {
            return `Deadline has to be after today(${this.dateNow})`;
        }
    }

    async handleAddToDoItem(e){
        e.preventDefault();
        console.log(this.dateNow);

        const nameInput = e.target.elements.nameInput.value.trim();
        const descriptionInput = e.target.elements.descriptionInput.value.trim();
        const date = e.target.elements.date.value.trim();
        const statusInput = e.target.elements.statusInput.value.trim();

        const newToDoItem = {
            name: nameInput,
            description: descriptionInput,
            status: statusInput,
            deadline: date
        }

        const error = this.handleErrorAddToDoItem(nameInput, date);
        this.setState({error});

        if(!error){
            let createdToDoItem = {};

            e.target.elements.nameInput.value = '';
            e.target.elements.descriptionInput.value = '';
            e.target.elements.date.value = '';
            e.target.elements.statusInput.value = '';

            await axios.post(`/todoitem/`, newToDoItem)
                .then(res => {
                    createdToDoItem = res.data;
                });
    
            await axios.put(`/todolist/${this.props.match.params.id}`, createdToDoItem)
                .then(res => {
                    this.setState({toDoList : res.data});
                })
        }

        
    }

    handleRemoveToDoItem(toDoItemId){
        axios.delete(`/todoitem/${toDoItemId}`)
        .then(response => { 
            let updatedToDoList = this.state.toDoList;
            let updatedToDoItems = [...this.state.toDoList.toDoItems].filter(i => i.id !== toDoItemId)
            updatedToDoList.toDoItems = updatedToDoItems;
            this.setState({toDoList : updatedToDoList})
        })
    }

    render(){
        const toDoItems = this.state.toDoList.toDoItems;
        const toDoItemsTable = toDoItems.map((toDoItem, index) => {
            return (
                <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{toDoItem.name}</td>
                <td>{toDoItem.description}</td>
                <td>{toDoItem.created}</td>
                <td>{toDoItem.deadline}</td>
                <td>{toDoItem.deadline < this.dateNow ? "Expired" : toDoItem.status}</td>
                <td>
                    <Button
                        className="mr-2" 
                        color="warning" 
                        size="sm" 
                        tag={Link}
                        to={"/todolist/"+ this.props.match.params.id + "/todoitem/" + toDoItem.id}
                        >Update</Button>
                    <Button 
                        color="danger" 
                        size="sm"
                        onClick={() => this.handleRemoveToDoItem(toDoItem.id)}
                        >Delete</Button>
                </td>
                </tr>
            )
        })

        return (
            <div>
                <AppNavBar/>
                <div className="container-fluid text-center">
                <h1 className="m-3">{this.state.toDoList.name}</h1>
                <Form 
                    className="container border p-3"
                    onSubmit={this.handleAddToDoItem}>
                    <Row form>
                        <Col md={2}></Col>
                        <Col md={4}>
                            <FormGroup>
                                <Input type="text" name="nameInput" placeholder="name" />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Input type="text" name="descriptionInput" placeholder="description" />
                            </FormGroup>
                        </Col>
                        <Col md={2}></Col>
                    </Row>
                    {/* <Row form>
                        <Col md={4}></Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="exampleSelectMulti">Requires Following ToDoItems</Label>
                                <Input
                                    type="select"
                                    name="selectMulti"
                                    id="exampleSelectMulti"
                                    multiple
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={4}></Col>
                    </Row> */}
                    <Row form>
                        <Col md={3}></Col>
                        <Col md={1}>Deadline:</Col>
                        <Col md={2}>
                            <FormGroup>
                            <Input
                                type="date"
                                name="date"
                                id="exampleDate"
                                placeholder="date placeholder"
                            />
                            </FormGroup>                                                    
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Input type="text" name="statusInput" placeholder="status" />
                            </FormGroup>  
                        </Col>
                        <Col md={3}></Col>
                    </Row>
                    <Button color="primary" size="sm" className="mb-3">Add ToDoItem</Button>
                </Form>
                <p id="errorBox" className="text-danger">{this.state.error}</p>
                <Table hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Created</th>
                    <th>Deadline</th>
                    <th>Status</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {toDoItemsTable}
                </tbody>
                </Table>
                </div>
            </div>
        )
    }

}

export default ShowToDoItemGroup;