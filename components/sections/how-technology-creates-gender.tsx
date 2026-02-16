"use client"

import { useState } from "react"

const INFERENCE_LAYERS = [
  {
    id: 1,
    name: "Raw Data Collection",
    color: "bg-chart-3",
    description: "Every tap, scroll, pause, and skip is captured. Platforms log timestamps, device type, location, session length, and interaction type. This layer is invisible to the user.",
    detail: "A single TikTok session generates hundreds of signals: 0.3s pause on a skincare ad, 2.1s watch of a fitness reel, a double-tap on a cooking video. None of these are inherently gendered, but they become gendered inputs.",
    bias: "Even at this stage, what gets measured is a design choice. Platforms choose to track engagement depth over content diversity, which already privileges viral, emotionally polarized content over nuanced material.",
    dataPoints: ["Scroll velocity", "Dwell time", "Tap coordinates", "Session time", "Device model", "App switches"],
  },
  {
    id: 2,
    name: "Feature Extraction",
    color: "bg-chart-1",
    description: "Raw signals are transformed into behavioral features. The system clusters your actions into categories like 'beauty-interest' or 'tech-affinity' and assigns weighted scores.",
    detail: "A machine learning pipeline converts thousands of raw events into roughly 50 to 200 behavioral features. These features are statistical summaries, not descriptions of who you are. But they will be treated as if they are.",
    bias: "Feature categories are designed by engineers who must choose what to measure. The decision to create a 'beauty' cluster separate from 'grooming' already encodes assumptions about who does what.",
    dataPoints: ["Interest clusters", "Engagement depth", "Content affinity", "Time-of-day patterns", "Social graph density"],
  },
  {
    id: 3,
    name: "Demographic Inference",
    color: "bg-chart-2",
    description: "Behavioral features are fed into classification models that predict demographic categories: age, gender, income bracket, life stage. This is where behavior becomes identity.",
    detail: "The model does not ask your gender. It infers a probability score (e.g., P(female) = 0.73) based on correlations learned from training data. If people who watched similar content in the training set were mostly women, you get classified as 'likely female' regardless of your actual identity.",
    bias: "This is Cheney-Lippold's 'measurable type': a statistical guess that gets treated as fact. The model cannot distinguish between a woman who likes tech and a man who likes skincare. It only knows what the majority pattern looks like.",
    dataPoints: ["Gender probability", "Age bracket", "Income estimate", "Life stage", "Location tier"],
  },
  {
    id: 4,
    name: "Audience Segmentation",
    color: "bg-chart-4",
    description: "Inferred demographics get packaged into commercial audience segments that advertisers can purchase. Your probabilistic score becomes a marketing label.",
    detail: "Ad platforms like Meta and Google group users into thousands of pre-built segments: 'Women 25-34, Wellness', 'Men 18-24, Gaming', 'Parents, Suburban'. These segments are what advertisers actually buy. Your continuous behavioral data has now been compressed into a discrete commercial identity.",
    bias: "Segments are designed to maximize advertiser revenue, not to represent you accurately. The system actively prefers binary gender categories because advertisers buy in binary. Non-binary, fluid, or contradictory signals are resolved into whichever bucket is more profitable.",
    dataPoints: ["Marketing persona", "Purchase propensity", "Brand affinity", "Segment tier", "CPM value"],
  },
  {
    id: 5,
    name: "Content Delivery",
    color: "bg-chart-5",
    description: "Your segment determines what you see. The recommendation engine filters content, ads, job listings, and opportunities through your assigned commercial identity.",
    detail: "The final output is not just ads. It includes which news stories appear first, which job listings get shown, which health information gets prioritized, and which creators get amplified in your feed. Your inferred gender now shapes your information environment.",
    bias: "This creates a self-reinforcing loop. You see gendered content, you engage with it (because it is what is available), and your engagement confirms the original classification. The algorithm treats its own output as validation of its input. Lambrecht and Tucker (2019) showed that even gender-neutral STEM job ads were delivered mostly to men because the algorithm optimized for cost-per-click, and men clicked more cheaply.",
    dataPoints: ["Feed ranking", "Ad delivery", "Job visibility", "Content filtering", "Creator amplification"],
  },
]

