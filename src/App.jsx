import { useEffect, useState } from 'react'

const APP_URL = 'https://field-ops-crm.web.app'

const features = [
  { number: '01', title: 'Plan the day', text: 'Schedule work, assign crews, and keep every property and ticket connected.' },
  { number: '02', title: 'Run the field', text: 'Give technicians a clear mobile workspace for time, jobs, products, and records.' },
  { number: '03', title: 'Know the business', text: 'See labor, fleet, equipment, licensing, and operational performance in one place.' },
]

const modules = ['Scheduling', 'Customers', 'Properties', 'Jobs & tickets', 'Time tracking', 'Products', 'Fleet', 'Equipment', 'Licenses', 'Reports']

const industries = [
  { slug: 'landscaping', name: 'Landscaping', eyebrow: 'Landscaping business software', headline: 'Keep every crew, property, and service day in sync.', intro: 'FieldOps gives landscaping companies one place to coordinate recurring maintenance, enhancement work, crews, equipment, products, and customer communication.', highlight: 'From weekly mowing routes to complex landscape installations, keep the full operation connected from estimate-ready job details through completion.' },
  { slug: 'lawn-care', name: 'Lawn Care', eyebrow: 'Lawn care business software', headline: 'Build tighter routes and deliver consistent lawn care.', intro: 'Organize recurring visits, property notes, technician assignments, products, and service history without juggling paper routes and disconnected apps.', highlight: 'Give every technician the property information and work instructions they need while the office sees progress across the entire day.' },
  { slug: 'irrigation', name: 'Irrigation', eyebrow: 'Irrigation service software', headline: 'Manage diagnostics, repairs, and recurring irrigation work.', intro: 'Connect customers, properties, zones, repair tickets, parts, technician schedules, and service records in a workspace built for field operations.', highlight: 'Keep a clear record of what was diagnosed, what was repaired, which products were used, and what the property needs next.' },
  { slug: 'pest-control', name: 'Pest Control', eyebrow: 'Pest control business software', headline: 'Run routes, product records, and compliance from one place.', intro: 'FieldOps helps pest control teams coordinate recurring service, technician assignments, product inventory, application details, licensing, and customer history.', highlight: 'Bring operational records and field execution together so every treatment is easier to schedule, document, review, and report.' },
  { slug: 'tree-care', name: 'Tree Care', eyebrow: 'Tree care business software', headline: 'Coordinate specialized crews, equipment, and tree-care jobs.', intro: 'Plan pruning, removal, plant-health, and emergency work with connected schedules, property details, job instructions, crew assignments, and equipment records.', highlight: 'Keep high-value equipment, trained employees, job requirements, and customer records visible before crews arrive on site.' },
  { slug: 'snow-removal', name: 'Snow Removal', eyebrow: 'Snow removal operations software', headline: 'Stay ready when weather turns into work.', intro: 'Coordinate properties, routes, crews, vehicles, equipment, products, and urgent tickets in one operational view built for fast-moving service events.', highlight: 'Prepare service locations before a storm, assign work quickly, and monitor completion across commercial and residential properties.' },
  { slug: 'commercial-cleaning', name: 'Commercial Cleaning', eyebrow: 'Commercial cleaning software', headline: 'Deliver repeatable service across every facility.', intro: 'Manage recurring schedules, site instructions, employee assignments, time records, supplies, quality tickets, and client contacts from one system.', highlight: 'Standardize what needs to be completed at each location while giving supervisors a clear view of attendance, assignments, and open issues.' },
  { slug: 'hvac', name: 'HVAC', eyebrow: 'HVAC field service software', headline: 'Move service calls from dispatch to completion without the chaos.', intro: 'Connect customers, service properties, technician schedules, work tickets, equipment, parts, time, and job history for a more organized HVAC operation.', highlight: 'Give dispatchers and technicians the same current information so urgent calls, scheduled maintenance, and follow-up work stay on track.' },
  { slug: 'plumbing', name: 'Plumbing', eyebrow: 'Plumbing business software', headline: 'Keep technicians moving and service history organized.', intro: 'Schedule calls, assign plumbers, record property details, manage tickets, track time and equipment, and maintain a clear history for every customer.', highlight: 'Turn incoming requests into structured work with the address, job requirements, assigned technician, status, and internal pricing connected.' },
  { slug: 'electrical', name: 'Electrical', eyebrow: 'Electrical contractor software', headline: 'Connect field work, licensed technicians, and every job record.', intro: 'FieldOps helps electrical contractors coordinate service calls, projects, employee qualifications, schedules, equipment, time, and documentation.', highlight: 'Match the right people to the right work and keep licensing, job details, progress, and reporting accessible when the office or field needs them.' },
]

