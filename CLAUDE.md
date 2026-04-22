# CLAUDE.md

## Project
Build a **premium corporate website** for **Mugumo Capital Partners Limited**.

The website must feel **institutional, polished, credible, spacious, and executive-level**, inspired by the visual tone and page architecture of Strategix Capital, whose current navigation includes **Home, About Us, Our Team, Our Services, Contact Us, and Partners**. Use that as inspiration for structure and feel, but do **not** copy branding, wording, layout one-for-one, or proprietary assets. Base the actual site content on the provided Mugumo Capital content source.

## Core Objective
Create a modern, responsive, SEO-friendly website that positions Mugumo Capital Partners Limited as a **Nairobi-based capital advisory firm** serving **Kenya and East Africa**, with a focus on:
- Affordable housing
- Renewable energy
- Public Private Partnerships (PPP)
- Microfinance / inclusive finance

The site should communicate trust, sector specialization, regional focus, and institutional readiness.

---

## Tech Stack
Preferred stack:
- **Frontend:** React
- **Backend:** PHP
- **Database:** MySQL
- **UI:** Bootstrap 5
- **Markup:** HTML5
- **Interactivity:** JavaScript
- **Styling:** Bootstrap first, with some custom CSS where needed
- **Icons:** Bootstrap Icons or Lucide-compatible SVGs
- **Animations:** lightweight CSS transitions and intersection reveal effects
- **Forms:** PHP-powered form handling with validation and database persistence

Use a stack that is fully compatible with:
- **Development MySQL**
- **Production MySQL**

Avoid unnecessary complexity. No heavy CMS. No Laravel unless specifically requested later. Keep the PHP backend modular and clean.

---

## Implementation Principles
1. Build the site as a **true multi-page website**, not a one-page scroll site.
2. Use **React for the frontend UI**, with clean reusable components.
3. Use **PHP endpoints** for form handling, newsletter/contact submissions, and future admin extensibility.
4. Use **MySQL** to store:
   - contact form submissions
   - partner/investor inquiries
   - future newsletter subscriptions
5. Make the website easy to expand later.
6. Use a **professional corporate visual language**:
   - large hero sections
   - serif-style headings if suitable
   - clean whitespace
   - rich but restrained colors
   - premium card layouts
   - subtle motion
7. Make the design **responsive across desktop, tablet, and mobile**.
8. Do not fabricate client names, transaction history, investor logos, or team bios.
9. Where content has not yet been supplied, create clean placeholders or “content-ready” sections without fake claims.

---

## Brand Positioning
Mugumo Capital Partners Limited should be presented as:
- A **capital raising and advisory partner**
- Based in **Nairobi, Kenya**
- Serving **East Africa**
- Focused on **project finance, PPP advisory, and institutional capital**
- Serving project sponsors, developers, governments, financial institutions, DFIs, and institutional investors

Tone:
- Confident
- Measured
- Sophisticated
- Regionally grounded
- Investor-grade
- Clear and not flashy

Avoid overly salesy wording. The tone should sound like a serious advisory firm.

---

## Source Content Rules
Use the Mugumo Capital content provided by the user as the **primary source of truth**.

Key content themes already supplied include:
- Hero positioning around unlocking transformational capital across East Africa
- Nairobi headquarters
- Regional coverage: Kenya, Uganda, Tanzania, Rwanda, Ethiopia, and wider East Africa
- Core services:
  1. Fundraising for Affordable Housing
  2. Fundraising for Renewable Energy
  3. PPP Project Advisory & Capital Raising
  4. Capital Raising for Microfinance
- Sector emphasis:
  - Affordable Housing
  - Solar Energy
  - Hydro & Wind
  - Geothermal
  - PPP / Infrastructure
  - Microfinance
- Value proposition:
  - Local conviction
  - Investor network
  - Structuring discipline
  - Sector specialization
- Contact positioning:
  - Nairobi, Kenya
  - info@mugumocapital.com
  - Project sponsors and institutional investors

Do not invent:
- closed transactions
- AUM
- deal tombstones
- specific partner institutions
- staff biographies
- licensed regulatory claims beyond what is provided

---

## Required Pages
The site should have these pages:

### 1. Home
Purpose:
- Introduce Mugumo Capital Partners
- Show premium positioning immediately
- Summarize sectors, services, regional focus, and calls to action

