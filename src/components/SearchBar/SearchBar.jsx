export default function SearchBar({ value, onChange, placeholder = 'Buscar países' }) {
  return (
    <label className="search-field">
      <span className="sr-only">{placeholder}</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  )
}
