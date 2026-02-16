"use client"

const BIBLIOGRAPHY = [
  { author: "Buolamwini, J. & Gebru, T.", year: 2018, title: "Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification", type: "Paper", context: "Foundational study documenting facial recognition error rates of up to 34% for dark-skinned women vs 1% for light-skinned men" },
  { author: "Cheney-Lippold, J.", year: 2017, title: "We Are Data: Algorithms and the Making of Our Digital Selves", type: "Book", context: "Introduces the concept of 'measurable types' and gender as 'profitable convenience' in algorithmic systems" },
  { author: "Costanza-Chock, S.", year: 2020, title: "Design Justice: Community-Led Practices to Build the Worlds We Need", type: "Book", context: "Framework for centering marginalized communities in technology design processes" },
  { author: "Dastin, J.", year: 2018, title: "Amazon scraps secret AI recruiting tool that showed bias against women", type: "Reuters", context: "Reporting on Amazon's AI hiring tool that penalized resumes containing the word 'women's'" },
  { author: "Datta, A. et al.", year: 2015, title: "Automated Experiments on Ad Privacy Settings", type: "Paper", context: "Demonstrated that Google showed high-salary job ads significantly more to male-classified users" },
  { author: "Drage, E. & Mackereth, K.", year: 2022, title: "Does AI Debias Recruitment? Race, Gender, and AI's 'Diversity Wash'", type: "Paper", context: "Analysis of how AI hiring tools claim to remove bias while reproducing it through new mechanisms" },
  { author: "Fausto-Sterling, A.", year: 2000, title: "Sexing the Body: Gender Politics and the Construction of Sexuality", type: "Book", context: "Foundational analysis of how medical institutions enforce binary sex categories on intersex bodies" },
  { author: "Hester, H.", year: 2018, title: "Xenofeminism", type: "Book", context: "Argues technology should be repurposed to abolish gender as a class system" },
  { author: "Lambrecht, A. & Tucker, C.", year: 2019, title: "Algorithmic Bias? An Empirical Study of Apparent Gender-Based Discrimination in the Display of STEM Career Ads", type: "Paper", context: "Showed that even gender-neutral STEM ads were delivered mostly to men due to cost optimization logic" },
  { author: "Noble, S.U.", year: 2018, title: "Algorithms of Oppression: How Search Engines Reinforce Racism", type: "Book", context: "Documents how search engine results reproduce racist and sexist stereotypes as 'objective' information" },
  { author: "Ribeiro, M. et al.", year: 2020, title: "Auditing Radicalization Pathways on YouTube", type: "Paper", context: "Documented systematic recommendation pipeline from mainstream content to extremist channels" },
  { author: "UNESCO", year: 2024, title: "Generative AI and Gender Stereotypes: Evidence of Regressive Bias in LLMs", type: "Report", context: "Found that LLMs assign diverse high-status jobs to men while relegating women to undervalued roles" },
  { author: "West, M. et al.", year: 2019, title: "I'd Blush If I Could: Closing Gender Divides in Digital Skills Through Education", type: "UNESCO Report", context: "Documented how feminized AI assistants normalize harassment and encode gendered servitude" },
  { author: "Federal Trade Commission", year: 2024, title: "Social Media and Video Streaming Surveillance Practices", type: "FTC Report", context: "Found that platforms engage in vast user surveillance with inadequate safeguards for gender and demographic inference" },
]

export function Bibliography() {
  return (
    <section className="py-24 md:py-32 bg-card/50">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-xs font-sans uppercase tracking-[0.3em] text-primary mb-4">Section 07</p>
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 tracking-tight text-balance">
          Bibliography
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-12">
          The research and scholarship that informs this project. These works span computer science,
          gender studies, critical data studies, and policy analysis.
        </p>

        <div className="space-y-3">
          {BIBLIOGRAPHY.map((entry, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] px-2 py-1 bg-secondary rounded font-mono text-muted-foreground">{entry.type}</span>
                <span className="text-[10px] font-mono text-muted-foreground">{entry.year}</span>
              </div>
              <div>
                <p className="text-sm text-foreground leading-relaxed">
                  <span className="font-semibold">{entry.author}</span>
                  {" "}({entry.year}).{" "}
                  <em className="text-muted-foreground">{entry.title}</em>
                </p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed pl-4 border-l-2 border-border">
                {entry.context}
              </p>
            </div>
          ))}
        </div>

        {/* Final Statement */}
        <div className="mt-20 text-center">
          <p className="font-serif text-2xl md:text-3xl font-bold text-balance max-w-xl mx-auto leading-snug">
            The feed shrinks your world, deciding which futures are &quot;for people like you.&quot;
          </p>
          <div className="mt-8 h-px w-24 bg-primary mx-auto" />
          <p className="mt-8 text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Understanding these systems is the first step toward resisting them.
            Transparency is not just a policy goal. It is a form of power.
          </p>
        </div>
      </div>
    </section>
  )
}
