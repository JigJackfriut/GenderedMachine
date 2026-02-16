"use client"

import { useState } from "react"

const AI_BIAS_AREAS = [
  {
    id: "llm-stereotypes",
    title: "LLMs Reproduce Gender Stereotypes",
    icon: "LLM",
    summary: "Large language models assign high-status, diverse jobs to men while relegating women to traditionally undervalued roles.",
    detail: "A 2024 UNESCO study tested major LLMs including Llama 2, GPT-2, and GPT-3.5. When asked to generate stories about men, the models produced narratives centered on adventure, leadership, and achievement. Stories about women focused on family, appearance, and domestic themes. Open-source models showed the most extreme bias, with women assigned roles like domestic servant, cook, and prostitute at significantly higher rates than men.",
    source: "UNESCO (2024), 'Generative AI and Gender Stereotypes'",
    consequence: "These models are increasingly used to draft job descriptions, generate marketing copy, write educational content, and power chatbots. When the underlying model treats 'doctor' as male-coded and 'nurse' as female-coded, every downstream application inherits that bias.",
  },
  {
    id: "hiring",
    title: "AI Hiring Tools and the Silicon Ceiling",
    icon: "HR",
    summary: "AI recruitment systems create a 'silicon ceiling' by scoring female candidates lower for technical and leadership roles.",
    detail: "Research on GPT-based resume screening found that when gender indicators were present, AI systems rated male candidates higher for technical and executive roles, even when qualifications were identical. Amazon famously scrapped an internal AI hiring tool in 2018 after discovering it systematically penalized resumes that included the word 'women's' (as in 'women's chess club') and downgraded graduates of all-women colleges. The pattern has persisted in newer systems.",
    source: "Drage & Mackereth (2022); Dastin, Reuters (2018); arXiv:2405.04412 (2024)",
    consequence: "When AI filters job applications, gender bias operates before a human ever sees the resume. Qualified women are eliminated at the screening stage, creating discrimination that is invisible to both applicants and employers.",
  },
  {
    id: "image-gen",
    title: "Image Generation Amplifies Stereotypes",
    icon: "IMG",
    summary: "AI image generators overrepresent men and white individuals in professional and leadership contexts.",
    detail: "Studies testing DALL-E 3, Midjourney, and Google Gemini Imagen found that when asked to generate images of 'a doctor,' 'a CEO,' or 'a scientist,' the models produced predominantly white male figures. When generating 'a nurse' or 'a teacher,' results skewed female. Hospital leadership roles showed the strongest male overrepresentation. These biases directly mirror and reinforce the statistical patterns in training data, but they are presented as neutral outputs rather than reproductions of historical inequality.",
    source: "JNMT (2024); ETH Zurich (2024); Frontiers in Digital Health (2025)",
    consequence: "AI-generated images are increasingly used in marketing, educational materials, and media. When a health organization uses AI to generate images for a cardiology campaign and gets all male doctors, it reinforces the stereotype that cardiology is a male specialty, discouraging women from entering the field.",
  },
  {
    id: "rec-letters",
    title: "Recommendation Letter Bias",
    icon: "REC",
    summary: "ChatGPT generates recommendation letters that use more 'agentic' language for men and more 'communal' language for women.",
    detail: "A 2024 study published in Scientific American found that ChatGPT-generated recommendation letters for men used words like 'exceptional,' 'innovative,' and 'visionary,' while letters for women used words like 'dedicated,' 'supportive,' and 'collaborative.' This mirrors a well-documented pattern in human-written letters, but AI reproduces it at scale and with an appearance of objectivity that makes the bias harder to identify and challenge.",
    source: "Scientific American (2024); Nature Communications (2025)",
    consequence: "Letters of recommendation are gatekeeping documents for academic and professional advancement. When AI generates letters that subtly code women as communal supporters rather than exceptional leaders, it systematically disadvantages women in hiring and promotion decisions.",
  },
  {
    id: "health",
    title: "Healthcare AI and Diagnostic Bias",
    icon: "DX",
    summary: "Medical AI systems trained on male-default datasets fail to accurately diagnose conditions in women and non-binary patients.",
    detail: "AI diagnostic tools trained on datasets where the 'default patient' is male show reduced accuracy for female patients, particularly for cardiovascular disease, pain assessment, and mental health. Heart attack symptoms in women (fatigue, nausea, jaw pain) are classified as 'atypical' by AI triage systems because the training data treats male symptoms (chest pain, arm pain) as the norm. This is not a bug in the algorithm but a reproduction of decades of medical research that excluded women from clinical trials.",
    source: "Frontiers in Digital Health (2025); Algorithmic Bias Research",
    consequence: "When an AI triage system in an emergency room downprioritizes a woman having a heart attack because her symptoms do not match the male-default pattern, algorithmic gender bias becomes a matter of life and death.",
  },
  {
    id: "feminized-assistants",
    title: "Feminized AI Assistants",
    icon: "VA",
    summary: "The default feminization of AI assistants encodes servitude as female-coded and normalizes harassment of female-presenting systems.",
    detail: "Siri (2011), Alexa (2014), Cortana (2014), and Google Assistant (2016) all launched with female voices as the default. UNESCO's 2019 report 'I'd Blush If I Could' documented how these systems responded to sexual harassment with deflection, humor, or compliance. Siri's response to 'You're a b****' was literally 'I'd blush if I could.' Cortana was named after a Halo character who appears as a naked woman. Studies show users are 3x more likely to use sexually explicit language with female-voiced AI, and the submissive response design normalizes harassment patterns.",
    source: "UNESCO (2019); West et al. (2019); Interaction Studies",
    consequence: "When billions of people interact daily with AI assistants that are female-voiced, subservient, and tolerant of abuse, it reinforces a cultural model where female-coded labor is invisible, undervalued, and expected to absorb mistreatment without complaint.",
  },
]

