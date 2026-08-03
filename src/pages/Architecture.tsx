import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import LaunchIcon from '@mui/icons-material/Launch';
import React from 'react';
import { Link as RouterLink, useParams } from 'react-router';

import Mermaid from '../components/Mermaid';
import { getProject } from '../data/projects';
import NotFound from './NotFound';

const Architecture: React.FC = () => {
    const theme = useTheme();
    const { slug } = useParams<{ slug: string }>();
    const project = slug ? getProject(slug) : undefined;

    if (!project) {
        return <NotFound />;
    }

    const { architecture } = project;

    const paperBg =
        theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))'
            : theme.palette.background.paper;

    return (
        <Box component="main" sx={{ minHeight: '100vh', py: 6, px: 3 }}>
            <Container maxWidth="md">
                <Button
                    component={RouterLink}
                    to="/projects"
                    startIcon={<ArrowBackIcon />}
                    sx={{ mb: 3 }}
                >
                    Back to Portfolio
                </Button>

                <Box component="header" sx={{ mb: 3 }}>
                    <Typography component="h1" variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                        {project.name} — Architecture
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        {architecture.summary}
                    </Typography>

                    <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}>
                        {[
                            ...(project.downloadLink ? [project.downloadLink] : []),
                            ...(project.downloadLinks ?? []),
                        ].map((link) => (
                            <Button
                                key={link.href}
                                component="a"
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="contained"
                                size="small"
                                startIcon={<DownloadIcon />}
                            >
                                {link.label}
                            </Button>
                        ))}
                        {project.marketingLink && (
                            <Button
                                component="a"
                                href={project.marketingLink.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="outlined"
                                size="small"
                                startIcon={<LaunchIcon />}
                            >
                                {project.marketingLink.label}
                            </Button>
                        )}
                    </Stack>
                </Box>

                {architecture.techStack && architecture.techStack.length > 0 && (
                    <Paper elevation={0} sx={{ p: 2.5, mb: 2, background: paperBg, backdropFilter: 'blur(6px)' }}>
                        <Typography component="h2" variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                            Tech Stack
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                            {architecture.techStack.map((t) => (
                                <Chip key={t} label={t} size="small" variant="outlined" />
                            ))}
                        </Stack>
                    </Paper>
                )}

                {architecture.diagram && (
                    <Paper elevation={0} sx={{ p: 2.5, mb: 2, background: paperBg, backdropFilter: 'blur(6px)' }}>
                        <Typography component="h2" variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                            Architecture Diagram
                        </Typography>
                        <Mermaid chart={architecture.diagram} />
                    </Paper>
                )}

                <Paper elevation={0} sx={{ p: 2.5, background: paperBg, backdropFilter: 'blur(6px)' }}>
                    <Stack divider={<Divider flexItem />} spacing={2.5}>
                        {architecture.sections.map((section) => (
                            <Box key={section.heading} component="section">
                                <Typography component="h2" variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                    {section.heading}
                                </Typography>
                                {section.body && (
                                    <Typography variant="body2" color="textSecondary" sx={{ mb: section.bullets ? 1 : 0 }}>
                                        {section.body}
                                    </Typography>
                                )}
                                {section.bullets && section.bullets.length > 0 && (
                                    <Stack component="ul" spacing={0.5} sx={{ pl: 2, m: 0 }}>
                                        {section.bullets.map((b, i) => (
                                            <Typography key={i} component="li" variant="body2" color="textSecondary">
                                                {b}
                                            </Typography>
                                        ))}
                                    </Stack>
                                )}
                            </Box>
                        ))}
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
};

export default Architecture;
