import QuoteItem from "./QuoteItem";

function QuoteList({ quotes, deleteQuote, editQuote, toggleFavorite, darkMode }) {
  return (
    <div className="quote-list">
      {quotes.map((q) => (
        <QuoteItem
          key={q.id}
          quote={q}
          deleteQuote={deleteQuote}
          editQuote={editQuote}
          toggleFavorite={toggleFavorite}
          darkMode={darkMode}
        />
      ))}
    </div>
  );
}

export default QuoteList;