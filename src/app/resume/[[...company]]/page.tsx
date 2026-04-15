"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";

import { ease, viewportOnce } from "@/lib/motion";
import { DownloadPDFButton } from "@/components/DownloadPDFButton";

interface CoverLetter {
  company: string;
  role?: string;
  applyUrl?: string;
  combined?: boolean; // true = download is cover letter + full resume in one PDF
  greeting: string;
  paragraphs: string[];
  closing: string;
}

// ── Company badge ─────────────────────────────────────────────────────────────

function CompanyBadge({ company }: { company: string }) {
  return (
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ background: "var(--color-ink)" }}
    >
      <span
        className="font-display font-bold text-base"
        style={{ color: "var(--color-background)" }}
      >
        {company[0]}
      </span>
    </div>
  );
}

// ── Cover letter data ────────────────────────────────────────────────────────

const coverLetters: Record<string, CoverLetter> = {
  anthropic: {
    company: "Anthropic",
    role: "AI Safety Fellow",
    applyUrl: "https://job-boards.greenhouse.io/anthropic/jobs/5023394008",
    combined: true,
    greeting: "To the team at Anthropic,",
    paragraphs: [
      "I\u2019ve been building AI-native infrastructure since early 2025, not because it was strategic, but because I couldn\u2019t stop. I built myself a persistent AI chief-of-staff who manages my ventures, runs autonomous agents, and helps me operate at a scale that shouldn\u2019t be possible for a solo founder. I have now built my own venture operations dashboard where the agent team works, I have created my own digital course platform from scratch, launched a studio website, have learned Next.js at a high level, WebGL, GSAP, and a whole list of additional development tools and skills. And yes: this portfolio site and resume were built with Claude Code. I thought you\u2019d appreciate the transparency.",
      "None of these unlocks for me personally would have come without Anthropic (and in particular, Claude Code).",
      "I came across Anthropic\u2019s post on harness design for long-running applications and smiled in recognition. I had been wrestling with the exact same problems before it was published: context windows collapsing under extended sessions, agents losing coherence over time, the challenge of clean handoffs in multi-agent orchestration. The solutions I was building independently aligned closely with the architecture you were articulating. That kind of convergence tells me I\u2019m thinking in the right direction.",
      "What draws me to the AI Safety Fellowship role isn\u2019t just the technical work: it\u2019s the forward-thinking posture. Building powerful AI and taking safety seriously aren\u2019t in tension; that\u2019s the only version of this that holds up. The research areas this cohort focuses on (scalable oversight, adversarial robustness, mechanistic interpretability) are very interesting to me. I\u2019ve seen firsthand what happens when AI systems operate autonomously in real business contexts. My ethos of doing good at scale feels directly aligned with what Anthropic is building.",
      "I bring a mechanical engineering foundation that trained me to think in systems and constraints, a decade of operational experience that taught me to ship under pressure, and a year of deep daily work building on top of Claude at the systems level. I don\u2019t just use the API. I build infrastructure on top of it: agent orchestration, persistent memory, autonomous workflows. The problems you\u2019re researching are the problems I\u2019ve been living.",
      "I\u2019d like to spend the next four months contributing focused, serious work to research that matters. The alignment problem is the most important engineering challenge of our generation, and Anthropic is the team I\u2019d want to be working alongside to address it.",
    ],
    closing: "Nic DeMore",
  },

  apple: {
    company: "Apple",
    combined: true,
    greeting: "To the team at Apple,",
    paragraphs: [
      "There are companies you respect and companies you believe in. Apple is one of the few I\u2019ve believed in my entire adult life: as a user, an entrepreneur following the Steve Jobs story, as someone who pays close attention to how things are made, and as someone who holds his own work to the same standard of craft and finish that Apple has always set. That alignment isn\u2019t a talking point. It\u2019s just the truth.",
      "My background moved through mechanical engineering, a decade of agency operations, and into AI-native venture and systems development. The common thread isn\u2019t any single skill: it\u2019s the approach. Understand the system deeply, ask the right questions without ego, and don\u2019t ship anything until it\u2019s right. I\u2019ve never been afraid to be the least experienced person in the room. That\u2019s often where the best learning happens, and I\u2019ve built a career on staying in that posture.",
      "What I bring isn\u2019t just technical range: it\u2019s reliability. Over ten years of client work with brands like Frito-Lay, Johnsonville, QDOBA, Humana, and Post Consumer Brands, I showed up every day, solved difficult problems, earned trust through consistent results, and led teams to outcomes the clients didn\u2019t know were possible. I know what it means to execute deep, focused work over sustained periods, not just when the problem is exciting, but when it\u2019s Tuesday and the path forward isn\u2019t obvious. I\u2019m good with people, good at leading, and good at keeping teams informed, aligned, and moving.",
      "Apple\u2019s standard is the one I grew up with and the one I hold myself to. The precision, the restraint, the relentless focus on what the user actually experiences: those aren\u2019t abstract values to me. They\u2019re the way I work. It would be a genuine honor to contribute to a team that refuses to ship anything less than excellent.",
    ],
    closing: "Nic DeMore",
  },

  "apple-app-review": {
    company: "Apple",
    role: "Senior Manager, App Review",
    applyUrl: "https://jobs.apple.com/en-us/details/200625930-3956/senior-manager-app-review?team=MKTG",
    combined: true,
    greeting: "To the team at Apple,",
    paragraphs: [
      "Thank you for taking the time to consider me as a candidate for this role. I have applied for multiple roles at Apple, all of which I strongly believe that I would excel at given my background and experience. I would be honored at the opportunity to have a discussion with the hiring team for this position.",
      "This job description opens with: \u201cWe are seeking an experienced operational leader who combines people leadership with structured problem solving and systems thinking.\u201d I had to pause at that line. That sentence describes how I have operated for ten years. At Margle Media, I built and ran every function of a seven-figure agency from the ground up: teams, systems, P&L, client operations, and everything in between. I know what it means to lead people through complexity and deliver operational excellence at scale.",
      "What sets my background apart is the depth underneath the breadth. My foundation is mechanical engineering, which gave me a disciplined, first-principles approach to problem solving. I think in systems: where the load is, where the failure points are, how to design processes that hold up under pressure. I have applied that same discipline to agency operations, building SOPs, automating workflows, and developing the team infrastructure that lets organizations scale without losing quality or accountability.",
      "I have also spent the past year building deep expertise in AI and automation, specifically in how these tools transform operational teams. I have built autonomous agent systems, AI-assisted workflows, and operational intelligence platforms that dramatically expand what a small team can accomplish. The opportunity to bring that combination of operational leadership, systems thinking, and AI fluency to App Review, a team that serves millions of developers and directly shapes the integrity and quality of the App Store, is genuinely exciting.",
      "I am a lifelong Apple user and someone who has long held the App Store experience as a benchmark for what a trust-and-safety ecosystem should look like. It would be an honor to help keep it that way.",
    ],
    closing: "Nic DeMore",
  },

  "apple-ads": {
    company: "Apple",
    role: "Apple Ads Platform Operations Business Manager",
    applyUrl: "https://jobs.apple.com/en-us/details/200651344-0836/apple-ads-platform-operations-business-manager?team=MKTG",
    combined: true,
    greeting: "To the team at Apple,",
    paragraphs: [
      "Thank you for taking the time to consider me as a candidate for this role. I have applied for multiple roles at Apple, all of which I strongly believe that I would excel at given my background and experience. I would be honored at the opportunity to have a discussion with the hiring team for this position.",
      "I have spent ten years in advertising operations, managing digital campaigns for some of the country\u2019s most recognized consumer brands across paid search, paid social, programmatic, and omnichannel. At Margle Media, I didn\u2019t just manage campaigns: I built the operational infrastructure, the team, the reporting frameworks, and the client relationships that made the whole thing work at scale. I understand advertising operations from every angle, and I understand what it takes to make a platform-facing team genuinely excellent.",
      "The Platform Operations Business Manager role at Apple is a strong match for my background. I have deep experience managing client-facing teams in fast-moving advertising environments, translating platform behavior and technical complexity into clear guidance for clients, and using data to diagnose and resolve escalations before they become crises. I have built feedback loops between client-facing teams and engineering partners, and I know how to hold both sides accountable to shared outcomes.",
      "Beyond the operational work, I bring genuine depth in performance advertising mechanics: how digital campaigns are structured, how attribution works, how creative and targeting decisions interact with platform delivery. That technical fluency makes me a more effective operations leader and a more credible partner to both clients and product teams.",
      "Apple Ads sits at a unique intersection of premium brand and high-performance platform. I would love to bring my experience scaling advertising operations, leading cross-functional teams, and building the kind of sustained client trust that compounds over time.",
    ],
    closing: "Nic DeMore",
  },

  "apple-social": {
    company: "Apple",
    role: "Senior Social Strategist",
    applyUrl: "https://jobs.apple.com/en-us/details/200649054-0836/senior-social-strategist?team=MKTG",
    combined: true,
    greeting: "To the team at Apple,",
    paragraphs: [
      "Thank you for taking the time to consider me as a candidate for this role. I have applied for multiple roles at Apple, all of which I strongly believe that I would excel at given my background and experience. I would be honored at the opportunity to have a discussion with the hiring team for this position.",
      "Social strategy is where brand instinct, cultural fluency, and data discipline have to coexist and reinforce each other. I have spent my career at that intersection: building social and content programs for major consumer brands, developing the kind of consistent brand voice that earns communities rather than just audiences, and staying relentlessly curious about what is actually happening in culture and on platforms.",
      "At Margle Media, I led organic social and content strategy for brands including Johnsonville, Post Consumer Brands (Fruity PEBBLES and Honey Bunches of Oats), and Frito-Lay, developing channel-specific strategies, reviewing creative briefs, and the editorial frameworks that kept teams and clients aligned. I understand both the high-level strategy and the granular execution: what makes content stop a scroll, how platform algorithms reward consistency, and how to build a brand voice that feels native to the platform rather than transplanted from a press release.",
      "My eye for visual storytelling is informed by architecture, a discipline where every detail serves a purpose and the whole has to feel inevitable. That sensibility shapes how I think about social content: composition, hierarchy, the relationship between image and caption, what belongs and what should be cut. I know what great visual content looks like, and I know how to brief creative teams to get there.",
      "Apple\u2019s social presence has always been a benchmark for how a brand can show up on platforms with restraint, originality, and genuine confidence. Contributing to that standard, helping shape how the world\u2019s most iconic consumer brand tells its story in real time, would be a privilege.",
    ],
    closing: "Nic DeMore",
  },
};

