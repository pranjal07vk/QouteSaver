import { useState } from "react";

function QuoteItem({ quote, deleteQuote, editQuote }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(quote.text);

  const handleSave = () => {
    if (!newText.trim()) return;
    editQuote(quote.id, newText);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <>
          <input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <span>{quote.text}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteQuote(quote.id)}>Delete</button>
        </>
      )}
    </div>
  );
}

export default QuoteItem;