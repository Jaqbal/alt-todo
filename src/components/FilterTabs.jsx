export default function FilterTabs({ filter, onChange }) {
  return (
    <div className="controls"> 
      <div className="filter-tabs">
        {["all", "completed", "incomplete"].map((type) => (
          <button
            key={type}
            onClick={() => onChange(type)}
            className={filter === type ? "active-filter" : "filter-btn"}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}