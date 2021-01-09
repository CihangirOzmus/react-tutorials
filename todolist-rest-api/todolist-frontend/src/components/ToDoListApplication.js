import React, { Component } from 'react';
import { BrowserRouter , Route, Switch } from 'react-router-dom';
import ShowToDoListGroup from './ShowToDoListGroup';
import UpdateToDoListName from './UpdateToDoListName';
import ShowToDoItemGroup from './ShowToDoItemGroup';
import UpdateToDoItem from './UpdateToDoItem';

class ToDoListApplication extends Component{

    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact={true} component={ShowToDoListGroup}/>
                    <Route path='/todolist/:id' exact={true} component={UpdateToDoListName}/>
                    <Route path='/todolist/:id/todoitems' exact={true} component={ShowToDoItemGroup}/>
                    <Route path='/todolist/:toDoListId/todoitem/:toDoItemId' exact={true} component={UpdateToDoItem}/>
                </Switch>
            </BrowserRouter>
        )
    }
    
}

export default ToDoListApplication;