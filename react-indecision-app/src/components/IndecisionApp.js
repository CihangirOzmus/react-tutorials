import React from "react";
import Header from "./Header";
import Action from "./Action";
import Options from "./Options";
import AddOption from "./AddOption";
import OptionModal from "./OptionModal";

class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    };

    handlePick = () => {
        const randomOption = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomOption];
        this.setState(() => ({
            selectedOption: option
        }));
    };

    handleClearSelectedOption = () => {
        this.setState(() => ({selectedOption: undefined}));
    };

    handleDeleteOptions = () => {
        this.setState(() => ({options: []}));
    };

    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({options: prevState.options.filter((option) => optionToRemove !== option)}));
    };

    handleAddOption = (option) => {
        if (!option) {
            return "Enter a valid option!";
        } else if (this.state.options.indexOf(option) > -1) {
            return "This option is already exists.";
        }

        this.setState((prevState) => ({options: prevState.options.concat(option)}));
    };

    componentDidMount () {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if (options) {
                this.setState(() => ({options}));
            }
        } catch (error) {
            console.log("Unable to fetch data from localstorage...");
        }
    };

    componentDidUpdate (prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem("options", json);
        }
    };

    componentWillUnmount () {
        console.log("Component will unmount");
    };

    render () {
        const subtitle = "Put your life in the hands of a computer"

        return (
            <div>
                <Header subtitle={subtitle}/>
                <div className="container">
                    <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick}/>
                    <div className="widget">
                        <Options 
                            hasOptions={this.state.options.length > 0} 
                            options={this.state.options} 
                            handleDeleteOptions={this.handleDeleteOptions} 
                            handleDeleteOption={this.handleDeleteOption}
                        />
                        <AddOption handleAddOption={this.handleAddOption}/>
                    </div>
                </div>
                <OptionModal selectedOption={this.state.selectedOption} handleClearSelectedOption={this.handleClearSelectedOption}/>
            </div>
        )
    };
}

export default IndecisionApp;