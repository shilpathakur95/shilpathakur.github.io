import React, { useState, useEffect, useRef } from 'react';
import { profile, experience, skills, projects, caseStudies, testimonials, brands, otherSkills } from './data/content';
import './App.css';

/* ── Cursor Trail ── */
function CursorTrail() {
  const canvasRef = useRef(null);
  const dots = useRef([]);
  const mouse = useRef({ x: -999, y: -999 });
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', e => { mouse.current = { x: e.clientX, y: e.clientY }; });
    const colors = ['#e8724a','#d4a96a','#9b5fa0','#e8c4a0','#c94f6d'];
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.current.push({ x: mouse.current.x, y: mouse.current.y, color: colors[Math.floor(Math.random()*colors.length)] });
      if (dots.current.length > 22) dots.current.shift();
      dots.current.forEach((d, i) => {
        const life = (i + 1) / dots.current.length;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 5 * life, 0, Math.PI * 2);
        ctx.fillStyle = d.color + Math.floor(life * 160).toString(16).padStart(2,'0');
        ctx.fill();
      });
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="cursor-canvas" />;
}

/* ── useInView ── */
function useInView(t = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: t });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [t]);
  return [ref, v];
}
function Reveal({ children, delay = 0, className = '' }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} className={`reveal ${v ? 'reveal--on' : ''} ${className}`} style={{ '--d': `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ── Nav ── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  const links = ['About','Work','Brands','Skills','Projects','Stories','Contact'];
  return (
    <nav className={`nav ${scrolled ? 'nav--solid' : ''}`}>
      <a href="#about" className="nav__logo">S<span className="nav__logo-star">✦</span>T</a>
      <ul className={`nav__links ${open ? 'nav__links--open' : ''}`}>
        {links.map(l => (
          <li key={l}><a href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}>{l}</a></li>
        ))}
      </ul>
      <button className="nav__ham" onClick={() => setOpen(o => !o)}>
        <span /><span />
      </button>
    </nav>
  );
}

/* ── Hero ── */
function Hero() {
  const words = ['strategist.','builder.','dancer.','meditator.','storyteller.','product lead.'];
  const [wIdx, setWIdx] = useState(0);
  const [fading, setFading] = useState(false);
  useEffect(() => {
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => { setWIdx(i => (i + 1) % words.length); setFading(false); }, 350);
    }, 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="hero" id="about">
      <div className="hero__deco hero__deco--tl" />
      <div className="hero__deco hero__deco--br" />
      <div className="hero__deco hero__deco--ring" />
      <div className="hero__inner">
        <div className="hero__text">
          <div className="hero__hello">Hello world, I'm 👋</div>
          <h1 className="hero__name">
            Shilpa<br />
            <span className="hero__name-alt">Thakur</span>
          </h1>
          <div className="hero__morph">
            <span>A </span>
            <span className={`hero__morph-word ${fading ? 'fade-out' : 'fade-in'}`}>{words[wIdx]}</span>
          </div>
          <p className="hero__bio">{profile.bio}</p>
          <div className="hero__chips">
            {['📍 Dubai','🎓 CS Grad','🤖 AI Daily','💃 Zumba Pro'].map(c => (
              <span key={c} className="chip">{c}</span>
            ))}
          </div>
          <div className="hero__btns">
            <a href="#work" className="btn-primary">Explore My Work ↓</a>
            <a href="#contact" className="btn-ghost">Say Hello 👋</a>
          </div>
        </div>
        <div className="hero__visual">
          <div className="hero__card">
            <div className="hero__card-glow" />
            <div className="hero__card-content">
              <div className="hero__card-avatar">ST</div>
              <div className="hero__card-name">Shilpa Thakur</div>
              <div className="hero__card-role">Product Manager</div>
              <div className="hero__card-divider" />
              <div className="hero__card-facts">
                {[['🚀','7+ yrs exp'],['🌍','3 regions'],['👥','Millions of users'],['🤖','AI practitioner']].map(([ic,t]) => (
                  <div key={t} className="hero__card-fact"><span>{ic}</span><span>{t}</span></div>
                ))}
              </div>
            </div>
          </div>
          <div className="hero__bubble hero__bubble--1">✦ AI Fluent</div>
          <div className="hero__bubble hero__bubble--2">🎯 Strategy</div>
          <div className="hero__bubble hero__bubble--3">🔮 Tarot</div>
          <div className="hero__bubble hero__bubble--4">💃 Zumba</div>
        </div>
      </div>
      <div className="hero__scroll">scroll ↓</div>
    </section>
  );
}

/* ── Brands Marquee ── */
function Brands() {
  return (
    <section className="brands" id="brands">
      <Reveal><p className="brands__label">Brands I've worked with</p></Reveal>
      <div className="brands__track-outer">
        <div className="brands__track">
          {[...brands, ...brands, ...brands].map((b, i) => (
            <div key={i} className="brand-pill">
              <span>{b.emoji}</span>
              <span>{b.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Work ── */
function Work() {
  const [active, setActive] = useState(0);
  const emojis = ['🚀','⚡','🔬'];
  return (
    <section className="section" id="work">
      <Reveal>
        <div className="sec-hed">
          <span className="sec-tag">01 / experience</span>
          <h2>Where I've Worked</h2>
        </div>
      </Reveal>
      <div className="exp">
        <div className="exp__sidebar">
          {experience.map((e, i) => (
            <button key={i} className={`exp__btn ${active === i ? 'exp__btn--on' : ''}`} onClick={() => setActive(i)}>
              <span className="exp__btn-dot" />
              <div>
                <div className="exp__btn-co">{e.company}</div>
                <div className="exp__btn-yr">{e.period}</div>
              </div>
            </button>
          ))}
        </div>
        <div className="exp__pane">
          <Reveal key={active}>
            <div className="exp__pane-hed">
              <span className="exp__pane-emoji">{emojis[active]}</span>
              <div>
                <h3 className="exp__pane-title">{experience[active].title}</h3>
                <p className="exp__pane-co">{experience[active].company} — {experience[active].location}</p>
                <p className="exp__pane-yr">{experience[active].period}</p>
              </div>
            </div>
            <ul className="exp__pane-list">
              {experience[active].bullets.map((b, i) => (
                <li key={i}><span className="exp__arrow">→</span>{b}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Skills ── */
function Skills() {
  return (
    <section className="section section--warm" id="skills">
      <Reveal>
        <div className="sec-hed">
          <span className="sec-tag">02 / skills</span>
          <h2>What I Bring</h2>
        </div>
      </Reveal>
      <div className="skills-grid">
        {skills.map((s, i) => (
          <Reveal key={s.category} delay={i * 60}>
            <div className="skill-card">
              <h4 className="skill-card__cat">{s.category}</h4>
              <div className="skill-card__tags">
                {s.items.map(item => <span key={item} className="stag">{item}</span>)}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={300}>
        <div className="beyond">
          <div className="beyond__hed">
            <span className="beyond__star">✦</span>
            <div>
              <h3>Beyond the Desk</h3>
              <p>Because great PMs are full humans first.</p>
            </div>
          </div>
          <div className="beyond__grid">
            {otherSkills.map((s, i) => (
              <div key={i} className="beyond-card">
                <div className="beyond-card__emoji">{s.emoji}</div>
                <div className="beyond-card__name">{s.name}</div>
                <div className="beyond-card__desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ── Projects ── */
function Projects() {
  return (
    <section className="section" id="projects">
      <Reveal>
        <div className="sec-hed">
          <span className="sec-tag">03 / projects</span>
          <h2>Things I've Built</h2>
        </div>
      </Reveal>
      <div className="proj-grid">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 80}>
            <div className="proj-card">
              <div className="proj-card__top">
                <span className="proj-card__n">0{i+1}</span>
                <span className="proj-card__co">{p.company}</span>
              </div>
              <h3 className="proj-card__title">{p.title}</h3>
              <p className="proj-card__desc">{p.description}</p>
              <div className="proj-card__outcome">🎯 {p.outcome}</div>
              <div className="proj-card__tags">
                {p.tags.map(t => <span key={t} className="stag">{t}</span>)}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Case Studies ── */
function Stories() {
  const [open, setOpen] = useState(null);
  return (
    <section className="section section--warm" id="stories">
      <Reveal>
        <div className="sec-hed">
          <span className="sec-tag">04 / case studies</span>
          <h2>The Stories Behind the Work</h2>
        </div>
      </Reveal>
      {caseStudies.map((c, i) => (
        <Reveal key={i} delay={i * 80}>
          <div className={`story ${open === i ? 'story--open' : ''}`}>
            <button className="story__btn" onClick={() => setOpen(open === i ? null : i)}>
              <div>
                <div className="story__tags">{c.tags.map(t => <span key={t} className="stag">{t}</span>)}</div>
                <h3 className="story__title">{c.title}</h3>
                <p className="story__summary">{c.summary}</p>
              </div>
              <span className="story__chevron">{open === i ? '↑ Close' : '↓ Read'}</span>
            </button>
            {open === i && (
              <div className="story__body">
                {[['🧩 The Problem', c.problem],['🗺️ My Approach', c.approach],['🏆 The Outcome', c.outcome]].map(([h,t]) => (
                  <div key={h} className="story__block">
                    <h4>{h}</h4>
                    <p>{t}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      ))}
    </section>
  );
}

/* ── Testimonials ── */
function Testimonials() {
  return (
    <section className="section" id="testimonials">
      <Reveal>
        <div className="sec-hed">
          <span className="sec-tag">05 / kind words</span>
          <h2>What People Say</h2>
        </div>
      </Reveal>
      <div className="test-grid">
        {testimonials.map((t, i) => (
          <Reveal key={i} delay={i * 120}>
            <div className="test-card">
              <div className="test-card__mark">"</div>
              <p className="test-card__text">{t.text}</p>
              <div className="test-card__attr">
                <strong>{t.name}</strong>
                <span>{t.company}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Contact ── */
function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact__blob contact__blob--1" />
      <div className="contact__blob contact__blob--2" />
      <Reveal className="contact__inner">
        <p className="contact__eyebrow">06 / let's connect</p>
        <h2 className="contact__title">
          Let's build something<br />
          <em>that actually matters.</em>
        </h2>
        <p className="contact__sub">Whether it's a product, a chat, or a Zumba class 💃</p>
        <div className="contact__links">
          <a href={`mailto:${profile.email}`} className="contact__link"><span>✉</span>{profile.email}</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="contact__link"><span>in</span>LinkedIn</a>
          <a href={`tel:${profile.phone}`} className="contact__link"><span>☎</span>{profile.phone}</a>
        </div>
        <a href={`mailto:${profile.email}`} className="btn-primary">Send a Message →</a>
      </Reveal>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="footer">
      <span>Made with ☕ + ✨</span>
      <span>Shilpa Thakur · Dubai · {new Date().getFullYear()}</span>
    </footer>
  );
}

/* ── App ── */
export default function App() {
  return (
    <div className="app">
      <CursorTrail />
      <Nav />
      <Hero />
      <Brands />
      <Work />
      <Skills />
      <Projects />
      <Stories />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
