import { HelmetProvider } from 'react-helmet-async'
import AppRouter from './router/AppRouter'
import { LanguageProvider } from './context/LanguageContext'
import { SiteDataProvider } from './context/SiteDataContext'

export default function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <SiteDataProvider>
          <AppRouter />
        </SiteDataProvider>
      </LanguageProvider>
    </HelmetProvider>
  )
}
