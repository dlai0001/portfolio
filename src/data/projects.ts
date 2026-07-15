export type ProjectLink = {
    label: string;
    href: string;
};

export type ArchitectureSection = {
    heading: string;
    body?: string;
    bullets?: string[];
};

export type Project = {
    /** URL-safe identifier used for the architecture route, e.g. /portfolio/mealiq */
    slug: string;
    name: string;
    tagline: string;
    /** Longer description shown on the card. */
    description: string;
    /**
     * Card image. Drop a file in `public/projects/<slug>.png` (served at
     * `${BASE_URL}projects/<slug>.png`). If the image is missing the card falls
     * back to a gradient banner, so this can stay set even before art exists.
     */
    image?: string;
    /**
     * Multiple card images shown side by side over the gradient banner — use for
     * a family entry that ships more than one app (e.g. two app icons). When set,
     * this takes precedence over `image`.
     */
    images?: string[];
    /**
     * How the card image fills the banner. `cover` (default) crops to fill —
     * best for wide screenshots. `contain` shows the whole image centered over
     * the gradient — best for icons/logos and tall portrait screenshots.
     */
    imageFit?: 'cover' | 'contain';
    /** CSS background-position for the image, e.g. 'top center'. Defaults to 'center'. */
    imagePosition?: string;
    /** Primary "Download" call to action (App Store / Play Store / release page). */
    downloadLink?: ProjectLink;
    /**
     * Multiple download CTAs — use when a single entry ships more than one app
     * (e.g. a family of apps). Rendered in addition to / instead of `downloadLink`.
     */
    downloadLinks?: ProjectLink[];
    /** Marketing / landing site. */
    marketingLink?: ProjectLink;
    /** Tech tags rendered as chips on the card. */
    tech?: string[];
    /** Content rendered on the per-project architecture page. */
    architecture: {
        summary: string;
        techStack?: string[];
        /**
         * Optional architecture diagram as Mermaid source (e.g. a `flowchart TD`
         * string). Rendered by the <Mermaid /> component — edit the text below to
         * update the diagram; no image files needed. See https://mermaid.js.org.
         */
        diagram?: string;
        sections: ArchitectureSection[];
    };
};

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export const PROJECTS: Project[] = [
    {
        slug: 'mealiq',
        name: 'MealIQ',
        tagline: 'AI-powered meal logging & nutrition tracking',
        description:
            'MealIQ logs meals from a photo, text, or voice description — AWS Bedrock extracts the ingredients and quantities, and calories and macros are calculated on-device from a bundled USDA database.',
        image: asset('projects/mealiq.png'),
        imageFit: 'contain', // logo/hero art — show it whole
        downloadLink: { label: 'App Store', href: 'https://apps.apple.com/app/id6772002348' },
        marketingLink: { label: 'Marketing Site', href: 'https://mealiq.dlaisoft.com' },
        tech: ['iOS · Native', 'AWS Bedrock', 'Amazon S3', 'DynamoDB'],
        architecture: {
            summary:
                'A native iOS app that turns a photo, text, or voice description of a meal into ingredients and quantities using AWS Bedrock, then computes calories and macros entirely on-device from a bundled USDA ingredient database.',
            techStack: [
                'Native iOS app',
                'On-device USDA ingredient database',
                'On-device calorie & macro calculation',
                'API Gateway + AWS Lambda — entry point to Bedrock',
                'AWS Bedrock — image & text ingredient extraction',
                'Amazon S3 — temporary image / audio storage',
                'DynamoDB — bug & inaccuracy reports',
            ],
            diagram: `flowchart TD
    subgraph Device["iOS App (on-device)"]
      Capture["Capture<br/>photo · text · voice"]
      USDA[("USDA ingredient DB<br/>bundled in app")]
      Calc["Calorie & macro<br/>calculation"]
    end
    subgraph AWS["AWS Cloud"]
      API["API Gateway<br/>entry point"]
      Lambda["AWS Lambda"]
      S3["Amazon S3<br/>temporary image / audio"]
      Bedrock["AWS Bedrock<br/>image & text → ingredients + quantities"]
      DDB[("DynamoDB<br/>bug & inaccuracy reports")]
    end
    Capture -->|"upload image / audio"| S3
    Capture -->|"request (text / media ref)"| API
    API --> Lambda
    Lambda -->|"read media"| S3
    Lambda -->|"invoke"| Bedrock
    Bedrock -->|"ingredients + quantities"| Lambda
    Lambda -->|"ingredients + quantities"| Calc
    USDA --> Calc
    Capture -.->|"report issue"| DDB`,
            sections: [
                {
                    heading: 'Overview',
                    body: 'MealIQ is a native iOS app for fast, accurate meal logging. A user snaps a photo, types, or speaks a description of what they ate; the app extracts the ingredients and quantities with AWS Bedrock and computes the calories and macros on-device.',
                },
                {
                    heading: 'iOS App (on-device)',
                    bullets: [
                        'Native iOS app',
                        'USDA ingredient database bundled in the app',
                        'Final calorie & macro calculations performed on-device',
                    ],
                },
                {
                    heading: 'Media Handling',
                    bullets: [
                        'Amazon S3 temporarily stores uploaded images and audio prior to processing',
                        'Audio is transcribed to text before ingredient extraction',
                    ],
                },
                {
                    heading: 'API Layer',
                    bullets: [
                        'Amazon API Gateway + AWS Lambda act as the entry point that invokes AWS Bedrock',
                        'Lambda reads the uploaded media from S3 and returns the extracted ingredients to the app',
                    ],
                },
                {
                    heading: 'AI Ingredient Extraction',
                    bullets: [
                        'AWS Bedrock decomposes an uploaded image into ingredient parts and quantities',
                        'AWS Bedrock decomposes a text description (or transcribed audio) into ingredient parts and quantities',
                    ],
                },
                {
                    heading: 'Data & Feedback',
                    bullets: [
                        'DynamoDB is used primarily for bug and inaccuracy reports',
                    ],
                },
                {
                    heading: 'Design Decisions & Trade-offs',
                    body: 'AWS Bedrock is reserved for the harder ingredient-extraction step to present ingreddients for user confirmation, ensuring confidence.  The USDA macro nutrient data is stored on device do the final macro calculationss on device to reduce requests. S3 holds media only transiently during processing.',
                },
            ],
        },
    },
    {
        slug: 'az-104-study-guide',
        name: 'Study Guides (AZ-104, CCA-F)',
        tagline: 'Certification exam prep — Azure & Claude',
        description:
            'A family of native iOS certification-study apps built on one shared architecture — the Microsoft AZ-104 (Azure Administrator) and CCA-F (Certified Claude Architect – Foundational) guides. Each offers on-device practice quizzes plus AI-driven study recommendations grounded in the official documentation.',
        image: asset('projects/az-104-study-guide.png'),
        images: [
            asset('projects/az-104-study-guide.png'),
            asset('projects/cca-f-architect-study.png'),
        ],
        imageFit: 'contain', // app icons, not screenshots — show them whole
        downloadLinks: [
            { label: 'AZ-104 · App Store', href: 'https://apps.apple.com/us/app/az-104-azure-admin-study-guide/id6764186666' },
            { label: 'CCA-F · App Store', href: 'https://apps.apple.com/us/app/cca-f-architect-study/id6788189859' },
        ],
        marketingLink: { label: 'Marketing Site', href: 'https://studyguides.dlaisoft.com' },
        tech: ['iOS · Native', 'AWS Bedrock', 'RAG', 'AWS Lambda'],
        architecture: {
            summary:
                'A family of native iOS certification-study apps — AZ-104 (Microsoft Azure Administrator) and CCA-F (Certified Claude Architect – Foundational) — sharing one architecture. Quiz questions live on-device and are refreshed by a weekly Claude routine that ships app updates. AWS Lambda + Bedrock power an AI study guide that recommends articles and videos based on your missed domains, plus an in-quiz AI chat — both grounded by RAG over an S3 vector store of the indexed certification documentation, with a Bedrock guardrail protecting the chat.',
            techStack: [
                'Native iOS apps (AZ-104, CCA-F) on a shared architecture',
                'Quiz questions stored on-device',
                'Weekly Claude routine generates new questions, shipped via app update',
                'AWS Lambda API + AWS Bedrock (LLM)',
                'RAG over an S3 vector store of indexed certification docs',
                'AWS Bedrock Guardrail on the AI chat',
            ],
            diagram: `flowchart TD
    Routine["Claude Routine — weekly<br/>generates new quiz questions"]
    subgraph Device["iOS App (on-device)"]
      Quiz[("Quiz questions<br/>stored on device")]
      Guide["AI Study Guide"]
      Chat["AI Chat<br/>(quiz screen)"]
    end
    subgraph AWS["AWS Cloud"]
      Lambda["AWS Lambda<br/>API"]
      Bedrock["AWS Bedrock<br/>LLM"]
      Guard["Bedrock Guardrail<br/>anti-jailbreak / abuse"]
      Vec[("S3 Vector Store<br/>RAG · indexed cert docs")]
    end
    Routine -->|"ships app update"| Quiz
    Guide -->|"missed-question domains"| Lambda
    Chat -->|"question follow-ups"| Lambda
    Lambda --> Bedrock
    Guard -.->|"applied to chat"| Bedrock
    Bedrock -->|"retrieve context"| Vec
    Lambda -->|"recommended articles & videos · answers"| Device`,
            sections: [
                {
                    heading: 'Overview',
                    body: 'A family of native iOS study apps — AZ-104 (Microsoft Azure Administrator) and CCA-F (Certified Claude Architect – Foundational) — built on one shared architecture that combines on-device practice quizzes with AI-driven study recommendations and an in-quiz AI chat.',
                },
                {
                    heading: 'iOS Apps (on-device)',
                    bullets: [
                        'Native iOS apps: AZ-104 and CCA-F',
                        'Quiz questions are stored on the device',
                    ],
                },
                {
                    heading: 'Content Updates',
                    bullets: [
                        'A Claude routine runs weekly to generate new questions',
                        'New questions are delivered by pushing an app update',
                    ],
                },
                {
                    heading: 'AI Study Guide',
                    bullets: [
                        'Looks at how many questions the user missed across each study domain',
                        'Recommends specific articles and YouTube video lessons to study',
                    ],
                },
                {
                    heading: 'AI Chat',
                    bullets: [
                        'On the quiz screen, users can ask follow-up questions about the current question',
                        'An AWS Bedrock guardrail prevents prompt jailbreaking and abuse',
                    ],
                },
                {
                    heading: 'Retrieval (RAG)',
                    bullets: [
                        'Both AI features use AWS Lambda + Bedrock',
                        'RAG is backed by an S3 vector store built from indexing each certification’s official documentation (Microsoft Azure for AZ-104, Anthropic/Claude docs for CCA-F)',
                    ],
                },
                {
                    heading: 'Design Decisions & Trade-offs',
                    body: 'Shipping questions on-device keeps the quiz fast and available offline, while AI features are grounded in indexed certification documentation so guidance stays accurate and current. A single shared architecture lets new exam guides (AZ-104, CCA-F, and beyond) launch quickly by swapping the on-device question set and the indexed docs behind the RAG store.',
                },
            ],
        },
    },
    {
        slug: 'learn-chinese-news',
        name: 'Learn Chinese News',
        tagline: 'Study Mandarin with real news articles',
        description:
            'Learn Chinese News is an iPhone app for studying Mandarin with real news articles: bilingual side-by-side reading, pinyin, read-aloud, and vocabulary study.',
        image: asset('projects/learn-chinese-news.png'),
        imageFit: 'contain', // app icon, not a screenshot — show it whole
        downloadLink: { label: 'App Store', href: 'https://apps.apple.com/us/app/learn-chinese-news/id6778641133' },
        marketingLink: { label: 'Marketing Site', href: 'https://learnchinese.dlaisoft.com/' },
        tech: ['iOS · Native', 'Mandarin / news', 'Pinyin', 'Read-aloud (TTS)'],
        architecture: {
            summary:
                'A native iOS app that fetches real Mandarin news articles, then translates the headlines and article text via AWS Lambda + AWS Bedrock, presenting bilingual side-by-side reading with pinyin, read-aloud, and vocabulary study.',
            techStack: [
                'Native iOS app',
                'In-app news fetching',
                'AWS Lambda — API entry point',
                'AWS Bedrock — headline & article translation',
                'DynamoDB — remaining-translation tracking',
                'Google AdMob — ad serving',
                'On-device vocabulary & saved words',
            ],
            diagram: `flowchart TD
    News["News sources<br/>Mandarin articles"]
    Ads["Google AdMob<br/>ad serving"]
    subgraph Device["iOS App"]
      Fetch["Fetch news"]
      Reader["Bilingual reader<br/>side-by-side · pinyin"]
      TTS["Read-aloud<br/>sentence highlighting"]
      Vocab[("Vocabulary & saved words<br/>stored on device")]
    end
    subgraph AWS["AWS Cloud"]
      Lambda["AWS Lambda"]
      Bedrock["AWS Bedrock<br/>translate headlines & articles"]
      DDB[("DynamoDB<br/>remaining translations")]
    end
    News -->|"articles"| Fetch
    Fetch -->|"headlines & article text"| Lambda
    Lambda -->|"check / decrement"| DDB
    Lambda -->|"fetch cached articles"| DDB
    Lambda -->|"invoke"| Bedrock
    Bedrock -->|"translations"| Lambda
    Lambda -->|"translations"| Reader
    Reader --> Vocab
    Reader --> TTS
    Ads -.->|"ads"| Device`,
            sections: [
                {
                    heading: 'Overview',
                    body: 'Learn Chinese News helps learners study Mandarin using authentic news articles, pairing the original Chinese with an English translation and adding pinyin, read-aloud, and vocabulary tools.',
                },
                {
                    heading: 'News & iOS App',
                    bullets: [
                        'Native iOS app',
                        'The app fetches news articles directly',
                    ],
                },
                {
                    heading: 'Translation (AI)',
                    bullets: [
                        'The app calls AWS Lambda, which invokes AWS Bedrock',
                        'AWS Bedrock translates article headlines',
                        'AWS Bedrock translates the article text',
                    ],
                },
                {
                    heading: 'Reading & Study',
                    bullets: [
                        'Bilingual side-by-side reading (Chinese + English)',
                        'Pinyin annotations',
                        'Read-aloud that highlights each sentence as it is spoken',
                        'Vocabulary and saved words are stored on the device',
                    ],
                },
                {
                    heading: 'Quota & Monetization',
                    bullets: [
                        'DynamoDB tracks each user’s remaining article translations',
                        'Google AdMob serves ads in the app',
                    ],
                },
                {
                    heading: 'Design Decisions & Trade-offs',
                    body: 'As a personal project, the system was designed to minimize baseline operating costs. Articles are translated and cached on demand rather than pre-translating, which keeps costs down but can lead to slower initial load times for articles. News feeds are fetched directly by the app rather than through a backend. This is a deliberate choice to sidestep copyright and trademark concerns: the app functions as an RSS reader rather than a resyndication of the news sites listed, and users can add their own news sources via URL. The trade-off is some added latency and more networking and parsing logic on the client. Ads are served directly in the app via Google AdMob to generate revenue without needing a custom ad-serving backend.',
                },
            ],
        },
    },
    {
        slug: 'freepost',
        name: 'Freepost',
        tagline: 'The API client that never phones home',
        description:
            'Freepost is an open-source, offline-first Postman alternative for REST, GraphQL, and WebSocket testing — built for developers behind corporate firewalls. No account, no cloud, no telemetry: collections are runnable curl files on disk.',
        image: asset('projects/freepost.png'),
        imageFit: 'contain', // wide hero poster — show it whole so the headline & URL aren't cropped
        downloadLink: { label: 'GitHub', href: 'https://github.com/dlai0001/freepost' },
        marketingLink: { label: 'Website', href: 'https://dlai0001.github.io/freepost/' },
        tech: ['Electron', 'React · TypeScript', 'REST / GraphQL / WebSocket', 'curl-on-disk', 'Offline-only'],
        architecture: {
            summary:
                'A cross-platform desktop API client built on Electron. Collections are plain folders on disk, where every request is a pretty-printed, runnable curl command (websocat for WebSocket) with YAML-in-comments frontmatter. The request engine is the only module allowed to open a socket, and CI enforces a zero-network fence so the app never phones home.',
            techStack: [
                'Electron — cross-platform desktop shell',
                'React + TypeScript — renderer UI',
                'CodeMirror 6 — request/script editing',
                'Node request engine — REST, GraphQL (graphql-ws / graphql-sse), WebSocket (ws)',
                'pm.* script sandbox with Chai assertions',
                'curl / websocat on-disk collection format (YAML frontmatter)',
                'Vitest — 400+ tests; CI network fence',
                'Builds from source on macOS & Windows',
            ],
            diagram: `flowchart TD
    subgraph Desktop["Freepost — Electron App"]
      UI["Renderer (React + TS)<br/>request builder · editors"]
      Scripts["pm.* script sandbox<br/>pre-request · tests (Chai)"]
      Engine["Request engine<br/>the only module allowed a socket"]
      Files[("Collections on disk<br/>runnable curl / websocat files")]
    end
    Target["Your APIs<br/>REST · GraphQL · WebSocket"]
    Git["Git<br/>plain-text diff & review"]
    UI --> Scripts
    Scripts --> Engine
    UI <-->|"read / write"| Files
    Files -.->|"version control"| Git
    Engine -->|"the requests you send"| Target
    Target -->|"responses"| Engine`,
            sections: [
                {
                    heading: 'Overview',
                    body: 'Freepost is a Postman clone stripped of the team-cloud features: offline-only, no registration, and buildable from source on Windows and macOS with Node as the only prerequisite. It targets developers on locked-down corporate networks who cannot use a cloud API client.',
                },
                {
                    heading: 'Curl-on-disk collection format',
                    bullets: [
                        'Collections are folders you choose anywhere on disk',
                        'Every request is a pretty-printed, runnable curl command (websocat for WebSocket)',
                        'Metadata lives in YAML-in-comments frontmatter',
                        'bash runs it, git diff reviews it, any tool that imports curl understands it',
                    ],
                },
                {
                    heading: 'Protocols & scripting',
                    bullets: [
                        'REST/HTTP, GraphQL (query editor + schema introspection), and WebSocket',
                        'Postman-compatible pre-request and test scripts via the pm.* API with Chai assertions',
                        'Three-tier variables plus session scope, {{variable}} templating',
                        'Workflows: ordered request runs with expect-error steps and reference validation',
                    ],
                },
                {
                    heading: 'Interop',
                    bullets: [
                        'Import from Postman collection v2.1, OpenAPI 3.x / Swagger 2.0, and curl / websocat / wscat',
                        'Code generation to 8 language targets',
                        'OAuth2 token acquisition (client_credentials, password) and mTLS client certs',
                        'Request history and saved response examples',
                    ],
                },
                {
                    heading: 'Zero-network fence',
                    body: 'Freepost makes zero network calls except the requests you send — no telemetry, crash reporting, or update checks. The request engine is architecturally isolated as the only module permitted to open a socket, and a CI check (npm run fence) fails the build if any other module does. This is the core trust guarantee for a tool aimed at security-conscious, firewalled environments.',
                },
                {
                    heading: 'Design Decisions & Trade-offs',
                    body: 'Git is the collaboration story instead of a cloud sync backend: because collections are plain-text curl files on disk, they are reviewed via pull requests like any other code, which sidesteps building accounts, workspaces, and server infrastructure. The trade-off is no built-in real-time team features. The project is MIT-licensed and funded by donations rather than a paid cloud tier — a deliberate choice so there is never a commercial incentive to add the phone-home behavior the tool exists to avoid.',
                },
            ],
        },
    },
];

export const getProject = (slug: string): Project | undefined =>
    PROJECTS.find((p) => p.slug === slug);