Sections:
- Hero
- Intro / positioning section
- Services overview
- Sector focus overview
- Why Mugumo / differentiators
- PPP framework section
- CTA split for sponsors and investors
- Footer

### 2. About Us
Purpose:
- Present who Mugumo is
- Explain philosophy, regional focus, and sector focus
- Build trust without exaggeration

Sections:
- Page hero
- Company overview
- East Africa focus
- What we do / what we do not do
- Core pillars
- Why clients work with Mugumo
- Optional timeline or operating model section

### 3. Our Team
Purpose:
- Provide a dedicated team page because the inspiration site has one
- Keep it ready for future profiles

Rules:
- Do **not** fabricate team members or bios
- Build the page in a content-ready way
- If no approved bios are available, include:
  - a strong intro section on leadership philosophy
  - a “Leadership Profiles Coming Soon” or “Team information available on request” section
  - optional cards with neutral placeholders that are easy to populate later from data files

### 4. Our Services
Purpose:
- Expand all service lines in detail

Include detailed sections for:
- Affordable Housing Fundraising
- Renewable Energy Fundraising
- PPP Advisory & Capital Raising
- Microfinance Capital Raising

Each service page section should include:
- overview
- ideal client types
- transaction support scope
- structuring themes
- CTA

### 5. Partners
Purpose:
- Provide a page for relationships and collaboration categories without inventing logos or closed mandates

Content direction:
- Explain the types of counterparties Mugumo works with:
  - project sponsors
  - institutional investors
  - DFIs
  - pension funds
  - commercial banks
  - microfinance institutions
  - PPP contracting authorities
- Include a collaboration model section
- Include a partnership inquiry CTA
- Do **not** show fake partner logos

### 6. Contact Us
Purpose:
- Make it easy for sponsors and investors to engage

Include:
- contact hero
- office location: Nairobi, Kenya
- email: info@mugumocapital.com
- inquiry form
- inquiry type selector
- optional map placeholder
- sponsor/investor CTA blocks

---

## Recommended Extra Routes
These are optional but recommended if implemented cleanly:
- `/` Home
- `/about`
- `/team`
- `/services`
- `/partners`
- `/contact`

Optional deeper routes for scalability:
- `/services/affordable-housing`
- `/services/renewable-energy`
- `/services/ppp-advisory`
- `/services/microfinance`

If deeper routes are added, keep the main `/services` page as a summary hub.

---

## Design Direction
Inspiration should come from the premium corporate style of the reference site:
- large full-width hero areas
- strong typography hierarchy
- clean card-based sections
- institutional elegance
- refined spacing
- strong CTAs
- image-led sector storytelling

### Visual Style
Aim for:
- dark navy / deep slate primary tones
- warm accent color such as muted orange or bronze
- ivory / off-white backgrounds for softness
- restrained gradients
- subtle borders and shadows
- serif headings paired with clean sans-serif body text

### Suggested palette
Use these as starting points:
- Navy: `#0F2B3C`
- Deep Navy: `#081923`
- Accent Orange: `#E8751A`
- Soft Accent: `#F5A55C`
- Ivory: `#F7F3EC`
- Muted Ivory: `#EFE9DD`
- Body Text: `#2B3C47`
- Muted Text: `#5A6A74`

### Typography
Recommended approach:
- Headings: elegant serif or serif-like display
- Body: clean sans-serif
- Keep spacing generous and premium

### UX
- Sticky header
- Smooth transitions
- Reveal-on-scroll animations
- Clear CTA buttons
- Clean mobile nav
- Strong footer
- Fast load times

---

## Content Mapping From Provided Mugumo Source

### Hero Content
Use messaging aligned to:
- “Unlocking Capital for Transformational Projects Across East Africa”
- Mugumo as arranger and syndicator of project finance, structured debt, and institutional capital
- Focus on housing, renewable energy, PPPs, and microfinance
- Coverage across Kenya and East Africa

### About Content
Use:
- Nairobi-headquartered positioning
- East African Community focus
- disciplined sector specialization
- project sponsors, developers, financial institutions

### Services Content
Use the four services exactly as the backbone of the services architecture:
1. Fundraising for Affordable Housing
2. Fundraising for Renewable Energy
3. PPP Project Advisory & Capital Raising
4. Capital Raising for Microfinance

