"use client"

import { useState } from "react"

const SECTIONS = [
  "Landing",
  "How Technology Creates Gender",
  "Case Studies",
  "The Reinforcement Trap",
  "AI and Gender",
  "Strategies for Resistance",
  "Bibliography",
]

export function SiteNavigation({
  visible,
  activeSection,
  onNavigate,
}: {
  visible: boolean
  activeSection: number
  onNavigate: (index: number) => void
}) {
  const [aboutOpen, setAboutOpen] = useState(false)

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-500 ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider uppercase text-foreground">The Gendered Machine</span>
          <div className="hidden md:flex items-center gap-1">
            {SECTIONS.map((section, i) => (
              <button
                key={i}
                onClick={() => onNavigate(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeSection === i ? "w-6 bg-primary" : "w-2 bg-border hover:bg-muted-foreground"
                }`}
                title={section}
              />
            ))}
          </div>
          <button
            onClick={() => setAboutOpen(true)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </button>
        </div>
      </nav>

      {aboutOpen && (
        <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={() => setAboutOpen(false)}>
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-serif text-xl font-bold">About This Project</h3>
              <button onClick={() => setAboutOpen(false)} className="text-muted-foreground hover:text-foreground p-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                This interactive experience demonstrates how algorithmic systems infer and reinforce gender
                categories based on user behavior. It draws on research from Cheney-Lippold, Fausto-Sterling,
                Noble, Costanza-Chock, UNESCO, and others.
              </p>
              <h4 className="font-semibold text-foreground">Assumptions and Limitations</h4>
              <ul className="space-y-2">
                <li className="flex gap-2"><span className="text-primary">&bull;</span> The simulation uses simplified rule-based logic, not real ML models</li>
                <li className="flex gap-2"><span className="text-primary">&bull;</span> Content categories are illustrative stereotypes, not actual platform data</li>
                <li className="flex gap-2"><span className="text-primary">&bull;</span> Real recommendation systems are far more complex and opaque</li>
                <li className="flex gap-2"><span className="text-primary">&bull;</span> No real user data is collected or stored</li>
                <li className="flex gap-2"><span className="text-primary">&bull;</span> This is an educational tool, not a reverse-engineering of any specific platform</li>
              </ul>
              <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
                <p className="text-xs font-semibold text-accent mb-1">Key Distinction</p>
                <p className="text-xs">
                  Algorithmic gender score does not equal self-identified gender. These systems measure behavioral
                  patterns mapped to marketing categories, not identity.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
