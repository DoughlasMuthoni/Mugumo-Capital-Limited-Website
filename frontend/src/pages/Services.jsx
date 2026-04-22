import { Helmet } from 'react-helmet-async'
import PageHero from '../components/layout/PageHero'
import ServicesGrid from '../components/services/ServicesGrid'
import ServiceDetailBlock from '../components/services/ServiceDetailBlock'
import CTASection from '../components/common/CTASection'
import { services } from '../data/services'
import servicesHeroBg from '../assets/images/page-hero-services.jpg'
import { useLang } from '../context/LanguageContext'

export default function Services() {
  const { t } = useLang()
  const p = t.pages.services
  const c = t.page_ctas.services
  return (
    <>
      <Helmet>
        <title>Our Services | Mugumo Capital Partners Limited</title>
        <meta name="description" content="Capital raising and advisory services for affordable housing, renewable energy, PPP, and microfinance across East Africa." />
        <meta property="og:title" content="Our Services | Mugumo Capital Partners Limited" />
        <meta property="og:description" content="Structured capital for transformational sectors across Kenya and East Africa." />
        <meta property="og:image" content="/og-image.jpg" />
      </Helmet>
      <PageHero title={p.title} subtitle={p.subtitle} backgroundImage={servicesHeroBg} />
      <ServicesGrid />
      {services.map((service, i) => (
        <ServiceDetailBlock key={service.id} {...service} reversed={i % 2 !== 0} />
      ))}
      <CTASection
        title={c.title}
        body={c.body}
        primaryLabel={c.primary}
        primaryTo="/contact"
        secondaryLabel={c.secondary}
        secondaryTo="/partners"
      />
    </>
  )
}