### Sector Content
Use sector cards/sections around:
- Affordable Housing
- Solar Energy
- Hydro & Wind
- Geothermal
- Public Private Partnerships
- Microfinance

### Why Mugumo Content
Use differentiators such as:
- Local Conviction
- Investor Network
- Structuring Discipline
- Sector Specialisation

### PPP Block
Include a dedicated PPP section referencing:
- Kenya’s PPP legal and institutional framework
- PPP Directorate
- project identification
- feasibility
- procurement
- tender evaluation
- contract negotiation
- financial close
- long-term contract management

Keep the wording polished and compliant. Do not overstate legal or official affiliation.

---

## Frontend Architecture

### Recommended React Structure
```txt
frontend/
  public/
    index.html
    favicon.ico
    og-image.jpg
  src/
    assets/
      images/
      icons/
    components/
      layout/
        Header.jsx
        Footer.jsx
        PageHero.jsx
      common/
        CTASection.jsx
        SectionIntro.jsx
        Reveal.jsx
        Button.jsx
      home/
        HeroSection.jsx
        HomeAboutPreview.jsx
        ServicesPreview.jsx
        SectorsGrid.jsx
        WhyMugumo.jsx
        PPPBlock.jsx
        SponsorInvestorCTA.jsx
      about/
        AboutStory.jsx
        CorePillars.jsx
        EastAfricaFocus.jsx
      team/
        TeamIntro.jsx
        TeamPlaceholderGrid.jsx
      services/
        ServicesGrid.jsx
        ServiceDetailBlock.jsx
      partners/
        PartnershipModel.jsx
        PartnerCategories.jsx
      contact/
        ContactInfo.jsx
        ContactForm.jsx
    pages/
      Home.jsx
      About.jsx
      Team.jsx
      Services.jsx
      Partners.jsx
      Contact.jsx
    router/
      AppRouter.jsx
    services/
      api.js
    styles/
      globals.css
      theme.css
      utilities.css
    App.jsx
    main.jsx
```

### Frontend Standards
- Use React Router
- Use reusable data-driven components where appropriate
- Keep page sections modular
- Bootstrap grid and utilities should be the foundation
- Add custom CSS only where Bootstrap does not provide enough control
- Avoid cluttered layouts
- Avoid excessive animations

---

## Backend Architecture (PHP)

### Recommended PHP Structure
```txt
backend/
  public/
    index.php
    .htaccess
  config/
    database.php
    app.php
  controllers/
    ContactController.php
    InquiryController.php
  models/
    ContactSubmission.php
    Inquiry.php
  routes/
    web.php
    api.php
  helpers/
    response.php
    validator.php
  storage/
    logs/
  sql/
    schema.sql
```

### Backend Responsibilities
Use PHP for:
- contact form submission
- inquiry form submission
- optional newsletter capture
- admin-ready CRUD foundation for future upgrades

### Backend Standards
- Use PDO for MySQL
- Use prepared statements only
- Validate and sanitize all inputs
- Return JSON for React consumption
- Store environment-specific database settings in config
- Keep business logic clean and separated from route definitions

---

## Database Requirements

### Database compatibility
The project must work with:
- MySQL in local development
- MySQL in production

Use environment-based configuration.

### Suggested tables

#### `contact_submissions`
- id
- full_name
- organisation
- email
- phone
- inquiry_type
- subject
- message
- created_at

#### `partner_inquiries`
- id
- full_name
- organisation
- email
- investor_type
- interest_area
- message
- created_at

#### Optional `newsletter_subscribers`
- id
- email
- created_at

Add proper indexes where useful.

---

## Contact Form Requirements
The contact experience should distinguish between:
- Project Sponsor
- PPP Contracting Authority
- Institutional Investor
- Development Finance Institution
- Microfinance Institution
- Other

Required fields:
- Name
- Organisation
- Email
- Inquiry Type
- Message

Optional:
- Phone
- Country
- Sector of interest

After submit:
- validate on frontend
- validate again on backend
- save to MySQL
- show a clean success message
- prepare backend so email notifications can be added later

---

## SEO Requirements
The site must be SEO-ready from day one.

Include:
- unique page titles
- meta descriptions
- semantic HTML
- Open Graph tags
- Twitter card tags
- schema-ready structure where practical
- crawl-friendly page structure
- accessible heading hierarchy
- optimized image alt text
- good internal linking
- sitemap-ready route structure

