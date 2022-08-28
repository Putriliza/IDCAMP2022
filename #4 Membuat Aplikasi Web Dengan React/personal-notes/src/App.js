import React from 'react';
import ActiveNoteList from './components/ActiveNoteList';
import ArchivedNoteList from './components/ArchivedNoteList';
import AddNotes from './components/AddNotes';
import { getInitialData } from './utils/initialData';
import FilterNotes from './components/FilterNotes';
import NoteListDesc from './components/NoteListDesc';
 
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes : getInitialData(),
      notesShown: getInitialData(),
      filterTitle: '',
    };
    
    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onUnarchiveHandler = this.onUnarchiveHandler.bind(this);
    this.onFilterNoteHandler = this.onFilterNoteHandler.bind(this);
  }

  onDeleteHandler(id) {
    const notes = this.state.notes.filter(note => note.id !== id);
    const notesShown = this.state.notesShown.filter(note => note.id !== id);
    this.setState({ notes, notesShown });
  }

  onArchiveHandler(id) {
    const notes = this.state.notes.map(note => {
      if (note.id === id) {note.archived = true;}
      return note;
    });
    const notesShown = this.state.notesShown.map(note => {
      if (note.id === id) {note.archived = true;}
      return note;
    });

    this.setState({ notes, notesShown });
  }

  onUnarchiveHandler(id) {
    const notes = this.state.notes.map(note => {
      if (note.id === id) {note.archived = false;}
      return note;
    });
    const notesShown = this.state.notesShown.map(note => {
      if (note.id === id) {note.archived = false;}
      return note;
    });
    this.setState({ notes, notesShown });
  }

  onAddNoteHandler({ title, body }) {
    const newNotes = {
      id: +new Date(),
      title,
      body,
      createdAt: new Date(),
      archived: false,
    }

    this.setState((prevState) => {
      return {
        notes: [...prevState.notes, newNotes],
        notesShown: [...prevState.notes, newNotes],
        filterTitle: '',
      }
    });
  }

  onFilterNoteHandler({ filterTitle }) {
    const filteredNotes = this.state.notes.filter(
      note => note.title.toLowerCase().includes(filterTitle.toLowerCase())
      );
    this.setState({ notesShown: filteredNotes, filterTitle: filterTitle });
  }

  render() {
    return (
      <div className="app">
        <div className="note-app__header" >
          <h1>My Notes</h1>
        </div>
        <div className="note-app__body">
          <div className="note-input">
            <h2>Search</h2>
            <FilterNotes filterNote={this.onFilterNoteHandler}/>
            <h2>Add Note</h2>
            <AddNotes addNote={this.onAddNoteHandler}/>
          </div>
          <NoteListDesc filterTitle={this.state.filterTitle}/>
          <h2>Active Notes</h2>
          <ActiveNoteList notesShown={this.state.notesShown} onDelete={this.onDeleteHandler} onArchive={this.onArchiveHandler} />
          <h2>Archived Notes</h2>
          <ArchivedNoteList notesShown={this.state.notesShown} onDelete={this.onDeleteHandler} onUnarchive={this.onUnarchiveHandler} />
        </div>
      </div>
    );
  }
}
 
export default App;