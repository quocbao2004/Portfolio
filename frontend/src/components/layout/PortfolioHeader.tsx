import { Button } from '../ui'

function PortfolioHeader() {
  return (
    <header className="portfolio-header">
      <div className="header-shell">
        <div className="header-main">
          <a className="brand" href="/" aria-label="Portfolio home">
            <span className="brand-mark">P</span>
            <span className="brand-text">
              <span>Portfolio</span>
              <small>Frontend Developer</small>
            </span>
          </a>

          <nav className="header-nav" aria-label="Primary navigation">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>

        <Button className="header-login-button" href="/login">
          Login
        </Button>
      </div>
    </header>
  )
}

export default PortfolioHeader