const plans = [
  { key: 'solo', name: 'Solo', price: 19, users: '1 included user', idealFor: 'Owner-operators running the business themselves', description: 'A complete operating system for one-person field-service businesses—without paying for team seats you do not need.', features: ['Customer and property CRM', 'Jobs, tickets, and scheduling', 'Products and compliance records', 'Fleet and equipment tracking', 'Timesheets and business reporting', 'Company settings and document storage'] },
  { key: 'crew', name: 'Crew', price: 49, users: 'Up to 5 included users', idealFor: 'Small crews with an owner, supervisor, and field employees', description: 'Everything in Solo, expanded for a working team with employee accounts, assignments, time tracking, and approvals.', features: ['Everything included in Solo', 'Employee-facing FieldOps accounts', 'Multi-technician and crew assignments', 'Employee schedules and assigned tickets', 'Timecards and supervisor approval', 'Pay-rate, tenure, and team reporting'], featured: true },
  { key: 'business', name: 'Business', price: 89, users: 'Up to 15 included users', idealFor: 'Growing operations coordinating multiple crews and supervisors', description: 'The full FieldOps workspace with capacity for a larger operation, multiple crews, supervisors, and office administrators.', features: ['Everything included in Crew', 'Capacity for multiple active crews', 'Admin and supervisor access roles', 'Company-wide scheduling and dispatch', 'Expanded operational and payroll reporting', 'Centralized fleet, equipment, and compliance'] },
]

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
}

function SiteLink({ href, className, children, onClick }) {
  function navigate(event) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    window.history.pushState({}, '', href)
    window.dispatchEvent(new PopStateEvent('popstate'))
    window.scrollTo({ top: 0, behavior: 'instant' })
    onClick?.()
  }
  return <a href={href} className={className} onClick={navigate}>{children}</a>
}