// ── Timeline ─────────────────────────────────────────────────────────────────

const timeline = [
  {
    year: "2025\u2013Present",
    title: "Founder",
    org: "Good at Scale Studio",
    description:
      "Building AI-native operational infrastructure: autonomous agents, venture automation, intelligence systems. Running a 12x12 venture studio: 12 ventures in 12 months. Designing agent systems, leveraging the MCP, and the operational layer for how small teams scale. The entire site and platform was designed, developed, and built by me with the support of Claude Code and other technology integrations.",
  },
  {
    year: "2025\u2013Present",
    title: "Course Creator",
    org: "Foundations of Architecture",
    description:
      "Built and launched an online architecture education platform as a self-funded, solo-built product. Curriculum design, content production, e-commerce, and growth. Built with Claude Code, Next.js, Supabase, Stripe, and other autonomous and third-party integrations, this platform teaches students how to design their own dream home or space. On the backend, the platform was built to support an Admin Dashboard, with a Strategy Co-Pilot, Social Hub, Community Engagement, and a Course Content Editor, among other features.",
  },
  {
    year: "2017\u2013Present",
    title: "Co-Founder, President & COO",
    org: "Margle Media",
    description:
      "Built the agency from zero to seven figures. Directly managed or built every function: sales pipeline, account management, P&L, financial forecasting, cashflow, AR/AP, invoicing, utilization and margin reporting. Grew and managed a leadership team with direct reports across creative, media, strategy, and operations. Clients include Cousins Subs, Johnsonville, Frito-Lay, Florsheim, Instant Pot, Stella & Chewy\u2019s, Quest Products. Personally managed client strategy for Fortune 500 and regional brands across paid search, paid social, organic social, and omnichannel. Built agency operating systems, reporting infrastructure, and client-facing analytics frameworks. Handled HR, IT, vendor relationships, legal coordination, and agency contracts. Ten years of touching every aspect of a full-service agency. This is the operating credential.",
  },
  {
    year: "2012\u20132016",
    title: "B.S. Mechanical Engineering",
    org: "Marquette University",
    description:
      "Engineering fundamentals: thermodynamics, materials science, systems design, tolerance analysis, process engineering. The training that taught me to think in constraints and design solutions that hold up under pressure. My personal biggest takeaways from my time at Marquette were learning how to learn, quickly and efficiently, and the cultural exposure that came from a study abroad semester in Florence, Italy.",
  },
];

