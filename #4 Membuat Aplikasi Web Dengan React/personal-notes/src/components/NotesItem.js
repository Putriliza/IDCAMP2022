import React from 'react';
import { showFormattedDate } from '../utils/initialData';
import DeleteButton from './Button/DeleteButton';
import ArchiveButton from './Button/ArchiveButton';
import UnarchiveButton from './Button/UnarchiveButton';
 
function NotesItem({ id, title, body, createdAt, archived, onDelete, onArchive, onUnarchive }) {
 return (
   <div className="note-item">
      <div className="note-item__content">
        <h3 className="note-item__title">{title}</h3>
        <p className="note-item__date">{showFormattedDate(createdAt)}</p>
        <p className="note-item__body">{body}</p>
      </div>
      <div className="note-item__action">
        <DeleteButton id={id} onDelete={onDelete} />
        {
            !archived
            ? <ArchiveButton id={id} onArchive={onArchive} />
            : <UnarchiveButton id={id} onUnarchive={onUnarchive} />
        }
     </div>
   </div>
 );
}
 
export default NotesItem;