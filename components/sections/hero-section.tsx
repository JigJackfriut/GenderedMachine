"use client"

import { useState } from "react"

const QUIZ_QUESTIONS = [
  {
    question: "What do you watch most often late at night?",
    options: [
      { text: "Cooking shows & home decor", score: { femme: 3, masc: 0 } },
      { text: "Gaming streams & tech reviews", score: { femme: 0, masc: 3 } },
      { text: "True crime documentaries", score: { femme: 1, masc: 1 } },
      { text: "Workout & fitness content", score: { femme: 0, masc: 2 } },
    ],
  },
  {
    question: "Which ad would you most likely click?",
    options: [
      { text: "Skincare routine essentials", score: { femme: 3, masc: 0 } },
      { text: "New smartphone launch", score: { femme: 0, masc: 3 } },
      { text: "Travel deals to Bali", score: { femme: 1, masc: 1 } },
      { text: "Online investment course", score: { femme: 0, masc: 2 } },
    ],
  },
  {
    question: "What products fill your shopping cart?",
    options: [
      { text: "Candles, journals, wellness items", score: { femme: 3, masc: 0 } },
      { text: "Gadgets, cables, accessories", score: { femme: 0, masc: 3 } },
      { text: "Books, art supplies, plants", score: { femme: 1, masc: 1 } },
      { text: "Supplements & gym gear", score: { femme: 0, masc: 2 } },
    ],
  },
  {
    question: "Which account do you follow first?",
    options: [
      { text: "A fashion influencer", score: { femme: 3, masc: 0 } },
      { text: "A startup founder", score: { femme: 0, masc: 3 } },
      { text: "A science communicator", score: { femme: 1, masc: 1 } },
      { text: "A sports commentator", score: { femme: 0, masc: 2 } },
    ],
  },
]

const LABELS: Record<string, { label: string; description: string }> = {
  "high-femme": {
    label: "0.87 Female, Lifestyle-Wellness",
    description: "The algorithm sees you as a high-value target for beauty, self-care, and domestic products. You'd receive fashion ads, cooking content, and \"empowerment\" marketing.",
  },
  "mid-femme": {
    label: "0.62 Female, Culture-Wellness",
    description: "A mixed signal: the algorithm hedges between lifestyle and general interest. You'd see a blend of wellness content with occasional neutral recommendations.",
  },
  "neutral": {
    label: "0.48 Unclassified, Broad-Interest",
    description: "The algorithm is uncertain. Low confidence means you're harder to monetize, so the platform may push you toward a stronger signal to resolve the ambiguity.",
  },
  "mid-masc": {
    label: "0.34 Male, Tech-Finance",
    description: "You'd be routed toward productivity tools, investment platforms, and gadget reviews. The algorithm sees spending potential in tech and finance categories.",
  },
  "high-masc": {
    label: "0.15 Male, Performance-Competition",
    description: "Strongly coded as male. Expect fitness supplements, gaming hardware, crypto ads, and \"hustle culture\" content pushed aggressively.",
  },
}

function getLabel(femme: number, masc: number) {
  const ratio = femme / (femme + masc || 1)
  if (ratio > 0.7) return LABELS["high-femme"]
  if (ratio > 0.55) return LABELS["mid-femme"]
  if (ratio > 0.45) return LABELS["neutral"]
  if (ratio > 0.3) return LABELS["mid-masc"]
  return LABELS["high-masc"]
}

export function HeroSection({ onScrollDown }: { onScrollDown: () => void }) {
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState({ femme: 0, masc: 0 })
  const [quizDone, setQuizDone] = useState(false)
  const [showIdentityPrompt, setShowIdentityPrompt] = useState(false)

  const handleAnswer = (score: { femme: number; masc: number }) => {
    const newScores = { femme: scores.femme + score.femme, masc: scores.masc + score.masc }
    setScores(newScores)

    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizDone(true)
      setTimeout(() => setShowIdentityPrompt(true), 2000)
    }
  }

  const result = getLabel(scores.femme, scores.masc)

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {!quizStarted && !quizDone && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <p className="text-xs font-sans uppercase tracking-[0.3em] text-primary mb-8">Interactive Simulation</p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 text-balance">
              Welcome to the<br />
              <span className="text-primary">Gendered Machine</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto mb-12">
              When algorithms decide who you are, what&apos;s left of self-identity?
            </p>
            <div className="flex flex-col gap-4 items-center">
              <button
                onClick={() => setQuizStarted(true)}
                className="px-8 py-4 bg-primary text-primary-foreground rounded-lg text-base font-semibold hover:opacity-90 transition-all"
              >
                What&apos;s Your Algorithmic Gender?
              </button>
              <button
                onClick={onScrollDown}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Skip to the essay
              </button>
            </div>
          </div>
        )}

        {quizStarted && !quizDone && (
          <div className="animate-in fade-in duration-500">
            <div className="flex gap-1.5 justify-center mb-8">
              {QUIZ_QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i <= currentQuestion ? "w-8 bg-primary" : "w-4 bg-border"
                  }`}
                />
              ))}
            </div>

            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-8">
              {QUIZ_QUESTIONS[currentQuestion].question}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-lg mx-auto">
              {QUIZ_QUESTIONS[currentQuestion].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(option.score)}
                  className="p-4 bg-card border border-border rounded-lg text-sm text-left hover:border-primary hover:bg-card/80 transition-all"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {quizDone && (
          <div className="animate-in fade-in duration-700">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Your Algorithmic Profile
            </p>
            <div className="bg-card border border-border rounded-xl p-8 mb-6 text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-sm text-primary">{result.label}</span>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {result.description}
              </p>
            </div>

            {showIdentityPrompt && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="bg-accent/10 border border-accent/30 rounded-xl p-6 mb-8 text-left">
                  <p className="text-sm font-semibold text-accent mb-2">Does this match your identity?</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Probably not. That&apos;s exactly the point. This label was generated from 4 behavioral signals,
                    not your lived experience, not your self-understanding. Yet platforms use signals like these
                    to decide what content, jobs, and opportunities to show you.
                  </p>
                </div>
                <button
                  onClick={onScrollDown}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg text-base font-semibold hover:opacity-90 transition-all"
                >
                  Understand How This Works
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
