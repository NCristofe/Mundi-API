import Header from './components/Header/Header.jsx'
import Home from './pages/Home/Home.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'

export default function App() {
  return (
    <FavoritesProvider>
      <Header />
      <main className="page-shell">
        <Home />
      </main>
    </FavoritesProvider>
  )
}
