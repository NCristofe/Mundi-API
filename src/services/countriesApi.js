import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.restcountries.com/countries/v5',
  headers: { Authorization: `Bearer ${process.env.EXPO_PUBLIC_RESTCOUNTRIES_KEY}` },
  timeout: 10000,
})

const CONTINENTS_PT = {
  Africa: 'África',
  Antarctica: 'Antártida',
  Asia: 'Ásia',
  Europe: 'Europa',
  'North America': 'América do Norte',
  Oceania: 'Oceania',
  'South America': 'América do Sul',
}

const numberFormat = new Intl.NumberFormat('pt-BR')

function getHemisphere(coordinates) {
  if (!coordinates) return null
  const latitude = coordinates.lat >= 0 ? 'Norte' : 'Sul'
  const longitude = coordinates.lng >= 0 ? 'Oriental' : 'Ocidental'
  return `${latitude} ${longitude}`
}

// Converte o objeto da API v5 no formato usado pelos componentes
export function normalizeCountry(raw) {
  const currency = raw.currencies?.[0]
  const language = raw.languages?.[0]
  const continent = raw.continents?.[0]
  const callingCode = raw.calling_codes?.[0]
  const coordinates = raw.capitals?.[0]?.coordinates ?? raw.coordinates

  return {
    code: raw.codes?.alpha_3,
    name: raw.names?.translations?.por?.common ?? raw.names?.common,
    flagUrl: raw.flag?.url_png,
    capital: raw.capitals?.[0]?.name ?? null,
    population: raw.population != null ? numberFormat.format(raw.population) : null,
    currency: currency ? `${currency.name} (${currency.symbol})` : null,
    continent: CONTINENTS_PT[continent] ?? continent ?? null,
    language: language ? language.native_name ?? language.name : null,
    callingCode: callingCode ? `+${callingCode}` : null,
    area: raw.area?.kilometers != null ? `${numberFormat.format(raw.area.kilometers)} km²` : null,
    areaKm: raw.area?.kilometers ?? null,
    coordinates: raw.coordinates ?? null,
    hemisphere: getHemisphere(raw.coordinates),
    mapUrl:
      raw.links?.google_maps ??
      (coordinates ? `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}` : null),
  }
}

export async function searchCountries(query, { limit = 25, offset = 0 } = {}) {
  const { data } = await api.get('', { params: { q: query || undefined, limit, offset } })
  return data.data.objects.map(normalizeCountry)
}

// Prefere o nome exato, porque a API também devolve países com nomes parecidos
export async function findCountry(query) {
  const results = await searchCountries(query)
  const name = query.trim().toLocaleLowerCase()
  return results.find((country) => country.name?.toLocaleLowerCase() === name) ?? results[0] ?? null
}
