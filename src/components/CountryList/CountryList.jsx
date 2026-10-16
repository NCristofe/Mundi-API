import CountryCard from '../CountryCard/CountryCard.jsx'

export default function CountryList({ countries = [] }) {
  if (countries.length === 0) {
    return <p>Nenhum país para exibir.</p>
  }

  return (
    <div className="country-list">
      {countries.map((country) => (
        <CountryCard key={country.cca3 ?? country.name?.common ?? country.name} country={country} />
      ))}
    </div>
  )
}
