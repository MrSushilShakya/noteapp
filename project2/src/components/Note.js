import React from "react";
import "./Note.css";
import image from './images/delete.png'

function Note({ note, deleteNote }) {
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/notestable/${note.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        deleteNote(note.id);
      } else {
        console.error("Failed to delete note");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="note">
      <div className="content">
        <p>{note.text}</p>
      </div>
      <div className="footer">
        <p className="date">{note.createdAt}</p>
        <button className="delete-button" onClick={handleDelete}>
          <img src={image} alt="" />
        </button>
      </div>
    </div>
  );
}

export default Note;
