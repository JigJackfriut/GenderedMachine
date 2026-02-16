"use client"

import { useState, useEffect, useRef } from "react"
import { HeroSection } from "@/components/sections/hero-section"
import { HowTechnologyCreatesGender } from "@/components/sections/how-technology-creates-gender"
import { CaseStudies } from "@/components/sections/case-studies"
import { FeedbackLoops } from "@/components/sections/feedback-loops"
import { AIAndGender } from "@/components/sections/feminized-ai"
import { ResistanceStrategies } from "@/components/sections/resistance-strategies"
import { Bibliography } from "@/components/sections/beyond-binary"
import { SiteNavigation } from "@/components/sections/site-navigation"

export default function AlgorithmicGendering() {
  const [navVisible, setNavVisible] = useState(false)
  const [activeSection, setActiveSection] = useState(0)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      setNavVisible(window.scrollY > window.innerHeight * 0.5)

      for (let i = sectionRefs.current.length - 1; i >= 0; i--) {
        const ref = sectionRefs.current[i]
        if (ref) {
          const rect = ref.getBoundingClientRect()
          if (rect.top < window.innerHeight / 2) {
            setActiveSection(i)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <SiteNavigation
        visible={navVisible}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      <div ref={(el) => { sectionRefs.current[0] = el }}>
        <HeroSection onScrollDown={() => scrollToSection(1)} />
      </div>

      <div ref={(el) => { sectionRefs.current[1] = el }}>
        <HowTechnologyCreatesGender />
      </div>

      <div ref={(el) => { sectionRefs.current[2] = el }}>
        <CaseStudies />
      </div>

      <div ref={(el) => { sectionRefs.current[3] = el }}>
        <FeedbackLoops />
      </div>

      <div ref={(el) => { sectionRefs.current[4] = el }}>
        <AIAndGender />
      </div>

      <div ref={(el) => { sectionRefs.current[5] = el }}>
        <ResistanceStrategies />
      </div>

      <div ref={(el) => { sectionRefs.current[6] = el }}>
        <Bibliography />
      </div>

      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            An educational project on algorithmic gendering. No real user data is collected.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
          >
            Back to top
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </footer>
    </main>
  )
}
