import React from 'react';
 
function NoteListDesc({ filterTitle }) {
    return (
        filterTitle == ''
        ? <h1 className="note-list__desc">All</h1>
        : <h1 className="note-list__desc">Result for "{filterTitle}"</h1>
    )
}
 
export default NoteListDesc;