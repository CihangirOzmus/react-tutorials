import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, Input, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import AppNavBar from './AppNavBar';
import axios from 'axios';

class UpdateToDoItem extends Component {

    emptyToDoItem = {
        id: '',
        name: '',
        description: '',
        created: '',
        deadline: '',
        status: ''
    }

    constructor(props){
        super(props);
        this.state = {
            toDoItem : this.emptyToDoItem,
            error: undefined
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdateToDoItem = this.handleUpdateToDoItem.bind(this);
    }

    componentDidMount(){
        axios.get(`/todoitem/${this.props.match.params.toDoItemId}`).then(response => {
            const toDoItem = response.data;
            this.setState({toDoItem});
          })
    }

    handleInputChange(e){
        let toDoItem = {...this.state.toDoItem};

        const target = e.target;
        const value = target.value;
        const name = target.name;
        toDoItem[name] = value;
        
        this.setState({toDoItem})
    }

    async handleUpdateToDoItem(e){
        e.preventDefault();
        const toDoListId = this.props.match.params.toDoListId;
        const {toDoItem} = this.state;
        await axios.put(`/todoitem/`, toDoItem); 
        this.props.history.push('/todolist/' + toDoListId + '/todoitems/')
    }

    render(){
        const toDoItem = this.state.toDoItem;
        return (
            <div>
                <AppNavBar/>
                    <div className="container-fluid text-center">
                    <h1 className="m-3">Update ToDoItem</h1>
                    <Form 
                        className="container border p-3"
                        onSubmit={this.handleUpdateToDoItem}>
                        <Row form>
                            <Col md={2}></Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Input type="text" name="name" value={toDoItem.name || ''} onChange={this.handleInputChange} autoComplete="name"/>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Input type="text" name="description" value={toDoItem.description || ''}
                                    onChange={this.handleInputChange} autoComplete="description" />
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
                                    defaultValue={toDoItem.deadline || ''}
                                    onChange={this.handleInputChange}
                                />
                                </FormGroup>                                                    
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <Input type="text" name="status" value={toDoItem.status || ''}
                                    onChange={this.handleInputChange} autoComplete="status"/>
                                </FormGroup>  
                            </Col>
                            <Col md={3}></Col>
                        </Row>
                        <Button color="warning" size="sm" className="mb-3">Update ToDoItem</Button>
                    </Form>
                    <p id="errorBox" className="text-danger">{this.state.error}</p>
                    </div>
            </div>
        )
    }

}

export default withRouter(UpdateToDoItem);