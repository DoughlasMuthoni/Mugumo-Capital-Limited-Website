import { Helmet } from 'react-helmet-async'
import PageHero from '../components/layout/PageHero'
import TeamIntro from '../components/team/TeamIntro'
import TeamPlaceholderGrid from '../components/team/TeamPlaceholderGrid'
import CTASection from '../components/common/CTASection'
import teamHeroBg from '../assets/images/page-hero-team.jpg'
import { useLang } from '../context/LanguageContext'

export default function Team() {
  const { t } = useLang()
  const p = t.pages.team
  const c = t.page_ctas.team
  return (
    <>
      <Helmet>
        <title>Our Team | Mugumo Capital Partners Limited</title>
        <meta name="description" content="The leadership team at Mugumo Capital Partners brings regional expertise in project finance and capital advisory across Kenya and East Africa." />
        <meta property="og:title" content="Our Team | Mugumo Capital Partners Limited" />
        <meta property="og:description" content="Leadership expertise in project finance and capital advisory across East Africa." />
        <meta property="og:image" content="/og-image.jpg" />
      </Helmet>
      <PageHero title={p.title} subtitle={p.subtitle} backgroundImage={teamHeroBg} />
      <TeamIntro />
      <TeamPlaceholderGrid />
      <CTASection
        title={c.title}
        body={c.body}
        primaryLabel={c.primary}
        primaryTo="/contact"
      />
    </>
  )
}
