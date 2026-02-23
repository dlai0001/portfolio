import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import React from 'react';

type Skill = {
    name: string;
    level?: number; // 0-100, optional
    link?: string; // optional link to more info
};

const SKILLS: Record<string, Skill[]> = {
    "Programming Languages": [
        { name: "JavaScript/TypeScript", level: 95 },
        { name: "Python", level: 85 },
        { name: "Java", level: 80 },
        { name: "C#", level: 70 },
        { name: "SQL", level: 90 },
    ],
    Frontend: [
        { name: "React", level: 90 },
        { name: "React Native", level: 80 },
        { name: "Angular", level: 70 },
        { name: "Material UI", level: 85 },
        { name: "TypeScript", level: 90 },
        { name: "D3", level: 75 },
        { name: "Web Performance", level: 80 },
        { name: "Front-end Architecture", level: 85 },
    ],
    "Backend / APIs": [
        { name: "Node.js", level: 85 },
        { name: "ExpressJS", level: 80 },
        { name: "Apollo GraphQL", level: 85 },
        { name: "GraphQL Schema Design", level: 85 },
        { name: "Python/Django", level: 75 },
        { name: "Java/Spring Boot", level: 75 },
        { name: "REST API design", level: 85 },
        { name: "Microservices Architecture", level: 80 },        
        
    ],
    "Databases": [
        { name: "PostgreSQL", level: 90 },
        { name: "AWS Aurora", level: 90 },
        { name: "MySQL", level: 90 },        
        { name: "DynamoDB", level: 80 },
        { name: "Redis", level: 70 },
    ],
    "Cloud / Infrastructure": [
        { name: "AWS Certified Solutions Architect", level: 85, link: 'https://www.credly.com/badges/1741d3ee-5735-4d77-885d-6f9f15863fa1/public_url' },
        { name: "AWS Certified AI Practitioner", level: 90, link: 'https://www.credly.com/badges/ebc848e3-9606-4e74-bc3a-d58a2723919e/public_url' },
        { name: "AWS Lambda", level: 80 },        
        { name: "Docker", level: 80 },
        { name: "CI/CD", level: 90 },
        { name: "AWS Secrets Manager", level: 85 },
        { name: "AWS Cert Manager", level: 85 },
        { name: "Open Telemetry", level: 70 },
        { name: "ELK Stack", level: 70 },
        { name: "Splunk", level: 70 },
        { name: "New Relic", level: 70 },
    ],    
    "Best Practices": [
        { name: "Web Application Architecture", level: 90 },
        { name: "Domain Driven Design (DDD)", level: 75 },        
        { name: "Automated Testing", level: 80 },
        { name: "Debugging (JS/Node)", level: 85 },
        { name: "JS Profiling (JS/Node)", level: 80 },
        { name: "Load Testing", level: 80 },
        { name: "RFCs/Tech Specs", level: 80 },
        { name: "System Design", level: 80 },
        { name: "Stakeholder Leadership", level: 75 },
        { name: "UML Architecture", level: 70 },
        { name: "AWS Well Architected Framework", level: 80 },
        { name: "EVA Architecture", level: 75 },
    ],
};

const SkillBadge: React.FC<{ skill: Skill }> = ({ skill }) => {
    const theme = useTheme();
    const pct = Math.max(0, Math.min(100, skill.level ?? 0));
    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} sx={{ mt: 0.5 }}>
            {skill.link ? (
                <Link
                    href={skill.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{ minWidth: 120, flexBasis: "50%", display: 'inline' }}
                >
                    <Typography variant="body2" component="span">
                        {skill.name}
                    </Typography>
                </Link>
            ) : (
                <Typography variant="body2" sx={{ minWidth: 120, flexBasis: "50%", }}>
                    {skill.name}
                </Typography>
            )}
            <Stack direction="row" alignItems="center" spacing={1} sx={{ flex: 1, ml: 1.5 }}>
                <Box
                    aria-hidden
                    sx={{
                        flex: 1,
                        height: 8,
                        background: theme.palette.action.disabled,
                        borderRadius: 999,
                        overflow: "hidden",                        
                    }}
                >
                    <Box
                        sx={{
                            width: `${pct}%`,
                            height: "100%",
                            background: theme.palette.primary.main,
                            borderRadius: 999,
                            transition: "width 300ms ease",
                        }}
                    />
                </Box>
                <Typography variant="caption" sx={{ minWidth: 36, textAlign: "right" }}>
                    {skill.level ? `${skill.level}%` : "—"}
                </Typography>
            </Stack>
        </Stack>
    );
};

export default function Skills(): React.ReactElement {
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
                <Box component="header" sx={{ mb: 4 }}>
                    <Typography
                        component="h1"
                        variant="h3"
                        sx={{ fontWeight: 700, mb: 1 }}
                    >
                        Skills
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        A summary of core technical skills and tooling. Levels are approximate and intended for quick reference.
                    </Typography>
                </Box>

                <Box
                    component="section"
                    aria-labelledby="skills-heading"
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                        gap: 2,
                        mt: 2,
                    }}
                >
                    {Object.entries(SKILLS).map(([category, skills]) => (
                        <Paper
                            key={category}
                            elevation={0}
                            component="div"
                            role="region"
                            aria-label={category}
                            sx={{
                                p: 2,
                                background: theme.palette.mode === 'dark'
                                    ? 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))'
                                    : theme.palette.background.paper,
                                backdropFilter: 'blur(6px)',
                            }}
                        >
                            <Typography
                                component="h2"
                                variant="h6"
                                sx={{ fontWeight: 700, mb: 1 }}
                            >
                                {category}
                            </Typography>
                            <Stack spacing={0}>
                                {skills.map((s) => (
                                    <SkillBadge key={s.name} skill={s} />
                                ))}
                            </Stack>
                        </Paper>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}