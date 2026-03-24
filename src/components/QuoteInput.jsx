import { useState } from "react";
import axios from "axios";

function QuoteInput({ addQuote }) {
  const [text, setText] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [customCategory, setCustomCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isListening, setIsListening] = useState(false);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.lang = "en-US";

  const startListening = () => {
    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setText((prev) => prev + " " + text);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const handleAdd = () => {
    if (!text.trim() || !selectedCategory) return;

    addQuote(text, selectedCategory);
    setText("");
    setSelectedCategory(null);
  };

  const handleCategorySelect = (name, color) => {
    setSelectedCategory({ name, color });
    setShowCategories(false);
  };

  const getRandomColor = () => {
    const colors = ["#b39ddb", "#80deea", "#ffab91", "#c5e1a5"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleCustomCategory = () => {
    if (!customCategory.trim()) return;

    const newCat = {
        name: customCategory,
        color: getRandomColor(),
    };

    setSelectedCategory(newCat);
    setCustomCategory("");
    setShowCategories(false);
  };

  return (
    <div className="input-box">
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

      <button onClick={() => setShowCategories(!showCategories)}>
        Add Category
      </button>

      {showCategories && (
        <div className="category-panel">
            <button onClick={() => handleCategorySelect("motivation", "#90caf9")}>
                Motivation
            </button>
            <button onClick={() => handleCategorySelect("love", "#f48fb1")}>
                Love
            </button>
            <button onClick={() => handleCategorySelect("study", "#fff59d")}>
                Study
            </button>

            <div>
                <input
                    placeholder="Custom category"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                />
                <button onClick={handleCustomCategory}>Save</button>
            </div>
        </div>
      )}

      <button onClick={startListening}>
        {isListening ? "🎤 Listening..." : "🎤 Speak"}
      </button>

      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default QuoteInput;