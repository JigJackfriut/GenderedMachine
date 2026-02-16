"use client"

import { useState, useEffect } from "react"

const LOOP_STEPS = [
  {
    title: "Classify",
    description: "Algorithm assigns a gender probability score based on your behavioral data",
    technical: "A logistic regression or neural network model outputs P(female) between 0.0 and 1.0 based on feature vectors extracted from your recent activity. This score is recomputed every session.",
    meta: "The system treats your behavior as the ground truth for who you are. It cannot distinguish between genuine preference and constrained choice.",
  },
  {
    title: "Filter",
    description: "Content and ads are ranked through your inferred gender profile",
    technical: "The recommendation engine applies collaborative filtering: it finds users with similar gender scores and surfaces what they engaged with. Content that does not match your profile gets deprioritized or hidden entirely.",
    meta: "You never see what was filtered out. The algorithm removes options before you can choose, making it impossible to know what you are missing.",
  },
  {
    title: "Engage",
    description: "You interact with the gendered content because it is what was offered",
    technical: "User engagement metrics (dwell time, likes, shares, saves) are recorded. The system cannot distinguish between 'I chose this' and 'this is all I was shown.' Both register as positive signals.",
    meta: "This is the trap: engaging with gendered content is not the same as preferring it. But the algorithm interprets any engagement as preference confirmation.",
  },
  {
    title: "Reclassify",
    description: "Your engagement becomes new training data that strengthens the original classification",
    technical: "The model updates its weight vectors. Your gender score shifts further in the direction of your engagement. Confidence increases, making future corrections harder. After enough cycles, the system becomes highly certain about a classification it created itself.",
    meta: "The algorithm is now citing its own output as evidence. It showed you gendered content, you clicked it, and now it is more confident you belong in that category. This is a closed epistemic loop.",
  },
]

