import { Helmet } from 'react-helmet-async'
import PageHero from '../components/layout/PageHero'
import ContactInfo from '../components/contact/ContactInfo'
import ContactForm from '../components/contact/ContactForm'
import contactHeroBg from '../assets/images/page-hero-contact.jpg'
import { useLang } from '../context/LanguageContext'

export default function Contact() {
  const { t } = useLang()
  const p = t.pages.contact
  return (
    <>
      <Helmet>
        <title>Contact Us | Mugumo Capital Partners Limited</title>
        <meta name="description" content="Reach out to Mugumo Capital Partners in Nairobi for project finance inquiries, partnership discussions, and investment mandates across East Africa." />
        <meta property="og:title" content="Contact Us | Mugumo Capital Partners Limited" />
        <meta property="og:description" content="Get in touch with our advisory team in Nairobi, Kenya." />
        <meta property="og:image" content="/og-image.jpg" />
      </Helmet>
      <PageHero title={p.title} subtitle={p.subtitle} backgroundImage={contactHeroBg} />
      <section className="section-py" style={{ backgroundColor: 'var(--color-white)' }}>
        <div className="container">
          <div className="row g-5 align-items-start">
            <div className="col-lg-5">
              <ContactInfo />
            </div>
            <div className="col-lg-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
