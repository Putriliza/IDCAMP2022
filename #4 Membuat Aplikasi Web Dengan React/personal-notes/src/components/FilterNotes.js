import React from 'react';

class FilterNotes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterTitle: '',
        };

        this.onFilterTitleChangeEventHandler = this.onFilterTitleChangeEventHandler.bind(this);
        this.onFilterSubmitEventHandler = this.onFilterSubmitEventHandler.bind(this);
    }


    onFilterTitleChangeEventHandler(e) {
        this.setState({ filterTitle: e.target.value });
    }

    onFilterSubmitEventHandler(e) {
        e.preventDefault();
        this.props.filterNote(this.state);
    }

    render() {
        return (
            <form className="note-search" onSubmit={this.onFilterSubmitEventHandler}>
                <input type="text" placeholder="Title" value={this.state.filterTitle}
                    onChange={this.onFilterTitleChangeEventHandler} />
                <p className="note-search__desc">Press enter after type the title</p>
            </form>
        )
    }

}

export default FilterNotes;