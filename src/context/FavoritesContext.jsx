import { createContext, useContext, useState } from 'react'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  function toggleFavorite(country) {
    const countryCode = country.cca3 ?? country.name?.common ?? country.name

    setFavorites((currentFavorites) => {
      const isFavorite = currentFavorites.some(
        (favorite) => (favorite.cca3 ?? favorite.name?.common ?? favorite.name) === countryCode,
      )

      return isFavorite
        ? currentFavorites.filter(
            (favorite) => (favorite.cca3 ?? favorite.name?.common ?? favorite.name) !== countryCode,
          )
        : [...currentFavorites, country]
    })
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)

  if (!context) {
    throw new Error('useFavorites precisa ser usado dentro de FavoritesProvider')
  }

  return context
}
