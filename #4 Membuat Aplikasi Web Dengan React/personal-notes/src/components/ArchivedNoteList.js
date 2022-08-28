import React from 'react';
import NotesItem from './NotesItem';
 
function ArchivedNoteList({ notesShown, onDelete, onUnarchive }) {
  return (
    <>
      {
        notesShown.filter(note => note.archived).length > 0
        ? <div className="notes-list">
          {
            notesShown.filter(note => note.archived).map(note => (
              <NotesItem
              key={note.id}
              id={note.id}
              onDelete={onDelete}
              onUnarchive={onUnarchive}
              {...note} />
            ))
          }
          </div>
        : <p className="notes-list__empty-message">No notes yet</p>
      }
    </>
   );
  }

export default ArchivedNoteList;