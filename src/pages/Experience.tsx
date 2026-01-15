import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

type Experience = {
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate?: string;
    technologies?: string;
    responsibilities: string[];
    notableProjects?: string[];
};

const experiences: Experience[] = [
    {
        id: "1",
        company: "Capital One",
        role: "Principal Engineer",
        startDate: "Jan 2023",
        endDate: "Present",
        technologies: "Front-end: Angular | Back-end: Spring-Boot, AWS Lambda, DynamoDB",
        responsibilities: [
            "Spec designs, implementation, and infrastructure (AWS)",
            "Onboarding new lines of businesses to home-grown identity solutions",
            "Work with security researchers to implement latest cybersecurity measures",
            "Mentor Jr. Engineers and Interns"
        ],
        notableProjects: [
            "App migration to AWS Secrets Manager",
            "Redesign of Case Details Page",
            "Migration to using AWS Cert Manager",
            "Onboarded identity solutions with notable external partners"
        ]
    },
    {
        id: "2",
        company: "PlayVs",
        role: "Front End Lead / GraphQL Developer",
        startDate: "Sept 2020",
        endDate: "Oct 2022",
        technologies: "React, GraphQL, Angular",
        responsibilities: [
            "Led front-end architecture and development (80% FE / 20% BE dev ratio)",
            "Designed and maintained the GraphQL schema and backend development",
            "Wrote RFCs and Tech Specs setting up best practices and future technology direction",
            "Worked with UI designers and product owners to reimagine the product using modern UI frameworks"
        ],
        notableProjects: [
            "Revamped Onboarding flow",
            "Notification Center",
            "Revamped Dashboard",
            "Revamped UI theming system",
            "Billing usage data visualization"
        ]
    },
    {
        id: "3",
        company: "Workwell",
        role: "Lead Developer",
        startDate: "July 2019",
        endDate: "Sep 2020",
        technologies: "React Native, GraphQL, Django Graphene",
        responsibilities: [
            "Architected web and React Native applications",
            "Full-stack development with React Native, GraphQL, and Django",
            "Developed and shipped features such as account management, chat via WebSockets, typeahead search, drag and drop file uploads, and GraphQL subscriptions"
        ]
    },
    {
        id: "4",
        company: "SurfAir",
        role: "Full-stack Developer",
        startDate: "July 2018",
        endDate: "June 2019",
        technologies: "Node.js/Express, Python/Django, AngularJS, React",
        responsibilities: [
            "Worked with member management and accounting teams to maintain and develop new features",
            "Developed e-commerce and billing systems integrations (Zuora)",
            "Built flight reservation systems",
            "Migrated legacy systems from AngularJS and Node.js to Python/Django and React",
            "Developed and supported e-commerce and flight booking APIs"
        ]
    },
    {
        id: "5",
        company: "Breeze Orthodontics",
        role: "General Manager",
        startDate: "July 2017",
        endDate: "July 2018",
        technologies: "HR, Operations, IT, 3D Smile Design, Hubspot, Google Analytics",
        responsibilities: [
            "HR, Operations Manager, Logistics, Training, Sales & Marketing",
            "Online marketing (Hubspot, Google Analytics, Google Ads, Website Design)",
            "Turned around dental practice from -$40k/year to $300k+ annual income",
            "Implemented 3D printing and 3D smile design process",
            "Hired, trained, and managed office and chair-side staff"
        ]
    },
    {
        id: "6",
        company: "Shippabo",
        role: "Full-stack Developer",
        startDate: "Feb 2017",
        endDate: "July 2017",
        technologies: "MEAN Stack (Mongo, Express, AngularJS, Node.js), MJML, Socket.io",
        responsibilities: [
            "Developed real-time chat collaboration feature using Socket.io and AngularJS",
            "Created responsive emails using MJML (React-based email framework)",
            "Generated PDF documents using headless browser and CSS",
            "Backend e-commerce integrations with accounting system (Xero)"
        ]
    },
    {
        id: "6",
        company: "+15 years of prior experience",
        role: "Software Development Engineer in Test (SDET)",
        startDate: "available upon request",
        endDate: "",
        technologies: "Selenium, Mocha, Chai, Sinon, Jenkins, JUnit, TestNG",
        responsibilities: [
            "Automation framework design and development",
            "End-to-end testing with Selenium WebDriver",
            "Performance testing and profiling",
            "Mentoring junior QA engineers",
            "Load testing and analysis"
        ]
    }
];

const Experience: React.FC = () => {
    const theme = useTheme();

    return (
        <Box
            component="main"
            sx={{
                minHeight: '100vh',
                py: 6,
                px: 3,
            }}
        >
            <Container maxWidth="md">
                <Box sx={{ mb: 4 }}>
                    <Typography
                        id="experience-heading"
                        component="h1"
                        variant="h3"
                        sx={{ fontWeight: 700, mb: 1 }}
                    >
                        Work Experience
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        15+ years of professional software engineering experience, including SDET, QA automation, and full-stack web development.
                    </Typography>
                </Box>

                <Stack
                    component="section"
                    aria-label="work-experience"
                    spacing={2}
                >
                    {experiences.map((exp) => (
                        <Paper
                            key={exp.id}
                            elevation={0}
                            sx={{
                                p: 3,
                                background: theme.palette.mode === 'dark'
                                    ? 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))'
                                    : theme.palette.background.paper,
                                backdropFilter: 'blur(6px)',
                            }}
                        >
                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                justifyContent="space-between"
                                alignItems={{ xs: 'flex-start', sm: 'baseline' }}
                                spacing={2}
                                sx={{ mb: 2 }}
                            >
                                <Stack spacing={0.5}>
                                    <Typography component="h2" variant="h5" sx={{ fontWeight: 700 }}>
                                        {exp.role}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 600 }}>
                                        {exp.company}
                                    </Typography>
                                </Stack>
                                <Typography
                                    component="time"
                                    variant="body2"
                                    color="textSecondary"
                                    sx={{ whiteSpace: 'nowrap' }}
                                >
                                    {exp.startDate} — {exp.endDate ?? 'Present'}
                                </Typography>
                            </Stack>

                            {exp.technologies && (
                                <Typography variant="caption" sx={{ display: 'block', mb: 1.5, fontStyle: 'italic' }}>
                                    {exp.technologies}
                                </Typography>
                            )}

                            <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 600 }}>
                                Responsibilities:
                            </Typography>
                            <Stack component="ul" spacing={0.5} sx={{ mb: 2, pl: 2 }}>
                                {exp.responsibilities.map((r, i) => (
                                    <Typography key={i} component="li" variant="body2" sx={{ color: 'textSecondary' }}>
                                        {r}
                                    </Typography>
                                ))}
                            </Stack>

                            {exp.notableProjects && (
                                <>
                                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                                        Notable Projects:
                                    </Typography>
                                    <Stack component="ul" spacing={0.5} sx={{ pl: 2 }}>
                                        {exp.notableProjects.map((p, i) => (
                                            <Typography key={i} component="li" variant="body2" sx={{ color: 'textSecondary' }}>
                                                {p}
                                            </Typography>
                                        ))}
                                    </Stack>
                                </>
                            )}
                        </Paper>
                    ))}
                </Stack>
            </Container>
        </Box>
    );
};

export default Experience;