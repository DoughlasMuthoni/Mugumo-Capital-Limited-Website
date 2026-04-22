import { Helmet } from 'react-helmet-async'
import PageHero from '../components/layout/PageHero'
import AboutStory from '../components/about/AboutStory'
import EastAfricaFocus from '../components/about/EastAfricaFocus'
import CorePillars from '../components/about/CorePillars'
import CTASection from '../components/common/CTASection'
import aboutHeroBg from '../assets/images/page-hero-about.jpg'
import { useLang } from '../context/LanguageContext'

export default function About() {
  const { t } = useLang()
  const p = t.pages.about
  const c = t.page_ctas.about
  return (
    <>
      <Helmet>
        <title>About Us | Mugumo Capital Partners Limited</title>
        <meta name="description" content="Learn about Mugumo Capital Partners, a Nairobi-based capital advisory firm serving Kenya and East Africa." />
      </Helmet>
      <PageHero title={p.title} subtitle={p.subtitle} backgroundImage={aboutHeroBg} />
      <AboutStory />
      <EastAfricaFocus />
      <CorePillars />
      <CTASection
        title={c.title}
        body={c.body}
        primaryLabel={c.primary} primaryTo="/contact"
        secondaryLabel={c.secondary} secondaryTo="/services"
      />
    </>
  )
}
