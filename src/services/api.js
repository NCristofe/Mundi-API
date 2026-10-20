const API_BASE_URL = 'https://restcountries.com/v3.1'

export async function getCountries() {
  const response = await fetch(`${API_BASE_URL}/all?fields=name,flags,cca3,region,capital,population`)

  if (!response.ok) {
    throw new Error(`Falha ao carregar países (${response.status})`)
  }

  const data = await response.json()
  return Array.isArray(data) ? data : []
}

export async function getCountryByCode(code) {
  const response = await fetch(`${API_BASE_URL}/alpha/${encodeURIComponent(code)}`)

  if (!response.ok) {
    throw new Error(`Falha ao carregar país (${response.status})`)
  }

  const countries = await response.json()
  return countries[0]
}