export function HowTechnologyCreatesGender() {
  const [activeLayer, setActiveLayer] = useState(0)
  const [beautyValue, setBeautyValue] = useState(30)
  const [fitnessValue, setFitnessValue] = useState(50)
  const [techValue, setTechValue] = useState(70)
  const [cookingValue, setCookingValue] = useState(40)
  const [labelsRevealed, setLabelsRevealed] = useState(false)
  const [trackerClicks, setTrackerClicks] = useState<string[]>([])

  const genderScore = Math.round(
    beautyValue * 0.3 + (100 - techValue) * 0.25 + cookingValue * 0.25 + (100 - fitnessValue) * 0.2
  )
  const normalizedScore = genderScore / 100

  const getClusterLabel = (score: number) => {
    if (score < 25) return { label: "Tech Bro", segment: "M18-34 High-Value" }
    if (score < 40) return { label: "Active Achiever", segment: "M25-44 Performance" }
    if (score < 55) return { label: "Balanced Explorer", segment: "Broad Interest" }
    if (score < 70) return { label: "Women in STEM + Skincare", segment: "F25-34 Hybrid" }
    return { label: "Soccer Mom Segment", segment: "F30-50 Lifestyle" }
  }

  const cluster = getClusterLabel(genderScore)

  const handleTrackerClick = (label: string) => {
    setTrackerClicks((prev) => [...prev.slice(-7), label])
  }

  const trackerScore = trackerClicks.reduce((acc, click) => {
    if (["skincare", "fashion", "parenting", "cooking"].includes(click)) return acc + 0.06
    if (["tech", "gaming", "sports", "crypto"].includes(click)) return acc - 0.06
    return acc
  }, 0.5)

  const sliders = [
    { label: "Beauty & Skincare", value: beautyValue, setter: setBeautyValue, colorClass: "bg-chart-2" },
    { label: "Fitness & Sports", value: fitnessValue, setter: setFitnessValue, colorClass: "bg-chart-1" },
    { label: "Tech & Gaming", value: techValue, setter: setTechValue, colorClass: "bg-chart-3" },
    { label: "Cooking & Home", value: cookingValue, setter: setCookingValue, colorClass: "bg-chart-4" },
  ]

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-xs font-sans uppercase tracking-[0.3em] text-primary mb-4">Section 02</p>
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 tracking-tight text-balance">
          How Technology Creates Gender
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-6">
          Gender is not discovered by algorithms. It is manufactured through a multi-stage inference pipeline
          that converts your behavior into commercial categories. John Cheney-Lippold calls this a
          &quot;gender of profitable convenience&quot;: whatever classification generates the most ad revenue.
        </p>

        {/* Academic Foundation */}
        <div className="mb-16">
          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Anne Fausto-Sterling (2000)</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  In medicine, doctors historically forced intersex bodies into binary categories through surgical
                  intervention, erasing biological complexity to maintain a two-sex model. Algorithms perform an
                  analogous operation: they take your messy, contradictory, context-dependent behavior and compress
                  it into neat binary marketing segments. The continuous spectrum of human expression gets surgically
                  reduced to &quot;male&quot; or &quot;female&quot; audience segments because advertisers buy in binary.
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs text-primary font-mono">Binary Surgery</span>
                  <div className="h-px flex-1 bg-border" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">John Cheney-Lippold (2017)</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Algorithms do not classify your real gender. They produce &quot;measurable types&quot;: probabilistic
                  scores that map behavioral patterns to commercial demographics. A 0.73 &quot;female&quot; score does not
                  mean you are a woman. It means your click patterns statistically resemble those of people the
                  system has previously labeled as women. This is gender as profitable convenience: a classification
                  optimized for ad revenue, not for accurately representing human identity.
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs text-primary font-mono">Measurable Types</span>
                  <div className="h-px flex-1 bg-border" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Inference Stack */}
        <div className="mb-20">
          <h3 className="font-serif text-xl md:text-2xl font-bold mb-2">The Inference Stack</h3>
          <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
            A 5-layer visualization showing how raw behavioral data transforms through multiple stages of
            bias into commercial personas. Each layer adds assumptions, compresses nuance, and moves further
            from who you actually are.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
            {/* Vertical Stack Navigation */}
            <div className="flex flex-col gap-1">
              {INFERENCE_LAYERS.map((layer, i) => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(i)}
                  className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                    activeLayer === i
                      ? "bg-card border border-primary"
                      : "bg-transparent border border-transparent hover:bg-card hover:border-border"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                    activeLayer === i ? `${layer.color} text-background` : "bg-secondary text-muted-foreground"
                  }`}>
                    {layer.id}
                  </div>
                  <span className={`text-xs font-semibold transition-colors ${
                    activeLayer === i ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {layer.name}
                  </span>
                </button>
              ))}
              {/* Connecting line */}
              <div className="hidden lg:flex flex-col items-center py-2 ml-4">
                <div className="w-px h-2 bg-border" />
                <svg className="w-4 h-4 text-chart-5 -mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <p className="text-[9px] text-muted-foreground mt-1">Increasing bias</p>
              </div>
            </div>

            {/* Detail Panel */}
            <div className="bg-card border border-border rounded-xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${INFERENCE_LAYERS[activeLayer].color} text-background`}>
                  {INFERENCE_LAYERS[activeLayer].id}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{INFERENCE_LAYERS[activeLayer].name}</h4>
                  <p className="text-xs text-muted-foreground">Layer {INFERENCE_LAYERS[activeLayer].id} of 5</p>
                </div>
              </div>

              <p className="text-sm text-foreground leading-relaxed mb-4">
                {INFERENCE_LAYERS[activeLayer].description}
              </p>

              <div className="bg-secondary/50 rounded-lg p-4 mb-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">How it works</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {INFERENCE_LAYERS[activeLayer].detail}
                </p>
              </div>

              <div className="bg-chart-5/5 border border-chart-5/20 rounded-lg p-4 mb-4">
                <p className="text-xs uppercase tracking-wider text-chart-5 mb-2">Where bias enters</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {INFERENCE_LAYERS[activeLayer].bias}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Data points at this layer</p>
                <div className="flex flex-wrap gap-1.5">
                  {INFERENCE_LAYERS[activeLayer].dataPoints.map((point, i) => (
                    <span key={i} className="text-[10px] px-2 py-1 bg-secondary rounded font-mono text-muted-foreground">
                      {point}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Algorithmic Gender Score Slider */}
        <div className="mb-16">
          <h3 className="font-serif text-xl md:text-2xl font-bold mb-2">Algorithmic Gender Scores</h3>
          <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
            Move the sliders to see how changing behaviors shifts your probabilistic gender score.
            Notice how the algorithm snaps a continuous, ambiguous score into a discrete commercial cluster.
            This compression from spectrum to binary is the core mechanism of algorithmic gendering.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sliders.map((slider) => (
                  <div key={slider.label}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-foreground">{slider.label}</span>
                      <span className="text-muted-foreground font-mono">{slider.value}%</span>
                    </div>
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={slider.value}
                        onChange={(e) => slider.setter(Number(e.target.value))}
                        className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                      />
                      <div
                        className={`absolute top-0 left-0 h-2 rounded-full pointer-events-none ${slider.colorClass}`}
                        style={{ width: `${slider.value}%`, opacity: 0.4 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center bg-card border border-border rounded-xl p-6">
              <div className="relative w-40 h-20 overflow-hidden mb-4">
                <div className="absolute w-40 h-40 rounded-full border-[6px] border-border" />
                <div
                  className="absolute w-40 h-40 rounded-full border-[6px] border-transparent border-t-primary border-r-primary transition-transform duration-500"
                  style={{ transform: `rotate(${normalizedScore * 180 - 90}deg)` }}
                />
                <div className="absolute inset-0 flex items-end justify-center pb-1">
                  <div
                    className="w-0.5 h-16 bg-foreground origin-bottom transition-transform duration-500 rounded-full"
                    style={{ transform: `rotate(${(normalizedScore - 0.5) * 180}deg)` }}
                  />
                </div>
              </div>
              <p className="font-mono text-2xl font-bold mb-1">{normalizedScore.toFixed(2)}</p>
              <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground text-center mb-4">
                Algorithmic Gender Score<br />(not self-identified gender)
              </p>
              <div className="w-full px-3 py-2 bg-secondary rounded-lg text-center">
                <p className="text-xs font-semibold text-foreground">{cluster.label}</p>
                <p className="text-[10px] text-muted-foreground font-mono">{cluster.segment}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Data Tracker */}
        <div className="mb-16">
          <h3 className="font-serif text-xl md:text-2xl font-bold mb-2">Live Data Tracker</h3>
          <p className="text-sm text-muted-foreground mb-4 max-w-2xl">
            Click the content tiles below and watch your ad profile shift in real time. Each click is a
            data point feeding Layer 1 of the Inference Stack. The platform does not know why you clicked. It
            only knows that you did, and it updates your gender probability accordingly.
          </p>
          <p className="text-xs text-accent mb-6 max-w-2xl">
            Why this matters: In real platforms, even a single click can shift your ad targeting. Meta
            processes over 2 trillion ad auctions per day, and each one factors in your inferred gender
            to decide what you see and what you never get offered.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { id: "skincare", label: "Skincare Blog", icon: "S", coded: "F-coded" },
              { id: "tech", label: "Tech Ad", icon: "T", coded: "M-coded" },
              { id: "fashion", label: "Fashion Reel", icon: "F", coded: "F-coded" },
              { id: "gaming", label: "Gaming Stream", icon: "G", coded: "M-coded" },
              { id: "parenting", label: "Parenting Tip", icon: "P", coded: "F-coded" },
              { id: "crypto", label: "Crypto News", icon: "C", coded: "M-coded" },
              { id: "cooking", label: "Recipe Video", icon: "R", coded: "F-coded" },
              { id: "sports", label: "Sports Clip", icon: "S", coded: "M-coded" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleTrackerClick(item.id)}
                className="bg-card border border-border rounded-lg p-4 text-center hover:border-primary transition-all group"
              >
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-2 text-sm font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {item.icon}
                </div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-[9px] text-muted-foreground font-mono mt-1">{item.coded}</p>
              </button>
            ))}
          </div>

          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground">Female-coded</span>
              <span className="text-xs font-mono text-primary">{trackerScore.toFixed(2)}</span>
              <span className="text-xs text-muted-foreground">Male-coded</span>
            </div>
            <div className="relative h-3 bg-secondary rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-chart-2 transition-all duration-300 rounded-full"
                style={{ width: `${Math.min(100, trackerScore * 100)}%` }}
              />
              <div
                className="absolute top-0 h-full w-0.5 bg-foreground transition-all duration-300"
                style={{ left: `${Math.min(100, trackerScore * 100)}%` }}
              />
            </div>
            {trackerClicks.length > 0 && (
              <div className="mt-3">
                <div className="flex gap-1.5 flex-wrap mb-2">
                  {trackerClicks.map((click, i) => (
                    <span key={i} className="text-[10px] px-2 py-1 bg-secondary text-muted-foreground rounded font-mono">
                      +{click}
                    </span>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground">
                  {trackerScore > 0.6
                    ? "Your profile is trending female-coded. You would start seeing more beauty ads, wellness content, and lower salary job listings."
                    : trackerScore < 0.4
                    ? "Your profile is trending male-coded. You would start seeing more tech ads, finance content, and higher salary job listings."
                    : "Your profile is ambiguous. The algorithm will push harder to resolve you into a binary category because ambiguity is harder to monetize."}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Hidden Labels */}
        <div>
          <h3 className="font-serif text-xl md:text-2xl font-bold mb-2">The Hidden Labels</h3>
          <p className="text-sm text-muted-foreground mb-4 max-w-2xl">
            Every piece of content you scroll past carries invisible targeting metadata. Platforms tag
            content with demographic signals at Layer 4 of the Inference Stack, creating a hidden
            classification system that determines who sees what.
          </p>
          <p className="text-xs text-accent mb-6 max-w-2xl">
            The consequence: Two people searching for the same topic receive fundamentally different
            results based on their inferred gender. A woman searching &quot;heart palpitations&quot; may be shown
            anxiety resources, while a man sees cardiology referrals, even though the symptom is identical.
          </p>

          <button
            onClick={() => setLabelsRevealed(!labelsRevealed)}
            className="mb-6 px-5 py-2.5 bg-card border border-border rounded-lg text-sm font-semibold hover:border-primary transition-colors"
          >
            {labelsRevealed ? "Hide Labels" : "Reveal Hidden Labels"}
          </button>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "Y", caption: "Morning stretch routine", labels: ["F25-34", "wellness", "fitness-lite"], note: "Tagged as female wellness, not general fitness" },
              { icon: "H", caption: "HIIT workout challenge", labels: ["M18-34", "fitness", "competition"], note: "Tagged as male performance, not general health" },
              { icon: "C", caption: "Healthy meal prep", labels: ["F25-44", "cooking", "home"], note: "Tagged as domestic, despite being nutrition content" },
              { icon: "T", caption: "Tech unboxing", labels: ["M18-34", "tech", "gadgets"], note: "Tagged as male interest, excluding women from discovery" },
            ].map((post, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-4 relative">
                <div className="w-full aspect-square bg-secondary rounded-lg mb-3 flex items-center justify-center text-2xl font-bold text-muted-foreground">
                  {post.icon}
                </div>
                <p className="text-xs text-muted-foreground">{post.caption}</p>
                <div
                  className={`mt-2 transition-all duration-500 ${
                    labelsRevealed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="flex gap-1 flex-wrap mb-2">
                    {post.labels.map((label, j) => (
                      <span key={j} className="text-[10px] px-1.5 py-0.5 bg-accent text-accent-foreground rounded font-mono font-semibold">
                        {label}
                      </span>
                    ))}
                  </div>
                  <p className="text-[9px] text-chart-5">{post.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
