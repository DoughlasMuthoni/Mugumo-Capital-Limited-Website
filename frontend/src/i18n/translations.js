const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      team: 'Our Team',
      services: 'Our Services',
      partners: 'Partners',
      contact: 'Contact Us',
      engage: 'Engage Us',
    },

    hero: {
      eyebrow: 'Capital Advisory · Kenya & East Africa',
      line1: 'Unlocking Capital for',
      em: 'Transformational',
      line2: 'Projects Across East Africa.',
      body: 'Mugumo Capital Partners arranges and syndicates project finance, structured debt, and institutional capital for affordable housing, renewable energy, Public Private Partnerships, and microfinance across Kenya and the East African Community.',
      cta1: 'Our Services',
      cta2: 'Partner With Us',
      stats: [
        'Target Transaction Size',
        'East African Markets',
        'Core Service Lines',
        'East Africa Focus',
      ],
    },

    about_preview: {
      label: 'Who We Are',
      heading: 'A Kenyan Capital Raising Partner Built for East Africa.',
      p1: 'Mugumo Capital Partners Limited is a Nairobi-headquartered capital advisory firm. We arrange, structure, and syndicate capital for project sponsors, developers, and financial institutions operating across Kenya and the East African Community.',
      p2: 'Our focus is deliberate. We work where we have deep conviction, strong relationships, and a track record — affordable housing, renewable energy, Public Private Partnerships, and the microfinance sector.',
      cta: 'Learn About Us',
      pillars: ['Project Finance', 'PPP Advisory', 'Institutional Capital'],
      nairobi: 'Nairobi, Kenya',
      hq: 'Headquartered in',
    },

    services_preview: {
      label: 'Our Services',
      heading: 'Four Focused Service Lines. One Regional Mandate.',
      body: 'We specialise where capital gaps are deepest and where East African infrastructure and inclusive finance need patient, well-structured money.',
      learn: 'Learn more',
      items: [
        {
          category: 'Project Finance',
          title: 'Fundraising for Affordable Housing',
          body: 'We arrange debt, equity, and blended finance for affordable housing developers — from land acquisition and infrastructure servicing through to construction finance and end-user mortgage takeout.',
          bullets: [
            'Development and construction finance',
            'Housing fund structuring and syndication',
            'Blended finance with DFIs and concessional capital',
            'Partnership with pension funds and housing finance institutions',
          ],
        },
        {
          category: 'Project Finance',
          title: 'Fundraising for Renewable Energy',
          body: 'We raise project capital for utility-scale and distributed renewable energy across East Africa — from greenfield development through to refinancing of operational assets.',
          bullets: [
            'Solar: utility-scale, commercial and industrial, productive-use',
            'Hydro: small, mini, and run-of-river projects',
            'Wind: onshore wind project development',
            'Geothermal: drilling, steamfield, and power generation finance',
          ],
        },
        {
          category: 'Public Private Partnerships',
          title: 'PPP Project Advisory & Capital Raising',
          body: 'We advise contracting authorities and private sponsors on PPP projects in Kenya — aligned with the National Treasury PPP Directorate framework from identification through financial close.',
          bullets: [
            'PPP project origination, ranking, and prioritisation support',
            'Project appraisal, feasibility studies, and bankability assessment',
            'Transaction structuring, procurement, and tender evaluation',
            'Contract negotiation, financial close, and contract management',
          ],
        },
        {
          category: 'Institutional',
          title: 'Capital Raising for Microfinance',
          body: 'We raise senior debt, subordinated debt, and Tier 2 capital for microfinance banks, credit-only MFIs, and inclusive finance platforms scaling across Kenya and East Africa.',
          bullets: [
            'On-lending debt facilities from DFIs and impact investors',
            'Local currency funding and hedged foreign currency lines',
            'Tier 2 subordinated capital and hybrid instruments',
            'Receivables and portfolio-backed financing structures',
          ],
        },
      ],
    },

    sectors: {
      label: 'Focus Sectors',
      heading: 'Where Our Conviction & Networks Create Advantage.',
      body: 'Six sector verticals where East Africa\'s capital gap is largest, investor appetite is deepest, and our execution experience is strongest.',
      items: [
        { tag: 'Housing', title: 'Affordable Housing', desc: 'Development finance, housing funds, and blended capital for East Africa\'s housing deficit.' },
        { tag: 'Solar', title: 'Solar Energy', desc: 'Utility-scale, commercial, and productive-use solar project finance and portfolio debt.' },
        { tag: 'Hydro · Wind', title: 'Hydro & Wind', desc: 'Small hydro, run-of-river, and onshore wind projects across the East African region.' },
        { tag: 'Geothermal', title: 'Geothermal Energy', desc: 'Drilling, steamfield development, and power generation finance in the Rift Valley.' },
        { tag: 'PPP · Infrastructure', title: 'Public Private Partnerships', desc: 'Project structuring, procurement advisory, and capital raising for Kenyan PPP infrastructure.' },
        { tag: 'Inclusive Finance', title: 'Microfinance', desc: 'Senior debt, subordinated capital, and Tier 2 funding for microfinance institutions.' },
      ],
    },

    why: {
      label: 'Why Partner With Mugumo',
      heading: 'Deep East African Roots. Institutional-Grade Execution.',
      body: 'Four pillars that define how we work and why our partners keep coming back.',
      items: [
        {
          title: 'Local Conviction',
          body: 'Nairobi-based, founder-led, and anchored in East Africa. Every transaction is structured with a ground-level understanding of regulation, markets, and off-taker risk.',
        },
        {
          title: 'Investor Network',
          body: 'Direct relationships with development finance institutions, impact investors, Kenyan pension funds, and regional commercial banks active across the East African Community.',
        },
        {
          title: 'Structuring Discipline',
          body: 'Bankable structures built for the realities of Kenyan and regional capital markets — blended finance, concessional layers, local currency lines, and hedged foreign currency facilities.',
        },
        {
          title: 'Sector Specialisation',
          body: 'We work in three focused verticals: housing, energy, and inclusive finance. Our focus is precisely what makes our advisory worth paying for.',
        },
      ],
    },

    ppp: {
      label: 'PPP Advisory',
      heading: 'Aligned with Kenya\'s PPP Legal & Institutional Framework.',
      p1: 'Mugumo Capital Partners advises on Public Private Partnership projects within the framework established by Kenya\'s Public Private Partnerships Act and administered by the PPP Directorate at the National Treasury.',
      p2: 'We work across the full project cycle — from identification, appraisal, and feasibility through to procurement, tender evaluation, contract negotiation, financial close, and long-term contract management.',
      lifecycle: 'PPP Advisory Lifecycle',
      cta: 'Discuss a PPP Mandate',
      stages: [
        { label: 'Project Identification', desc: 'Mapping viable PPP opportunities aligned with national and county priorities' },
        { label: 'Feasibility Advisory', desc: 'Technical, financial, and legal feasibility assessment support' },
        { label: 'Procurement Structuring', desc: 'Advising on procurement strategy, bidding frameworks, and market sounding' },
        { label: 'Tender Evaluation Support', desc: 'Advisory support during the evaluation of bids and proposal assessment' },
        { label: 'Contract Negotiation', desc: 'Supporting concession agreement and project agreement negotiations' },
        { label: 'Financial Close', desc: 'Coordinating lender due diligence, term sheets, and closing conditions' },
        { label: 'Contract Management', desc: 'Long-term monitoring and contract management advisory through operations' },
      ],
      sectors: [
        { label: 'Energy', sub: 'Generation, transmission, distribution' },
        { label: 'Roads & Transport', sub: 'Highways, bridges, urban mobility' },
        { label: 'Water & Sanitation', sub: 'Bulk water, sewerage, treatment' },
        { label: 'Social Infrastructure', sub: 'Housing, health, education' },
      ],
    },

    cta_split: {
      sponsor_label: 'For Project Sponsors',
      sponsor_heading: 'Raising capital for a housing, energy, PPP, or microfinance mandate?',
      sponsor_body: 'From feasibility and financial modelling through to syndication and financial close, we work shoulder-to-shoulder with sponsors to close bankable capital.',
      sponsor_cta: 'Discuss Your Project',
      investor_label: 'For Institutional Investors',
      investor_heading: 'Looking for high-impact East African deal flow?',
      investor_body: 'Access our pipeline of due-diligenced housing, renewable energy, and inclusive finance opportunities across Kenya and the East African Community.',
      investor_cta: 'Access Pipeline',
    },

    footer: {
      tagline: 'Capital advisory and project finance for transformational projects across Kenya and East Africa.',
      location: 'Nairobi, Kenya',
      services_title: 'Our Services',
      company_title: 'Company',
      contact_title: 'Get in Touch',
      send_inquiry: 'Send an Inquiry',
      copyright: 'All rights reserved.',
      disclaimer: 'Capital advisory services. Not a regulated financial institution.',
      services: ['Affordable Housing', 'Renewable Energy', 'PPP Advisory', 'Microfinance Capital'],
      links: ['About Us', 'Our Team', 'Partners', 'Contact Us'],
    },

    pages: {
      about: { title: 'About Us', subtitle: 'Who We Are & What We Stand For' },
      services: { title: 'Our Services', subtitle: 'Structured Capital for Transformational Sectors' },
      partners: { title: 'Partners', subtitle: 'Who We Work With' },
      team: { title: 'Our Team', subtitle: 'Leadership & Expertise' },
      contact: { title: 'Contact Us', subtitle: 'Get in Touch' },
    },

    contact_info: {
      heading: 'We Would Like to Hear From You',
      body: 'Whether you are a project sponsor seeking capital, a government authority exploring a PPP structure, or an institutional investor seeking curated mandates — we respond to all inquiries within two business days.',
      location_label: 'Office Location',
      location: 'Nairobi, Kenya',
      email_label: 'Email',
      sponsor_title: 'Project Sponsor?',
      sponsor_body: 'Tell us about your project and capital requirement',
      investor_title: 'Investor?',
      investor_body: 'Register to receive structured mandate briefs',
      commitment: 'Response commitment:',
      commitment_body: 'We acknowledge all inquiries within one business day and provide a substantive response within two business days.',
    },

    cta_section: {
      eyebrow: 'Get Started',
    },

    page_ctas: {
      about: {
        title: 'Ready to Discuss a Mandate?',
        body: 'Whether you are a project sponsor, a contracting authority, or an institutional investor — we would be glad to have a conversation.',
        primary: 'Contact Us',
        secondary: 'Our Services',
      },
      services: {
        title: 'Ready to Start a Conversation?',
        body: 'Tell us about your mandate and we will respond within two business days.',
        primary: 'Get in Touch',
        secondary: 'Our Partners',
      },
      partners: {
        title: 'Interested in a Collaboration?',
        body: 'Whether you are a project sponsor seeking capital or an investor seeking mandates — we would like to hear from you.',
        primary: 'Send a Partnership Inquiry',
        secondary: 'Our Services',
      },
      team: {
        title: 'Have a Mandate to Discuss?',
        body: 'Our team is ready to engage on mandates across housing, energy, PPP, and microfinance.',
        primary: 'Contact Us',
      },
    },

    whatsapp_tooltip: 'Chat on WhatsApp',
    back_to_top: 'Back to top',
  },

  // ─── FRENCH ──────────────────────────────────────────────────────────────
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À Propos',
      team: 'Notre Équipe',
      services: 'Nos Services',
      partners: 'Partenaires',
      contact: 'Contactez-Nous',
      engage: 'Nous Contacter',
    },

    hero: {
      eyebrow: 'Conseil en Capital · Kenya & Afrique de l\'Est',
      line1: 'Mobiliser des Capitaux pour des Projets',
      em: 'Transformateurs',
      line2: 'à Travers l\'Afrique de l\'Est.',
      body: 'Mugumo Capital Partners structure et syndique le financement de projets, la dette structurée et le capital institutionnel pour le logement abordable, les énergies renouvelables, les Partenariats Public-Privé et la microfinance au Kenya et dans la Communauté d\'Afrique de l\'Est.',
      cta1: 'Nos Services',
      cta2: 'Devenir Partenaire',
      stats: [
        'Taille Cible des Transactions',
        'Marchés d\'Afrique de l\'Est',
        'Lignes de Services Principales',
        'Focus Afrique de l\'Est',
      ],
    },

    about_preview: {
      label: 'Qui Nous Sommes',
      heading: 'Un Partenaire de Levée de Fonds Kenyan Conçu pour l\'Afrique de l\'Est.',
      p1: 'Mugumo Capital Partners Limited est un cabinet de conseil en capital basé à Nairobi. Nous structurons et syndiquons des capitaux pour les promoteurs de projets, les développeurs et les institutions financières opérant au Kenya et dans la Communauté d\'Afrique de l\'Est.',
      p2: 'Notre focus est délibéré. Nous travaillons là où nous avons une conviction profonde, des relations solides et un historique — logement abordable, énergies renouvelables, Partenariats Public-Privé et microfinance.',
      cta: 'En Savoir Plus',
      pillars: ['Finance de Projets', 'Conseil PPP', 'Capital Institutionnel'],
      nairobi: 'Nairobi, Kenya',
      hq: 'Siège social à',
    },

    services_preview: {
      label: 'Nos Services',
      heading: 'Quatre Lignes de Services Ciblées. Un Mandat Régional.',
      body: 'Nous nous spécialisons là où les écarts de financement sont les plus profonds et où l\'infrastructure et la finance inclusive d\'Afrique de l\'Est ont besoin d\'un capital patient et bien structuré.',
      learn: 'En savoir plus',
      items: [
        {
          category: 'Finance de Projets',
          title: 'Levée de Fonds pour le Logement Abordable',
          body: 'Nous structurons la dette, les fonds propres et le financement mixte pour les promoteurs de logements abordables — de l\'acquisition de terrains jusqu\'au financement de la construction.',
          bullets: [
            'Financement du développement et de la construction',
            'Structuration et syndication de fonds de logement',
            'Finance mixte avec les IFD et capital concessionnel',
            'Partenariat avec les fonds de pension et les institutions de financement du logement',
          ],
        },
        {
          category: 'Finance de Projets',
          title: 'Levée de Fonds pour les Énergies Renouvelables',
          body: 'Nous levons des capitaux de projet pour les énergies renouvelables à grande échelle et distribuées en Afrique de l\'Est — du développement greenfield jusqu\'au refinancement d\'actifs opérationnels.',
          bullets: [
            'Solaire : grande échelle, commercial et industriel, usage productif',
            'Hydroélectricité : petits et mini-projets hydrauliques',
            'Éolien : développement de projets éoliens terrestres',
            'Géothermie : forage, champ de vapeur et financement de la production d\'énergie',
          ],
        },
        {
          category: 'Partenariats Public-Privé',
          title: 'Conseil PPP & Levée de Capitaux',
          body: 'Nous conseillons les autorités contractantes et les sponsors privés sur les projets PPP au Kenya — alignés sur le cadre de la Direction PPP du Trésor national.',
          bullets: [
            'Origination, classement et priorisation des projets PPP',
            'Évaluation du projet, études de faisabilité et évaluation de la bancabilité',
            'Structuration des transactions, passation des marchés et évaluation des offres',
            'Négociation des contrats, clôture financière et gestion des contrats',
          ],
        },
        {
          category: 'Institutionnel',
          title: 'Levée de Capitaux pour la Microfinance',
          body: 'Nous levons de la dette senior, subordonnée et du capital Tier 2 pour les banques de microfinance, les IMF et les plateformes de finance inclusive au Kenya et en Afrique de l\'Est.',
          bullets: [
            'Facilités de crédit de prêt des IFD et des investisseurs d\'impact',
            'Financement en monnaie locale et lignes en devises couvertes',
            'Capital subordonné Tier 2 et instruments hybrides',
            'Structures de financement adossées aux créances et aux portefeuilles',
          ],
        },
      ],
    },

    sectors: {
      label: 'Secteurs Prioritaires',
      heading: 'Là Où Notre Conviction & Nos Réseaux Créent un Avantage.',
      body: 'Six secteurs verticaux où l\'écart de financement en Afrique de l\'Est est le plus grand, l\'appétit des investisseurs le plus profond, et notre expérience d\'exécution la plus solide.',
      items: [
        { tag: 'Logement', title: 'Logement Abordable', desc: 'Finance du développement, fonds de logement et capital mixte pour le déficit de logement en Afrique de l\'Est.' },
        { tag: 'Solaire', title: 'Énergie Solaire', desc: 'Finance de projets solaires à grande échelle, commercial et à usage productif, et dette de portefeuille.' },
        { tag: 'Hydro · Éolien', title: 'Hydro & Éolien', desc: 'Petits projets hydrauliques, au fil de l\'eau et éoliens terrestres en Afrique de l\'Est.' },
        { tag: 'Géothermie', title: 'Énergie Géothermique', desc: 'Forage, développement du champ de vapeur et financement de la production d\'énergie dans la Vallée du Rift.' },
        { tag: 'PPP · Infrastructure', title: 'Partenariats Public-Privé', desc: 'Structuration de projets, conseil en passation de marchés et levée de capitaux pour les PPP au Kenya.' },
        { tag: 'Finance Inclusive', title: 'Microfinance', desc: 'Dette senior, capital subordonné et financement Tier 2 pour les institutions de microfinance.' },
      ],
    },

    why: {
      label: 'Pourquoi Choisir Mugumo',
      heading: 'Des Racines Profondes en Afrique de l\'Est. Une Exécution de Niveau Institutionnel.',
      body: 'Quatre piliers qui définissent notre façon de travailler et pourquoi nos partenaires reviennent.',
      items: [
        {
          title: 'Conviction Locale',
          body: 'Basé à Nairobi, fondateur-dirigeant et ancré en Afrique de l\'Est. Chaque transaction est structurée avec une compréhension terrain de la réglementation, des marchés et du risque des offtakers.',
        },
        {
          title: 'Réseau d\'Investisseurs',
          body: 'Relations directes avec les institutions de financement du développement, les investisseurs d\'impact, les fonds de pension kenyans et les banques commerciales régionales actives dans la Communauté d\'Afrique de l\'Est.',
        },
        {
          title: 'Discipline de Structuration',
          body: 'Des structures bancables construites pour les réalités des marchés de capitaux kenyans et régionaux — finance mixte, couches concessionnelles, lignes en monnaie locale et facilités en devises couvertes.',
        },
        {
          title: 'Spécialisation Sectorielle',
          body: 'Nous travaillons dans trois secteurs ciblés : logement, énergie et finance inclusive. Notre focus est précisément ce qui rend notre conseil rentable.',
        },
      ],
    },

    ppp: {
      label: 'Conseil PPP',
      heading: 'Aligné sur le Cadre Juridique & Institutionnel PPP du Kenya.',
      p1: 'Mugumo Capital Partners conseille sur les projets de Partenariat Public-Privé dans le cadre établi par la Loi PPP du Kenya et administré par la Direction PPP du Trésor national.',
      p2: 'Nous travaillons sur l\'ensemble du cycle de projet — de l\'identification, l\'évaluation et la faisabilité jusqu\'à la passation des marchés, l\'évaluation des offres, la négociation des contrats, la clôture financière et la gestion des contrats à long terme.',
      lifecycle: 'Cycle de Vie du Conseil PPP',
      cta: 'Discuter d\'un Mandat PPP',
      stages: [
        { label: 'Identification du Projet', desc: 'Cartographie des opportunités PPP viables alignées sur les priorités nationales et des comtés' },
        { label: 'Conseil en Faisabilité', desc: 'Support d\'évaluation de la faisabilité technique, financière et juridique' },
        { label: 'Structuration de la Passation des Marchés', desc: 'Conseil sur la stratégie d\'appel d\'offres, les cadres de soumission et le sondage du marché' },
        { label: 'Support à l\'Évaluation des Offres', desc: 'Support consultatif lors de l\'évaluation des offres et de l\'examen des propositions' },
        { label: 'Négociation des Contrats', desc: 'Support aux négociations de l\'accord de concession et des accords de projet' },
        { label: 'Clôture Financière', desc: 'Coordination de la diligence raisonnable des prêteurs, des term sheets et des conditions de clôture' },
        { label: 'Gestion des Contrats', desc: 'Conseil de suivi à long terme et de gestion des contrats tout au long de l\'exploitation' },
      ],
      sectors: [
        { label: 'Énergie', sub: 'Production, transport, distribution' },
        { label: 'Routes & Transport', sub: 'Autoroutes, ponts, mobilité urbaine' },
        { label: 'Eau & Assainissement', sub: 'Eau en vrac, égouts, traitement' },
        { label: 'Infrastructure Sociale', sub: 'Logement, santé, éducation' },
      ],
    },

    cta_split: {
      sponsor_label: 'Pour les Promoteurs de Projets',
      sponsor_heading: 'Vous levez des capitaux pour un mandat logement, énergie, PPP ou microfinance?',
      sponsor_body: 'De la faisabilité et la modélisation financière jusqu\'à la syndication et la clôture financière, nous travaillons côte à côte avec les sponsors pour fermer un capital bancable.',
      sponsor_cta: 'Discuter de Votre Projet',
      investor_label: 'Pour les Investisseurs Institutionnels',
      investor_heading: 'Vous cherchez un flux de transactions à fort impact en Afrique de l\'Est?',
      investor_body: 'Accédez à notre pipeline d\'opportunités en logement, énergies renouvelables et finance inclusive dûment vérifiées au Kenya et dans la Communauté d\'Afrique de l\'Est.',
      investor_cta: 'Accéder au Pipeline',
    },

    footer: {
      tagline: 'Conseil en capital et financement de projets pour des projets transformateurs au Kenya et en Afrique de l\'Est.',
      location: 'Nairobi, Kenya',
      services_title: 'Nos Services',
      company_title: 'Entreprise',
      contact_title: 'Contactez-Nous',
      send_inquiry: 'Envoyer une Demande',
      copyright: 'Tous droits réservés.',
      disclaimer: 'Services de conseil en capital. Pas un établissement financier réglementé.',
      services: ['Logement Abordable', 'Énergies Renouvelables', 'Conseil PPP', 'Capital Microfinance'],
      links: ['À Propos', 'Notre Équipe', 'Partenaires', 'Contactez-Nous'],
    },

    pages: {
      about: { title: 'À Propos', subtitle: 'Qui Nous Sommes & Ce Que Nous Représentons' },
      services: { title: 'Nos Services', subtitle: 'Capital Structuré pour des Secteurs Transformateurs' },
      partners: { title: 'Partenaires', subtitle: 'Avec Qui Nous Travaillons' },
      team: { title: 'Notre Équipe', subtitle: 'Leadership & Expertise' },
      contact: { title: 'Contactez-Nous', subtitle: 'Prenez Contact' },
    },

    contact_info: {
      heading: 'Nous Aimerions Vous Entendre',
      body: 'Que vous soyez un sponsor de projet cherchant des capitaux, une autorité gouvernementale explorant une structure PPP, ou un investisseur institutionnel cherchant des mandats — nous répondons à toutes les demandes dans les deux jours ouvrables.',
      location_label: 'Adresse du Bureau',
      location: 'Nairobi, Kenya',
      email_label: 'E-mail',
      sponsor_title: 'Promoteur de Projet?',
      sponsor_body: 'Parlez-nous de votre projet et de votre besoin en capital',
      investor_title: 'Investisseur?',
      investor_body: 'Inscrivez-vous pour recevoir des notes de mandat structurées',
      commitment: 'Engagement de réponse:',
      commitment_body: 'Nous accusons réception de toutes les demandes dans un jour ouvrable et fournissons une réponse substantielle dans les deux jours ouvrables.',
    },

    cta_section: {
      eyebrow: 'Commencer',
    },

    page_ctas: {
      about: {
        title: 'Prêt à Discuter d\'un Mandat?',
        body: 'Que vous soyez un promoteur de projet, une autorité contractante ou un investisseur institutionnel — nous serions ravis d\'avoir une conversation.',
        primary: 'Contactez-Nous',
        secondary: 'Nos Services',
      },
      services: {
        title: 'Prêt à Commencer une Conversation?',
        body: 'Parlez-nous de votre mandat et nous répondrons dans les deux jours ouvrables.',
        primary: 'Contactez-Nous',
        secondary: 'Nos Partenaires',
      },
      partners: {
        title: 'Intéressé par une Collaboration?',
        body: 'Que vous soyez un promoteur de projet cherchant des capitaux ou un investisseur cherchant des mandats — nous aimerions vous entendre.',
        primary: 'Envoyer une Demande de Partenariat',
        secondary: 'Nos Services',
      },
      team: {
        title: 'Vous Avez un Mandat à Discuter?',
        body: 'Notre équipe est prête à s\'engager sur des mandats dans les domaines du logement, de l\'énergie, des PPP et de la microfinance.',
        primary: 'Contactez-Nous',
      },
    },

    whatsapp_tooltip: 'Discuter sur WhatsApp',
    back_to_top: 'Retour en haut',
  },
}

export default translations
