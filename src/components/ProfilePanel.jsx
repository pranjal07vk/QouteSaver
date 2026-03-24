function ProfilePanel({
  isOpen,
  setIsOpen,
  username,
  setUsername,
  showFavorites,
  setShowFavorites,
  darkMode,
  setDarkMode
}) {
  if (!isOpen) return null;

  return (
    <div className="profile-panel">

        <div className="panel-header">
            <h3>Profile</h3>
            <button onClick={() => setIsOpen(false)}>✖</button>
        </div>

        <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
        />

        <div className="panel-actions">
            <button onClick={() => setShowFavorites(!showFavorites)}>
                {showFavorites ? "All Quotes" : "Favorites"}
            </button>

            <button onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
        </div>

        <button className="logout-btn" onClick={() => setUsername("")}>
            Logout
        </button>

    </div>
  );
}

export default ProfilePanel;