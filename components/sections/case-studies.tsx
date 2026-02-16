"use client"

import { useState } from "react"

const CASE_STUDIES = [
  {
    front: "STEM Job Ad on Facebook",
    back: "Facebook's ad delivery system optimizes for cheapest clicks. Because men click tech job ads more frequently, the algorithm reinforces gender segregation in job advertising. Even when the advertiser explicitly targets all genders equally, the delivery system routes the ad predominantly to men. The bias is structural, built into the optimization logic itself.",
    source: "Lambrecht & Tucker (2019)",
    category: "Employment",
  },
  {
    front: "Facial Recognition Misgendering",
    back: "Automated gender recognition (AGR) systems consistently misgender trans and non-binary individuals, dark-skinned women, and those who do not conform to binary presentation norms. Error rates reach up to 34% for dark-skinned women compared to 1% for light-skinned men. These systems are deployed in airports, law enforcement, and hiring platforms.",
    source: "Buolamwini & Gebru (2018)",
    category: "Recognition",
  },
  {
    front: "Women's Content Shadowbanned",
    back: "Platform moderation algorithms disproportionately flag women's bodies as 'nudity' or 'sexually suggestive,' suppressing content from fitness instructors, breastfeeding mothers, and plus-size creators while allowing comparable male content to circulate freely. This automated censorship reduces women's economic opportunity on platforms.",
    source: "Content Moderation Research",
    category: "Moderation",
  },
  {
    front: "AI Chatbot Harassment Responses",
    back: "When subjected to sexual harassment, feminized AI assistants like early Siri and Alexa responded with deflection or flirtation rather than firm boundaries. Siri's original response to 'You're a b****' was 'I'd blush if I could.' This normalized harassment patterns and reinforced the idea that female-coded entities should be compliant.",
    source: "UNESCO 'I'd Blush If I Could' (2019)",
    category: "AI Design",
  },
  {
    front: "Health Search Results Bias",
    back: "Searching for symptoms while logged into a female-coded profile returns more mental health and anxiety results, while male-coded profiles receive cardiac and physical health results for identical symptoms. This means algorithmic gender classification can materially affect health outcomes by directing people toward different diagnoses.",
    source: "Algorithmic Bias Research",
    category: "Health",
  },
  {
    front: "Salary Negotiation Ads",
    back: "Google showed ads for high-paying executive coaching and salary negotiation services significantly more to users classified as male, limiting women's exposure to career advancement tools. The bias was not in the ad targeting settings but in the delivery algorithm's optimization for engagement patterns.",
    source: "Datta et al. (2015)",
    category: "Finance",
  },
]

export function CaseStudies() {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set())

  const toggleCard = (index: number) => {
    setFlippedCards((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  return (
    <section className="py-24 md:py-32 bg-card/50">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-xs font-sans uppercase tracking-[0.3em] text-primary mb-4">Section 03</p>
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 tracking-tight text-balance">
          Case Studies
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-12">
          Real-world scenarios illustrating how algorithmic gendering causes measurable harm
          across employment, health, finance, and content moderation.
        </p>

        <p className="text-xs text-muted-foreground mb-6 uppercase tracking-wider">Click cards to flip</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CASE_STUDIES.map((study, i) => (
            <button
              key={i}
              onClick={() => toggleCard(i)}
              className="text-left h-64 [perspective:1000px] w-full"
            >
              <div
                className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
                  flippedCards.has(i) ? "[transform:rotateY(180deg)]" : ""
                }`}
              >
                <div className="absolute inset-0 bg-card border border-border rounded-xl p-6 flex flex-col justify-between [backface-visibility:hidden]">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-primary font-mono">{study.category}</span>
                    <h3 className="font-serif text-lg font-bold mt-3">{study.front}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-xs text-muted-foreground">Tap to reveal</span>
                    <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-0 bg-secondary border border-border rounded-xl p-6 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <p className="text-sm text-foreground leading-relaxed">{study.back}</p>
                  <p className="text-[10px] text-muted-foreground font-mono mt-3">{study.source}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
