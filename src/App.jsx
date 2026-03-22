import { useState, useEffect } from "react";
import QuoteInput from "./components/QuoteInput";
import QuoteList from "./components/QuoteList";

function App() {
  const [quotes, setQuotes] = useState(() => {
    const saved = localStorage.getItem("quotes");
    return saved ? JSON.parse(saved) : [];
  });

  // ADD
  const addQuote = (text) => {
    const newQuote = {
      id: Date.now(),
      text,
    };
    setQuotes([...quotes, newQuote]);
  };

  // DELETE
  const deleteQuote = (id) => {
    const updated = quotes.filter((q) => q.id !== id);
    setQuotes(updated);
  };

  // EDIT
  const editQuote = (id, newText) => {
    const updated = quotes.map((q) =>
      q.id === id ? { ...q, text: newText } : q
    );
    setQuotes(updated);
  };

  useEffect(() => {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }, [quotes]);

  return (
    <div>
      <h1>Quote Saver</h1>

      <QuoteInput addQuote={addQuote} />

      <QuoteList
        quotes={quotes}
        deleteQuote={deleteQuote}
        editQuote={editQuote}
      />
    </div>
  );
}

export default App;