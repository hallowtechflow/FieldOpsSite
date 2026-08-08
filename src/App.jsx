const features = [
  { number: '01', title: 'Plan the day', text: 'Schedule work, assign crews, and keep every property and ticket connected.' },
  { number: '02', title: 'Run the field', text: 'Give technicians a clear mobile workspace for time, jobs, products, and records.' },
  { number: '03', title: 'Know the business', text: 'See labor, fleet, equipment, licensing, and operational performance in one place.' },
]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

function App() {
  return (
    <main>
      <section className="hero" id="top">
        <nav className="nav" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="FieldOps home">
            <img src="/branding/fo-logo-trans-bg.png" alt="FieldOps" />
          </a>
          <a className="nav__demo" href="https://field-ops-crm.web.app" target="_blank" rel="noreferrer">
            View demo <ArrowIcon />
          </a>
        </nav>

        <div className="hero__glow hero__glow--one" />
        <div className="hero__glow hero__glow--two" />

        <div className="hero__content">
          <p className="eyebrow"><span /> Field operations, finally connected</p>
          <h1>Your business runs in the field.<br /><em>Your software should too.</em></h1>
          <p className="hero__intro">
            FieldOps is the all-in-one command center built for landscaping and field service teams—bringing crews, schedules, customers, jobs, and equipment into one clear view.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="https://field-ops-crm.web.app" target="_blank" rel="noreferrer">
              Explore the live demo <ArrowIcon />
            </a>
            <a className="button button--ghost" href="#platform">See what’s coming</a>
          </div>
          <p className="launch-note"><span className="launch-note__pulse" /> Private preview available now · Public launch coming soon</p>
        </div>

        <div className="hero__panel" aria-label="FieldOps platform preview">
          <div className="hero__panel-top">
            <div className="hero__panel-brand"><img src="/branding/fo-logo-icon.png" alt="" /><span>FIELDOPS</span></div>
            <span className="hero__panel-status">Operations live</span>
          </div>
          <div className="hero__metrics">
            <article><span>Jobs today</span><strong>24</strong><small>Across 4 crews</small></article>
            <article><span>Crews active</span><strong>4</strong><small>All checked in</small></article>
            <article><span>Completion</span><strong>78%</strong><small>On track</small></article>
          </div>
          <div className="hero__route">
            <div><span>08:00</span><i className="route-dot route-dot--blue" /></div>
            <p><strong>Morning route</strong><small>6 properties · Crew North</small></p>
            <b>In progress</b>
          </div>
          <div className="hero__route">
            <div><span>11:30</span><i className="route-dot route-dot--green" /></div>
            <p><strong>Irrigation service</strong><small>Bayview Apartments</small></p>
            <b>Scheduled</b>
          </div>
        </div>
      </section>

      <section className="platform" id="platform">
        <div className="section-heading">
          <p className="eyebrow eyebrow--dark"><span /> One platform. The whole operation.</p>
          <h2>Less chasing.<br />More getting it done.</h2>
          <p>FieldOps is being designed around the way real crews work—from the first clock-in to the final report.</p>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.number}>
              <span>{feature.number}</span>
              <div><h3>{feature.title}</h3><p>{feature.text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="modules" aria-label="FieldOps modules">
        <p>Built to bring it all together</p>
        <div className="module-list">
          {['Scheduling', 'Customers', 'Properties', 'Jobs & tickets', 'Time tracking', 'Products', 'Fleet', 'Equipment', 'Licenses', 'Reports'].map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>

      <section className="closing">
        <div>
          <p className="eyebrow"><span /> Coming soon</p>
          <h2>Ready to run a tighter operation?</h2>
          <p>Take a first look at the FieldOps demo today. The platform is actively being built for the crews who keep properties moving.</p>
        </div>
        <a className="button button--primary" href="https://field-ops-crm.web.app" target="_blank" rel="noreferrer">
          Open FieldOps demo <ArrowIcon />
        </a>
      </section>

      <footer>
        <a className="brand" href="#top"><img src="/branding/fo-logo-trans-bg.png" alt="FieldOps" /></a>
        <p>
          FieldOps is a company by{' '}
          <a href="https://dev.hallowtech.us" target="_blank" rel="noreferrer">
            <strong>HALLOWTECH</strong>
          </a>
        </p>
        <span>© {new Date().getFullYear()} FieldOps</span>
      </footer>
    </main>
  )
}

export default App
