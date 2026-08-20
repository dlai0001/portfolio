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
        slug: 'hexlands',
        name: 'Hexlands',
        tagline: 'Online tile-based multiplayer strategy game',
        description:
            'Hexlands is a real-time multiplayer hex-tile placement game for iOS. The whole backend is serverless — API Gateway WebSockets, Lambda handlers, and DynamoDB — with a server-authoritative game engine, in-game voice chat, an internal admin portal for moderation, and CloudWatch monitoring.',
        image: asset('projects/hexlands.png'),
        imageFit: 'contain', // app icon, not a screenshot — show it whole
        downloadLink: { label: 'App Store', href: 'https://apps.apple.com/app/id6762682871' },
        marketingLink: { label: 'Website', href: 'https://www.hexlandsgame.com/' },
        tech: ['iOS · SwiftUI + SpriteKit', 'API Gateway WebSockets', 'AWS Lambda', 'DynamoDB', 'AWS CDK'],
        architecture: {
            summary:
                'An entirely serverless multiplayer game. The iOS client holds a persistent WebSocket to an API Gateway WebSocket API; every action is validated by a server-authoritative game engine running in Lambda and persisted to DynamoDB with optimistic locking. The same pure engine is bundled to JavaScript and executed on-device so single-player behaves identically to multiplayer. A separate admin web UI handles bans and bug reports, voice clips transit S3 with a one-day lifecycle, and CloudWatch carries the alarms, logs, and traces. All infrastructure is defined in AWS CDK across dev and prod stages.',
            techStack: [
                'Native iOS client — SwiftUI UI with a SpriteKit hex board',
                'Amazon API Gateway — WebSocket API (connect / disconnect / default routes)',
                'AWS Lambda — TypeScript handlers, one module per client action',
                'DynamoDB — games, connections, bans, bug reports, tokens, leaderboard, audit',
                'Amazon S3 — temporary voice-clip storage (presigned PUT, 1-day expiry)',
                'AWS Secrets Manager — HMAC key for anti-replay nonces',
                'CloudWatch — alarms via SNS, structured JSON logs; X-Ray tracing',
                'Admin Web UI — S3 + CloudFront SPA behind IAM Identity Center → Cognito',
                'AWS CDK — single stack per stage (dev / prod), custom domains via Route 53',
                'CoreML — on-device AI opponents trained offline (PPO and AlphaZero-lite)',
            ],
            diagram: `flowchart TD
    subgraph Clients["Clients"]
      iOS["iOS Game Client<br/>SwiftUI · SpriteKit"]
      AdminUI["Admin Web UI<br/>bans · bug reports"]
    end
    subgraph AWS["AWS Cloud (serverless)"]
      WS["API Gateway<br/>WebSocket API"]
      Fns["AWS Lambda<br/>connect · disconnect · default"]
      Engine["Game engine<br/>validator · scorer · feature detector"]
      DDB[("DynamoDB<br/>games · connections · bans<br/>reports · leaderboard")]
      S3V[("Amazon S3<br/>voice clips · 1-day expiry")]
      Sec["Secrets Manager<br/>anti-replay HMAC key"]
      CW["CloudWatch<br/>alarms · logs · X-Ray"]
      Auth["IAM Identity Center → Cognito<br/>SigV4 temp credentials"]
      AdminAPI["API Gateway REST<br/>Admin API + Lambda"]
    end
    iOS <-->|"WebSocket actions & broadcasts"| WS
    WS --> Fns
    Fns --> Engine
    Fns <-->|"optimistic-locked reads / writes"| DDB
    Fns -->|"presigned PUT url"| S3V
    iOS -->|"upload voice clip"| S3V
    Sec -.->|"nonce signing"| Fns
    Fns -.->|"logs · metrics · traces"| CW
    AdminUI --> Auth
    Auth --> AdminAPI
    AdminAPI --> DDB`,
            sections: [
                {
                    heading: 'Overview',
                    body: 'Hexlands is a hex-tile placement game — players draw a tile, place it against the shared board, optionally claim a feature, and score when roads, cities, and chapels complete. It ships on the App Store for iOS and supports real-time multiplayer lobbies, an offline single-player mode with AI opponents, and a persistent world board that never ends.',
                },
                {
                    heading: 'iOS Game Client',
                    bullets: [
                        'SwiftUI for navigation, lobby, and overlays; SpriteKit for the hex board and tile art',
                        'Tile artwork is drawn procedurally and cached per definition, with deterministic seeded scatter',
                        'A single WebSocket client feeds a central game store that drives every view',
                        'Universal links for share-to-join invites; replays render to a shareable MP4',
                    ],
                },
                {
                    heading: 'Realtime Backend (WebSockets)',
                    bullets: [
                        'API Gateway WebSocket API with connect, disconnect, and default routes',
                        'One Lambda per route; the default handler dispatches to a module per client action (place tile, place meeple, join, rejoin, chat, leaderboard, …)',
                        'Server-side broadcaster fans state changes out to every connection in a game',
                        'Reserved concurrency and per-function error, throttle, and p99-duration alarms',
                    ],
                },
                {
                    heading: 'Server-Authoritative Game Engine',
                    bullets: [
                        'Pure TypeScript modules — hex math, tile validator, feature detector, scorer — with no AWS dependencies',
                        'The client never decides legality: it renders what the server says is valid',
                        'The same engine is bundled to a single JS file and run on-device in JavaScriptCore, so single-player and multiplayer share one rule set',
                        'A Python mirror of the engine backs offline AI training',
                    ],
                },
                {
                    heading: 'Data Model (DynamoDB)',
                    bullets: [
                        'Pay-per-request tables for games, connections, bans, bug reports, player tokens, leaderboard, admin audit, and recorded training games',
                        'Every game write is guarded by a version condition expression — concurrent actions fail closed rather than corrupting the board',
                        'TTL expires finished games and stale connections automatically',
                        'The weekly leaderboard partitions on an ISO week id derived at write time, so it resets with no cron job',
                        'The persistent world board is split into chunk rows under one partition, keeping every item well under the 400 KB limit',
                    ],
                },
                {
                    heading: 'Voice & Chat',
                    bullets: [
                        'The client requests a short-lived presigned S3 PUT URL, uploads the clip, then notifies the game so peers can play it',
                        'A one-day S3 lifecycle rule expires every clip — voice is transient by design',
                        'Text chat is a curated quick-chat phrase set validated server-side against an allowlist, plus a profanity filter on free-form names',
                    ],
                },
                {
                    heading: 'Admin Web UI',
                    bullets: [
                        'Static SPA on S3 + CloudFront for triaging bug reports, reviewing player reports, and issuing or lifting bans',
                        'Sign-in flows IAM Identity Center → Cognito user pool (SAML) → identity pool → temporary AWS credentials',
                        'Calls a SigV4-signed, IAM-authorized REST API; no long-lived admin keys exist in the browser',
                        'Every mutating admin action is written to an audit table; the game Lambda has read-only access to bans',
                    ],
                },
                {
                    heading: 'Integrity & Anti-Cheat',
                    bullets: [
                        'Every mutating action carries an HMAC-SHA256 nonce; the server validates it and issues a fresh one in the response, so captured frames cannot be replayed',
                        'The signing key lives in Secrets Manager and is never shipped to the client',
                        'App Store purchase claims are verified against the Apple root CA certificate chain server-side',
                        'Bans are enforced at create, join, and rejoin',
                    ],
                },
                {
                    heading: 'Observability',
                    bullets: [
                        'Alarms on Lambda errors, throttles, p99 duration against the API Gateway timeout, and DynamoDB throttles route to an SNS topic',
                        'Structured JSON logs are queryable in Logs Insights by session, player, game, and action',
                        'X-Ray is active on every function, with the trace id stamped into each log line',
                    ],
                },
                {
                    heading: 'AI Opponents',
                    bullets: [
                        'Easy and medium opponents run heuristic strategies on-device',
                        'Harder tiers use neural models trained offline — a PPO trainer for medium/hard and an AlphaZero-lite trainer (ISMCTS self-play on SageMaker) for the top difficulty',
                        'Models export to CoreML and ship inside the app, so single-player needs no network at all',
                    ],
                },
                {
                    heading: 'Design Decisions & Trade-offs',
                    body: 'Serverless was chosen so idle cost is effectively zero: there is no always-on game server, and Lambda, DynamoDB on-demand, API Gateway, and S3 all bill per use, which matters for an indie title with bursty traffic. The cost is that all state must round-trip through DynamoDB rather than living in server memory, which is why optimistic locking and the anti-replay nonce carry so much weight. Extracting the rule engine as pure, dependency-free modules paid off twice — it is unit-testable without AWS, and bundling it to JavaScript let the same code power offline single-player instead of maintaining a second implementation. Voice chat deliberately stores nothing durable: clips are presigned uploads that expire in a day, which sidesteps moderation and retention obligations that a permanent voice archive would create.',
                },
            ],
        },
    },
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
            'Learn Chinese News is an iOS and Android app for studying Mandarin with real news articles: bilingual side-by-side reading, pinyin, read-aloud, and vocabulary study.',
        image: asset('projects/learn-chinese-news.png'),
        imageFit: 'contain', // app icon, not a screenshot — show it whole
        downloadLinks: [
            { label: 'App Store', href: 'https://apps.apple.com/us/app/learn-chinese-news/id6778641133' },
            { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.dlaisoft.learnchinese' },
        ],
        marketingLink: { label: 'Marketing Site', href: 'https://learnchinese.dlaisoft.com/' },
        tech: ['iOS & Android', 'Mandarin / news', 'Pinyin', 'Read-aloud (TTS)'],
        architecture: {
            summary:
                'A mobile app for iOS and Android that fetches real Mandarin news articles, then translates the headlines and article text via AWS Lambda + AWS Bedrock, presenting bilingual side-by-side reading with pinyin, read-aloud, and vocabulary study.',
            techStack: [
                'Mobile app — iOS & Android',
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
    subgraph Device["Mobile App (iOS & Android)"]
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
                    heading: 'News & Mobile App',
                    bullets: [
                        'Mobile app for iOS and Android',
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
    {
        slug: 'ux-developer-companion',
        name: 'UX Developer Companion',
        tagline: 'Point at the bug. Press one key. Let Copilot see what you see.',
        description:
            'A VS Code extension that embeds a real browser inside the editor. Annotate a UI bug directly on the page, then send the screenshot plus full page context to Copilot Chat with one keystroke — no more describing defects in prose.',
        image: asset('projects/ux-developer-companion.png'),
        imageFit: 'contain', // extension icon, not a screenshot — show it whole
        downloadLinks: [
            {
                label: 'VS Code Marketplace',
                href: 'https://marketplace.visualstudio.com/items?itemName=dlaisoft.ux-developer-companion',
            },
            { label: 'GitHub', href: 'https://github.com/dlai0001/ux-developer-companion' },
        ],
        tech: ['VS Code Extension', 'TypeScript', 'Chrome DevTools Protocol', 'GitHub Copilot Chat', 'axe-core'],
        architecture: {
            summary:
                'A VS Code extension that drives a headless Edge/Chrome instance over the Chrome DevTools Protocol and streams it into an editor panel. An annotation layer anchored to page CSS pixels lets you mark up a defect in place; the marked-up screenshot is then bundled with page context (URL, route, viewport, emulation state) and handed to GitHub Copilot Chat in a single keystroke. The same CDP session powers the component inspector, responsive tooling, accessibility scanning, and state manipulation.',
            techStack: [
                'VS Code extension (TypeScript) — webview panel UI',
                'Chrome DevTools Protocol client — drives headless Edge/Chrome',
                'Streamed browser frames with mouse, keyboard, and wheel input',
                'Canvas annotation layer anchored to page CSS pixels',
                'GitHub Copilot Chat integration — screenshot + context attachment',
                'React & Angular component inspection (dev builds for Angular)',
                'axe-core — bundled WCAG 2.1 accessibility scanning',
                'CDP emulation & network domains — device presets, throttling, request interception',
                'MIT licensed',
            ],
            diagram: `flowchart TD
    subgraph VSCode["VS Code"]
      Panel["Embedded browser panel<br/>streamed frames · mouse · keyboard"]
      Annot["Annotation layer<br/>box · circle · arrow · text · callout"]
      Inspect["Component inspector<br/>React / Angular props & state"]
      Lab["State Lab<br/>pseudo-states · throttling · storage"]
      A11y["Color & accessibility<br/>eyedropper · WCAG · axe-core"]
      Copilot["GitHub Copilot Chat"]
    end
    CDP["Chrome DevTools Protocol"]
    Browser["Headless Edge / Chrome"]
    App["Your app under development<br/>localhost / dev server"]
    Panel <-->|"input & frames"| CDP
    Inspect --> CDP
    Lab --> CDP
    A11y --> CDP
    CDP <--> Browser
    Browser -->|"renders"| App
    Panel --> Annot
    Annot -->|"annotated screenshot +<br/>URL · route · viewport · emulation"| Copilot`,
            sections: [
                {
                    heading: 'Overview',
                    body: 'UX Developer Companion collapses the loop of reporting a UI defect. Instead of switching to a browser, screenshotting, cropping, pasting, and writing a paragraph explaining what is wrong, you point at the problem in an embedded browser, annotate it, and press one key — Copilot Chat receives the annotated image along with everything it needs to know about the page state.',
                },
                {
                    heading: 'Embedded Browser',
                    bullets: [
                        'Headless Edge/Chrome driven over the Chrome DevTools Protocol',
                        'Frames streamed into a VS Code panel with full mouse, keyboard, and wheel support',
                        'Never leave the editor to reproduce or inspect a UI issue',
                    ],
                },
                {
                    heading: 'Annotation & Send to Chat',
                    bullets: [
                        'Box, circle, arrow, text, and callout markups anchored to page CSS pixels',
                        'One-keystroke attachment of the screenshot to GitHub Copilot Chat',
                        'Context travels with the image: URL, route, viewport, and emulation state',
                        'Copilot integration is optional — every other feature works standalone',
                    ],
                },
                {
                    heading: 'Component Inspector',
                    bullets: [
                        'Live prop and state editing for React and Angular components',
                        'Click-to-pick navigation from the rendered page to the component',
                        'Angular inspection requires a development build',
                    ],
                },
                {
                    heading: 'Responsive & Accessibility Tooling',
                    bullets: [
                        'Device presets and a breakpoint slider derived from the app’s own media queries',
                        'Responsive matrix for viewing several viewports at once',
                        'Eyedropper that identifies the CSS custom property behind a color',
                        'WCAG 2.1 contrast checks and bundled axe-core scanning',
                    ],
                },
                {
                    heading: 'State Lab',
                    bullets: [
                        'Force pseudo-states (:hover, :focus, :active) to inspect hard-to-catch styling',
                        'Request interception and network throttling',
                        'Storage snapshots for reproducing state-dependent bugs',
                    ],
                },
                {
                    heading: 'Design Decisions & Trade-offs',
                    body: 'Driving a real headless browser over CDP — rather than embedding a simplified webview — means the inspector, emulation, throttling, and accessibility tooling all reuse one session and behave exactly as they do in Chrome DevTools. Anchoring annotations to page CSS pixels instead of screen coordinates keeps markup correct across zoom levels and viewport changes. The Copilot handoff is deliberately optional so the extension remains useful as a pure in-editor browser and inspection tool for developers without a Copilot subscription. The project is MIT-licensed.',
                },
            ],
        },
    },
];

export const getProject = (slug: string): Project | undefined =>
    PROJECTS.find((p) => p.slug === slug);
