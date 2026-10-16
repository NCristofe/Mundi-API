export default function CountryCard({ country }) {
  const name = country?.name?.common ?? country?.name ?? 'País'
  const flag = country?.flags?.svg ?? country?.flags?.png
  const capital = country?.capital?.[0] ?? 'Sem capital informada'

  return (
    <article className="country-card">
      {flag && <img className="country-flag" src={flag} alt={`Bandeira de ${name}`} />}
      <div>
        <h2>{name}</h2>
        <p>{capital}</p>
      </div>
    </article>
  )
}
