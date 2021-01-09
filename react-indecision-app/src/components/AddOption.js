import React from "react";

class AddOption extends React.Component {

    state = {
        error: undefined
    }

    formHandleAddOption = (e) => {
        e.preventDefault();
        const newOption = e.target.elements.newOption.value.trim();
        const error = this.props.handleAddOption(newOption);

        this.setState(() => ({error}));

        if (!error) {
            e.target.elements.newOption.value = '';
        }
    };

    render () {
        return (
            <div>
                {this.state.error && <p className="add-option-error">{this.state.error}</p>}
                <form className="add-option" onSubmit={this.formHandleAddOption}>
                    <input className="add-option__input" type="text" placeholder="New Option" name="newOption"/>
                    <button className="button">Add Option</button>
                </form>
            </div>
        )
    };
}

export default AddOption;