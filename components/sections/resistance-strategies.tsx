"use client"

import { useState } from "react"

const PERSONAL_STRATEGIES = [
  {
    title: "Audit Your Digital Trail",
    description: "Check what ad profile platforms have built for you. On Google, visit Ad Settings. On Meta, check Ad Preferences. On TikTok, review Personalization and Data.",
    action: "What you will find: a gendered persona assembled from your clicks, searches, and dwell times that likely does not match your actual identity.",
    impact: "Awareness is the prerequisite for resistance. You cannot contest a classification you do not know exists.",
  },
  {
    title: "Disrupt Behavioral Signals",
    description: "Deliberately engage with content outside your assigned profile. Click on topics the algorithm has decided are not 'for you.' Watch, like, and search across gender lines.",
    action: "This introduces noise into the feature vectors the system uses to classify you, making your behavioral signature harder to cluster into a gendered segment.",
    impact: "Platforms optimize for predictability. Becoming unpredictable reduces the confidence of gendered inferences and may broaden the content you are served.",
  },
  {
    title: "Use Privacy Tools Strategically",
    description: "Browser extensions like uBlock Origin and Privacy Badger block tracking pixels. VPNs mask location data. Separate browsers or containers isolate behavioral profiles.",
    action: "Each tool removes a data layer from the inference stack. Without cookies, the system loses session history. Without location, it loses geo-demographic correlation.",
    impact: "These tools do not eliminate profiling entirely, but they degrade signal quality and force platforms to rely on coarser, less gendered classifications.",
  },
  {
    title: "Opt Out Where Possible",
    description: "Most platforms offer partial opt-outs for ad personalization. While limited, these toggles can restrict how inferred gender data is used for targeting.",
    action: "Opt-outs rarely delete existing data, but they can prevent new behavioral signals from reinforcing an existing gendered profile.",
    impact: "Even partial opt-outs shift the economic calculus. When enough users opt out, gendered targeting becomes less profitable and less precise.",
  },
]

const DESIGN_STRATEGIES = [
  {
    title: "Reject Binary Classification",
    description: "Stop requiring gender fields in forms and user profiles. When demographic data is needed, use open-text fields or allow users to decline.",
    principle: "Costanza-Chock (2020) argues that design systems should center the experiences of those most harmed by classification: nonbinary, intersex, and gender-nonconforming users.",
  },
  {
    title: "Build Transparency Interfaces",
    description: "Show users what the system has inferred about them and why. Provide meaningful controls to correct or delete inferred attributes.",
    principle: "The FTC (2024) found that platforms engage in vast demographic inference with no transparency. Making the inference visible is the minimum standard for informed consent.",
  },
  {
    title: "Audit for Disparate Impact",
    description: "Regularly test recommendation and ad-delivery systems for gendered distribution differences. Publish the results. When STEM ads reach 85% men, that is a measurable harm.",
    principle: "Lambrecht and Tucker (2019) showed that optimization logic alone produces discriminatory outcomes. If you do not measure for bias, the system will produce it by default.",
  },
  {
    title: "Decouple Engagement from Gender",
    description: "Recommendation systems should optimize for content quality and relevance, not for engagement patterns correlated with inferred gender categories.",
    principle: "Cheney-Lippold (2017) demonstrates that 'gender' in these systems is a proxy for predicted ad-click probability. Decoupling the two is both technically feasible and ethically necessary.",
  },
]

const POLICY_STRATEGIES = [
  {
    title: "Mandate Algorithmic Transparency",
    description: "Require platforms to disclose the demographic categories they infer, the data sources used, and the logic of classification. The EU AI Act (2024) begins this process but does not go far enough.",
  },
  {
    title: "Ban Inferred Sensitive Attributes in Ad Targeting",
    description: "Prohibit the use of algorithmically inferred gender, race, and sexuality for ad delivery and content recommendation. Self-reported data with informed consent should be the only permissible basis.",
  },
  {
    title: "Establish Right to Algorithmic Self-Determination",
    description: "Users should have the legal right to know their inferred gender classification, to correct it, to delete it, and to refuse classification entirely without losing access to services.",
  },
  {
    title: "Fund Independent Auditing",
    description: "Create publicly funded bodies with the technical capacity and legal authority to audit recommendation systems for gendered harms. Internal audits by platforms are insufficient.",
  },
]