Suggested page title style:
- `Mugumo Capital Partners Limited | Capital Advisory in Kenya & East Africa`
- `About Us | Mugumo Capital Partners Limited`
- `Our Services | Mugumo Capital Partners Limited`

---

## Performance Requirements
- Optimize images
- Lazy-load non-critical visuals
- Keep JS bundles lean
- Use modern responsive image practices
- Avoid animation libraries unless truly needed
- Keep LCP-friendly hero implementation
- Ensure good mobile performance

---

## Accessibility Requirements
- Keyboard-friendly navigation
- Proper contrast
- Accessible form labels
- Alt text on images
- Clear focus states
- Landmark elements (`header`, `main`, `footer`, `nav`, `section`)
- Proper button/link semantics

---

## Image & Asset Rules
Use high-quality, legally safe corporate/sector imagery.

Needed image themes:
- East African skyline / Nairobi
- institutional meetings
- infrastructure and built environment
- housing developments
- renewable energy
- finance/investment imagery
- water / infrastructure / PPP where relevant

Do not use:
- fake award badges
- fake investor logos
- invented case study graphics
- random cluttered stock imagery
- images that feel low-end or generic

---

## Content Integrity Rules
Never invent or imply:
- closed transactions
- specific transaction values completed by Mugumo
- partner institutions
- legal accreditations not supplied
- team credentials not supplied
- regulated activities beyond the provided corporate advisory framing

Where content is missing:
- create elegant placeholders
- mark sections as content-ready
- keep the design complete without false statements

---

## Navigation
Primary nav should include:
- Home
- About Us
- Our Team
- Our Services
- Partners
- Contact Us

Sticky nav on desktop.
Collapsed mobile menu on smaller screens.

Footer should include:
- brand summary
- services links
- coverage links
- contact details
- legal/footer note

---

## Homepage Flow
Recommended order:
1. Hero
2. Who We Are / positioning
3. Services overview
4. Sector focus cards
5. Why Mugumo
6. PPP framework section
7. Dual CTA for sponsors and investors
8. Footer

---

## Page-Specific Notes

### About page
Include a section that clearly explains:
- Mugumo is built for East Africa
- sector focus is intentional
- advisory is business-to-business
- institutional-grade execution is central

### Team page
Must be clean even before actual profiles are supplied.
Prefer:
- leadership philosophy section
- future-ready team cards from local data
- no fake names or stock bios

### Services page
Each service block should include:
- what it is
- who it serves
- types of capital raised
- how Mugumo supports transaction execution
- CTA

### Partners page
This should emphasize:
- collaboration categories
- sponsor/investor alignment
- how Mugumo works with financial institutions and project sponsors
- partner inquiry CTA
- optional future logo wall component, initially disabled or empty

### Contact page
Should feel high-trust and executive:
- clear office location
- professional form
- concise reassurance copy
- fast engagement path

---

## Suggested Development Sequence
1. Set up project structure
2. Build routing and shared layout
3. Build Home page
4. Build About page
5. Build Services page
6. Build Partners page
7. Build Team page with safe placeholders
8. Build Contact page
9. Integrate PHP contact endpoint
10. Connect MySQL storage
11. Add SEO tags and metadata
12. Optimize responsiveness and polish animations

---

## What “Done” Looks Like
The finished site should:
- look premium and institutional
- clearly differentiate Mugumo from generic finance websites
- reflect East African focus
- have all required pages
- be responsive
- have working inquiry forms
- be ready for production deployment
- be easy to scale later with additional service pages, team content, and partner content

---

## Reference Guidance
Use the reference site only for:
- level of polish
- page architecture inspiration
- corporate feel
- premium section pacing
- navigation expectations

Do not copy:
- exact layout
- exact wording
- exact imagery
- exact branding system

Use Mugumo’s own content and identity throughout.

---

## Final Instruction to Claude
Build the Mugumo Capital Partners Limited website as a polished, multi-page, investor-grade corporate website using React + PHP + MySQL + Bootstrap, with a structure inspired by top-tier advisory firms, but grounded fully in the Mugumo content provided. Preserve credibility, avoid fabricated claims, and prioritize clean architecture, scalability, responsiveness, and premium design.
