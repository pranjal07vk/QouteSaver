import QuoteItem from "./QuoteItem";

function QuoteList({ quotes, deleteQuote, editQuote, toggleFavorite, darkMode }) {
  return (
    quotes.map((q) => (
        <QuoteItem
            key={q.id}
            quote={q}
            deleteQuote={deleteQuote}
            editQuote={editQuote}
            toggleFavorite={toggleFavorite}
            darkMode={darkMode}
        />
    ))
  );
}

export default QuoteList;