import React from 'react';

class AddNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      titleCharCounts: 0,
    }

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(e) {
    this.setState({ title: e.target.value, titleCharCounts: e.target.value.length });
  }
  

  onBodyChangeEventHandler(e) {
    this.setState({ body: e.target.value });
  }

  onSubmitEventHandler(e) {
    e.preventDefault();
    this.props.addNote(this.state);
    this.setState({ title: '', body: '' });
    e.target.reset();
  }

 render() {
   return (
     <form onSubmit={this.onSubmitEventHandler}>
      <p className="note-input__title__char-limit">Characters remaining: <span>{50-this.state.titleCharCounts}</span></p>
      <input className="note-input__title" type="text" placeholder="Title" maxLength={50}
        onChange={this.onTitleChangeEventHandler} required/>
      <textarea className="note-input__body" placeholder="Body"
        onChange={this.onBodyChangeEventHandler} required></textarea>
      <button type="submit">Add Note</button>
     </form>
   )
 }
}

export default AddNotes;