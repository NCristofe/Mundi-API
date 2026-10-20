import { registerRootComponent } from 'expo'
import App from './App.jsx'
import ComponentsDemo from './pages/ComponentsDemo/ComponentsDemo.jsx'

registerRootComponent(process.env.EXPO_PUBLIC_COMPONENTS_DEMO === '1' ? ComponentsDemo : App)
