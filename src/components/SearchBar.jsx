export default function SearchBar({ value, onChange }) {
  return (
    <div className="controls">
      <input
        type="text"
        placeholder="Search tasks..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
        aria-label="Search tasks"
      />
    </div>
  );
}