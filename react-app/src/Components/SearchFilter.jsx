import "./SearchFilter.css"

const SearchFilter = ({ search, onSearch, sort, onSort, priceRange, onPriceRange, total, filtered }) => {
  return (
    <div className="sf-wrap">
      {/* Search */}
      <div className="sf-search-wrap">
        <span className="sf-search-icon">🔍</span>
        <input
          className="sf-search"
          type="text"
          placeholder="Search products…"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
        {search && (
          <button className="sf-clear" onClick={() => onSearch("")}>✕</button>
        )}
      </div>

      {/* Filters row */}
      <div className="sf-filters">

        {/* Sort */}
        <div className="sf-group">
          <label className="sf-label">Sort by</label>
          <select className="sf-select" value={sort} onChange={(e) => onSort(e.target.value)}>
            <option value="default">Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="name-asc">Name: A → Z</option>
            <option value="name-desc">Name: Z → A</option>
          </select>
        </div>

        {/* Max price */}
        <div className="sf-group">
          <label className="sf-label">Max price: ₹{priceRange.toLocaleString()}</label>
          <input
            className="sf-range"
            type="range"
            min={0}
            max={500000}
            step={1000}
            value={priceRange}
            onChange={(e) => onPriceRange(Number(e.target.value))}
          />
        </div>

        {/* Reset */}
        {(search || sort !== "default" || priceRange < 500000) && (
          <button
            className="sf-reset"
            onClick={() => { onSearch(""); onSort("default"); onPriceRange(500000) }}
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="sf-count">
        Showing <strong>{filtered}</strong> of <strong>{total}</strong> products
      </p>
    </div>
  )
}

export default SearchFilter