function Header() {
  const [industriesOpen, setIndustriesOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  return <header className="site-header"><nav className="nav" aria-label="Primary navigation"><SiteLink className="brand" href="/" onClick={() => setMenuOpen(false)}><img src="/branding/fo-logo-trans-bg.png" alt="FieldOps" /></SiteLink><button className="nav__toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-menu" onClick={() => setMenuOpen((open) => !open)}><span /><span /><span /><span className="sr-only">Toggle navigation</span></button><div className={`nav__links${menuOpen ? ' is-open' : ''}`} id="primary-menu"><div className="nav__industries" onMouseLeave={() => setIndustriesOpen(false)}><button type="button" aria-expanded={industriesOpen} onClick={() => setIndustriesOpen((open) => !open)}>Industries <span>⌄</span></button><div className={`industry-menu${industriesOpen ? ' is-open' : ''}`}><SiteLink href="/industries" onClick={() => { setIndustriesOpen(false); setMenuOpen(false) }}><strong>All industries</strong><small>Explore every field-service solution</small></SiteLink>{industries.map((industry) => <SiteLink href={`/industries/${industry.slug}`} key={industry.slug} onClick={() => { setIndustriesOpen(false); setMenuOpen(false) }}>{industry.name}</SiteLink>)}</div></div><SiteLink href="/pricing" onClick={() => setMenuOpen(false)}>Pricing</SiteLink><a href={APP_URL} target="_blank" rel="noreferrer">Sign in</a><a className="nav__demo" href={APP_URL} target="_blank" rel="noreferrer">View demo <ArrowIcon /></a></div></nav></header>
}

function Footer() {
  return <footer><SiteLink className="brand" href="/"><img src="/branding/fo-logo-trans-bg.png" alt="FieldOps" /></SiteLink><div className="footer__links"><SiteLink href="/industries">Industries</SiteLink><SiteLink href="/pricing">Pricing</SiteLink><a href={APP_URL} target="_blank" rel="noreferrer">Open FieldOps</a></div><p>FieldOps is a company by <a href="https://dev.hallowtech.us" target="_blank" rel="noreferrer"><strong>HALLOWTECH</strong></a></p><span>© {new Date().getFullYear()} FieldOps</span></footer>
}

function CallToAction({ title = 'Ready to run a tighter operation?', text = 'Take a first look at FieldOps and see how one connected workspace can simplify the work behind every service day.' }) {
  return <section className="closing"><div><p className="eyebrow"><span /> Built for the field</p><h2>{title}</h2><p>{text}</p></div><a className="button button--primary" href={APP_URL} target="_blank" rel="noreferrer">Open FieldOps demo <ArrowIcon /></a></section>
}

function HomePage() {
  return <><section className="hero"><div className="hero__glow hero__glow--one" /><div className="hero__glow hero__glow--two" /><div className="hero__content"><p className="eyebrow"><span /> Field operations, finally connected</p><h1>Your business runs in the field.<br /><em>Your software should too.</em></h1><p className="hero__intro">FieldOps is the all-in-one command center built for landscaping and field service teams—bringing crews, schedules, customers, jobs, and equipment into one clear view.</p><div className="hero__actions"><a className="button button--primary" href={APP_URL} target="_blank" rel="noreferrer">Explore the live demo <ArrowIcon /></a><SiteLink className="button button--ghost" href="/industries">Explore industries</SiteLink></div><p className="launch-note"><span className="launch-note__pulse" /> Private preview available now · Public launch coming soon</p></div><div className="hero__panel" aria-label="FieldOps platform preview"><div className="hero__panel-top"><div className="hero__panel-brand"><img src="/branding/fo-logo-icon.png" alt="" /><span>FIELDOPS</span></div><span className="hero__panel-status">Operations live</span></div><div className="hero__metrics"><article><span>Jobs today</span><strong>24</strong><small>Across 4 crews</small></article><article><span>Crews active</span><strong>4</strong><small>All checked in</small></article><article><span>Completion</span><strong>78%</strong><small>On track</small></article></div><div className="hero__route"><div><span>08:00</span><i className="route-dot route-dot--blue" /></div><p><strong>Morning route</strong><small>6 properties · Crew North</small></p><b>In progress</b></div><div className="hero__route"><div><span>11:30</span><i className="route-dot route-dot--green" /></div><p><strong>Irrigation service</strong><small>Bayview Apartments</small></p><b>Scheduled</b></div></div></section><section className="platform" id="platform"><div className="section-heading"><p className="eyebrow eyebrow--dark"><span /> One platform. The whole operation.</p><h2>Less chasing.<br />More getting it done.</h2><p>FieldOps is designed around the way real crews work—from the first clock-in to the final report.</p></div><div className="feature-grid">{features.map((feature) => <article className="feature-card" key={feature.number}><span>{feature.number}</span><div><h3>{feature.title}</h3><p>{feature.text}</p></div></article>)}</div></section><section className="modules" aria-label="FieldOps modules"><p>Built to bring it all together</p><div className="module-list">{modules.map((item) => <span key={item}>{item}</span>)}</div></section><CallToAction /></>
}

function IndustriesPage() {
  return <><section className="page-hero"><p className="eyebrow"><span /> Industries</p><h1>Built for businesses that keep moving.</h1><p>FieldOps connects the office, field, customers, work, people, products, and assets across service industries where every day depends on clear execution.</p></section><section className="industry-directory"><div className="section-heading"><p className="eyebrow eyebrow--dark"><span /> Find your industry</p><h2>One platform.<br />Built around your operation.</h2><p>Choose an industry to see how FieldOps fits the work your team performs every day.</p></div><div className="industry-grid">{industries.map((industry, index) => <SiteLink className="industry-card" href={`/industries/${industry.slug}`} key={industry.slug}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{industry.name}</h3><p>{industry.intro}</p></div><ArrowIcon /></SiteLink>)}</div></section><CallToAction /></>
}

function IndustryPage({ industry }) {
  return <><section className="page-hero page-hero--industry"><p className="eyebrow"><span /> {industry.eyebrow}</p><h1>{industry.headline}</h1><p>{industry.intro}</p><div className="hero__actions"><a className="button button--primary" href={APP_URL} target="_blank" rel="noreferrer">See FieldOps in action <ArrowIcon /></a><SiteLink className="button button--ghost" href="/pricing">View pricing</SiteLink></div></section><section className="industry-solution"><div className="industry-solution__intro"><p className="eyebrow eyebrow--dark"><span /> How FieldOps helps</p><h2>Everything your {industry.name.toLowerCase()} business needs to stay connected.</h2><p>{industry.highlight}</p></div><div className="solution-grid">{features.map((feature) => <article key={feature.number}><span>{feature.number}</span><h3>{feature.title}</h3><p>{feature.text}</p></article>)}</div><div className="industry-modules"><h3>A complete operational workspace</h3><p>Every plan brings the same core platform together, so information entered once can support schedules, field work, reporting, and better decisions.</p><div className="module-list">{modules.map((item) => <span key={item}>{item}</span>)}</div></div></section><CallToAction title={`Give your ${industry.name.toLowerCase()} operation one clear view.`} text="Explore the live product, choose the plan that fits your team, and start building a more organized field operation." /></>
}

function PricingPage() {
  return <><section className="page-hero page-hero--pricing"><p className="eyebrow"><span /> Simple monthly pricing</p><h1>Choose the workspace that fits your operation.</h1><p>Every plan includes the core FieldOps platform. Start with the team size you need today and keep your operation connected as it grows.</p></section><section className="pricing"><div className="pricing-grid">{plans.map((plan) => <article className={`pricing-card${plan.featured ? ' pricing-card--featured' : ''}`} key={plan.key}>{plan.featured && <span className="pricing-card__badge">Most popular</span>}<div className="pricing-card__heading"><p>FieldOps</p><h2>{plan.name}</h2><div className="pricing-card__price"><strong>${plan.price}</strong><span>/month</span></div><b>{plan.users}</b></div><p className="pricing-card__ideal">{plan.idealFor}</p><p className="pricing-card__description">{plan.description}</p><ul>{plan.features.map((feature) => <li key={feature}><span>✓</span>{feature}</li>)}</ul><a className={`button ${plan.featured ? 'button--primary' : 'button--outline'}`} href={APP_URL} target="_blank" rel="noreferrer">Choose {plan.name} <ArrowIcon /></a></article>)}</div><div className="pricing-note"><strong>Included with every plan</strong><p>Secure PayPal billing · Cancel anytime · Mobile-ready web app · Core updates included</p></div></section><CallToAction title="Start with the plan that fits today." text="Open FieldOps to choose your plan, complete secure PayPal checkout, and create your company workspace." /></>
}

function NotFoundPage() {
  return <section className="not-found"><p className="eyebrow eyebrow--dark"><span /> 404</p><h1>That page isn’t here.</h1><p>The page may have moved, but your next step is easy.</p><SiteLink className="button button--primary" href="/">Return home <ArrowIcon /></SiteLink></section>
}

function currentRoute() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  if (path === '/') return { type: 'home' }
  if (path === '/pricing') return { type: 'pricing' }
  if (path === '/industries') return { type: 'industries' }
  if (path.startsWith('/industries/')) {
    const industry = industries.find((item) => item.slug === path.split('/')[2])
    if (industry) return { type: 'industry', industry }
  }
  return { type: 'notFound' }
}

