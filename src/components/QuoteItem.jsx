import { useState } from "react";

function QuoteItem({ quote, deleteQuote, editQuote, toggleFavorite }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(quote.text);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(quote.text);
    setCopied(true);

    setTimeout(() => {
        setCopied(false);
    }, 1500);
  };
  
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const handleSave = () => {
    if (!newText.trim()) return;
    editQuote(quote.id, newText);
    setIsEditing(false);
  };

  return (
    <div 
        className="quote-card"
        style={{ backgroundColor: quote.color }}
    >

      <div className="top-bar">
        <button onClick={() => toggleFavorite(quote.id)}>
            {quote.isFavorite ? "⭐" : "☆"}
        </button>
      </div>

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
          
          <button onClick={handleCopy}>
            {copied ? "Copied!" : "Copy"}
          </button>
        </>
      )}

      <small>{quote.category}</small>

      <small>
        Created: {formatDate(quote.updatedAt)}
      </small>
    </div>
  );
}

export default QuoteItem;