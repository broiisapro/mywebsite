export interface BlogSection {
  type: 'p' | 'h2' | 'code' | 'ul'
  text?: string
  items?: string[]
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  tag: string
  excerpt: string
  projectSlug: string
  githubUrl?: string
  content: BlogSection[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'linkedin-growth-os',
    title: "Building LinkedIn Growth OS: A 10,000-Line Personal CRM I Never Planned to Build",
    date: 'June 2025',
    tag: 'Full-Stack · AI',
    excerpt: "What started as a simple post log turned into 19 API routes, 41 React components, and a scoring engine I designed from scratch.",
    projectSlug: 'linkedin-growth-os',
    content: [
      {
        type: 'p',
        text: "LinkedIn's native analytics are broken. Not broken like a bug — broken like they were designed by someone who's never tried to grow an audience. You get a vague impressions number. Maybe a reaction count. No memory. No benchmarking against yourself. No way to know if a post performed well or just triggered a notification spike that decayed in four hours.",
      },
      {
        type: 'p',
        text: "So I built a spreadsheet. Then I built a script that pulled data from the spreadsheet. Then I built a dashboard. Then I looked up and it was 10,000 lines of TypeScript.",
      },
      {
        type: 'h2',
        text: 'The Scope Creep Problem',
      },
      {
        type: 'p',
        text: "LinkedIn Growth OS has 19 API routes, 7 data models, and 41 React components. None of that was planned. It grew because every time I used the early version, I found something else that was annoying about LinkedIn that I could fix.",
      },
      {
        type: 'p',
        text: "The original spec: log a post, record its metrics, see a table. The final product: Day 1/7/30 checkpoint tracking, a normalized scoring engine, four AI features powered by the Claude API, a content ideas vault, a voice recorder for ideas, and a post autopsy system that tells you exactly why something worked or didn't.",
      },
      {
        type: 'h2',
        text: 'The Day 1/7/30 System',
      },
      {
        type: 'p',
        text: "Here's the insight that made this worth building: measuring a LinkedIn post once is almost meaningless. Impressions decay. A post might get 80% of its reach in the first 24 hours, or it might keep climbing for a week. You can't tell from a single snapshot.",
      },
      {
        type: 'p',
        text: "So every post gets three checkpoints: Day 1 (initial spike), Day 7 (whether it held), Day 30 (long tail). The system flags which checkpoints are overdue and surfaces them on a dashboard. You pull the current number, log it, and move on. Takes 30 seconds per post.",
      },
      {
        type: 'p',
        text: "This alone made the tool worth using. I now know which of my posts are evergreen and which peaked immediately. That changes how I think about what to write next.",
      },
      {
        type: 'h2',
        text: 'The Scoring Engine',
      },
      {
        type: 'p',
        text: "Absolute impression numbers are misleading — especially when your audience size is changing. A post with 500 impressions when you have 200 followers is better than 500 impressions when you have 2,000. The scoring engine normalizes against your own historical 30-day average, which means a 'good' post is always defined relative to your current baseline.",
      },
      {
        type: 'p',
        text: "The formula weights six signals: impressions (35%), reactions (20%), saves (20%), profile viewers driven by the post (15%), comments (5%), and new connections (5%). Saves are weighted heavily because they signal genuine intent — someone found it useful enough to want to come back to it.",
      },
      {
        type: 'p',
        text: "The formula is unstable with fewer than 5 posts. I'm saying that plainly. With a small dataset, the 'baseline' is too noisy to normalize against. It gets more useful over time.",
      },
      {
        type: 'h2',
        text: 'The Four AI Features',
      },
      {
        type: 'p',
        text: "All four are powered by the Claude API with heavy prompt engineering. I spent more time on the prompts than on the API integration.",
      },
      {
        type: 'ul',
        items: [
          "Post body generation: takes a topic, your writing style (derived from past posts), and a target audience. Generates a full post that sounds like you, not like ChatGPT.",
          "Hook generation: produces four structurally different hooks — curiosity gap, contrarian take, story open, and direct insight. You pick the one that fits the idea.",
          "Per-post autopsy: given all the metrics for a post, it produces a structured verdict — what worked, what didn't, what to change next time. Stored in the DB and tied to the post.",
          "Cross-post growth insights: analyzes patterns across your last 30 posts and surfaces themes that correlate with high scores. Results are cached at the DB level so you're not calling the API on every page load.",
        ],
      },
      {
        type: 'h2',
        text: 'Engineering Decisions',
      },
      {
        type: 'p',
        text: "SQLite over Postgres. This is a single-user tool. There's no reason to stand up a Postgres instance, manage connections, or pay for a hosted database. SQLite runs in the same process, the file is portable, and it's fast enough that I've never hit a query over 20ms.",
      },
      {
        type: 'p',
        text: "I put all modal state in a single modals.tsx file. Every modal in the app — and there are a lot — lives there. This is a deliberate violation of co-location orthodoxy. In practice, modals are referenced from many places and having them scattered made refactoring painful. One file, one truth.",
      },
      {
        type: 'p',
        text: "In-memory rate limiting for the AI endpoints. 20 lines of code. Resets on server restart. Not suitable for production at scale — but this is a personal tool running locally. Redis would be 200 lines plus a container plus config. The 20-line version handles the one person using it.",
      },
      {
        type: 'h2',
        text: 'The Honest Limitations',
      },
      {
        type: 'p',
        text: "No auth. If you deploy this, anyone with the URL can use it. It's designed for local use or behind a private tunnel.",
      },
      {
        type: 'p',
        text: "No tests. I should write some. I haven't.",
      },
      {
        type: 'p',
        text: "The rate limiter resets on restart. If you restart the server, the window resets. Acceptable for personal use.",
      },
      {
        type: 'p',
        text: "The scoring formula is unstable with fewer than 5 posts. Already said this. Saying it again.",
      },
      {
        type: 'p',
        text: "I built this for myself. It works. It's the most complete thing I've shipped solo. That's enough.",
      },
    ],
  },
  {
    slug: 'apex',
    title: "APEX: Launching a Spectroscopy Payload to 100,000 Feet",
    date: 'June 2025',
    tag: 'Embedded · Hardware',
    excerpt: "Hardware that works at -60°C, 1% atmospheric pressure, and has to survive both ascent and descent. Here's what that actually involves.",
    projectSlug: 'apex',
    content: [
      {
        type: 'p',
        text: "APEX is a high-altitude balloon platform for atmospheric spectroscopy. We launched a payload to roughly 100,000 feet — the stratosphere — to collect light absorption data across multiple wavelengths at altitudes commercial aircraft can't reach.",
      },
      {
        type: 'p',
        text: "I was the team lead. That meant scope management, hardware/software integration, coordinating mechanical and software contributors, and being the person who had to make a call when two approaches were both defensible and we were running out of time.",
      },
      {
        type: 'h2',
        text: 'The Engineering Challenge',
      },
      {
        type: 'p',
        text: "The stratosphere is hostile to electronics in specific ways. Temperature at float altitude is around -60°C. Atmospheric pressure is about 1% of sea level. The payload spends 2–3 hours ascending, 30–60 minutes at float altitude, and then descends — sometimes fast, sometimes not, depending on how the balloon bursts.",
      },
      {
        type: 'p',
        text: "Every component in the sensor stack had to be rated for those conditions, or we had to test it ourselves. Off-the-shelf spectroscopy modules are not designed for this. We spent a significant chunk of the build time just validating that our sensor chain would actually produce reliable readings at altitude, not just at sea level in a warm lab.",
      },
      {
        type: 'p',
        text: "Power management was a secondary challenge. The payload is battery-operated. Battery capacity drops in cold. You're doing math on how much capacity you actually have vs. what the datasheets say, and the answer is always less.",
      },
      {
        type: 'h2',
        text: 'What I Was Responsible For',
      },
      {
        type: 'p',
        text: "On the software side: the embedded data acquisition system, the logging pipeline that wrote to SD card with checksumming, and the telemetry link that transmitted a subset of readings over radio in real time. On the systems side: integration between the mechanical enclosure, the power system, and the sensor array. The boundary between 'this is a hardware problem' and 'this is a software problem' dissolves fast when you're debugging why a sensor is reading wrong.",
      },
      {
        type: 'p',
        text: "Leading the team meant being the person who said 'we're not adding that feature' when it would've pushed the launch date. Scope management is the hardest part of any hardware project. The launch window doesn't move.",
      },
      {
        type: 'h2',
        text: 'The Data',
      },
      {
        type: 'p',
        text: "We got data back. That's not guaranteed — plenty of balloon projects lose their payload on descent, or discover that the sensor readings were garbage at altitude, or find the SD card corrupted. We got clean readings across the ascent profile and at float altitude.",
      },
      {
        type: 'p',
        text: "The spectroscopy data shows measurable changes in atmospheric composition across altitude bands. Specifically, ozone absorption features are detectable in the near-UV range at float altitude in ways that are masked at lower altitudes by atmospheric scattering. We're still processing the full dataset.",
      },
      {
        type: 'h2',
        text: 'What I Would Do Differently',
      },
      {
        type: 'p',
        text: "More redundancy in the sensor stack. We flew one primary spectrometer with no backup. If it had failed mid-flight, we'd have an expensive paperweight. Next time, a secondary sensor with a simpler interface as a fallback.",
      },
      {
        type: 'p',
        text: "Better descent rate control. The burst altitude and descent profile were less predictable than we wanted. A controlled venting valve on the balloon would have given us more deterministic float duration.",
      },
      {
        type: 'p',
        text: "Getting data back from 100,000 feet is still surreal. We're doing it again.",
      },
    ],
  },
  {
    slug: 'crawl-openclaw',
    title: "Crawl / OpenClaw: Building an Autonomous SEO Agent in a Weekend",
    date: 'March 2025',
    tag: 'AI · Web Scraping',
    excerpt: "SEO and GEO are manual, slow, and disconnected. We built an agent that handles the whole pipeline autonomously. In a weekend.",
    projectSlug: 'crawl-openclaw',
    content: [
      {
        type: 'p',
        text: "The problem with SEO in 2025 is that it's split in two. There's traditional search — Google, Bing, rankings, backlinks. And there's GEO: generative engine optimization, which is the newer problem of getting your content cited by AI answer engines like Perplexity and ChatGPT. Most businesses are ignoring the second one. Most SEO tools don't touch it.",
      },
      {
        type: 'p',
        text: "Crawl / OpenClaw is an agentic platform that handles both. It scrapes competitor pages, analyzes their content structure and topical coverage, and generates optimized content — simultaneously for search engine rankings and for AI citation patterns. No human in the loop once you kick it off.",
      },
      {
        type: 'h2',
        text: 'Built in a Weekend',
      },
      {
        type: 'p',
        text: "I built this with Nitya Savaram at GenAI Genesis 2025. We had one weekend. That's not a metaphor — Saturday morning to Sunday afternoon.",
      },
      {
        type: 'p',
        text: "The constraint forced good decisions. When you have 36 hours, you can't build abstractions for hypothetical futures. You build the thing that solves the problem, you wire it together, and you demo it. The architecture is clean not because we had time to clean it — we didn't — but because we made fast, direct choices.",
      },
      {
        type: 'h2',
        text: 'The Agentic Architecture',
      },
      {
        type: 'p',
        text: "The pipeline has three stages: scrape, analyze, generate. Each stage feeds the next automatically.",
      },
      {
        type: 'ul',
        items: [
          "Scrape: given a target URL or competitor domain, the agent crawls relevant pages, extracts structured content, and identifies topical clusters and content gaps.",
          "Analyze: the scraped content is processed to identify patterns — what topics rank, what question formats get cited by AI engines, what content structure appears in high-visibility pages.",
          "Generate: the agent produces a content brief and a draft that targets the identified gaps, structured for both traditional SEO (headers, semantic HTML, internal links) and GEO (direct answers, cited facts, structured data).",
        ],
      },
      {
        type: 'p',
        text: "The 'agentic' part is the lack of human checkpoints between stages. You give it a domain and a target topic. It runs. You get output. That's the thing most 'AI tools' don't actually do — they give you a UI where you click through each step manually. That's just a wizard with a better chatbot.",
      },
      {
        type: 'h2',
        text: 'The Pitch',
      },
      {
        type: 'p',
        text: "Demoing under competition conditions is different from showing a side project to a friend. Judges are looking for failure modes. The live demo is a liability as much as an asset. We built a fallback for if the scraping step timed out — cached example output we could switch to without the judges noticing.",
      },
      {
        type: 'p',
        text: "We didn't need it. The live demo worked. That's the best outcome.",
      },
      {
        type: 'h2',
        text: 'What "Agentic" Actually Means',
      },
      {
        type: 'p',
        text: "People use the word agentic to mean 'it uses an LLM.' That's not what it means. An agent takes an objective, breaks it into steps, executes each step using available tools, handles failures, and produces an output — without needing a human to supervise each step.",
      },
      {
        type: 'p',
        text: "Most 'agentic AI' products are just chatbots with extra UI. Crawl / OpenClaw actually orchestrates a pipeline autonomously. The distinction matters. We shipped it in a weekend. Most AI startups take months to get to the same place.",
      },
    ],
  },
  {
    slug: 'vantagei-deca-grader',
    title: "VantageAI: Fine-Tuning an LLM to Grade DECA Cases",
    date: 'January 2024',
    tag: 'AI · Fine-tuning',
    excerpt: "DECA Ontario has thousands of students competing in business case events. Grading is slow and inconsistent. I built a model to fix that — and got it into a real pilot.",
    projectSlug: 'vantagei-deca-grader',
    content: [
      {
        type: 'p',
        text: "DECA is a business and entrepreneurship competition. In the case study events, students role-play as consultants being evaluated by a judge. The judge scores them against a rubric — typically 10–20 criteria, each rated on a scale. Multiply that by thousands of students across Ontario, and you have a grading problem: slow, inconsistent, and expensive in judge time.",
      },
      {
        type: 'p',
        text: "The rubric structure is what made me think this was tractable. DECA cases aren't open-ended essays — they have structured evaluation criteria. Structure is something you can teach a model.",
      },
      {
        type: 'h2',
        text: 'The Fine-Tuning Process',
      },
      {
        type: 'p',
        text: "Dataset construction is the part nobody talks about when they write about fine-tuning. The model is only as good as what you train it on. I needed examples of DECA case performances with high-quality rubric scores — not crowdsourced ratings, but scores from experienced DECA judges who understand what the rubric criteria actually mean.",
      },
      {
        type: 'p',
        text: "Getting that data took longer than the technical work. Once I had it, I formatted the examples as (performance transcript, rubric) → (score, justification) pairs. The justification component is key — it forces the model to ground its score in specific rubric criteria rather than producing a number without reasoning.",
      },
      {
        type: 'p',
        text: "The training process itself was straightforward by comparison. Evaluate on held-out examples, iterate on the training data and prompt format, measure inter-rater reliability against human judges.",
      },
      {
        type: 'h2',
        text: 'What Nobody Tells You About Fine-Tuning',
      },
      {
        type: 'p',
        text: "The base model matters more than the fine-tuning. If you're starting with a model that has weak reasoning capabilities, fine-tuning won't fix that — you're just adding a thin layer of domain-specific behavior on top of a weak foundation. Start with a capable base.",
      },
      {
        type: 'p',
        text: "More data is not always better. Low-quality examples dilute the training signal. I removed examples from the dataset that showed inconsistent scoring, even though that made the dataset smaller. The model trained on the smaller, cleaner set outperformed the one trained on everything.",
      },
      {
        type: 'p',
        text: "The evaluation methodology is the hardest part to get right. What does 'good' mean for a grader? Agreement with human judges is the obvious metric, but human judges disagree with each other. I ended up measuring consistency (same input → same output across runs) and calibration (scores distributed similarly to the human distribution) separately from pure accuracy.",
      },
      {
        type: 'h2',
        text: 'Getting into an Actual Pilot',
      },
      {
        type: 'p',
        text: "There's a gap between 'I built a thing that works in my testing' and 'a real organization is running it on real data.' That gap is mostly trust and bureaucracy, not technical difficulty.",
      },
      {
        type: 'p',
        text: "Getting VantageAI into an active pilot with DECA Ontario required showing that the model's outputs were interpretable (not just a number, but a justified score), that it performed consistently on edge cases, and that there was a clear process for human review when the model was uncertain.",
      },
      {
        type: 'p',
        text: "The hardest part wasn't the model. It was convincing DECA to try it.",
      },
    ],
  },
  {
    slug: 'pyros',
    title: "Pyros: Wildfire Detection AI in 24 Hours",
    date: 'January 2025',
    tag: 'CV · Voice AI',
    excerpt: "Hack Canada 2025. 24 hours, a wildfire problem, a team, and a working system by Sunday morning.",
    projectSlug: 'pyros',
    content: [
      {
        type: 'p',
        text: "Wildfire detection is a known hard problem. Satellite coverage has gaps. Ground sensors are expensive. Human spotters don't scale. The existing systems are slow enough that fires get significant spread before containment resources are deployed.",
      },
      {
        type: 'p',
        text: "Pyros uses computer vision on aerial or fixed camera feeds to detect wildfire signatures — smoke patterns, thermal anomalies, flame characteristics — and when it detects a high-confidence event, it triggers an AI voice agent that calls the relevant emergency dispatch with a structured incident report.",
      },
      {
        type: 'h2',
        text: 'Why CV + Voice, Not Just CV',
      },
      {
        type: 'p',
        text: "Detection alone isn't enough. If Pyros flags a potential wildfire and produces a dashboard notification, someone has to be watching the dashboard. Emergency responders are not watching dashboards at 3am.",
      },
      {
        type: 'p',
        text: "The voice agent closes that loop. When detection confidence exceeds the threshold, the system places an outbound call, delivers a structured report (location, confidence level, visual indicators, timestamp), and waits for confirmation. It's designed to fit into existing emergency response workflows rather than requiring dispatchers to learn a new tool.",
      },
      {
        type: 'h2',
        text: 'What Broke at 3am',
      },
      {
        type: 'p',
        text: "The voice agent's outbound call integration stopped working at around 3am Sunday. The API we were using for the telephony layer had a rate limit we didn't know about until we hit it during testing. We'd been running back-to-back test calls to tune the voice script and burned through the free tier limit.",
      },
      {
        type: 'p',
        text: "We switched to a different provider. Their documentation was worse. It took 90 minutes to get it working again. This is normal hackathon debugging — not a crisis, just a thing you work through.",
      },
      {
        type: 'h2',
        text: 'The Result',
      },
      {
        type: 'p',
        text: "Pyros won. The judges responded to the loop closure — detection to automated alert — more than to the CV component specifically. The CV is the harder technical problem, but the voice agent is what made the system feel complete.",
      },
      {
        type: 'p',
        text: "What you can build in 24 hours when you stop planning and start shipping is always more than you expect. The constraint removes the option of over-engineering. You build the direct path, and the direct path is usually good enough.",
      },
      {
        type: 'p',
        text: "Fire doesn't wait. Neither should detection.",
      },
    ],
  },
  {
    slug: 'commitgpt',
    title: "commitgpt 2.0: Building a Commit Message System, Not a Prompt Trick",
    date: 'January 2025',
    tag: 'Python · CLI · Developer Tools',
    excerpt: "Not about generation. About output control under unreliable model behavior.",
    projectSlug: 'commitgpt',
    githubUrl: 'https://github.com/broiisapro/commitgpt',
    content: [
      {
        type: 'p',
        text: "I didn't build commitgpt because writing commit messages is hard. I built it because writing good commit messages, every day, at speed, is friction that accumulates.",
      },
      {
        type: 'p',
        text: "Conventional commits are useful: they make history queryable, changelogs scriptable, and reviews less chaotic. But in practice, developers either rush them or skip structure when context switching gets expensive. \"fix stuff\" isn't a morality failure, it's a tooling failure.",
      },
      {
        type: 'p',
        text: "commitgpt started as a Git hook that generated one-line conventional commits from staged diffs. That version worked. Then real usage exposed the real problem: this isn't about generation, it's about output control under unreliable model behavior.",
      },
      {
        type: 'h2',
        text: 'How commitgpt works now',
      },
      {
        type: 'p',
        text: "commitgpt has two modes, because one mode cannot optimize for both speed and quality.",
      },
      {
        type: 'h2',
        text: '1) Automatic mode (global Git hook)',
      },
      {
        type: 'p',
        text: "Runs on git commit. Reads staged diff. Generates a strict single-line conventional commit. Writes to commit message file. Never blocks commit if generation fails. This is for day-to-day velocity: fast commits, minimal ceremony.",
      },
      {
        type: 'h2',
        text: '2) Manual detailed mode (CLI)',
      },
      {
        type: 'p',
        text: "Explicit command for higher-quality messages. Produces multi-line commit messages with a summary line, key changes, and an optional impact statement. Designed for commits that will be read in PRs, audits, or release prep. This is for communication quality when commit history is a collaboration surface, not just a log.",
      },
      {
        type: 'h2',
        text: 'The evolution: from hook automation to behavioral control',
      },
      {
        type: 'p',
        text: "The first version proved the hook integration quickly. That was the easy part.",
      },
      {
        type: 'p',
        text: "The second version required system-level thinking: separate workflows for speed and depth, separate prompts and validation rules per workflow, failure handling that protects developer flow, and guardrails for model outputs that are technically valid but operationally useless.",
      },
      {
        type: 'p',
        text: "The key shift: I stopped treating the model as a smart text generator and started treating it as an unreliable subsystem behind an interface contract.",
      },
      {
        type: 'h2',
        text: 'Design tradeoffs that actually mattered',
      },
      {
        type: 'p',
        text: "Single-line mode must be deterministic enough to run silently in the background. Detailed mode can be richer, but only when explicitly requested. Trying to make one prompt do both led to mediocre results in both.",
      },
      {
        type: 'p',
        text: "Automatic mode enforces tight output rules: one line, valid conventional prefix, no commentary. If output violates format, regenerate or fallback. Detailed mode allows structured multiline output with bullets and context — validation is looser because readability matters more than rigid syntax.",
      },
      {
        type: 'p',
        text: "If the API fails (rate limit, bad credits, timeout), commit flow still works. A tool that blocks commits during network failure is not a developer tool. It's an outage amplifier.",
      },
      {
        type: 'h2',
        text: 'Real-world LLM failures you have to design for',
      },
      {
        type: 'p',
        text: "The obvious failure is \"bad commit message.\" The real failures are weirder: empty responses, reasoning dumps instead of final output, correct analysis wrapped in invalid format, prefix drift with borderline diffs, API failures at exactly the wrong time.",
      },
      {
        type: 'p',
        text: "A model might return a thoughtful paragraph explaining architectural impact. Great for a human. Useless for commit-msg hook mode. Another example: model outputs a valid line plus a second line of explanation, instantly breaking strict commit formatting.",
      },
      {
        type: 'p',
        text: "The fix is not \"better model.\" The fix is mode-specific prompts, hard output contracts, validation and fallback, and conservative defaults under uncertainty.",
      },
      {
        type: 'h2',
        text: 'The philosophy now',
      },
      {
        type: 'p',
        text: "This project is no longer about AI writing commits for me. It's about building a reliable interface between developer workflows and nondeterministic models.",
      },
      {
        type: 'p',
        text: "The core lesson: DX beats raw model intelligence in tooling contexts. A brilliant model that occasionally breaks flow is worse than a modest model behind solid constraints. Developers optimize for trust. If a tool is predictable, they keep it. If it surprises them at commit time, they rip it out.",
      },
      {
        type: 'p',
        text: "The goal isn't maximum linguistic quality. The goal is controlled behavior under real-world failure conditions.",
      },
      {
        type: 'h2',
        text: 'Closing',
      },
      {
        type: 'p',
        text: "commitgpt started as a convenience hook. It became a small case study in production LLM integration: separate modes for separate jobs, strict where automation is implicit, flexible where intent is explicit, fail safely, treat prompt design and reliability as first-class engineering work.",
      },
      {
        type: 'p',
        text: "The hardest part was never wiring into Git. The hardest part was making model output dependable enough that developers stop thinking about the tool and trust it in their daily flow.",
      },
    ],
  },
  {
    slug: 'asl-translator',
    title: "ASL Translator: Real-Time Sign Language Recognition with MediaPipe",
    date: 'January 2024',
    tag: 'CV · Python',
    excerpt: "Real-time American Sign Language recognition from a webcam feed. What it took, what works, and what the honest limitations are.",
    projectSlug: 'asl-translator',
    githubUrl: 'https://github.com/broiisapro/project-11---sign-language',
    content: [
      {
        type: 'p',
        text: "ASL Translator was a computer vision project I built to understand the full pipeline from raw sensor input to classified output. The goal: real-time American Sign Language recognition from a standard webcam, with low enough latency to be usable in an actual conversation.",
      },
      {
        type: 'p',
        text: "Motivation: most 'ASL translator' demos are frame-by-frame classifiers that work on controlled test images. I wanted something that worked on live video, under variable lighting, with different hand sizes and positions.",
      },
      {
        type: 'h2',
        text: 'Why MediaPipe',
      },
      {
        type: 'p',
        text: "MediaPipe's hand landmark detection gives you 21 3D coordinates per hand per frame — the joints of each finger, the palm center, the wrist. That's the right level of abstraction for ASL classification. You're not classifying pixels, you're classifying the geometric configuration of hand landmarks. That representation is robust to lighting variation, skin tone variation, and most background conditions.",
      },
      {
        type: 'p',
        text: "Running landmark detection in real time on a consumer CPU is something MediaPipe handles efficiently. I didn't have to solve the 'how do I get 30fps hand tracking on a laptop' problem — I got to focus on what to do with the landmark data.",
      },
      {
        type: 'h2',
        text: 'The Model Architecture',
      },
      {
        type: 'p',
        text: "The classifier takes the 21 landmark coordinates (63 values: x, y, z per point) as input features. I normalized the coordinates relative to the wrist landmark so that hand position in the frame doesn't affect the classification — only the shape of the hand matters.",
      },
      {
        type: 'p',
        text: "Trained on a dataset of labeled landmark sequences for the ASL alphabet and a set of common words. The model is a small feed-forward network — not deep learning for its own sake, but because the landmark features are compact and the classification task is tractable without a heavy architecture.",
      },
      {
        type: 'h2',
        text: 'The Accuracy Challenges',
      },
      {
        type: 'p',
        text: "Letters that look similar in static form — B and D, for example — are harder. The model gets them right most of the time. The errors cluster around letters with overlapping landmark configurations.",
      },
      {
        type: 'p',
        text: "Signing speed is a bigger issue. Fast signers produce frames where the hand is between configurations, and the classifier sees an intermediate state it wasn't trained on. Temporal smoothing (averaging predictions over a small window) helps but introduces latency.",
      },
      {
        type: 'p',
        text: "Lighting matters more than I expected. MediaPipe's landmark detection degrades in low light in ways that cascade directly into classifier performance.",
      },
      {
        type: 'h2',
        text: 'What I Would Improve',
      },
      {
        type: 'p',
        text: "Dynamic gesture recognition is the main limitation. ASL isn't just static hand shapes — many signs involve movement, and the current system only classifies static configurations. Extending to temporal sequences (an LSTM or transformer over landmark sequences across frames) is the obvious next step.",
      },
      {
        type: 'p',
        text: "Two-hand support. Some ASL signs require both hands. The current system processes one hand at a time.",
      },
      {
        type: 'p',
        text: "The gap between 'works in a demo' and 'works in the real world for real users' is large. It works in a demo. Closing that gap is a product problem as much as a technical one.",
      },
    ],
  },
  {
    slug: 'frc-team-9621',
    title: "Blue Banner, Rookie Year: What FIRST Robotics Actually Teaches You",
    date: 'January 2024',
    tag: 'Robotics · C++',
    excerpt: "A Blue Banner in FRC means you won a regional. Winning it in your rookie year — first time competing — is rare. Here's what that season actually looked like.",
    projectSlug: 'frc-team-9621',
    content: [
      {
        type: 'p',
        text: "In FIRST Robotics, a Blue Banner means you won a regional competition. It's the physical award — a literal blue banner you hang in your school — that marks a regional championship win. Teams have them in their hallways like trophies. The older teams have rows of them.",
      },
      {
        type: 'p',
        text: "Winning one in your rookie year — the first year your team has ever competed — is not the expected outcome. Most rookie teams spend their first season learning what FIRST actually is, how the game works, how to build something that drives reliably. Winning the regional is a different category of result.",
      },
      {
        type: 'h2',
        text: 'The Build Season',
      },
      {
        type: 'p',
        text: "FRC has a six-week build season. In early January, the game challenge is revealed — a new game, new field, new game pieces, every year. You have six weeks to design, build, program, and test a robot that can play it competitively. The robot ships on day 42 whether it's ready or not.",
      },
      {
        type: 'p',
        text: "Six weeks sounds like a lot. It isn't. Mechanical design takes the first two weeks. Manufacturing overlaps with design. Software integration starts week three when there's something to integrate with. Week six is testing, debugging, and the slow realization that some things aren't going to get fixed before ship day.",
      },
      {
        type: 'p',
        text: "Debugging a physical system is different from debugging software. A segfault gives you a stack trace. A robot that veers left instead of going straight gives you nothing except the observation that it's going left. Root cause analysis in robotics is physical — is it a control loop issue, a motor issue, a wheel traction issue, a weight distribution issue, a programming issue? You work through them in order.",
      },
      {
        type: 'h2',
        text: 'What I Contributed',
      },
      {
        type: 'p',
        text: "Embedded C++ programming for the robot's control systems. Specifically: the autonomous mode routines (the first 15 seconds of each match where the robot operates without driver input), the drivetrain control loop, and the sensor integration for position tracking.",
      },
      {
        type: 'p',
        text: "The autonomous routines are where software wins or loses matches. A well-programmed autonomous can score 30–40% of your total match points before the driver ever touches a controller. Getting it right — and making it robust enough to work on an unfamiliar field under competition conditions — was the central technical challenge.",
      },
      {
        type: 'h2',
        text: 'What FIRST Teaches That No Class Does',
      },
      {
        type: 'p',
        text: "Cross-functional collaboration under real competitive pressure. You're working with mechanical engineers, electrical engineers, programmers, drive coaches, strategy leads — and you all have to agree on decisions under a deadline that doesn't move. In class, disagreements are resolved at your own pace. In FRC, someone makes a call and you move forward.",
      },
      {
        type: 'p',
        text: "The cost of a bug in a physical system. In software, a bug produces wrong output. In robotics, a bug can damage the robot, damage another robot, or get you disqualified from a match. The failure modes are physical and visible. It changes how carefully you test.",
      },
      {
        type: 'p',
        text: "Gracious professionalism is the FRC term for the culture: compete hard, help your competition if they need it, treat everyone with respect. It's not a platitude — teams genuinely loan parts to other teams at competition when something breaks. The culture is real.",
      },
      {
        type: 'p',
        text: "Rookie year. Blue Banner. I didn't know that was unusual until after.",
      },
    ],
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}
