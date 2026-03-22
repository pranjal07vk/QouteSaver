import QuoteItem from "./QuoteItem";

function QuoteList({ quotes, deleteQuote, editQuote, toggleFavorite }) {
  return (
    <div className="quote-list">
      {quotes.map((q) => (
        <QuoteItem
            key={q.id}
            quote={q}
            deleteQuote={deleteQuote}
            editQuote={editQuote}
            toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
}

export default QuoteList;