type Tab = "personal" | "design" | "policy"

export function ResistanceStrategies() {
  const [activeTab, setActiveTab] = useState<Tab>("personal")

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "personal", label: "Personal", count: PERSONAL_STRATEGIES.length },
    { key: "design", label: "Design", count: DESIGN_STRATEGIES.length },
    { key: "policy", label: "Policy", count: POLICY_STRATEGIES.length },
  ]

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-xs font-sans uppercase tracking-[0.3em] text-primary mb-4">Section 06</p>
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 tracking-tight text-balance">
          Strategies for Resistance
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-6">
          Understanding how algorithmic gendering works is not enough. These strategies operate
          at three levels: what individuals can do right now, what designers and engineers should
          build differently, and what policy must enforce.
        </p>
        <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-2xl mb-12">
          None of these alone is sufficient. Personal resistance without structural change
          places the burden on individuals. Policy without technical implementation remains
          aspirational. Design changes without accountability revert to defaults. All three
          levels must work together.
        </p>

        {/* Tabs */}
        <div className="flex gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              }`}
            >
              {tab.label}
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                activeTab === tab.key ? "bg-primary-foreground/20 text-primary-foreground" : "bg-border text-muted-foreground"
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Personal Strategies */}
        {activeTab === "personal" && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-2xl">
              These actions will not dismantle algorithmic gendering. But they reduce the precision of
              your inferred profile, increase the cost of targeting you, and build the literacy necessary
              for collective action.
            </p>
            {PERSONAL_STRATEGIES.map((strategy, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-mono font-bold">
                    {i + 1}
                  </span>
                  <div className="flex-1 space-y-3">
                    <h3 className="font-semibold text-foreground">{strategy.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{strategy.description}</p>
                    <div className="p-3 bg-secondary/50 rounded-lg border border-border">
                      <p className="text-xs font-semibold text-foreground/70 mb-1">How it works technically</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{strategy.action}</p>
                    </div>
                    <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                      <p className="text-xs font-semibold text-primary mb-1">Why it matters</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{strategy.impact}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Design Strategies */}
        {activeTab === "design" && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-2xl">
              For engineers, product managers, and designers building the systems described in this project.
              These are not aspirational ideals. They are concrete changes that existing teams can implement.
            </p>
            {DESIGN_STRATEGIES.map((strategy, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center text-sm font-mono font-bold">
                    {i + 1}
                  </span>
                  <div className="flex-1 space-y-3">
                    <h3 className="font-semibold text-foreground">{strategy.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{strategy.description}</p>
                    <div className="p-3 bg-accent/5 rounded-lg border border-accent/20">
                      <p className="text-xs font-semibold text-accent mb-1">Research basis</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{strategy.principle}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Policy Strategies */}
        {activeTab === "policy" && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-2xl">
              Structural change requires regulatory frameworks that make gendered algorithmic harms
              visible, measurable, and legally actionable. These proposals build on existing regulatory
              momentum in the EU, US, and international bodies.
            </p>
            {POLICY_STRATEGIES.map((strategy, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center text-sm font-mono font-bold">
                    {i + 1}
                  </span>
                  <div className="flex-1 space-y-3">
                    <h3 className="font-semibold text-foreground">{strategy.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{strategy.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Closing note */}
        <div className="mt-16 p-6 bg-secondary/30 border border-border rounded-xl">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">A note on burden:</span>{" "}
            Resistance strategies are not equally available to everyone. Users with less digital literacy,
            fewer resources, or greater platform dependence bear disproportionate costs. The most effective
            resistance is structural: changing the systems themselves so that individual vigilance is not required.
          </p>
        </div>
      </div>
    </section>
  )
}
