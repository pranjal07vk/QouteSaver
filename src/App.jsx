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
      category: categoryData?.name || "other",
      color: categoryData?.color || "#ccc",
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
    if (darkMode) {
      document.body.classList.add("dark-body");
    } else {
      document.body.classList.remove("dark-body");
    }
  }, [darkMode]);

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

  useEffect(() => {
    const canvas = document.getElementById("glitter-canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const mouse = { x: null, y: null };

  
    for (let i = 0; i < 350; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        baseX: Math.random() * canvas.width,
        baseY: Math.random() * canvas.height,
        density: Math.random() * 40 + 10
      });
    }

    const mouseMoveHandler = (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };

    window.addEventListener("mousemove", mouseMoveHandler);

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        let dx = mouse.x - p.x;
        let dy = mouse.y - p.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        const maxDistance = 100;

        if (distance < maxDistance) {
          let force = (maxDistance - distance) / maxDistance;
          let directionX = dx / distance;
          let directionY = dy / distance;

          p.x -= directionX * force * p.density * 0.5;
          p.y -= directionY * force * p.density * 0.5;
        } else {
          p.x += (p.baseX - p.x) * 0.02;
          p.y += (p.baseY - p.y) * 0.02;
        }


        ctx.fillStyle = `rgba(254, 254, 49, 0.9)`;
        ctx.shadowColor = "gold";
        ctx.shadowBlur = 15;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <canvas id="glitter-canvas"></canvas>
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