const RABBIT_HOLES = [
  {
    id: "soccer-mom",
    title: "Soccer Moms",
    icon: "SM",
    description: "A profile optimized for suburban motherhood and domestic consumption",
    mechanism: "The algorithm links parenting content to domestic products to lifestyle branding. Each step seems logical in isolation, but the aggregate effect is to reduce a complex person to a single consumer archetype.",
    timeline: [
      { stage: "Week 1", content: "Parenting tips, school lunch ideas", signal: "Family content engagement" },
      { stage: "Week 2", content: "Minivan reviews, family vacation deals", signal: "Purchase intent detected" },
      { stage: "Week 4", content: "PTA organizing, youth sports schedules", signal: "Suburban lifestyle confirmed" },
      { stage: "Week 8", content: "Wine mom memes, marriage advice columns", signal: "Demographic deepening" },
      { stage: "Month 3", content: "MLM product pitches, anti-aging ads", signal: "Maximum monetization stage" },
    ],
    consequence: "The algorithm assumes all mothers want the same content. Women who are mothers AND engineers, artists, or athletes find their non-domestic interests gradually erased from their feeds.",
  },
  {
    id: "tech-bro",
    title: "Tech Bros",
    icon: "TB",
    description: "A profile optimized for Silicon Valley culture and hustle mindset",
    mechanism: "Tech interest gets conflated with a specific masculine identity. The algorithm connects coding tutorials to crypto to productivity hacking to luxury goods to dating strategy, treating them as a single coherent persona.",
    timeline: [
      { stage: "Week 1", content: "Coding tutorials, startup news", signal: "Tech interest baseline" },
      { stage: "Week 2", content: "Crypto explainers, productivity hacks", signal: "Finance crossover detected" },
      { stage: "Week 4", content: "Hustle culture content, biohacking tips", signal: "Lifestyle persona forming" },
      { stage: "Week 8", content: "Luxury watches, exotic car reviews", signal: "High-value consumer flagged" },
      { stage: "Month 3", content: "Dating strategy, alpha mindset videos", signal: "Gendered radicalization risk" },
    ],
    consequence: "Men interested in technology get funneled toward a specific masculine identity that may include misogynistic content. The algorithm treats tech interest as a gateway to a broader gender ideology.",
  },
  {
    id: "gamer-girl",
    title: "Gamer Girls",
    icon: "GG",
    description: "A profile for women who enjoy gaming, progressively feminized by the algorithm",
    mechanism: "The system cannot maintain 'woman + gamer' as a stable category. It gradually adds feminizing content to resolve what it perceives as a classification conflict, because in its training data, gaming correlates with male users.",
    timeline: [
      { stage: "Week 1", content: "Game reviews, streaming tips", signal: "Gaming interest detected" },
      { stage: "Week 2", content: "Gaming chair reviews, setup tours", signal: "Consumer interest confirmed" },
      { stage: "Week 4", content: "Cosplay tutorials, convention coverage", signal: "Gender signal ambiguous, adding F-coded content" },
      { stage: "Week 8", content: "E-girl aesthetics, anime fanart", signal: "Female gamer archetype applied" },
      { stage: "Month 3", content: "Relationship content, beauty for gamers", signal: "Full feminization of hobby interest" },
    ],
    consequence: "Women gamers watch their hobby get progressively feminized by the algorithm. The system cannot accept that a woman can be interested in gaming without also wanting beauty and relationship content.",
  },
  {
    id: "redpill",
    title: "Red-Pill Pipeline",
    icon: "RP",
    description: "A radicalization pathway that starts with self-improvement and ends in extremism",
    mechanism: "This is the most documented and dangerous rabbit hole. The algorithm optimizes for engagement, and outrage generates engagement. Self-improvement content connects to dating advice, which connects to gender grievance, which connects to radicalization. Each step increases watch time.",
    timeline: [
      { stage: "Week 1", content: "Self-improvement, fitness motivation", signal: "Positive engagement detected" },
      { stage: "Week 2", content: "Dating advice, confidence building", signal: "Relationship content interest" },
      { stage: "Week 4", content: "Men's rights commentary, gender critiques", signal: "Outrage engagement spike" },
      { stage: "Week 8", content: "Anti-feminist creators, pickup artistry", signal: "Ideological content preference" },
      { stage: "Month 3", content: "Increasingly extreme ideological content", signal: "Radicalization metrics achieved" },
    ],
    consequence: "This pipeline has been directly linked to real-world radicalization. Research by Ribeiro et al. (2020) documented how YouTube's recommendation algorithm systematically funneled users from mainstream content to extremist channels.",
  },
]

const SCENARIOS = [
  {
    id: "tech-skincare",
    label: "Woman in tech who relaxes with skincare",
    description: "After a long day coding, she watches skincare videos. The algorithm cannot hold two signals simultaneously. It gradually deprioritizes tech content and floods her feed with beauty products, because the training data associates skincare more strongly with female audience segments.",
    driftFrom: "Tech + Skincare",
    driftTo: "Skincare Only",
    why: "The algorithm treats late-night browsing as higher-signal behavior because defenses are lower and engagement is longer. Tired browsing produces stronger classification signals than intentional searching.",
  },
  {
    id: "gamer",
    label: "Non-binary person with mixed signals",
    description: "The system cannot resolve mixed gender signals, so it forces classification toward the most profitable binary segment rather than maintaining ambiguity. Non-binary users experience the most aggressive classification pressure because the algorithm has no economic incentive to preserve ambiguity.",
    driftFrom: "Diverse Interests",
    driftTo: "Forced Binary Category",
    why: "Advertisers buy binary segments. An 'unclassified' user generates less ad revenue than a classified one. The system is financially motivated to resolve ambiguity, not respect it.",
  },
  {
    id: "trans-teen",
    label: "Trans teenager exploring identity",
    description: "Every curious search becomes a data point that narrows rather than expands possibilities. Exploratory behavior is treated as confirmation. A teenager researching gender identity gets locked into a content tunnel that the algorithm reinforces, potentially before the person has had space to explore freely.",
    driftFrom: "Exploring Identity",
    driftTo: "Locked Category",
    why: "The algorithm cannot distinguish between curiosity and commitment. It treats every click as a vote for more of the same, collapsing the space for open-ended exploration.",
  },
]