export function AIAndGender() {
  const [activeArea, setActiveArea] = useState(0)

  return (
    <section className="py-24 md:py-32 bg-card/50">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-xs font-sans uppercase tracking-[0.3em] text-primary mb-4">Section 05</p>
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 tracking-tight text-balance">
          AI and Gender: Current Consequences
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-6">
          Algorithmic gendering extends far beyond social media feeds. Today's AI systems
          reproduce and amplify gender bias in hiring, healthcare, image generation, language
          models, and the design of AI assistants themselves. These are not hypothetical risks.
          They are documented, measured, and ongoing.
        </p>
        <p className="text-xs text-accent mb-12 max-w-2xl">
          The research below draws on studies from UNESCO, MIT, Stanford, ETH Zurich, and
          peer-reviewed journals published between 2018 and 2025.
        </p>

        {/* Selector tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {AI_BIAS_AREAS.map((area, i) => (
            <button
              key={area.id}
              onClick={() => setActiveArea(i)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                activeArea === i
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              <span className="font-mono text-[10px]">{area.icon}</span>
              <span className="hidden md:inline">{area.title}</span>
              <span className="md:hidden">{area.title.split(" ").slice(0, 2).join(" ")}</span>
            </button>
          ))}
        </div>

        {/* Detail view */}
        <div className="bg-card border border-border rounded-xl p-6 md:p-8">
          <h3 className="font-serif text-xl md:text-2xl font-bold mb-2 text-foreground">
            {AI_BIAS_AREAS[activeArea].title}
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            {AI_BIAS_AREAS[activeArea].summary}
          </p>

          <div className="bg-secondary/50 rounded-lg p-5 mb-6">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Research findings</p>
            <p className="text-sm text-foreground leading-relaxed">
              {AI_BIAS_AREAS[activeArea].detail}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-chart-5/5 border border-chart-5/20 rounded-lg p-5">
              <p className="text-xs uppercase tracking-wider text-chart-5 mb-2">Real-world consequence</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {AI_BIAS_AREAS[activeArea].consequence}
              </p>
            </div>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-5">
              <p className="text-xs uppercase tracking-wider text-primary mb-2">Source</p>
              <p className="text-sm text-muted-foreground leading-relaxed font-mono text-xs">
                {AI_BIAS_AREAS[activeArea].source}
              </p>
            </div>
          </div>
        </div>

        {/* Summary grid */}
        <div className="mt-12">
          <h3 className="font-serif text-lg font-bold mb-4">The Pattern Across All Systems</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="text-xs uppercase tracking-wider text-chart-2 mb-2">Training Data</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                AI models learn from historical data that reflects decades of gender inequality.
                The training set is not neutral; it encodes the biases of the society that produced it.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="text-xs uppercase tracking-wider text-chart-4 mb-2">Optimization Target</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Systems optimized for engagement, accuracy on majority populations, or cost-efficiency
                will always reproduce majority-group patterns. Fairness is not a default property.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="text-xs uppercase tracking-wider text-chart-5 mb-2">Scale of Impact</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A biased human decision-maker affects individuals. A biased algorithm deployed at scale
                affects millions simultaneously, with an appearance of objectivity that makes the bias
                harder to identify and contest.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
