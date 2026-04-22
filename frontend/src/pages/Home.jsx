import { Helmet } from 'react-helmet-async'
import HeroSection from '../components/home/HeroSection'
import HomeAboutPreview from '../components/home/HomeAboutPreview'
import ServicesPreview from '../components/home/ServicesPreview'
import SectorsGrid from '../components/home/SectorsGrid'
import WhyMugumo from '../components/home/WhyMugumo'
import PPPBlock from '../components/home/PPPBlock'
import SponsorInvestorCTA from '../components/home/SponsorInvestorCTA'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Mugumo Capital Partners Limited | Capital Advisory in Kenya &amp; East Africa</title>
        <meta name="description" content="Mugumo Capital Partners structures and raises institutional capital for affordable housing, renewable energy, PPP, and microfinance across East Africa." />
        <meta property="og:title" content="Mugumo Capital Partners Limited" />
        <meta property="og:description" content="Capital advisory and project finance for transformational projects across Kenya and East Africa." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mugumo Capital Partners Limited" />
        <meta name="twitter:description" content="Capital advisory and project finance across Kenya and East Africa." />
      </Helmet>
      <HeroSection />
      <HomeAboutPreview />
      <ServicesPreview />
      <SectorsGrid />
      <WhyMugumo />
      <PPPBlock />
      <SponsorInvestorCTA />
    </>
  )
}