export function FeedbackLoops() {
  const [loopStep, setLoopStep] = useState(0)
  const [selectedScenario, setSelectedScenario] = useState(0)
  const [selectedHole, setSelectedHole] = useState<string | null>(null)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return
    const interval = setInterval(() => setLoopStep((prev) => (prev + 1) % 4), 3000)
    return () => clearInterval(interval)
  }, [autoPlay])

  const selectedRabbitHole = RABBIT_HOLES.find((h) => h.id === selectedHole)

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-xs font-sans uppercase tracking-[0.3em] text-primary mb-4">Section 04</p>
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 tracking-tight text-balance">
          The Reinforcement Trap
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-6">
          Algorithmic gendering is not a one-time classification. It is a self-reinforcing cycle
          where each interaction tightens the filter, narrowing your world to what the algorithm
          thinks &quot;someone like you&quot; wants. The system creates the evidence it then uses to justify
          its own conclusions.
        </p>

        {/* Reinforcement Loop */}
        <div className="mb-20">
          <h3 className="font-serif text-xl md:text-2xl font-bold mb-2">The Feedback Loop</h3>
          <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
            Click any step to explore its technical mechanism and what it means for your autonomy.
            The loop runs automatically to show how the cycle never stops.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
            {LOOP_STEPS.map((step, i) => (
              <button
                key={i}
                onClick={() => { setLoopStep(i); setAutoPlay(false) }}
                className={`bg-card border rounded-xl p-5 text-left transition-all ${
                  loopStep === i ? "border-primary shadow-[0_0_30px_rgba(var(--primary),0.08)]" : "border-border hover:border-primary/50"
                }`}
              >
                <div className={`w-8 h-8 rounded-full mb-3 flex items-center justify-center text-xs font-bold transition-colors ${
                  loopStep === i ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}>
                  {i + 1}
                </div>
                <h4 className="text-sm font-semibold mb-1">{step.title}</h4>
                <p className="text-[11px] text-muted-foreground leading-snug">{step.description}</p>
              </button>
            ))}
          </div>

          {/* Arrows between steps on mobile */}
          <div className="hidden md:flex justify-center items-center gap-2 mb-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-16 h-px bg-border" />
                <svg className="w-3 h-3 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <div className="w-16 h-px bg-chart-5" />
              <svg className="w-3 h-3 text-chart-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
              <span className="text-[9px] text-chart-5 font-mono">loops back</span>
            </div>
          </div>

          {/* Detail Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Technical mechanism</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {LOOP_STEPS[loopStep].technical}
              </p>
            </div>
            <div className="bg-chart-5/5 border border-chart-5/20 rounded-xl p-6">
              <p className="text-xs uppercase tracking-wider text-chart-5 mb-2">What this means</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {LOOP_STEPS[loopStep].meta}
              </p>
            </div>
          </div>

          {!autoPlay && (
            <button
              onClick={() => setAutoPlay(true)}
              className="mt-4 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Resume auto-play
            </button>
          )}
        </div>

        {/* Scenario Drift */}
        <div className="mb-20">
          <h3 className="font-serif text-xl md:text-2xl font-bold mb-2">How Context Creates Drift</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
            Your algorithmic profile does not stay stable. Exhaustion, curiosity, boredom, and context
            all produce data that the algorithm interprets as identity signals. Select a scenario to
            see how the drift works.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            {SCENARIOS.map((scenario, i) => (
              <button
                key={scenario.id}
                onClick={() => setSelectedScenario(i)}
                className={`p-4 rounded-xl text-left transition-all ${
                  selectedScenario === i ? "bg-primary/10 border border-primary" : "bg-card border border-border hover:border-primary/50"
                }`}
              >
                <p className="text-xs font-semibold text-foreground mb-1">{scenario.label}</p>
                <p className="text-[10px] text-muted-foreground leading-snug line-clamp-3">{scenario.description}</p>
              </button>
            ))}
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
              <div className="px-5 py-3 bg-secondary rounded-lg text-sm text-muted-foreground text-center">
                {SCENARIOS[selectedScenario].driftFrom}
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-px bg-chart-5 hidden md:block" />
                  <svg className="w-6 h-6 text-chart-5 rotate-90 md:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <div className="w-12 h-px bg-chart-5 hidden md:block" />
                </div>
                <span className="text-[9px] text-chart-5 font-mono mt-1">algorithmic drift</span>
              </div>
              <div className="px-5 py-3 bg-chart-5/10 border border-chart-5/30 rounded-lg text-sm text-chart-5 font-semibold text-center">
                {SCENARIOS[selectedScenario].driftTo}
              </div>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-xs uppercase tracking-wider text-accent mb-2">Why this happens</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {SCENARIOS[selectedScenario].why}
              </p>
            </div>
          </div>
        </div>

        {/* Gendered Rabbit Holes */}
        <div>
          <h3 className="font-serif text-xl md:text-2xl font-bold mb-2">Gendered Rabbit Holes</h3>
          <p className="text-sm text-muted-foreground mb-4 max-w-2xl">
            The reinforcement trap creates predictable content funnels. Click each archetype to see
            the trajectory, the technical mechanism driving it, and the real-world consequences.
          </p>
          <p className="text-[10px] uppercase tracking-wider text-accent mb-6 font-semibold">
            Illustrative pathways based on documented recommendation patterns, not deterministic outcomes
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {RABBIT_HOLES.map((hole) => (
              <button
                key={hole.id}
                onClick={() => setSelectedHole(hole.id)}
                className={`bg-card border rounded-xl p-6 text-center transition-all hover:-translate-y-1 ${
                  selectedHole === hole.id ? "border-primary" : "border-border hover:border-primary/50"
                }`}
              >
                <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center text-sm font-bold mx-auto mb-3 text-foreground">
                  {hole.icon}
                </div>
                <h4 className="text-sm font-semibold">{hole.title}</h4>
              </button>
            ))}
          </div>

          {selectedRabbitHole && (
            <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6" onClick={() => setSelectedHole(null)}>
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-serif text-xl font-bold">{selectedRabbitHole.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{selectedRabbitHole.description}</p>
                  </div>
                  <button onClick={() => setSelectedHole(null)} className="text-muted-foreground hover:text-foreground p-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Mechanism */}
                <div className="bg-secondary/50 rounded-lg p-4 mb-6">
                  <p className="text-xs uppercase tracking-wider text-primary mb-2">How the algorithm drives this</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedRabbitHole.mechanism}</p>
                </div>

                {/* Timeline */}
                <div className="relative pl-8 mb-6">
                  <div className="absolute left-3 top-1 bottom-1 w-px bg-border" />
                  <div className="absolute left-3 top-1 w-px bg-primary" style={{ height: "100%" }} />
                  {selectedRabbitHole.timeline.map((step, i) => (
                    <div key={i} className="relative pb-5 last:pb-0">
                      <div className={`absolute -left-5 top-1 w-3 h-3 rounded-full border-2 bg-card ${
                        i === selectedRabbitHole.timeline.length - 1 ? "border-chart-5" : "border-primary"
                      }`} />
                      <div className="flex flex-col md:flex-row md:items-start gap-1 md:gap-4">
                        <p className="text-xs font-mono text-primary shrink-0 w-16">{step.stage}</p>
                        <div className="flex-1">
                          <p className="text-sm text-foreground">{step.content}</p>
                          <p className="text-[10px] text-muted-foreground font-mono mt-0.5">Signal: {step.signal}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Consequence */}
                <div className="bg-chart-5/5 border border-chart-5/20 rounded-lg p-4">
                  <p className="text-xs uppercase tracking-wider text-chart-5 mb-2">Real-world consequence</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedRabbitHole.consequence}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