// ── Skill groups ──────────────────────────────────────────────────────────────

const skillGroups = [
  {
    name: "Digital Marketing",
    skills: ["Paid Search / SEM", "Paid Social", "Organic Social & SEO", "Programmatic/CTV Advertising", "Omnichannel Strategy", "Performance Marketing", "Creative Strategy", "Attribution Modeling", "Analytics & Reporting", "Website Optimization", "KPI Development & Tracking", "Customer Journey Mapping"],
  },
  {
    name: "Operations",
    skills: ["Business Operations", "Business Strategy & Planning", "Process Development", "Workflow Automation", "Capacity Planning", "Vendor Management", "SOP Development", "Leadership Team Development", "Tech Stack Management"],
  },
  {
    name: "AI & Automation",
    skills: ["LLM Integration", "Agent Systems", "Prompt Engineering", "Autonomous Workflows", "RAG Systems", "Agentic Workflows", "AI Product Design"],
  },
  {
    name: "Client Management",
    skills: ["Account Management", "Client Strategy", "Retention Strategy", "Stakeholder Communication", "Relationship Building", "Contract Negotiation", "Upsell Strategy", "KPI & Reporting Review", "Project Briefing", "Strategic Positioning", "Client Business Strategy"],
  },
  {
    name: "People & Leadership",
    skills: ["Direct Reports", "Leadership Development", "Hiring & Onboarding", "Culture Building", "Performance Management", "Compensation Design"],
  },
  {
    name: "Business Strategy",
    skills: ["Go-to-Market", "Competitive Research", "Revenue Strategy", "OKR Frameworks", "Market Analysis", "Pricing Strategy", "Partnership Development", "PRD Development", "Business Plan Creation", "Audience Research", "Growth & Scalability Planning"],
  },
  {
    name: "Finance",
    skills: ["P&L Management", "Financial Forecasting", "Cashflow Management", "Revenue Modeling", "AR/AP Management", "Budget Management", "Utilization Reporting"],
  },
  {
    name: "Engineering",
    skills: ["Systems Architecture", "Mechanical Engineering", "Infrastructure Design", "Process Engineering", "3D Modeling", "Technical Documentation", "Problem Solving", "Complex Math"],
  },
  {
    name: "Venture Launches",
    skills: ["Product Management", "MVP Development", "Website Design & Development", "Growth Strategy", "User Research", "Roadmap Planning", "Monetization Strategy"],
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ResumePage() {
  const params = useParams();
  const companySlug = (params?.company as string[] | undefined)?.[0];
  const letter = companySlug ? coverLetters[companySlug] : null;

  return (
    <div className="resume-page-wrapper pt-16 sm:pt-20 md:pt-24 pb-10 sm:pb-16 relative">
      {/* Scrim to mute background grid behind text */}
      <div
        className="no-print absolute inset-0 pointer-events-none"
        style={{ background: "rgba(250, 249, 246, 0.82)", zIndex: 0 }}
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 relative" style={{ zIndex: 1 }}>

        {/* Download button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
          className="mb-12 flex items-center justify-end no-print"
        >
          <DownloadPDFButton
            label="Download Resume"
            filename={
              letter?.combined
                ? `nic-demore-${companySlug}-application`
                : letter
                ? `nic-demore-cover-letter-${companySlug}`
                : "nic-demore-resume"
            }
          />
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-16 resume-section"
        >
          <h1 className="font-display text-4xl sm:text-5xl text-ink mb-2">
            Nic DeMore
          </h1>
          <p className="text-ink-muted text-lg">Builder. Engineer. Founder.</p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-ink-muted">
            <span>Milwaukee, WI</span>
            <span className="text-line">|</span>
            <a
              href="mailto:nademore@gmail.com"
              className="text-accent animated-underline"
            >
              nademore@gmail.com
            </a>
          </div>
        </motion.div>

        {/* Cover letter */}
        {letter && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="mb-12 sm:mb-16 md:mb-20 bg-white rounded-lg border border-line p-5 sm:p-8 md:p-10"
          >
            {/* Company badge */}
            <div className="flex items-start gap-4 mb-8">
              <CompanyBadge company={letter.company} />
              <div>
                <p
                  className="font-mono text-xs tracking-widest uppercase mb-0.5"
                  style={{ color: "var(--color-accent)" }}
                >
                  Cover Letter
                </p>
                <h2 className="font-display text-xl text-ink leading-tight">
                  {letter.company}
                </h2>
                {letter.role && (
                  <div className="flex items-center gap-1.5 mt-1">
                    {letter.applyUrl ? (
                      <a
                        href={letter.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-ink-muted hover:text-accent transition-colors"
                      >
                        {letter.role}
                      </a>
                    ) : (
                      <span className="font-mono text-xs text-ink-muted">{letter.role}</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <p className="text-ink-muted italic mb-6">{letter.greeting}</p>

            <div className="space-y-4 text-ink-muted leading-relaxed">
              {letter.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <p className="mt-8 font-medium text-ink">{letter.closing}</p>
          </motion.div>
        )}

        {/* Value I Bring */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease }}
          className="mb-12 sm:mb-16 md:mb-20 resume-section"
        >
          <h2 className="font-display text-2xl text-ink mb-6">The Value I Bring to the Table</h2>
          <div className="space-y-3 text-ink-muted leading-relaxed">
            <p>
              A mechanical engineering foundation means I think in systems and constraints; I see the structure underneath things. A decade of agency work means I know how to operate under pressure, serve demanding stakeholders, and ship. And a year of daily, deep work building AI-native infrastructure means I&apos;m not just using these tools. I&apos;m building on top of them.
            </p>
            <p>
              I bring the unusual combination of builder, operator, and strategic thinker to every problem. I can go deep technically and surface commercially. I&apos;ve built things from zero, run teams, served enterprise clients, and built the kind of AI infrastructure most people are still theorizing about.
            </p>
            <p>
              What makes me effective isn&apos;t just the range of skills: it&apos;s how I operate. I&apos;m reliable and consistent. I set clear goals, manage my time and priorities across competing workstreams, and follow through. I&apos;ve led teams through ambiguity, built goal-setting frameworks that keep everyone aligned, and earned trust by being the person who always comes prepared and always delivers. Teamwork isn&apos;t just something I participate in: it&apos;s something I actively build. Strong task and time management, a bias toward clarity, and genuine accountability are at the core of how I work.
            </p>
            <p>
              Above all, I have a talent for distilling complexity into clarity: reading a complicated situation, organizing what matters, and keeping the team informed, aligned, and moving forward even when the path isn&apos;t obvious. That combination of technical depth, management experience, and people-first leadership is what I bring to every role.
            </p>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease }}
          className="mb-12 sm:mb-16 md:mb-20 resume-section"
        >
          <h2 className="font-display text-2xl text-ink mb-10">Experience</h2>

          <div className="relative">
            <div className="no-print absolute left-3 top-2 bottom-2 w-px bg-line" />

            <div className="space-y-6 sm:space-y-8 md:space-y-10">
              {timeline.map((entry, i) => (
                <motion.div
                  key={entry.org}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.5, ease, delay: i * 0.05 }}
                  className="relative pl-10"
                >
                  <div className="no-print absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-accent border-2 border-background" />
                  <span className="font-mono text-xs text-accent tracking-wide">
                    {entry.year}
                  </span>
                  <h3 className="font-display text-lg text-ink mt-1">
                    {entry.title}
                  </h3>
                  <p className="font-medium text-ink-muted text-sm mb-1.5">
                    {entry.org}
                  </p>
                  <p className="text-ink-muted text-sm leading-relaxed">
                    {entry.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease }}
          className="resume-section"
        >
          <h2 className="font-display text-2xl text-ink mb-10">Skills</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillGroups.map((group) => (
              <div key={group.name}>
                <h3 className="font-display text-base text-ink mb-3">
                  {group.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      className="font-mono text-xs bg-surface border border-line px-2.5 py-1.5 rounded cursor-default"
                      style={{ color: "var(--color-ink-muted)" }}
                      whileHover={{
                        y: -2,
                        color: "#F4631E",
                        borderColor: "rgba(244,99,30,0.45)",
                        backgroundColor: "rgba(244,99,30,0.08)",
                        boxShadow: "0 0 10px rgba(244,99,30,0.22)",
                        transition: { duration: 0.15 },
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
