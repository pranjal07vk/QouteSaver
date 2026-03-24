import { useState, useEffect } from "react";
import QuoteInput from "./components/QuoteInput";
import QuoteList from "./components/QuoteList";
import ProfilePanel from "./components/ProfilePanel";

function App() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  const [showFavorites, setShowFavorites] = useState(false);
  
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  const [quotes, setQuotes] = useState(() => {
    const saved = localStorage.getItem("quotes");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (id) => {
    setQuotes(
      quotes.map((q) =>
        q.id === id
        ? { ...q, isFavorite: !q.isFavorite }
        : q
      )
    );
  };

  const displayedQuotes = showFavorites
    ? quotes.filter((q) => q.isFavorite)
    : quotes;

  // ADD
  const addQuote = (text, categoryData) => {
    const now = Date.now();

    const newQuote = {
      id: now,
      text,
      category: categoryData.name,
      color: categoryData.color,
      createdAt: now,
      updatedAt: now,
      isFavorite: false, // 👈 important
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
    const now = Date.now();

    setQuotes(
      quotes.map((q) =>
        q.id === id
        ? { ...q, text: newText, updatedAt: now }
        : q
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }, [quotes]);

  useEffect(() => {
    localStorage.setItem("username", username);
  }, [username]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".profile-panel") && !e.target.closest(".top-nav")) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="top-nav">
        <button onClick={() => setIsProfileOpen(!isProfileOpen)}>
          👤
        </button>
      </div>

      <ProfilePanel
        isOpen={isProfileOpen}
        setIsOpen={setIsProfileOpen}
        username={username}
        setUsername={setUsername}
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <h1>Quote Saver</h1>

      <QuoteInput addQuote={addQuote} />

      <QuoteList
        quotes={displayedQuotes}
        deleteQuote={deleteQuote}
        editQuote={editQuote}
        toggleFavorite={toggleFavorite}
        darkMode={darkMode}
      />
    </div>
  );
}

export default App;