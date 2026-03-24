import { useState } from "react";

function QuoteItem({ quote, deleteQuote, editQuote, toggleFavorite, darkMode }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(quote.text);
  const [copied, setCopied] = useState(false);

  const getNeonColor = (category) => {
    switch (category) {
        case "motivation":
            return "#00e5ff"; // neon blue
        case "love":
            return "#ff4081"; // neon pink
        case "study":
            return "#ffee58"; // neon yellow
        default:
            return "#69f0ae"; // neon green
    }
  };

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
        style={{
            backgroundColor: darkMode ? "#020617cc" : quote.color,
            borderLeft: `5px solid ${
                darkMode ? getNeonColor(quote.category) : quote.color
            }`,
            boxShadow: darkMode
                ? `0 0 10px ${getNeonColor(quote.category)}`
                : "0 4px 10px rgba(0,0,0,0.1)"
        }}
    >
      <div className="card-header">
        <button onClick={() => toggleFavorite(quote.id)}>
          {quote.isFavorite ? "⭐" : "☆"}
        </button>

        <button onClick={handleCopy}>
          {copied ? "✅" : "📋"}
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
          <p className="quote-text">{quote.text}</p>
          <div className="card-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => deleteQuote(quote.id)}>Delete</button>
          </div>
        </>
      )}

      <div className="card-meta">
        <span className="category">{quote.category}</span>
        <span className="date">{formatDate(quote.updatedAt)}</span>
      </div>
    </div>
  );
}

export default QuoteItem;