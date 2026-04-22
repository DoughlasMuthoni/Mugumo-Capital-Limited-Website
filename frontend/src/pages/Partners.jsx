import { Helmet } from 'react-helmet-async'
import PageHero from '../components/layout/PageHero'
import PartnerCategories from '../components/partners/PartnerCategories'
import PartnershipModel from '../components/partners/PartnershipModel'
import CTASection from '../components/common/CTASection'
import partnersHeroBg from '../assets/images/page-hero-partners.jpg'
import { useLang } from '../context/LanguageContext'

export default function Partners() {
  const { t } = useLang()
  const p = t.pages.partners
  const c = t.page_ctas.partners
  return (
    <>
      <Helmet>
        <title>Partners | Mugumo Capital Partners Limited</title>
        <meta name="description" content="Mugumo Capital Partners works with project sponsors, institutional investors, DFIs, commercial banks, and MFIs across East Africa." />
        <meta property="og:title" content="Partners | Mugumo Capital Partners Limited" />
        <meta property="og:description" content="Who we work with across East Africa's project finance and capital advisory ecosystem." />
        <meta property="og:image" content="/og-image.jpg" />
      </Helmet>
      <PageHero title={p.title} subtitle={p.subtitle} backgroundImage={partnersHeroBg} />
      <PartnerCategories />
      <PartnershipModel />
      <CTASection
        title={c.title}
        body={c.body}
        primaryLabel={c.primary}
        primaryTo="/contact"
        secondaryLabel={c.secondary}
        secondaryTo="/services"
      />
    </>
  )
}
