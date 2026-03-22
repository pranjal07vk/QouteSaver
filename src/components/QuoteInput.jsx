import { useState } from "react";

function QuoteInput({ addQuote }) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    addQuote(text);
    setText("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter quote..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
            if (e.key === "Enter") {
                handleAdd();
            }
        }}
     />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default QuoteInput;