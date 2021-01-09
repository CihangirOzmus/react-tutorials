import React from 'react';
import {Collapse, Navbar, NavbarBrand, NavbarToggler} from "reactstrap";

class AppNavBar extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand href="/">ToDoList Application</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        {/* <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="#">Sign Up</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#">Log In</NavLink>
                            </NavItem>
                            </Nav> */}
                    </Collapse>
                </Navbar>
            </div>
        );
    }
    
}

export default AppNavBar;