function routeMetadata(route) {
  const origin = 'https://field-ops-usa.com'

  if (route.type === 'pricing') return {
    title: 'FieldOps Pricing | Plans from $19 per Month',
    description: 'Compare FieldOps Solo, Crew, and Business plans for field-service companies. Get scheduling, CRM, jobs, time tracking, fleet, equipment, compliance, and reporting from $19 per month.',
    url: `${origin}/pricing`,
  }

  if (route.type === 'industries') return {
    title: 'Industries | FieldOps Management Software',
    description: 'Explore FieldOps software for landscaping, lawn care, irrigation, pest control, tree care, snow removal, commercial cleaning, HVAC, plumbing, and electrical businesses.',
    url: `${origin}/industries`,
  }

  if (route.type === 'industry') return {
    title: `${route.industry.name} Business Software | FieldOps`,
    description: `${route.industry.intro} Explore scheduling, CRM, jobs, time tracking, assets, compliance, and reporting in one connected platform.`,
    url: `${origin}/industries/${route.industry.slug}`,
  }

  if (route.type === 'home') return {
    title: 'FieldOps | Field Service Management Software',
    description: 'FieldOps connects crews, schedules, customers, properties, jobs, time, products, fleet, equipment, licenses, and reports in one field-service platform.',
    url: `${origin}/`,
  }

  return {
    title: 'Page Not Found | FieldOps',
    description: 'Return to FieldOps field service management software.',
    url: `${origin}${window.location.pathname}`,
  }
}

function setMeta(selector, attribute, value) {
  const element = document.querySelector(selector)
  if (element) element.setAttribute(attribute, value)
}

function App() {
  const [route, setRoute] = useState(currentRoute)
  useEffect(() => { const handleRoute = () => setRoute(currentRoute()); window.addEventListener('popstate', handleRoute); return () => window.removeEventListener('popstate', handleRoute) }, [])
  useEffect(() => {
    const metadata = routeMetadata(route)
    document.title = metadata.title
    setMeta('meta[name="description"]', 'content', metadata.description)
    setMeta('meta[name="robots"]', 'content', route.type === 'notFound' ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
    setMeta('link[rel="canonical"]', 'href', metadata.url)
    setMeta('meta[property="og:title"]', 'content', metadata.title)
    setMeta('meta[property="og:description"]', 'content', metadata.description)
    setMeta('meta[property="og:url"]', 'content', metadata.url)
    setMeta('meta[name="twitter:title"]', 'content', metadata.title)
    setMeta('meta[name="twitter:description"]', 'content', metadata.description)
  }, [route])
  return <main><Header />{route.type === 'home' && <HomePage />}{route.type === 'industries' && <IndustriesPage />}{route.type === 'industry' && <IndustryPage industry={route.industry} />}{route.type === 'pricing' && <PricingPage />}{route.type === 'notFound' && <NotFoundPage />}<Footer /></main>
}

export default App
