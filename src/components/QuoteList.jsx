import QuoteItem from "./QuoteItem";

function QuoteList({ quotes, deleteQuote, editQuote }) {
  return (
    <div>
      {quotes.map((q) => (
        <QuoteItem
          key={q.id}
          quote={q}
          deleteQuote={deleteQuote}
          editQuote={editQuote}
        />
      ))}
    </div>
  );
}

export default QuoteList;